import { createContext, useContext, useMemo, useState } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const value = useMemo(
    () => ({
      isMobileSidebarOpen,
      openMobileSidebar: () => setIsMobileSidebarOpen(true),
      closeMobileSidebar: () => setIsMobileSidebarOpen(false),
      toggleMobileSidebar: () => setIsMobileSidebarOpen((v) => !v),
    }),
    [isMobileSidebarOpen],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}
