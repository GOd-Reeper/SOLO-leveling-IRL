// Task Types and Interfaces
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskType = 'study' | 'strength' | 'social' | 'discipline';
export type TaskStatus = 'active' | 'completed' | 'failed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  xpReward: number;
  completed: boolean;
  priority: TaskPriority;
  type: TaskType;
  dueDate?: Date;
  createdAt: Date;
  completedAt?: Date;
  repeating?: boolean;
  repeatPattern?: 'daily' | 'weekly' | 'monthly';
  sharedFrom?: string; // URL or source of shared content
}

// User Profile Types and Interfaces
export type UserRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'S+';

export interface UserStats {
  strength: number;
  intelligence: number;
  charisma: number;
  discipline: number;
}

export interface UserProfile {
  id: string;
  name: string;
  level: number;
  currentXP: number;
  maxXP: number;
  rank: UserRank;
  stats: UserStats;
  joinedDate: Date;
  titles: string[];
  achievements: Achievement[];
  dailyGoal: number; // Number of quests per day
  streakDays: number;
  lastLoginDate: Date;
}

// Achievement System
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

// Reward System
export type RewardType = 'xp' | 'title' | 'badge' | 'avatar_item';

export interface Reward {
  id: string;
  type: RewardType;
  value: number | string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

// Daily Shadow Chest
export interface DailyShadowChest {
  available: boolean;
  lastClaimed: Date;
  rewards: Reward[];
} 