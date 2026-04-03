export default function InsightCard({ title, value, subtitle, accent = 'default', right }) {
  const accents = {
    default: 'border-slate-200 dark:border-slate-800',
    indigo: 'border-indigo-200 dark:border-indigo-900/40',
    emerald: 'border-emerald-200 dark:border-emerald-900/40',
    rose: 'border-rose-200 dark:border-rose-900/40',
  }

  return (
    <div
      className={`rounded-xl border bg-white p-5 shadow-sm dark:bg-slate-950 ${
        accents[accent] ?? accents.default
      }`}
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

        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
    </div>
  )
}
