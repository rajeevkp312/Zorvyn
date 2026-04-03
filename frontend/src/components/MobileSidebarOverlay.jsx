import Sidebar from '@/components/Sidebar'
import { useUI } from '@/context/UIContext'

export default function MobileSidebarOverlay() {
  const { isMobileSidebarOpen, closeMobileSidebar } = useUI()

  if (!isMobileSidebarOpen) return null

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={closeMobileSidebar}
        className="absolute inset-0 bg-black/40"
      />

      <div className="absolute inset-y-0 left-0 w-72">
        <Sidebar variant="mobile" />
      </div>
    </div>
  )
}
