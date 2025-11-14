export interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'completed'
  createdAt: Date
  completedAt?: Date
}

export type TaskStatus = Task['status']
export type TaskPriority = Task['priority']

