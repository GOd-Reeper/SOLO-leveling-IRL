import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles, Shadow } from '@/constants/Theme';
import { UserProfile, UserStats } from '@/constants/Models';

// Mock user data - in a real app this would come from a store/API
const mockUser: UserProfile = {
  id: '1',
  name: 'Shadow Hunter',
  level: 8,
  currentXP: 750,
  maxXP: 1000,
  rank: 'E',
  stats: {
    strength: 28,
    intelligence: 42,
    charisma: 22,
    discipline: 35,
  },
  joinedDate: new Date('2023-01-15'),
  titles: ['Shadow Initiate', 'Book Worm', 'Early Riser'],
  achievements: [
    {
      id: '1',
      title: 'First Quest',
      description: 'Complete your first quest',
      icon: 'award',
      unlocked: true,
      unlockedAt: new Date('2023-01-16'),
    },
    {
      id: '2',
      title: 'Study Master',
      description: 'Complete 10 study quests',
      icon: 'book',
      unlocked: false,
      progress: 6,
      maxProgress: 10,
    },
  ],
  dailyGoal: 5,
  streakDays: 3,
  lastLoginDate: new Date(),
};

export default function ProfileScreen() {
  const xpPercentage = (mockUser.currentXP / mockUser.maxXP) * 100;

  // Helper function to render stat bars
  const renderStatBar = (statName: string, statValue: number, color: string) => {
    const percentage = (statValue / 100) * 100; // Assuming 100 is max
    return (
      <View style={styles.statRow}>
        <ThemedText style={styles.statLabel}>{statName}</ThemedText>
        <View style={styles.statBarContainer}>
          <View style={[styles.statBarFill, { width: `${percentage}%`, backgroundColor: color }]} />
        </View>
        <ThemedText style={styles.statValue}>{statValue}</ThemedText>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Feather name="user" size={40} color={Colors.text} />
            </View>
            <View style={styles.rankBadge}>
              <ThemedText style={styles.rankText}>{mockUser.rank}</ThemedText>
            </View>
          </View>
          <View style={styles.nameContainer}>
            <ThemedText style={styles.nameText}>{mockUser.name}</ThemedText>
            <ThemedText style={styles.levelText}>Level {mockUser.level}</ThemedText>
          </View>
        </View>
      </View>

      {/* XP Progress */}
      <View style={styles.xpContainer}>
        <ThemedText style={styles.xpText}>
          {mockUser.currentXP} / {mockUser.maxXP} XP
        </ThemedText>
        <View style={styles.xpBarContainer}>
          <View style={[styles.xpBarFill, { width: `${xpPercentage}%` }]} />
        </View>
        <ThemedText style={styles.xpToNext}>
          {mockUser.maxXP - mockUser.currentXP} XP to next level
        </ThemedText>
      </View>

      {/* Stats */}
      <View style={styles.statsCard}>
        <ThemedText style={styles.sectionTitle}>Stats</ThemedText>
        {renderStatBar('Strength', mockUser.stats.strength, Colors.statBars.strength)}
        {renderStatBar('Intelligence', mockUser.stats.intelligence, Colors.statBars.intelligence)}
        {renderStatBar('Charisma', mockUser.stats.charisma, Colors.statBars.charisma)}
        {renderStatBar('Discipline', mockUser.stats.discipline, Colors.statBars.discipline)}
      </View>

      {/* Titles */}
      <View style={styles.titlesCard}>
        <ThemedText style={styles.sectionTitle}>Titles</ThemedText>
        <View style={styles.titlesList}>
          {mockUser.titles.map((title, index) => (
            <View key={index} style={styles.titleItem}>
              <Feather name="award" size={16} color={Colors.secondary} />
              <ThemedText style={styles.titleText}>{title}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.achievementsCard}>
        <ThemedText style={styles.sectionTitle}>Achievements</ThemedText>
        {mockUser.achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementItem}>
            <View
              style={[
                styles.achievementIcon,
                achievement.unlocked ? styles.achievementUnlocked : styles.achievementLocked,
              ]}
            >
              <Feather
                name={achievement.icon as any}
                size={20}
                color={achievement.unlocked ? Colors.secondary : Colors.text}
              />
            </View>
            <View style={styles.achievementInfo}>
              <ThemedText style={styles.achievementTitle}>{achievement.title}</ThemedText>
              <ThemedText style={styles.achievementDesc}>{achievement.description}</ThemedText>
              {achievement.progress !== undefined && (
                <View style={styles.achievementProgressBar}>
                  <View
                    style={[
                      styles.achievementProgressFill,
                      {
                        width: `${(achievement.progress / achievement.maxProgress!) * 100}%`,
                      },
                    ]}
                  />
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Streak */}
      <View style={styles.streakCard}>
        <ThemedText style={styles.sectionTitle}>Current Streak</ThemedText>
        <View style={styles.streakInfo}>
          <ThemedText style={styles.streakCount}>{mockUser.streakDays} Days</ThemedText>
          <ThemedText style={styles.streakDesc}>Keep up the good work!</ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.screenContainer,
  },
  header: {
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.primary}30`,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.ranks.E,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  rankText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  nameContainer: {
    marginLeft: 20,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  levelText: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 4,
  },
  xpContainer: {
    marginBottom: 20,
  },
  xpText: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'right',
    marginBottom: 4,
  },
  xpBarContainer: {
    height: 8,
    backgroundColor: `${Colors.primary}30`,
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  xpToNext: {
    fontSize: 12,
    color: `${Colors.text}80`,
    marginTop: 4,
  },
  statsCard: {
    ...CommonStyles.glassCard,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    width: 100,
    fontSize: 14,
    color: Colors.text,
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: `${Colors.primary}20`,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  statBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  statValue: {
    width: 30,
    fontSize: 14,
    color: Colors.text,
    textAlign: 'right',
  },
  titlesCard: {
    ...CommonStyles.glassCard,
    marginBottom: 20,
  },
  titlesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  titleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: `${Colors.secondary}15`,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${Colors.secondary}30`,
  },
  titleText: {
    fontSize: 14,
    color: Colors.text,
  },
  achievementsCard: {
    ...CommonStyles.glassCard,
    marginBottom: 20,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementUnlocked: {
    backgroundColor: `${Colors.secondary}20`,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  achievementLocked: {
    backgroundColor: `${Colors.text}20`,
    borderWidth: 1,
    borderColor: `${Colors.text}40`,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  achievementDesc: {
    fontSize: 14,
    color: `${Colors.text}80`,
    marginTop: 2,
  },
  achievementProgressBar: {
    height: 6,
    backgroundColor: `${Colors.primary}20`,
    borderRadius: 3,
    marginTop: 6,
    overflow: 'hidden',
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  streakCard: {
    ...CommonStyles.glassCard,
    marginBottom: 20,
  },
  streakInfo: {
    alignItems: 'center',
  },
  streakCount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  streakDesc: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 4,
  },
}); 