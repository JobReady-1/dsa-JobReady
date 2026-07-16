const { Queue } = require('bullmq');
const Redis = require('ioredis');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Setup Redis connection options
let connection;
try {
  connection = new Redis(REDIS_URL, {
    maxRetriesPerRequest: null,
  });
  console.log('✅ BullMQ Redis connection initialized');
} catch (error) {
  console.error('❌ Failed to connect to Redis for BullMQ:', error.message);
}

// Initialize the queue
const submissionQueue = new Queue('dsa-submissions-queue', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  },
});

module.exports = {
  submissionQueue,
  connection,
};
