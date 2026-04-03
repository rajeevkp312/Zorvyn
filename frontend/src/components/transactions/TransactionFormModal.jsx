import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

const categories = [
  'Food',
  'Travel',
  'Bills',
  'Salary',
  'Freelance',
  'Shopping',
  'Health',
  'Investment',
]

function isValidIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

export default function TransactionFormModal({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
}) {
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [type, setType] = useState('expense')
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (!open) return

    setTouched(false)
    setDate(initialValues?.date ?? '')
    setAmount(
      initialValues?.amount === undefined ? '' : String(initialValues.amount),
    )
    setCategory(initialValues?.category ?? 'Food')
    setType(initialValues?.type ?? 'expense')
  }, [open, initialValues])

  const errors = useMemo(() => {
    const e = {}

    if (!date || !isValidIsoDate(date)) e.date = 'Please enter a valid date.'

    const amt = Number(amount)
    if (!amount || Number.isNaN(amt) || amt <= 0) {
      e.amount = 'Amount must be a number greater than 0.'
    }

    if (!category || !String(category).trim()) e.category = 'Category is required.'

    if (type !== 'income' && type !== 'expense') e.type = 'Type is required.'

    return e
  }, [date, amount, category, type])

  const canSubmit = Object.keys(errors).length === 0

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
          />

          <motion.div
            className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-950"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {mode === 'edit' ? 'Edit transaction' : 'Add transaction'}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Enter details and save changes.
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Close
              </button>
            </div>

            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                setTouched(true)
                if (!canSubmit) return
                onSubmit({ date, amount: Number(amount), category, type })
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    Date
                  </label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className="mt-1 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  />
                  {touched && errors.date ? (
                    <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">
                      {errors.date}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    Amount
                  </label>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    inputMode="decimal"
                    placeholder="e.g. 2500"
                    className="mt-1 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  />
                  {touched && errors.amount ? (
                    <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">
                      {errors.amount}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {touched && errors.category ? (
                    <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">
                      {errors.category}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  {touched && errors.type ? (
                    <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">
                      {errors.type}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="h-10 rounded-md bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
