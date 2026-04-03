function formatCurrency(value) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return { main: iso, sub: '' }

  const main = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: '2-digit',
  }).format(d)

  const sub = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
  }).format(d)

  return { main, sub }
}

function TypePill({ type }) {
  const isIncome = type === 'income'

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        isIncome
          ? 'border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-600/50 dark:bg-emerald-900/50 dark:text-emerald-300'
          : 'border-rose-300 bg-rose-100 text-rose-800 dark:border-rose-600/50 dark:bg-rose-900/50 dark:text-rose-300'
      }`}
    >
      {isIncome ? 'Income' : 'Expense'}
    </span>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <div className="text-sm font-medium text-slate-700 dark:text-slate-200">No transactions found</div>
      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Try adjusting your filters or add a new transaction</div>
    </div>
  )
}

function FilterEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div className="text-sm font-medium text-slate-700 dark:text-slate-200">No matching transactions</div>
      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Try a different search term or filter</div>
    </div>
  )
}

export default function TransactionTable({ transactions, canManage, onEdit, onDelete, hasFilters = false }) {
  if (!transactions.length) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        {hasFilters ? <FilterEmptyState /> : <EmptyState />}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50/95 text-xs font-semibold uppercase tracking-wide text-slate-600 backdrop-blur dark:bg-slate-900/95 dark:text-slate-300">
            <tr>
              <th className="whitespace-nowrap px-4 py-3">Date</th>
              <th className="whitespace-nowrap px-4 py-3">Amount</th>
              <th className="whitespace-nowrap px-4 py-3">Category</th>
              <th className="whitespace-nowrap px-4 py-3">Type</th>
              {canManage ? (
                <th className="whitespace-nowrap px-4 py-3 text-right">Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {transactions.map((t) => {
              const isIncome = t.type === 'income'
              const date = formatDate(t.date)
              return (
                <tr key={t.id} className="transition-colors duration-150 hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="text-slate-900 dark:text-slate-100">{date.main}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">{date.sub}</div>
                  </td>
                  <td
                    className={`whitespace-nowrap px-4 py-3 ${
                      isIncome
                        ? 'text-emerald-500 dark:text-emerald-400'
                        : 'text-rose-500 dark:text-rose-400'
                    }`}
                  >
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-semibold">
                        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                      {isIncome ? (
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                      ) : null}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-slate-200">
                    {t.category}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <TypePill type={t.type} />
                  </td>
                  {canManage ? (
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit?.(t)}
                          className="h-8 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm transition hover:scale-105 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete?.(t)}
                          className="h-8 rounded-md border border-rose-200 bg-rose-50 px-3 text-xs font-medium text-rose-700 shadow-sm transition hover:scale-105 hover:bg-rose-100 hover:shadow-rose-200/50 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-900/60"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Showing <span className="font-medium text-slate-700 dark:text-slate-200">{transactions.length}</span>
        {' '}transactions
      </div>
    </div>
  )
}
