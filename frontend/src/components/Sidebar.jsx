import SidebarNavItem from '@/components/SidebarNavItem'
import { navigation } from '@/data/navigation'
import { useUI } from '@/context/UIContext'
import { useAppStore } from '@/store/useAppStore'
import logo from '@/assets/logo.png'

export default function Sidebar({ variant = 'desktop' }) {
  const { closeMobileSidebar } = useUI()
  const role = useAppStore((s) => s.role)

  const onNavigate = variant === 'mobile' ? () => closeMobileSidebar() : undefined

  const items = role === 'viewer'
    ? navigation.filter((i) => i.to !== '/insights')
    : navigation

  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex h-16 items-center gap-3 px-4">
        <img src={logo} alt="Zorvyn Finance" className="h-9 w-9 rounded-xl object-cover" />
        <div className="leading-tight">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Zorvyn Finance
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Dashboard</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-3">
        <div className="space-y-1">
          {items.map((item) => (
            <SidebarNavItem
              key={item.to}
              to={item.to}
              label={item.label}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>

      <div className="border-t border-slate-200 p-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <div className="flex items-center justify-between">
          <span>Role</span>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            Toggle
          </span>
        </div>
      </div>
    </aside>
  )
}
