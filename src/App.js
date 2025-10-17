import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Check, X, Calendar, User } from 'lucide-react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const newTask = {
      id: editingTask ? editingTask.id : Date.now(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate,
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingTask) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? newTask : task
      ));
    } else {
      setTasks(prev => [newTask, ...prev]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    setEditingTask(null);
    setShowModal(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="container">
      <div className="app-header">
        <h1>Task Manager</h1>
        <p>Organize your tasks efficiently</p>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{totalTasks}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{completedTasks}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{totalTasks - completedTasks}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Tasks</h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <Calendar size={48} color="#6c757d" />
            <h3>No tasks yet</h3>
            <p>Create your first task to get started!</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <Plus size={20} />
              Add Your First Task
            </button>
          </div>
        ) : (
          <div className="tasks-list">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <div className="task-header">
                  <div className="task-title">{task.title}</div>
                  <div className="task-meta">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getPriorityColor(task.priority) + '20', color: getPriorityColor(task.priority) }}
                    >
                      {task.priority}
                    </span>
                    <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
                
                {task.description && (
                  <div className="task-description">{task.description}</div>
                )}
                
                <div className="task-footer">
                  <div className="task-dates">
                    <span className="task-date">
                      <Calendar size={16} />
                      Due: {formatDate(task.dueDate)}
                    </span>
                    <span className="task-date">
                      <User size={16} />
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="task-actions">
                    <button
                      className={`btn ${task.completed ? 'btn-secondary' : 'btn-success'}`}
                      onClick={() => handleToggleComplete(task.id)}
                    >
                      {task.completed ? <X size={16} /> : <Check size={16} />}
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEdit(task)}
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h3>
              <button className="close-btn" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter task title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  placeholder="Enter task description"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
