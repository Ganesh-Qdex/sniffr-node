# Kotlin Android CRUD Application

A modern Android task management application built with Kotlin, featuring Material Design UI and full CRUD operations using Room database.

## Features

- ✅ **Create** new tasks with title, description, and priority
- 📖 **Read** and view all tasks with Material Design UI
- ✏️ **Update** existing tasks
- 🗑️ **Delete** tasks with confirmation dialogs
- 🎨 **Material Design 3** UI components
- 📱 **Native Android** experience
- 💾 **Room Database** for data persistence
- 🏷️ **Priority System** (High, Medium, Low) with color coding
- ✅ **Task Completion** tracking with checkboxes
- 📊 **Statistics Dashboard** showing task counts
- 🔄 **Real-time Updates** with LiveData

## Technologies Used

- **Kotlin** - Modern Android development language
- **Room Database** - Local SQLite database with type safety
- **Material Design 3** - Modern UI components
- **ViewModel & LiveData** - Architecture components for data management
- **RecyclerView** - Efficient list rendering
- **Data Binding** - Type-safe view binding

## Architecture

The app follows **MVVM (Model-View-ViewModel)** architecture:

- **Model**: Room database entities and DAOs
- **View**: Activities and XML layouts
- **ViewModel**: Business logic and data management
- **Repository**: Data access abstraction layer

## Getting Started

### Prerequisites

- Android Studio (latest version)
- Android SDK (API level 24 or higher)
- Kotlin plugin
- Gradle 7.0+

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kotlin-android-app
   ```

2. Open the project in Android Studio

3. Sync the project with Gradle files

4. Run the app on an emulator or physical device

### Building the Project

```bash
./gradlew assembleDebug
```

## Project Structure

```
kotlin-android-app/
├── app/
│   ├── src/main/java/com/example/taskmanager/
│   │   ├── data/
│   │   │   ├── Task.kt              # Task entity
│   │   │   ├── TaskDao.kt           # Data access object
│   │   │   └── TaskDatabase.kt     # Room database
│   │   ├── repository/
│   │   │   └── TaskRepository.kt   # Repository pattern
│   │   ├── viewmodel/
│   │   │   └── TaskViewModel.kt    # ViewModel
│   │   ├── adapter/
│   │   │   └── TaskAdapter.kt      # RecyclerView adapter
│   │   └── MainActivity.kt          # Main activity
│   ├── src/main/res/
│   │   ├── layout/                  # XML layouts
│   │   ├── values/                  # Strings, colors, themes
│   │   └── drawable/                # Icons and graphics
│   └── build.gradle                # App-level dependencies
└── build.gradle                     # Project-level configuration
```

## Key Components

### Data Layer
- **Task Entity**: Defines the task data structure with Room annotations
- **TaskDao**: Database access methods with SQL queries
- **TaskDatabase**: Room database configuration
- **TaskRepository**: Abstraction layer for data access

### Presentation Layer
- **MainActivity**: Main UI controller
- **TaskViewModel**: Business logic and data management
- **TaskAdapter**: RecyclerView adapter for task list
- **Material Design**: Modern UI components

### Features Implemented

1. **Task Management**
   - Add new tasks with form validation
   - Edit existing tasks
   - Delete tasks with confirmation
   - Mark tasks as complete/incomplete

2. **User Interface**
   - Material Design 3 components
   - Responsive layout design
   - Smooth animations and transitions
   - Intuitive user experience

3. **Data Persistence**
   - Room database integration
   - Automatic data synchronization
   - Offline functionality

4. **Task Properties**
   - Title (required)
   - Description (optional)
   - Priority level (High, Medium, Low)
   - Completion status
   - Creation and update timestamps

## Database Schema

```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT NOT NULL,
    isCompleted INTEGER NOT NULL DEFAULT 0,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
);
```

## Customization

### Styling
The app uses Material Design 3 theming. You can customize:
- Colors in `colors.xml`
- Themes in `themes.xml`
- Component styles in `styles.xml`

### Adding New Features
- Add new fields to the Task entity
- Update the database schema
- Modify the UI components
- Add new validation rules

### Priority System
The app includes a three-level priority system:
- **Low**: Green color, low urgency
- **Medium**: Orange color, medium urgency  
- **High**: Red color, high urgency

## Dependencies

### Core Dependencies
- `androidx.core:core-ktx` - Kotlin extensions
- `androidx.appcompat:appcompat` - App compatibility
- `com.google.android.material:material` - Material Design
- `androidx.room:room-runtime` - Room database
- `androidx.lifecycle:lifecycle-viewmodel-ktx` - ViewModel
- `androidx.lifecycle:lifecycle-livedata-ktx` - LiveData

### Development Dependencies
- `androidx.room:room-compiler` - Room annotation processor
- `androidx.test.ext:junit` - Testing framework
- `androidx.test.espresso:espresso-core` - UI testing

## Performance Considerations

- **Room Database**: Efficient SQLite operations
- **RecyclerView**: Optimized list rendering
- **LiveData**: Reactive data updates
- **ViewModel**: Proper lifecycle management
- **Background Threads**: Database operations on background threads

## Testing

### Unit Tests
```bash
./gradlew test
```

### Instrumented Tests
```bash
./gradlew connectedAndroidTest
```

## Building for Production

### Debug Build
```bash
./gradlew assembleDebug
```

### Release Build
```bash
./gradlew assembleRelease
```

## Troubleshooting

### Common Issues

1. **Room Database Issues**: Ensure proper entity annotations
2. **Build Errors**: Clean and rebuild the project
3. **Emulator Issues**: Use a physical device or update emulator
4. **Dependency Conflicts**: Check Gradle dependency versions

### Debug Tips
- Use Android Studio's built-in debugger
- Check Logcat for runtime errors
- Verify database operations with Room Inspector
- Test on different screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support and questions:
- Check the Android documentation
- Review Kotlin documentation
- Open an issue in the repository
