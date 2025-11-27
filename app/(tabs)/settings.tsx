import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles } from '@/constants/Theme';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Setting sections with their items
  const sections = [
    {
      title: 'General',
      items: [
        {
          title: 'Dark Mode',
          icon: 'moon',
          type: 'toggle',
          value: darkMode,
          onValueChange: setDarkMode,
        },
        {
          title: 'About',
          icon: 'info',
          type: 'navigate',
          target: 'about',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          title: 'Enable Notifications',
          icon: 'bell',
          type: 'toggle',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          title: 'Daily Quest Reminders',
          icon: 'clock',
          type: 'toggle',
          value: dailyReminders,
          onValueChange: setDailyReminders,
          disabled: !notifications,
        },
      ],
    },
    {
      title: 'Audio',
      items: [
        {
          title: 'Sound Effects',
          icon: 'volume-2',
          type: 'toggle',
          value: soundEffects,
          onValueChange: setSoundEffects,
        },
      ],
    },
    {
      title: 'Data',
      items: [
        {
          title: 'Export Data',
          icon: 'download',
          type: 'action',
          onPress: () => console.log('Export data'),
        },
        {
          title: 'Reset Progress',
          icon: 'refresh-cw',
          type: 'action',
          onPress: () => console.log('Reset progress'),
          textColor: '#ff6b6b',
        },
      ],
    },
  ];

  // Render different types of settings items
  const renderItem = (item: any) => {
    switch (item.type) {
      case 'toggle':
        return (
          <View style={styles.settingItem} key={item.title}>
            <View style={styles.settingLeft}>
              <Feather name={item.icon} size={20} color={Colors.primary} />
              <ThemedText style={[styles.settingTitle, item.disabled && styles.settingDisabled]}>
                {item.title}
              </ThemedText>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: `${Colors.primary}80` }}
              thumbColor={item.value ? Colors.primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={item.onValueChange}
              value={item.value}
              disabled={item.disabled}
            />
          </View>
        );
      case 'navigate':
      case 'action':
        return (
          <TouchableOpacity style={styles.settingItem} key={item.title} onPress={item.onPress}>
            <View style={styles.settingLeft}>
              <Feather name={item.icon} size={20} color={Colors.primary} />
              <ThemedText
                style={[styles.settingTitle, item.textColor && { color: item.textColor }]}
              >
                {item.title}
              </ThemedText>
            </View>
            {item.type === 'navigate' && <Feather name="chevron-right" size={20} color={Colors.text} />}
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.title}>Settings</ThemedText>

      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
          <View style={styles.sectionContent}>
            {section.items.map((item) => renderItem(item))}
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>SOlO-Leveling v1.0</ThemedText>
        <TouchableOpacity>
          <ThemedText style={styles.footerLink}>Terms & Privacy</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.screenContainer,
  },
  title: {
    ...CommonStyles.titleText,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    ...CommonStyles.glassCard,
    padding: 0,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.primary}20`,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: Colors.text,
  },
  settingDisabled: {
    opacity: 0.5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    color: `${Colors.text}70`,
    fontSize: 14,
    marginBottom: 8,
  },
  footerLink: {
    color: Colors.primary,
    fontSize: 14,
  },
}); 