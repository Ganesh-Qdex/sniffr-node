package com.example.taskmanager.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.taskmanager.data.Task
import com.example.taskmanager.data.TaskDatabase
import com.example.taskmanager.repository.TaskRepository
import kotlinx.coroutines.launch

class TaskViewModel(application: Application) : AndroidViewModel(application) {
    private val repository: TaskRepository
    val allTasks: LiveData<List<Task>>
    
    private val _taskCount = MutableLiveData<Int>()
    val taskCount: LiveData<Int> = _taskCount
    
    private val _completedCount = MutableLiveData<Int>()
    val completedCount: LiveData<Int> = _completedCount

    init {
        val taskDao = TaskDatabase.getDatabase(application).taskDao()
        repository = TaskRepository(taskDao)
        allTasks = repository.getAllTasks()
        
        updateCounts()
    }

    fun insertTask(task: Task) = viewModelScope.launch {
        repository.insertTask(task)
        updateCounts()
    }

    fun updateTask(task: Task) = viewModelScope.launch {
        repository.updateTask(task)
        updateCounts()
    }

    fun deleteTask(task: Task) = viewModelScope.launch {
        repository.deleteTask(task)
        updateCounts()
    }

    fun toggleTaskCompletion(task: Task) = viewModelScope.launch {
        val updatedTask = task.copy(
            isCompleted = !task.isCompleted,
            updatedAt = System.currentTimeMillis()
        )
        repository.updateTask(updatedTask)
        updateCounts()
    }

    private fun updateCounts() = viewModelScope.launch {
        _taskCount.value = repository.getTaskCount()
        _completedCount.value = repository.getCompletedTaskCount()
    }
}
