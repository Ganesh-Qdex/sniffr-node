package com.example.taskmanager

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.taskmanager.adapter.TaskAdapter
import com.example.taskmanager.data.Priority
import com.example.taskmanager.data.Task
import com.example.taskmanager.databinding.ActivityMainBinding
import com.example.taskmanager.databinding.DialogTaskBinding
import com.example.taskmanager.viewmodel.TaskViewModel

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var taskViewModel: TaskViewModel
    private lateinit var taskAdapter: TaskAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupRecyclerView()
        setupViewModel()
        setupClickListeners()
        observeData()
    }

    private fun setupRecyclerView() {
        taskAdapter = TaskAdapter(
            onTaskClick = { task -> showTaskDialog(task) },
            onTaskToggle = { task -> taskViewModel.toggleTaskCompletion(task) },
            onTaskDelete = { task -> showDeleteConfirmation(task) }
        )
        
        binding.recyclerViewTasks.apply {
            layoutManager = LinearLayoutManager(this@MainActivity)
            adapter = taskAdapter
        }
    }

    private fun setupViewModel() {
        taskViewModel = ViewModelProvider(this)[TaskViewModel::class.java]
    }

    private fun setupClickListeners() {
        binding.fabAddTask.setOnClickListener {
            showTaskDialog(null)
        }
    }

    private fun observeData() {
        taskViewModel.allTasks.observe(this) { tasks ->
            taskAdapter.updateTasks(tasks)
            binding.textEmptyState.visibility = if (tasks.isEmpty()) View.VISIBLE else View.GONE
        }

        taskViewModel.taskCount.observe(this) { count ->
            binding.textTaskCount.text = "Total: $count"
        }

        taskViewModel.completedCount.observe(this) { count ->
            binding.textCompletedCount.text = "Completed: $count"
        }
    }

    private fun showTaskDialog(task: Task?) {
        val dialogBinding = DialogTaskBinding.inflate(layoutInflater)
        val dialog = AlertDialog.Builder(this)
            .setTitle(if (task == null) "Add New Task" else "Edit Task")
            .setView(dialogBinding.root)
            .setPositiveButton(if (task == null) "Add" else "Update") { _, _ ->
                saveTask(dialogBinding, task)
            }
            .setNegativeButton("Cancel", null)
            .create()

        // Pre-fill form if editing
        task?.let {
            dialogBinding.editTextTitle.setText(it.title)
            dialogBinding.editTextDescription.setText(it.description)
            dialogBinding.spinnerPriority.setSelection(it.priority.ordinal)
        }

        dialog.show()
    }

    private fun saveTask(dialogBinding: DialogTaskBinding, existingTask: Task?) {
        val title = dialogBinding.editTextTitle.text.toString().trim()
        val description = dialogBinding.editTextDescription.text.toString().trim()
        val priority = Priority.values()[dialogBinding.spinnerPriority.selectedItemPosition]

        if (title.isEmpty()) {
            Toast.makeText(this, "Please enter a title", Toast.LENGTH_SHORT).show()
            return
        }

        val task = if (existingTask == null) {
            Task(
                title = title,
                description = description,
                priority = priority
            )
        } else {
            existingTask.copy(
                title = title,
                description = description,
                priority = priority,
                updatedAt = System.currentTimeMillis()
            )
        }

        if (existingTask == null) {
            taskViewModel.insertTask(task)
            Toast.makeText(this, "Task added successfully", Toast.LENGTH_SHORT).show()
        } else {
            taskViewModel.updateTask(task)
            Toast.makeText(this, "Task updated successfully", Toast.LENGTH_SHORT).show()
        }
    }

    private fun showDeleteConfirmation(task: Task) {
        AlertDialog.Builder(this)
            .setTitle("Delete Task")
            .setMessage("Are you sure you want to delete '${task.title}'?")
            .setPositiveButton("Delete") { _, _ ->
                taskViewModel.deleteTask(task)
                Toast.makeText(this, "Task deleted", Toast.LENGTH_SHORT).show()
            }
            .setNegativeButton("Cancel", null)
            .show()
    }
}
