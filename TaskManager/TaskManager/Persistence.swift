import CoreData

struct PersistenceController {
    static let shared = PersistenceController()

    static var preview: PersistenceController = {
        let result = PersistenceController(inMemory: true)
        let viewContext = result.container.viewContext
        
        // Create sample data for previews
        let sampleTask1 = Task(context: viewContext)
        sampleTask1.id = UUID()
        sampleTask1.title = "Complete project proposal"
        sampleTask1.taskDescription = "Write and submit the project proposal for the new feature"
        sampleTask1.priority = .high
        sampleTask1.isCompleted = false
        sampleTask1.createdAt = Date()
        sampleTask1.updatedAt = Date()
        
        let sampleTask2 = Task(context: viewContext)
        sampleTask2.id = UUID()
        sampleTask2.title = "Review code changes"
        sampleTask2.taskDescription = "Review the latest pull requests and provide feedback"
        sampleTask2.priority = .medium
        sampleTask2.isCompleted = true
        sampleTask2.createdAt = Date().addingTimeInterval(-86400)
        sampleTask2.updatedAt = Date()
        
        let sampleTask3 = Task(context: viewContext)
        sampleTask3.id = UUID()
        sampleTask3.title = "Update documentation"
        sampleTask3.taskDescription = "Update the API documentation with new endpoints"
        sampleTask3.priority = .low
        sampleTask3.isCompleted = false
        sampleTask3.createdAt = Date().addingTimeInterval(-172800)
        sampleTask3.updatedAt = Date().addingTimeInterval(-172800)
        
        do {
            try viewContext.save()
        } catch {
            let nsError = error as NSError
            fatalError("Unresolved error \(nsError), \(nsError.userInfo)")
        }
        return result
    }()

    let container: NSPersistentContainer

    init(inMemory: Bool = false) {
        container = NSPersistentContainer(name: "TaskManager")
        if inMemory {
            container.persistentStoreDescriptions.first!.url = URL(fileURLWithPath: "/dev/null")
        }
        container.loadPersistentStores(completionHandler: { (storeDescription, error) in
            if let error = error as NSError? {
                fatalError("Unresolved error \(error), \(error.userInfo)")
            }
        })
        container.viewContext.automaticallyMergesChangesFromParent = true
    }
}
