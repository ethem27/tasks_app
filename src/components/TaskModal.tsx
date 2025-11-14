import { useState } from 'react'
import { X } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import { TaskPriority } from '../types/task'

interface TaskModalProps {
  onClose: () => void
}

export default function TaskModal({ onClose }: TaskModalProps) {
  const { addTask } = useTasks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      addTask(title, description, priority)
      setTitle('')
      setDescription('')
      setPriority('medium')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="glass rounded-2xl p-6 w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Yeni Görev</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Başlık
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg glass border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors"
              placeholder="Görev başlığı..."
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Açıklama
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg glass border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors resize-none"
              placeholder="Görev açıklaması..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Öncelik
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-4 py-2 rounded-lg glass border border-white/20 text-white focus:outline-none focus:border-purple-400 transition-colors"
            >
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg glass border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
            >
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

