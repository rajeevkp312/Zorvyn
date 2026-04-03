import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/AppLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import NotFound from '@/pages/NotFound'

// Lazy load pages for code splitting
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Transactions = lazy(() => import('@/pages/Transactions'))
const Insights = lazy(() => import('@/pages/Insights'))

function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600 dark:border-slate-600 dark:border-t-indigo-400" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route element={<ProtectedRoute allowRoles={['admin']} />}>
            <Route path="/insights" element={<Insights />} />
          </Route>
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
