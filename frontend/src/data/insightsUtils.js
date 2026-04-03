function isValidDate(dateStr) {
  return typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
}

export function formatCurrency(value) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function getYearMonth(dateStr) {
  if (!isValidDate(dateStr)) return null
  return dateStr.slice(0, 7)
}

export function getMostRecentTransaction(transactions) {
  if (!transactions.length) return null

  return [...transactions]
    .filter((t) => isValidDate(t.date))
    .sort((a, b) => b.date.localeCompare(a.date))[0]
}

export function getMonthlyTotals(transactions, yearMonth) {
  const list = transactions.filter((t) => getYearMonth(t.date) === yearMonth)

  const income = list
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount ?? 0), 0)

  const expenses = list
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount ?? 0), 0)

  return { income, expenses, savings: income - expenses, count: list.length }
}

export function getHighestSpendingCategory(transactions, yearMonth) {
  const expenseList = transactions.filter((t) => {
    if (t.type !== 'expense') return false
    if (!yearMonth) return true
    return getYearMonth(t.date) === yearMonth
  })

  if (!expenseList.length) return null

  const totals = expenseList.reduce((acc, t) => {
    const key = t.category ?? 'Uncategorized'
    acc[key] = (acc[key] ?? 0) + Number(t.amount ?? 0)
    return acc
  }, {})

  let best = null
  for (const [category, value] of Object.entries(totals)) {
    if (!best || value > best.total) best = { category, total: value }
  }

  return best
}

export function getTopExpenseCategories(transactions, { yearMonth, limit = 3 } = {}) {
  const expenseList = transactions.filter((t) => {
    if (t.type !== 'expense') return false
    if (!yearMonth) return true
    return getYearMonth(t.date) === yearMonth
  })

  const totals = expenseList.reduce((acc, t) => {
    const key = t.category ?? 'Uncategorized'
    acc[key] = (acc[key] ?? 0) + Number(t.amount ?? 0)
    return acc
  }, {})

  return Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
}

export function getAverageExpense(transactions, yearMonth) {
  const expenseList = transactions.filter((t) => {
    if (t.type !== 'expense') return false
    if (!yearMonth) return true
    return getYearMonth(t.date) === yearMonth
  })

  if (!expenseList.length) return { avg: 0, count: 0 }

  const total = expenseList.reduce((sum, t) => sum + Number(t.amount ?? 0), 0)
  return { avg: total / expenseList.length, count: expenseList.length }
}

export function getDeltaPercent(current, previous) {
  if (previous === 0) {
    if (current === 0) return 0
    return null
  }
  return ((current - previous) / previous) * 100
}

export function buildTopCategoriesChartData(topCategories) {
  return topCategories.map((c) => ({
    category: c.category,
    total: c.total,
  }))
}
