import BalanceTrendChart from '@/components/charts/BalanceTrendChart'
import CategoryBreakdownChart from '@/components/charts/CategoryBreakdownChart'
import SummaryCard from '@/components/SummaryCard'
import { useAppStore } from '@/store/useAppStore'

function formatCurrency(value) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2Zm0 0h-6a2 2 0 0 0 0 4h6"
      />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l7-7 7 7" />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12l-7 7-7-7" />
    </svg>
  )
}

function buildBalanceSeries(items) {
  const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date))
  let balance = 0

  const formatter = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: '2-digit',
  })

  return sorted.map((t) => {
    balance += t.type === 'income' ? t.amount : -t.amount
    const dateObj = new Date(`${t.date}T00:00:00`)

    return {
      date: t.date,
      dateLabel: formatter.format(dateObj),
      balance,
    }
  })
}

function buildCategoryBreakdown(items) {
  const expenseTotals = items
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount
      return acc
    }, {})

  return Object.entries(expenseTotals)
    .map(([category, value]) => ({ category, value }))
    .sort((a, b) => b.value - a.value)
}

export default function Dashboard() {
  const txns = useAppStore((s) => s.transactions)

  const totalIncome = txns
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = txns
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const balanceSeries = buildBalanceSeries(txns)
  const categoryData = buildCategoryBreakdown(txns)

  const hasData = txns.length > 0

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Summary and trends based on mock transactions
          </p>
        </div>
      </div>

      {!hasData ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
          No transactions available. Add entries to see summaries and charts.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <SummaryCard
              title="Total Balance"
              value={formatCurrency(balance)}
              subtitle="Income minus expenses"
              icon={<WalletIcon />}
              tone="default"
            />
            <SummaryCard
              title="Total Income"
              value={formatCurrency(totalIncome)}
              subtitle="All income transactions"
              icon={<ArrowUpIcon />}
              tone="positive"
            />
            <SummaryCard
              title="Total Expenses"
              value={formatCurrency(totalExpenses)}
              subtitle="All expense transactions"
              icon={<ArrowDownIcon />}
              tone="negative"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <BalanceTrendChart data={balanceSeries} />
            <CategoryBreakdownChart data={categoryData} />
          </div>
        </>
      )}
    </div>
  )
}
