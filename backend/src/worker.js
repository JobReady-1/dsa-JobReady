// Load environment variables before anything else
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });
const { Worker } = require('bullmq');
const { connection } = require('./services/submissionQueue');
const { runTestCases } = require('./services/codeExecutorLocal');
const SubmissionDB = require('./models/SubmissionDB');
const problems = require('./data/problems');
const { updateSkillScores, updateUserAnalytics, recordDailyActivity } = require('./services/skillScoreService');

// Function to update progress in Redis
async function updateRedisStatus(submissionId, data) {
  const key = `submission:status:${submissionId}`;
  await connection.setex(key, 3600, JSON.stringify(data));
}

const worker = new Worker(
  'dsa-submissions-queue',
  async (job) => {
    const submissionId = job.id; // submission UUID is used as jobId
    const { userId, problemId, language, code } = job.data;
    
    const executionStartTime = new Date();
    const queueWaitTime = executionStartTime.getTime() - job.timestamp; // in ms
    
    console.log(`[Worker] Processing Job ${submissionId} for user ${userId}, problem ${problemId} (${language})`);
    console.log(`[Worker] Queue wait time: ${queueWaitTime}ms`);
    
    try {
      // 1. Get problem metadata & test cases
      const problem = problems.getProblem(problemId);
      if (!problem) {
        throw new Error(`Problem with ID ${problemId} not found in database`);
      }
      const testCases = problem.testCases || [];
      if (testCases.length === 0) {
        throw new Error(`No test cases configured for problem ID ${problemId}`);
      }

      // 2. Set initial status as running
      await updateRedisStatus(submissionId, {
        status: 'running',
        current: 0,
        total: testCases.length,
      });

      // 3. Run test cases with progress callback
      const executionResult = await runTestCases(
        code,
        language,
        testCases,
        async (current, total) => {
          console.log(`[Worker] Job ${submissionId} progress: ${current}/${total}`);
          await updateRedisStatus(submissionId, {
            status: 'running',
            current,
            total,
          });
        }
      );

      const executionEndTime = new Date();
      const totalExecutionTimeMs = executionEndTime.getTime() - executionStartTime.getTime();

      // Gather additional metrics
      // Max memory and time across all test cases
      let maxTime = 0;
      let maxMemory = 0;
      executionResult.results.forEach((r) => {
        if (r.time && Number(r.time) > maxTime) maxTime = Number(r.time);
        if (r.memory && Number(r.memory) > maxMemory) maxMemory = Number(r.memory);
      });

      const metrics = {
        queue_wait_time: queueWaitTime,
        execution_start_time: executionStartTime.toISOString(),
        execution_end_time: executionEndTime.toISOString(),
        total_execution_time_ms: totalExecutionTimeMs,
        max_time_seconds: maxTime,
        max_memory_kb: maxMemory,
      };

      const finalResultsPayload = {
        status: 'completed',
        results: executionResult.results,
        metrics,
      };

      // 4. Update the database record durably
      await SubmissionDB.update(
        submissionId,
        userId,
        problemId,
        executionResult.allPassed,
        executionResult.passedCount,
        executionResult.totalCount,
        finalResultsPayload
      );

      // 5. Update skill scores and user analytics on successful evaluation
      try {
        await recordDailyActivity(userId, executionResult.allPassed);
        const scores = await updateSkillScores(userId);
        await updateUserAnalytics(userId, executionResult.allPassed, problem.difficulty);
        console.log(`[Worker] Skill scores and user analytics updated for user ${userId}`);
      } catch (analyticsErr) {
        console.error(`[Worker] Failed to update analytics for user ${userId}:`, analyticsErr.message);
      }

      // 6. Cache final success details in Redis for polling speed
      await updateRedisStatus(submissionId, {
        status: 'completed',
        allPassed: executionResult.allPassed,
        passedCount: executionResult.passedCount,
        totalCount: executionResult.totalCount,
        results: executionResult.results,
        metrics,
      });

      console.log(`[Worker] Job ${submissionId} completed successfully. Passed: ${executionResult.passedCount}/${executionResult.totalCount}`);
      return finalResultsPayload;

    } catch (error) {
      console.error(`[Worker] Error executing job ${submissionId}:`, error.message);
      
      const failedPayload = {
        status: 'failed',
        error: error.message,
      };

      // Update Redis status as failed
      await updateRedisStatus(submissionId, failedPayload);

      // Update Database row as failed
      await SubmissionDB.update(
        submissionId,
        userId,
        problemId,
        false,
        0,
        0,
        failedPayload
      ).catch(dbErr => console.error('[Worker] Failed to write db failure status:', dbErr.message));

      throw error; // Fail the BullMQ job so it triggers retry/fail mechanics
    }
  },
  {
    connection,
    concurrency: 5, // allows up to 5 concurrent student jobs to process simultaneously on this worker
  }
);

worker.on('active', (job) => {
  console.log(`[Worker] Job ${job.id} active`);
});

worker.on('failed', (job, err) => {
  console.error(`[Worker] Job ${job.id} failed with error:`, err.message);
});

worker.on('completed', (job) => {
  console.log(`[Worker] Job ${job.id} finalized`);
});
