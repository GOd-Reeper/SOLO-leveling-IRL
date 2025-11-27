import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles, Shadow } from '@/constants/Theme';

export default function HomeScreen() {
  // Placeholder values - would be fetched from state/API in a real app
  const playerLevel = 5;
  const playerRank = 'E';
  const currentXP = 250;
  const maxXP = 500;
  const xpPercentage = (currentXP / maxXP) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.levelContainer}>
          <View style={styles.levelBadge}>
            <ThemedText style={styles.levelText}>{playerLevel}</ThemedText>
          </View>
          <View>
            <ThemedText style={styles.welcomeText}>Welcome, Hunter</ThemedText>
            <ThemedText style={styles.rankText}>Rank {playerRank}</ThemedText>
          </View>
        </View>
      </View>

      {/* XP Bar */}
      <View style={styles.xpBarContainer}>
        <View style={styles.xpBarBackground}>
          <View style={[styles.xpBarFill, { width: `${xpPercentage}%` }]} />
        </View>
        <ThemedText style={styles.xpText}>{currentXP} / {maxXP} XP</ThemedText>
      </View>

      {/* Daily Shadow Chest */}
      <TouchableOpacity style={styles.chestCard}>
        <View style={styles.chestContent}>
          <View style={styles.chestIconContainer}>
            <Feather name="package" size={32} color={Colors.secondary} />
          </View>
          <View style={styles.chestTextContainer}>
            <ThemedText style={styles.chestTitle}>Daily Shadow Chest</ThemedText>
            <ThemedText style={styles.chestSubtitle}>Tap to claim your daily reward</ThemedText>
          </View>
          <Feather name="chevron-right" size={24} color={Colors.primary} />
        </View>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Feather name="plus" size={20} color={Colors.text} />
            <ThemedText style={styles.quickActionText}>Add Quest</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Feather name="check-square" size={20} color={Colors.text} />
            <ThemedText style={styles.quickActionText}>Complete</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Feather name="user" size={20} color={Colors.text} />
            <ThemedText style={styles.quickActionText}>Profile</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Feather name="share-2" size={20} color={Colors.text} />
            <ThemedText style={styles.quickActionText}>Share</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Daily Quests */}
      <View style={styles.questsContainer}>
        <ThemedText style={styles.sectionTitle}>Daily Quests</ThemedText>
        <View style={styles.questCard}>
          <ThemedText style={styles.questText}>Complete your first quest of the day</ThemedText>
          <ThemedText style={styles.questXP}>+50 XP</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.screenContainer,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelBadge: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    ...Shadow.neonGlow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: Colors.text,
    fontSize: 16,
  },
  rankText: {
    color: Colors.ranks.E,
    fontSize: 18,
    fontWeight: 'bold',
  },
  xpBarContainer: {
    marginBottom: 20,
  },
  xpBarBackground: {
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
  xpText: {
    color: Colors.text,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  chestCard: {
    ...CommonStyles.glassCard,
    marginBottom: 20,
    ...Shadow.card,
  },
  chestContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chestIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: `${Colors.secondary}20`,
    borderWidth: 1,
    borderColor: `${Colors.secondary}50`,
  },
  chestTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  chestTitle: {
    ...CommonStyles.subtitleText,
    color: Colors.secondary,
  },
  chestSubtitle: {
    color: Colors.text,
    fontSize: 14,
  },
  sectionTitle: {
    ...CommonStyles.subtitleText,
    marginBottom: 12,
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  quickActionButton: {
    width: '48%',
    padding: 12,
    backgroundColor: `${Colors.primary}20`,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: `${Colors.primary}40`,
  },
  quickActionText: {
    color: Colors.text,
    fontSize: 14,
  },
  questsContainer: {
    marginBottom: 20,
  },
  questCard: {
    ...CommonStyles.glassCard,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questText: {
    color: Colors.text,
    fontSize: 14,
    flex: 1,
  },
  questXP: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
