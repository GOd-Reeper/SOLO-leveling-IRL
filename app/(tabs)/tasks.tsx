import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { TaskItem } from '@/components/ui/TaskItem';
import { Colors } from '@/constants/Colors';
import { CommonStyles } from '@/constants/Theme';
import { Task } from '@/constants/Models';
import { router } from 'expo-router';

// Sample tasks data
const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Complete 30 minutes of cardio',
    description: 'Run, cycle, or use elliptical machine',
    xpReward: 40,
    completed: false,
    priority: 'high',
    type: 'strength',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Read a chapter of a book',
    description: 'Focus on technical or educational content',
    xpReward: 30,
    completed: false,
    priority: 'medium',
    type: 'study',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Practice presentation skills',
    description: 'Record a 2-minute speech and review it',
    xpReward: 35,
    completed: false,
    priority: 'medium',
    type: 'social',
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Meditate for 10 minutes',
    description: 'Use a guided meditation app',
    xpReward: 25,
    completed: true,
    priority: 'low',
    type: 'discipline',
    createdAt: new Date(),
    completedAt: new Date(),
  },
];

type FilterType = 'all' | 'active' | 'completed';

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [filter, setFilter] = useState<FilterType>('all');
  const [refreshKey, setRefreshKey] = useState(0); // To force re-render and restart animations
  
  // Animations
  const fabScaleAnim = useRef(new Animated.Value(1)).current;
  const fabRotateAnim = useRef(new Animated.Value(0)).current;
  const fabPositionAnim = useRef(new Animated.Value(0)).current;
  const headerFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate header on mount
    Animated.timing(headerFadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
    
    // Floating action button entrance animation
    Animated.sequence([
      Animated.delay(600),
      Animated.spring(fabPositionAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const filteredTasks = filter === 'all' 
    ? tasks 
    : filter === 'completed' 
      ? tasks.filter(task => task.completed) 
      : tasks.filter(task => !task.completed);

  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { 
              ...task, 
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined
            } 
          : task
      )
    );
  };
  
  const handleAddTask = () => {
    // Animate FAB when pressed
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fabScaleAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fabRotateAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fabScaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/add-task');
    });
  };
  
  const switchFilter = (newFilter: FilterType) => {
    if (filter !== newFilter) {
      setFilter(newFilter);
      // Reset animations by changing the key
      setRefreshKey(prev => prev + 1);
    }
  };

  // Animation interpolations
  const fabRotation = fabRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });
  
  const fabTranslateY = fabPositionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });
  
  const { width } = Dimensions.get('window');
  const tabBarWidth = width / 3 - 20;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: headerFadeAnim }]}>
        <ThemedText style={styles.title}>Tasks & Quests</ThemedText>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={18} color={Colors.text} />
          <ThemedText style={styles.filterText}>Filter</ThemedText>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.filterTabsContainer}>
        <View style={styles.filterTabs}>
          <TouchableOpacity 
            style={[styles.filterTab, filter === 'all' && styles.activeFilterTab]} 
            onPress={() => switchFilter('all')}
          >
            <ThemedText style={[styles.filterTabText, filter === 'all' && styles.activeFilterTabText]}>All</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterTab, filter === 'active' && styles.activeFilterTab]} 
            onPress={() => switchFilter('active')}
          >
            <ThemedText style={[styles.filterTabText, filter === 'active' && styles.activeFilterTabText]}>Active</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterTab, filter === 'completed' && styles.activeFilterTab]} 
            onPress={() => switchFilter('completed')}
          >
            <ThemedText style={[styles.filterTabText, filter === 'completed' && styles.activeFilterTabText]}>Completed</ThemedText>
          </TouchableOpacity>
        </View>
        
        {/* Animated indicator */}
        <Animated.View 
          style={[
            styles.tabIndicator, 
            { 
              width: tabBarWidth,
              transform: [
                { translateX: filter === 'active' ? tabBarWidth : filter === 'completed' ? tabBarWidth * 2 : 0 }
              ] 
            }
          ]} 
        />
      </View>

      <FlatList
        key={refreshKey} // Force re-render when filter changes
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <TaskItem
            {...item}
            index={index} // Pass index for staggered animation
            onPress={() => {}}
            onComplete={() => toggleTaskCompletion(item.id)}
          />
        )}
        style={styles.taskList}
        showsVerticalScrollIndicator={false}
      />

      <Animated.View 
        style={[
          styles.addButtonContainer,
          {
            transform: [
              { scale: fabScaleAnim },
              { translateY: fabTranslateY },
            ]
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddTask}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ rotate: fabRotation }] }}>
            <Feather name="plus" size={24} color={Colors.text} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.screenContainer,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    ...CommonStyles.titleText,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  filterText: {
    color: Colors.text,
    fontSize: 14,
  },
  filterTabsContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  filterTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  activeFilterTab: {
    // Now using the animated indicator below
  },
  tabIndicator: {
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 3,
    position: 'absolute',
    bottom: -4,
    left: 0,
  },
  filterTabText: {
    color: Colors.text,
    fontSize: 14,
  },
  activeFilterTabText: {
    fontWeight: '600',
  },
  taskList: {
    flex: 1,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
}); 