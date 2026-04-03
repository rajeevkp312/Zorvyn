import IconButton from '@/components/IconButton'
import { useUI } from '@/context/UIContext'
import { useAppStore } from '@/store/useAppStore'

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414m0-11.314L7.05 7.05m9.9 9.9 1.414 1.414"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
      />
    </svg>
  )
}

export default function TopNavbar() {
  const { toggleMobileSidebar } = useUI()
  const role = useAppStore((s) => s.role)
  const setRole = useAppStore((s) => s.setRole)
  const theme = useAppStore((s) => s.theme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="lg:hidden">
        <IconButton ariaLabel="Open menu" onClick={toggleMobileSidebar}>
          <span className="h-5 w-5">
            <MenuIcon />
          </span>
        </IconButton>
      </div>

      <div className="flex flex-1 items-center justify-between">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
            Zorvyn Finance
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Finance dashboard layout
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconButton
            ariaLabel="Toggle theme"
            onClick={toggleTheme}
            className="h-10 w-10"
          >
            <span className="h-5 w-5">{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span>
          </IconButton>

          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-transparent text-xs font-medium outline-none"
              aria-label="Select role"
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}
