function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function exportTransactionsAsJson(transactions) {
  const data = JSON.stringify(transactions, null, 2)
  downloadBlob('transactions.json', new Blob([data], { type: 'application/json' }))
}

function escapeCsv(value) {
  const str = String(value ?? '')
  if (/[",\n]/.test(str)) return `"${str.replaceAll('"', '""')}"`
  return str
}

export function exportTransactionsAsCsv(transactions) {
  const header = ['id', 'date', 'amount', 'category', 'type']
  const rows = transactions.map((t) => [
    t.id,
    t.date,
    t.amount,
    t.category,
    t.type,
  ])

  const csv = [header, ...rows]
    .map((r) => r.map(escapeCsv).join(','))
    .join('\n')

  downloadBlob('transactions.csv', new Blob([csv], { type: 'text/csv' }))
}
