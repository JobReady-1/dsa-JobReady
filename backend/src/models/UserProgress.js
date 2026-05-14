const supabase = require('../config/supabase');

class UserProgressModel {
  // Get user progress
  static async getProgress(userId = 'user_001') {
    try {
      const { data, error } = await supabase
        .from('dsa_user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw error;
      }

      if (!data) {
        // Create default progress for new user
        return await this.createDefaultProgress(userId);
      }

      return {
        userId: data.user_id,
        solvedProblems: data.solved_problems || [],
        totalProblems: 75,
        completionPercentage: this.calculateCompletionPercentage(data.solved_problems || []),
        streak: data.streak_current || 0,
        timeSpent: this.formatTimeSpent(data.time_spent_seconds || 0),
        timeSpentSeconds: data.time_spent_seconds || 0,
        lastSolvedDate: data.last_solved_date,
      };
    } catch (error) {
      console.error('Error getting progress:', error);
      throw error;
    }
  }

  // Create default progress for new user
  static async createDefaultProgress(userId) {
    try {
      const { data, error } = await supabase
        .from('dsa_user_progress')
        .insert([
          {
            user_id: userId,
            solved_problems: [],
            streak_current: 0,
            last_solved_date: null,
            time_spent_seconds: 0,
            session_start_ms: null,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      return {
        userId: data.user_id,
        solvedProblems: [],
        totalProblems: 75,
        completionPercentage: 0,
        streak: 0,
        timeSpent: '0.0h',
        timeSpentSeconds: 0,
        lastSolvedDate: null,
      };
    } catch (error) {
      console.error('Error creating default progress:', error);
      throw error;
    }
  }

  // Mark problem as solved
  static async markProblemSolved(problemId, userId = 'user_001') {
    try {
      // Get current progress
      const { data: currentData, error: fetchError } = await supabase
        .from('dsa_user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (fetchError) throw fetchError;

      const solvedProblems = currentData.solved_problems || [];
      
      // Check if already solved
      if (solvedProblems.includes(problemId)) {
        return await this.getProgress(userId);
      }

      // Add to solved problems
      const updatedSolved = [...solvedProblems, problemId];

      // Update streak
      const streakData = this.calculateStreak(
        currentData.streak_current || 0,
        currentData.last_solved_date
      );

      // Update database
      const { error: updateError } = await supabase
        .from('dsa_user_progress')
        .update({
          solved_problems: updatedSolved,
          streak_current: streakData.current,
          last_solved_date: streakData.lastSolvedDate,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      return await this.getProgress(userId);
    } catch (error) {
      console.error('Error marking problem solved:', error);
      throw error;
    }
  }

  // Start a session — stamps session_start_ms so elapsed time can be computed later
  static async startSession(userId = 'user_001') {
    try {
      const { error } = await supabase
        .from('dsa_user_progress')
        .update({
          session_start_ms: Date.now(),
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error starting session:', error);
      throw error;
    }
  }

  // Update time spent — computes elapsed from session_start_ms, adds to total, resets stamp
  static async updateTimeSpent(userId = 'user_001') {
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from('dsa_user_progress')
        .select('time_spent_seconds, session_start_ms')
        .eq('user_id', userId)
        .single();

      if (fetchError) throw fetchError;

      const now = Date.now();
      const sessionStart = currentData.session_start_ms || now;
      const elapsedSeconds = Math.floor((now - sessionStart) / 1000);
      const newTotal = (currentData.time_spent_seconds || 0) + elapsedSeconds;

      const { error: updateError } = await supabase
        .from('dsa_user_progress')
        .update({
          time_spent_seconds: newTotal,
          session_start_ms: now, // reset for the next interval
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      return await this.getProgress(userId);
    } catch (error) {
      console.error('Error updating time spent:', error);
      throw error;
    }
  }

  // Reset progress
  static async reset(userId = 'user_001') {
    try {
      const { error } = await supabase
        .from('dsa_user_progress')
        .update({
          solved_problems: [],
          streak_current: 0,
          last_solved_date: null,
          time_spent_seconds: 0,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      if (error) throw error;

      return await this.getProgress(userId);
    } catch (error) {
      console.error('Error resetting progress:', error);
      throw error;
    }
  }

  // Calculate completion percentage
  static calculateCompletionPercentage(solvedProblems) {
    const solved = solvedProblems.length;
    const total = 75;
    return Math.round((solved / total) * 100);
  }

  // Calculate streak
  static calculateStreak(currentStreak, lastSolvedDate) {
    const today = new Date().toDateString();

    if (!lastSolvedDate) {
      // First problem solved
      return {
        current: 1,
        lastSolvedDate: today,
      };
    }

    if (lastSolvedDate === today) {
      // Same day, no change
      return {
        current: currentStreak,
        lastSolvedDate: today,
      };
    }

    const lastDate = new Date(lastSolvedDate);
    const currentDate = new Date(today);
    const diffTime = currentDate - lastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day
      return {
        current: currentStreak + 1,
        lastSolvedDate: today,
      };
    } else {
      // Streak broken
      return {
        current: 1,
        lastSolvedDate: today,
      };
    }
  }

  // Format time spent
  static formatTimeSpent(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}.${Math.floor((minutes / 60) * 10)}h`;
  }

  // Get solved problems for a specific test
  static async getSolvedProblemsForTest(problemIds, userId = 'user_001') {
    try {
      const progress = await this.getProgress(userId);
      return problemIds.filter(id => progress.solvedProblems.includes(id));
    } catch (error) {
      console.error('Error getting solved problems for test:', error);
      return [];
    }
  }
}

module.exports = UserProgressModel;
