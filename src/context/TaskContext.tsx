import { createContext, useContext, useState, ReactNode } from 'react'
import { Task, TaskStatus, TaskPriority } from '../types/task'

interface TaskContextType {
  tasks: Task[]
  addTask: (title: string, description: string, priority: TaskPriority) => void
  updateTaskStatus: (id: string, status: TaskStatus) => void
  deleteTask: (id: string) => void
  getTasksByStatus: (status: TaskStatus) => Task[]
  getStats: () => { total: number; completed: number; inProgress: number; todo: number }
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Proje Planlaması',
      description: 'Yeni proje için detaylı planlama yap',
      priority: 'high',
      status: 'completed',
      createdAt: new Date('2024-01-15'),
      completedAt: new Date('2024-01-16'),
    },
    {
      id: '2',
      title: 'UI Tasarımı',
      description: 'Modern ve kullanıcı dostu arayüz tasarımı',
      priority: 'high',
      status: 'in-progress',
      createdAt: new Date('2024-01-17'),
    },
    {
      id: '3',
      title: 'Kod İncelemesi',
      description: 'Kod kalitesini artırmak için inceleme yap',
      priority: 'medium',
      status: 'todo',
      createdAt: new Date('2024-01-18'),
    },
  ])

  const addTask = (title: string, description: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status: 'todo',
      createdAt: new Date(),
    }
    setTasks([...tasks, newTask])
  }

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          status,
          completedAt: status === 'completed' ? new Date() : undefined,
        }
      }
      return task
    }))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status)
  }

  const getStats = () => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      todo: tasks.filter(t => t.status === 'todo').length,
    }
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTaskStatus,
      deleteTask,
      getTasksByStatus,
      getStats,
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}

