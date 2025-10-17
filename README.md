# iOS Swift CRUD Application

A modern iOS task management application built with Swift and SwiftUI, featuring native iOS design and full CRUD operations using Core Data.

## Features

- ✅ **Create** new tasks with title, description, and priority
- 📖 **Read** and view all tasks with native iOS UI
- ✏️ **Update** existing tasks
- 🗑️ **Delete** tasks with swipe gestures
- 🎨 **SwiftUI** native iOS interface
- 📱 **iOS 17+** support with modern design
- 💾 **Core Data** for data persistence
- 🏷️ **Priority System** (High, Medium, Low) with color coding
- ✅ **Task Completion** tracking with checkboxes
- 📊 **Statistics Dashboard** showing task counts
- 🔄 **Real-time Updates** with Core Data
- 📱 **iPad Support** with adaptive layouts

## Technologies Used

- **Swift 5.0** - Modern iOS development language
- **SwiftUI** - Declarative UI framework
- **Core Data** - Apple's object graph and persistence framework
- **Combine** - Reactive programming framework
- **MVVM Architecture** - Clean architecture pattern

## Architecture

The app follows **MVVM (Model-View-ViewModel)** architecture:

- **Model**: Core Data entities and managed objects
- **View**: SwiftUI views and components
- **ViewModel**: Business logic and data management
- **Persistence**: Core Data stack and context management

## Getting Started

### Prerequisites

- Xcode 15.0 or later
- iOS 17.0 or later
- macOS 14.0 or later (for development)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ios-swift-app
   ```

2. Open the project in Xcode:
   ```bash
   open TaskManager/TaskManager.xcodeproj
   ```

3. Build and run the project (⌘+R)

### Building the Project

1. Select your target device or simulator
2. Press ⌘+R to build and run
3. Or use Product → Run in Xcode

## Project Structure

```
ios-swift-app/
├── TaskManager/
│   ├── TaskManager/
│   │   ├── TaskManagerApp.swift          # App entry point
│   │   ├── ContentView.swift             # Main view
│   │   ├── Task+CoreDataClass.swift      # Core Data model
│   │   ├── Task+CoreDataProperties.swift # Core Data properties
│   │   ├── Persistence.swift            # Core Data stack
│   │   ├── Assets.xcassets/             # App assets
│   │   └── TaskManager.xcdatamodeld/    # Core Data model
│   └── TaskManager.xcodeproj/            # Xcode project
└── README.md
```

## Key Components

### Data Layer
- **Task Entity**: Core Data managed object with properties
- **Persistence Controller**: Core Data stack management
- **Task Priority Enum**: Priority levels with color coding

### Presentation Layer
- **ContentView**: Main app interface
- **TaskRowView**: Individual task display
- **AddTaskView**: Task creation form
- **EditTaskView**: Task editing form
- **StatisticsView**: Task count dashboard

### Features Implemented

1. **Task Management**
   - Add new tasks with form validation
   - Edit existing tasks
   - Delete tasks with swipe gestures
   - Mark tasks as complete/incomplete

2. **User Interface**
   - Native SwiftUI components
   - Adaptive layouts for iPhone and iPad
   - Smooth animations and transitions
   - Intuitive iOS design patterns

3. **Data Persistence**
   - Core Data integration
   - Automatic data synchronization
   - Offline functionality

4. **Task Properties**
   - Title (required)
   - Description (optional)
   - Priority level (High, Medium, Low)
   - Completion status
   - Creation and update timestamps

## Core Data Schema

```swift
Entity: Task
├── id: UUID (Primary Key)
├── title: String (Optional)
├── taskDescription: String (Optional)
├── priority: TaskPriority (Enum)
├── isCompleted: Bool
├── createdAt: Date (Optional)
└── updatedAt: Date (Optional)
```

## Customization

### Styling
The app uses SwiftUI's native styling system. You can customize:
- Colors in the TaskPriority enum
- Layouts in individual views
- Animations in view modifiers

### Adding New Features
- Add new properties to the Task entity
- Update the Core Data model
- Modify the SwiftUI views
- Add new validation rules

### Priority System
The app includes a three-level priority system:
- **Low**: Green color, low urgency
- **Medium**: Orange color, medium urgency  
- **High**: Red color, high urgency

## Dependencies

### Core Frameworks
- `SwiftUI` - UI framework
- `CoreData` - Data persistence
- `Combine` - Reactive programming
- `Foundation` - Core functionality

### Development Tools
- `Xcode` - IDE and build system
- `Swift Package Manager` - Dependency management
- `Core Data Model Editor` - Data modeling

## Performance Considerations

- **Core Data**: Efficient data operations
- **SwiftUI**: Optimized view rendering
- **Lazy Loading**: Efficient list rendering
- **Memory Management**: Automatic reference counting

## Testing

### Unit Tests
```bash
# Run tests in Xcode
⌘+U
```

### UI Tests
```bash
# Run UI tests in Xcode
⌘+U (with UI test target selected)
```

## Building for Production

### Debug Build
1. Select your target device
2. Press ⌘+R to build and run

### Release Build
1. Select "Any iOS Device" as target
2. Product → Archive
3. Distribute App

## Troubleshooting

### Common Issues

1. **Core Data Issues**: Check the data model and entity relationships
2. **Build Errors**: Clean build folder (⌘+Shift+K) and rebuild
3. **Simulator Issues**: Reset simulator or use physical device
4. **Dependency Issues**: Check Swift Package Manager dependencies

### Debug Tips
- Use Xcode's built-in debugger
- Check Console for runtime errors
- Use Core Data debugging tools
- Test on different device sizes

## iOS Features

### Native iOS Design
- **Navigation**: Native navigation patterns
- **Gestures**: Swipe-to-delete functionality
- **Animations**: Smooth transitions and animations
- **Accessibility**: VoiceOver and accessibility support

### Device Support
- **iPhone**: All screen sizes and orientations
- **iPad**: Adaptive layouts and multitasking
- **Apple Watch**: Future expansion possible
- **macOS**: Catalyst compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple devices
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support and questions:
- Check the Apple Developer documentation
- Review SwiftUI documentation
- Open an issue in the repository

## Future Enhancements

- **CloudKit Integration**: Sync across devices
- **Widgets**: Home screen widgets
- **Shortcuts**: Siri integration
- **Apple Watch**: Companion app
- **Dark Mode**: Enhanced theming
- **Notifications**: Task reminders
