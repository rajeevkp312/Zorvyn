export default function RoleBadge({ role }) {
  const isAdmin = role === 'admin'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isAdmin
          ? 'border border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/50 dark:text-indigo-200'
          : 'border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isAdmin ? 'bg-indigo-500' : 'bg-slate-400'
        }`}
      />
      {isAdmin ? 'Admin' : 'Viewer'}
    </span>
  )
}
