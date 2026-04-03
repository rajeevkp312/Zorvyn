export function normalizeTransactionType(type) {
  return type === 'income' || type === 'expense' ? type : 'expense'
}

export function matchesSearch(transaction, query) {
  if (!query) return true
  const q = query.trim().toLowerCase()
  if (!q) return true

  return (
    String(transaction.category ?? '').toLowerCase().includes(q) ||
    String(transaction.type ?? '').toLowerCase().includes(q)
  )
}

export function filterTransactions(transactions, { query, typeFilter }) {
  const normalizedTypeFilter =
    typeFilter === 'income' || typeFilter === 'expense' ? typeFilter : 'all'

  return transactions.filter((t) => {
    const type = normalizeTransactionType(t.type)
    if (normalizedTypeFilter !== 'all' && type !== normalizedTypeFilter) return false

    return matchesSearch(t, query)
  })
}

export function sortTransactions(transactions, { sortKey, sortDir }) {
  const dir = sortDir === 'asc' ? 1 : -1

  const sorted = [...transactions].sort((a, b) => {
    if (sortKey === 'amount') {
      const av = Number(a.amount ?? 0)
      const bv = Number(b.amount ?? 0)
      return (av - bv) * dir
    }

    if (sortKey === 'date') {
      const av = String(a.date ?? '')
      const bv = String(b.date ?? '')
      return av.localeCompare(bv) * dir
    }

    return 0
  })

  return sorted
}
