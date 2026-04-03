function ArrowUp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l7-7 7 7" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12l-7 7-7-7" />
    </svg>
  )
}

export default function DeltaBadge({ value }) {
  if (value === null || value === undefined) {
    return (
      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        N/A
      </span>
    )
  }

  const isUp = value > 0
  const isDown = value < 0

  const cls = isUp
    ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200'
    : isDown
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200'
      : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${cls}`}
    >
      <span className="h-3.5 w-3.5">
        {isUp ? <ArrowUp /> : isDown ? <ArrowDown /> : null}
      </span>
      {Math.abs(value).toFixed(1)}%
    </span>
  )
}
