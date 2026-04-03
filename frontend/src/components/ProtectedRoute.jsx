import { Navigate, Outlet } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'

export default function ProtectedRoute({ allowRoles }) {
  const role = useAppStore((s) => s.role)

  if (Array.isArray(allowRoles) && !allowRoles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
