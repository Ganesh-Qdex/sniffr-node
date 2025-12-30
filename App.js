import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  Provider as PaperProvider,
  Appbar,
  FAB,
  Card,
  Title,
  Paragraph,
  Chip,
  Button,
  Portal,
  Modal,
  TextInput,
  Surface,
  Divider,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'react-native-uuid';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '', priority: 'medium' });
    setModalVisible(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
    setModalVisible(true);
  };

  const handleSaveTask = () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    const newTask = {
      id: editingTask ? editingTask.id : uuidv4(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingTask) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id ? newTask : task
      );
      saveTasks(updatedTasks);
    } else {
      saveTasks([newTask, ...tasks]);
    }

    setModalVisible(false);
    setFormData({ title: '', description: '', priority: 'medium' });
  };

  const handleDeleteTask = (id) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id);
            saveTasks(updatedTasks);
          },
        },
      ]
    );
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    );
    saveTasks(updatedTasks);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'alert-circle';
      case 'medium': return 'minus-circle';
      case 'low': return 'check-circle';
      default: return 'circle';
    }
  };

  const renderTask = ({ item }) => (
    <Card style={[styles.taskCard, item.completed && styles.completedTask]}>
      <Card.Content>
        <Title style={[styles.taskTitle, item.completed && styles.completedText]}>
          {item.title}
        </Title>
        {item.description ? (
          <Paragraph style={styles.taskDescription}>
            {item.description}
          </Paragraph>
        ) : null}
        
        <Surface style={styles.taskMeta}>
          <Chip
            icon={getPriorityIcon(item.priority)}
            style={[styles.priorityChip, { backgroundColor: getPriorityColor(item.priority) + '20' }]}
            textStyle={{ color: getPriorityColor(item.priority) }}
          >
            {item.priority.toUpperCase()}
          </Chip>
          
          <Chip
            icon={item.completed ? 'check' : 'clock'}
            style={[
              styles.statusChip,
              { backgroundColor: item.completed ? '#4caf50' + '20' : '#ff9800' + '20' }
            ]}
            textStyle={{ color: item.completed ? '#4caf50' : '#ff9800' }}
          >
            {item.completed ? 'COMPLETED' : 'PENDING'}
          </Chip>
        </Surface>
      </Card.Content>
      
      <Card.Actions style={styles.taskActions}>
        <Button
          mode="outlined"
          icon={item.completed ? 'undo' : 'check'}
          onPress={() => handleToggleComplete(item.id)}
          style={[
            styles.actionButton,
            { borderColor: item.completed ? '#ff9800' : '#4caf50' }
          ]}
          labelStyle={{ color: item.completed ? '#ff9800' : '#4caf50' }}
        >
          {item.completed ? 'Undo' : 'Complete'}
        </Button>
        
        <Button
          mode="outlined"
          icon="pencil"
          onPress={() => handleEditTask(item)}
          style={[styles.actionButton, { borderColor: '#2196f3' }]}
          labelStyle={{ color: '#2196f3' }}
        >
          Edit
        </Button>
        
        <Button
          mode="outlined"
          icon="delete"
          onPress={() => handleDeleteTask(item.id)}
          style={[styles.actionButton, { borderColor: '#f44336' }]}
          labelStyle={{ color: '#f44336' }}
        >
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6200ea" />
        
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Task Manager" subtitle={`${completedTasks}/${totalTasks} completed`} />
        </Appbar.Header>

        {tasks.length === 0 ? (
          <Surface style={styles.emptyState}>
            <Title style={styles.emptyTitle}>No tasks yet</Title>
            <Paragraph style={styles.emptyDescription}>
              Tap the + button to create your first task!
            </Paragraph>
          </Surface>
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={loadTasks} />
            }
          />
        )}

        <FAB
          style={styles.fab}
          icon="plus"
          onPress={handleAddTask}
        />

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <Surface style={styles.modalContent}>
              <Title style={styles.modalTitle}>
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </Title>
              
              <TextInput
                label="Title *"
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                style={styles.input}
                mode="outlined"
              />
              
              <TextInput
                label="Description"
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                style={styles.input}
                mode="outlined"
                multiline
                numberOfLines={3}
              />
              
              <Surface style={styles.priorityContainer}>
                <Paragraph style={styles.priorityLabel}>Priority:</Paragraph>
                {['low', 'medium', 'high'].map(priority => (
                  <Chip
                    key={priority}
                    selected={formData.priority === priority}
                    onPress={() => setFormData({ ...formData, priority })}
                    style={[
                      styles.priorityOption,
                      formData.priority === priority && { backgroundColor: getPriorityColor(priority) + '20' }
                    ]}
                    textStyle={{
                      color: formData.priority === priority ? getPriorityColor(priority) : '#666'
                    }}
                  >
                    {priority.toUpperCase()}
                  </Chip>
                ))}
              </Surface>
              
              <Divider style={styles.divider} />
              
              <Surface style={styles.modalActions}>
                <Button
                  mode="outlined"
                  onPress={() => setModalVisible(false)}
                  style={styles.modalButton}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSaveTask}
                  style={[styles.modalButton, styles.saveButton]}
                >
                  {editingTask ? 'Update' : 'Create'}
                </Button>
              </Surface>
            </Surface>
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ea',
  },
  listContainer: {
    padding: 16,
  },
  taskCard: {
    marginBottom: 16,
    elevation: 2,
  },
  completedTask: {
    backgroundColor: '#e8f5e8',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  taskDescription: {
    marginBottom: 12,
    color: '#666',
  },
  taskMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  priorityChip: {
    marginRight: 8,
  },
  statusChip: {
    marginRight: 8,
  },
  taskActions: {
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ea',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 24,
    borderRadius: 8,
    elevation: 4,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  priorityLabel: {
    marginRight: 12,
    fontWeight: 'bold',
  },
  priorityOption: {
    marginRight: 8,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#6200ea',
  },
});

export default App;
