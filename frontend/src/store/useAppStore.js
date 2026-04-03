import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { transactions as seedTransactions } from '@/data/transactions'

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `t-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const useAppStore = create(
  persist(
    (set, get) => ({
      role: 'viewer',
      setRole: (role) =>
        set(() => ({ role: role === 'admin' ? 'admin' : 'viewer' })),

      theme: 'light',
      setTheme: (theme) =>
        set(() => ({ theme: theme === 'dark' ? 'dark' : 'light' })),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      transactions: seedTransactions,

      addTransaction: (payload) => {
        const next = {
          id: generateId(),
          date: payload.date,
          amount: Number(payload.amount),
          category: payload.category,
          type: payload.type,
        }

        set((state) => ({ transactions: [next, ...state.transactions] }))
        return next
      },

      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...updates,
                  amount:
                    updates.amount === undefined
                      ? t.amount
                      : Number(updates.amount),
                }
              : t,
          ),
        }))
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }))
      },

      getTransactionById: (id) => get().transactions.find((t) => t.id === id),
    }),
    {
      name: 'zorvyn-finance',
      version: 1,
      partialize: (state) => ({
        role: state.role,
        theme: state.theme,
        transactions: state.transactions,
      }),
    },
  ),
)
