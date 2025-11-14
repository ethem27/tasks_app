import { Task } from '../types/task'
import { useTasks } from '../context/TaskContext'
import { Trash2, ChevronRight, ChevronLeft } from 'lucide-react'

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const { updateTaskStatus, deleteTask } = useTasks()

  const priorityColors = {
    low: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    high: 'bg-red-500/20 text-red-300 border-red-500/50',
  }

  const getNextStatus = (): Task['status'] | null => {
    if (task.status === 'todo') return 'in-progress'
    if (task.status === 'in-progress') return 'completed'
    return null
  }

  const getPrevStatus = (): Task['status'] | null => {
    if (task.status === 'completed') return 'in-progress'
    if (task.status === 'in-progress') return 'todo'
    return null
  }

  const handleMove = (direction: 'next' | 'prev') => {
    const newStatus = direction === 'next' ? getNextStatus() : getPrevStatus()
    if (newStatus) {
      updateTaskStatus(task.id, newStatus)
    }
  }

  return (
    <div className="glass glass-hover rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-white font-semibold text-lg flex-1">
          {task.title}
        </h3>
        <button
          onClick={() => deleteTask(task.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-purple-200 text-sm mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${priorityColors[task.priority]}`}>
          {task.priority === 'low' && 'Düşük'}
          {task.priority === 'medium' && 'Orta'}
          {task.priority === 'high' && 'Yüksek'}
        </span>

        <div className="flex gap-1">
          {task.status !== 'todo' && (
            <button
              onClick={() => handleMove('prev')}
              className="p-1.5 rounded-lg glass hover:bg-white/20 transition-colors"
              title="Geri taşı"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
          )}
          {task.status !== 'completed' && (
            <button
              onClick={() => handleMove('next')}
              className="p-1.5 rounded-lg glass hover:bg-white/20 transition-colors"
              title="İleri taşı"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

