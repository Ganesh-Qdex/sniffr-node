package com.example.taskmanager.data

import android.os.Parcelable
import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.parcelize.Parcelize

@Entity(tableName = "tasks")
@Parcelize
data class Task(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val description: String,
    val priority: Priority,
    val isCompleted: Boolean = false,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis()
) : Parcelable

enum class Priority(val displayName: String, val colorRes: Int) {
    LOW("Low", android.R.color.holo_green_light),
    MEDIUM("Medium", android.R.color.holo_orange_light),
    HIGH("High", android.R.color.holo_red_light)
}
