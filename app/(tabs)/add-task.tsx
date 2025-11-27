import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CommonStyles, Spacing } from '@/constants/Theme';
import { Task, TaskPriority, TaskType } from '@/constants/Models';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [xpReward, setXpReward] = useState('30');
  const [selectedType, setSelectedType] = useState<TaskType>('study');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority>('medium');

  const handleCreateTask = () => {
    // In a real app, this would save to state/database
    const newTask: Partial<Task> = {
      id: Date.now().toString(),
      title,
      description: description.length > 0 ? description : undefined,
      xpReward: parseInt(xpReward, 10) || 30,
      completed: false,
      priority: selectedPriority,
      type: selectedType,
      createdAt: new Date(),
    };
    
    console.log('New task created:', newTask);
    
    // Reset form
    setTitle('');
    setDescription('');
    setXpReward('30');
    setSelectedType('study');
    setSelectedPriority('medium');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ThemedText style={styles.title}>Add New Task</ThemedText>
        
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Task Title</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="What do you want to accomplish?"
            placeholderTextColor={`${Colors.text}50`}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Description (Optional)</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add details about your task..."
            placeholderTextColor={`${Colors.text}50`}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Task Type</ThemedText>
          <View style={styles.typeGrid}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === 'study' && styles.typeButtonSelected,
                { borderColor: Colors.statBars.intelligence }
              ]}
              onPress={() => setSelectedType('study')}
            >
              <Feather
                name="book"
                size={20}
                color={selectedType === 'study' ? Colors.statBars.intelligence : Colors.text}
              />
              <ThemedText style={styles.typeText}>Study</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === 'strength' && styles.typeButtonSelected,
                { borderColor: Colors.statBars.strength }
              ]}
              onPress={() => setSelectedType('strength')}
            >
              <Feather
                name="activity"
                size={20}
                color={selectedType === 'strength' ? Colors.statBars.strength : Colors.text}
              />
              <ThemedText style={styles.typeText}>Strength</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === 'social' && styles.typeButtonSelected,
                { borderColor: Colors.statBars.charisma }
              ]}
              onPress={() => setSelectedType('social')}
            >
              <Feather
                name="users"
                size={20}
                color={selectedType === 'social' ? Colors.statBars.charisma : Colors.text}
              />
              <ThemedText style={styles.typeText}>Social</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === 'discipline' && styles.typeButtonSelected,
                { borderColor: Colors.statBars.discipline }
              ]}
              onPress={() => setSelectedType('discipline')}
            >
              <Feather
                name="clock"
                size={20}
                color={selectedType === 'discipline' ? Colors.statBars.discipline : Colors.text}
              />
              <ThemedText style={styles.typeText}>Discipline</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Priority</ThemedText>
          <View style={styles.priorityContainer}>
            <TouchableOpacity
              style={[
                styles.priorityButton,
                selectedPriority === 'low' && styles.priorityButtonSelected,
                styles.priorityLow
              ]}
              onPress={() => setSelectedPriority('low')}
            >
              <ThemedText style={styles.priorityText}>Low</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priorityButton,
                selectedPriority === 'medium' && styles.priorityButtonSelected,
                styles.priorityMedium
              ]}
              onPress={() => setSelectedPriority('medium')}
            >
              <ThemedText style={styles.priorityText}>Medium</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priorityButton,
                selectedPriority === 'high' && styles.priorityButtonSelected,
                styles.priorityHigh
              ]}
              onPress={() => setSelectedPriority('high')}
            >
              <ThemedText style={styles.priorityText}>High</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>XP Reward</ThemedText>
          <TextInput
            style={[styles.input, styles.xpInput]}
            placeholder="30"
            placeholderTextColor={`${Colors.text}50`}
            value={xpReward}
            onChangeText={setXpReward}
            keyboardType="number-pad"
          />
          <ThemedText style={styles.xpLabel}>XP earned after completion</ThemedText>
        </View>
        
        <TouchableOpacity
          style={[styles.submitButton, !title ? styles.submitButtonDisabled : null]}
          onPress={handleCreateTask}
          disabled={!title}
        >
          <ThemedText style={styles.submitButtonText}>Create Task</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    ...CommonStyles.screenContainer,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  title: {
    ...CommonStyles.titleText,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: `${Colors.primary}10`,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
    borderRadius: 8,
    padding: 12,
    color: Colors.text,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
    marginBottom: 10,
  },
  typeButtonSelected: {
    backgroundColor: `${Colors.primary}20`,
    borderWidth: 2,
  },
  typeText: {
    color: Colors.text,
    fontSize: 14,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
  },
  priorityButtonSelected: {
    borderWidth: 2,
  },
  priorityLow: {
    backgroundColor: `${Colors.primary}10`,
    borderColor: `${Colors.primary}40`,
  },
  priorityMedium: {
    backgroundColor: `${Colors.secondary}10`,
    borderColor: `${Colors.secondary}40`,
  },
  priorityHigh: {
    backgroundColor: '#ff475720',
    borderColor: '#ff475750',
  },
  priorityText: {
    color: Colors.text,
    fontWeight: '500',
  },
  xpInput: {
    width: '30%',
  },
  xpLabel: {
    color: `${Colors.text}80`,
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  submitButtonDisabled: {
    backgroundColor: `${Colors.primary}40`,
  },
  submitButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
}); 