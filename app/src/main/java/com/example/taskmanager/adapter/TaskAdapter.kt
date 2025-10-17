package com.example.taskmanager.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CheckBox
import android.widget.ImageButton
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.taskmanager.R
import com.example.taskmanager.data.Priority
import com.example.taskmanager.data.Task
import java.text.SimpleDateFormat
import java.util.*

class TaskAdapter(
    private val onTaskClick: (Task) -> Unit,
    private val onTaskToggle: (Task) -> Unit,
    private val onTaskDelete: (Task) -> Unit
) : RecyclerView.Adapter<TaskAdapter.TaskViewHolder>() {

    private var tasks: List<Task> = emptyList()

    fun updateTasks(newTasks: List<Task>) {
        tasks = newTasks
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TaskViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_task, parent, false)
        return TaskViewHolder(view)
    }

    override fun onBindViewHolder(holder: TaskViewHolder, position: Int) {
        holder.bind(tasks[position])
    }

    override fun getItemCount(): Int = tasks.size

    inner class TaskViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val titleTextView: TextView = itemView.findViewById(R.id.textTaskTitle)
        private val descriptionTextView: TextView = itemView.findViewById(R.id.textTaskDescription)
        private val priorityTextView: TextView = itemView.findViewById(R.id.textTaskPriority)
        private val dateTextView: TextView = itemView.findViewById(R.id.textTaskDate)
        private val completedCheckBox: CheckBox = itemView.findViewById(R.id.checkboxCompleted)
        private val editButton: ImageButton = itemView.findViewById(R.id.buttonEdit)
        private val deleteButton: ImageButton = itemView.findViewById(R.id.buttonDelete)

        fun bind(task: Task) {
            titleTextView.text = task.title
            descriptionTextView.text = task.description
            priorityTextView.text = task.priority.displayName
            
            // Set priority color
            val priorityColor = ContextCompat.getColor(itemView.context, task.priority.colorRes)
            priorityTextView.setTextColor(priorityColor)
            
            // Format date
            val dateFormat = SimpleDateFormat("MMM dd, yyyy", Locale.getDefault())
            dateTextView.text = dateFormat.format(Date(task.createdAt))
            
            // Set completion state
            completedCheckBox.isChecked = task.isCompleted
            titleTextView.alpha = if (task.isCompleted) 0.6f else 1.0f
            descriptionTextView.alpha = if (task.isCompleted) 0.6f else 1.0f
            
            // Set click listeners
            itemView.setOnClickListener { onTaskClick(task) }
            completedCheckBox.setOnCheckedChangeListener { _, _ -> onTaskToggle(task) }
            editButton.setOnClickListener { onTaskClick(task) }
            deleteButton.setOnClickListener { onTaskDelete(task) }
        }
    }
}
