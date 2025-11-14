import { useState } from 'react'
import { Plus, CheckCircle2, Circle, Clock, BarChart3 } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'
import StatsCard from './StatsCard'

export default function Dashboard() {
  const { getTasksByStatus, getStats } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const stats = getStats()

  const todoTasks = getTasksByStatus('todo')
  const inProgressTasks = getTasksByStatus('in-progress')
  const completedTasks = getTasksByStatus('completed')

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Task Dashboard
          </h1>
          <p className="text-purple-200 text-lg">
            Modern görev yönetimi ile işlerinizi organize edin
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Toplam"
            value={stats.total}
            icon={BarChart3}
            color="blue"
          />
          <StatsCard
            title="Yapılacak"
            value={stats.todo}
            icon={Circle}
            color="yellow"
          />
          <StatsCard
            title="Devam Ediyor"
            value={stats.inProgress}
            icon={Clock}
            color="orange"
          />
          <StatsCard
            title="Tamamlandı"
            value={stats.completed}
            icon={CheckCircle2}
            color="green"
          />
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-6 glass glass-hover px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Yeni Görev Ekle
        </button>

        {/* Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Todo Column */}
          <div className="animate-slide-up">
            <div className="glass rounded-2xl p-6 min-h-[500px]">
              <div className="flex items-center gap-2 mb-4">
                <Circle className="w-5 h-5 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">Yapılacaklar</h2>
                <span className="ml-auto glass px-3 py-1 rounded-full text-sm text-white">
                  {todoTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {todoTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {todoTasks.length === 0 && (
                  <p className="text-purple-300 text-center py-8">
                    Henüz görev yok
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="glass rounded-2xl p-6 min-h-[500px]">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-orange-400" />
                <h2 className="text-xl font-bold text-white">Devam Ediyor</h2>
                <span className="ml-auto glass px-3 py-1 rounded-full text-sm text-white">
                  {inProgressTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {inProgressTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {inProgressTasks.length === 0 && (
                  <p className="text-purple-300 text-center py-8">
                    Henüz görev yok
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Completed Column */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass rounded-2xl p-6 min-h-[500px]">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-bold text-white">Tamamlandı</h2>
                <span className="ml-auto glass px-3 py-1 rounded-full text-sm text-white">
                  {completedTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {completedTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {completedTasks.length === 0 && (
                  <p className="text-purple-300 text-center py-8">
                    Henüz görev yok
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TaskModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

