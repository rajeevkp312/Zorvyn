import { useMemo } from 'react'
import DeltaBadge from '@/components/insights/DeltaBadge'
import InsightCard from '@/components/insights/InsightCard'
import TopCategoriesBarChart from '@/components/insights/TopCategoriesBarChart'
import {
  buildTopCategoriesChartData,
  formatCurrency,
  getAverageExpense,
  getDeltaPercent,
  getHighestSpendingCategory,
  getMonthlyTotals,
  getMostRecentTransaction,
  getTopExpenseCategories,
  getYearMonth,
} from '@/data/insightsUtils'
import { useAppStore } from '@/store/useAppStore'

function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(d)
}

function getPreviousYearMonth(ym) {
  if (!ym) return null
  const [y, m] = ym.split('-').map((v) => Number(v))
  if (!y || !m) return null
  const d = new Date(y, m - 1, 1)
  d.setMonth(d.getMonth() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export default function Insights() {
  const transactions = useAppStore((s) => s.transactions)

  const hasData = transactions.length > 0

  const derived = useMemo(() => {
    const recent = getMostRecentTransaction(transactions)
    const currentYm = recent ? getYearMonth(recent.date) : null
    const prevYm = getPreviousYearMonth(currentYm)

    const current = currentYm ? getMonthlyTotals(transactions, currentYm) : null
    const previous = prevYm ? getMonthlyTotals(transactions, prevYm) : null

    const highestCategory = getHighestSpendingCategory(transactions, currentYm)
    const avgExpense = getAverageExpense(transactions, currentYm)
    const top3 = getTopExpenseCategories(transactions, { yearMonth: currentYm, limit: 3 })

    const incomeDelta = getDeltaPercent(current?.income ?? 0, previous?.income ?? 0)
    const expenseDelta = getDeltaPercent(current?.expenses ?? 0, previous?.expenses ?? 0)

    return {
      recent,
      currentYm,
      prevYm,
      current,
      previous,
      highestCategory,
      avgExpense,
      top3,
      incomeDelta,
      expenseDelta,
      topChart: buildTopCategoriesChartData(top3),
    }
  }, [transactions])

  const savings = derived.current?.savings ?? 0
  const savedMessage =
    savings >= 0
      ? `You saved ${formatCurrency(savings)} this month.`
      : `Your expenses exceeded income by ${formatCurrency(Math.abs(savings))}.`

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Insights
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Analytics generated from your transactions
        </p>
      </div>

      {!hasData ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
          No transactions available. Add transactions to see insights.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <InsightCard
              title="Highest spending category"
              value={
                derived.highestCategory
                  ? derived.highestCategory.category
                  : 'No expenses'
              }
              subtitle={
                derived.highestCategory
                  ? `${formatCurrency(derived.highestCategory.total)} this month`
                  : 'Add expense transactions to compute this insight'
              }
              accent="indigo"
            />

            <InsightCard
              title="Monthly expenses"
              value={formatCurrency(derived.current?.expenses ?? 0)}
              subtitle={
                derived.prevYm
                  ? `Compared to ${derived.prevYm}`
                  : 'Previous month not available'
              }
              accent="rose"
              right={<DeltaBadge value={derived.expenseDelta} />}
            />

            <InsightCard
              title="Monthly income"
              value={formatCurrency(derived.current?.income ?? 0)}
              subtitle={
                derived.prevYm
                  ? `Compared to ${derived.prevYm}`
                  : 'Previous month not available'
              }
              accent="emerald"
              right={<DeltaBadge value={derived.incomeDelta} />}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TopCategoriesBarChart data={derived.topChart} />
            </div>
            <div className="space-y-4">
              <InsightCard
                title="Savings"
                value={formatCurrency(savings)}
                subtitle={savedMessage}
                accent={savings >= 0 ? 'emerald' : 'rose'}
              />

              <InsightCard
                title="Most recent transaction"
                value={
                  derived.recent
                    ? `${derived.recent.category} • ${
                        derived.recent.type === 'income' ? '+' : '-'
                      }${formatCurrency(derived.recent.amount)}`
                    : '—'
                }
                subtitle={derived.recent ? formatDate(derived.recent.date) : ''}
              />

              <InsightCard
                title="Average expense"
                value={formatCurrency(derived.avgExpense.avg)}
                subtitle={
                  derived.avgExpense.count
                    ? `Based on ${derived.avgExpense.count} expense transactions`
                    : 'No expense transactions this month'
                }
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Top 3 expense categories
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {derived.top3.length ? (
                derived.top3.map((c) => (
                  <div
                    key={c.category}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {c.category}
                    </div>
                    <div className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(c.total)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  No expense categories available.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
