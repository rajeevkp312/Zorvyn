import { NavLink } from 'react-router-dom'

export default function SidebarNavItem({ to, label, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition ${
          isActive
            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-200'
            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
        }`
      }
    >
      <span>{label}</span>
    </NavLink>
  )
}
