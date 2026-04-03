import { useMemo, useState } from 'react'
import FilterBar from '@/components/transactions/FilterBar'
import RoleBadge from '@/components/RoleBadge'
import Toast from '@/components/Toast'
import TransactionFormModal from '@/components/transactions/TransactionFormModal'
import TransactionTable from '@/components/transactions/TransactionTable'
import { exportTransactionsAsCsv, exportTransactionsAsJson } from '@/data/exportUtils'
import { filterTransactions, sortTransactions } from '@/data/transactionUtils'
import { useAppStore } from '@/store/useAppStore'

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  )
}

export default function Transactions() {
  const role = useAppStore((s) => s.role)
  const txns = useAppStore((s) => s.transactions)
  const addTransaction = useAppStore((s) => s.addTransaction)
  const updateTransaction = useAppStore((s) => s.updateTransaction)
  const deleteTransaction = useAppStore((s) => s.deleteTransaction)

  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const canManage = role === 'admin'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState({ open: false, message: '' })

  const hasFilters = query !== '' || typeFilter !== 'all'

  const visibleTransactions = useMemo(() => {
    const filtered = filterTransactions(txns, { query, typeFilter })
    return sortTransactions(filtered, { sortKey, sortDir })
  }, [txns, query, typeFilter, sortKey, sortDir])

  const handleExportJson = () => {
    exportTransactionsAsJson(visibleTransactions)
    setToast({ open: true, message: `Exported ${visibleTransactions.length} transactions as JSON` })
  }

  const handleExportCsv = () => {
    exportTransactionsAsCsv(visibleTransactions)
    setToast({ open: true, message: `Exported ${visibleTransactions.length} transactions as CSV` })
  }

  const rightActions = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleExportJson}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <DownloadIcon />
        <span className="hidden sm:inline">JSON</span>
      </button>
      <button
        type="button"
        onClick={handleExportCsv}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <DownloadIcon />
        <span className="hidden sm:inline">CSV</span>
      </button>

      {canManage ? (
        <button
          type="button"
          onClick={() => {
            setEditing(null)
            setIsModalOpen(true)
          }}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          <PlusIcon />
          <span>Add</span>
        </button>
      ) : (
        <span className="group relative">
          <span className="inline-flex h-9 cursor-not-allowed items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 text-sm font-medium text-slate-400 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
            <PlusIcon />
            <span>Add</span>
          </span>
          <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white shadow-lg group-hover:block dark:bg-slate-700">
            Admin only
          </span>
        </span>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Transactions
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {canManage
              ? 'Manage transactions (add, edit, delete)'
              : 'View transactions (read-only)'}
          </p>
        </div>
        <RoleBadge role={role} />
      </div>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        sortDir={sortDir}
        onToggleSortDir={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
        right={rightActions}
      />

      <TransactionTable
        transactions={visibleTransactions}
        canManage={canManage}
        hasFilters={hasFilters}
        onEdit={(t) => {
          if (!canManage) return
          setEditing(t)
          setIsModalOpen(true)
        }}
        onDelete={(t) => {
          if (!canManage) return
          const ok = window.confirm('Delete this transaction?')
          if (!ok) return
          deleteTransaction(t.id)
        }}
      />

      <TransactionFormModal
        open={isModalOpen}
        mode={editing ? 'edit' : 'add'}
        initialValues={editing}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(values) => {
          if (!canManage) return
          if (editing) {
            updateTransaction(editing.id, values)
          } else {
            addTransaction(values)
          }
          setIsModalOpen(false)
          setEditing(null)
        }}
      />

      <Toast
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: '' })}
      />
    </div>
  )
}
