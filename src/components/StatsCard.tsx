import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number
  icon: LucideIcon
  color: 'blue' | 'yellow' | 'orange' | 'green'
}

const colorClasses = {
  blue: 'text-blue-400 bg-blue-500/20 border-blue-500/50',
  yellow: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50',
  orange: 'text-orange-400 bg-orange-500/20 border-orange-500/50',
  green: 'text-green-400 bg-green-500/20 border-green-500/50',
}

export default function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="glass glass-hover rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-8 h-8 ${colorClasses[color]}`} />
        <span className="text-3xl font-bold text-white">{value}</span>
      </div>
      <p className="text-purple-200 text-sm font-medium">{title}</p>
    </div>
  )
}

