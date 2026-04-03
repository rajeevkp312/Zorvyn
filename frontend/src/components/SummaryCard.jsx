export default function SummaryCard({ title, value, subtitle, icon, tone = 'default' }) {
  const toneClasses = {
    default:
      'bg-white border-slate-200 dark:bg-slate-950 dark:border-slate-800',
    positive:
      'bg-white border-slate-200 dark:bg-slate-950 dark:border-slate-800',
    negative:
      'bg-white border-slate-200 dark:bg-slate-950 dark:border-slate-800',
  }

  const iconWrapClasses = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200',
    positive:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200',
    negative:
      'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200',
  }

  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${toneClasses[tone] ?? toneClasses.default}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {title}
          </div>
          <div className="mt-2 truncate text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {value}
          </div>
          {subtitle ? (
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </div>
          ) : null}
        </div>

        {icon ? (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              iconWrapClasses[tone] ?? iconWrapClasses.default
            }`}
          >
            <span className="h-5 w-5">{icon}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
