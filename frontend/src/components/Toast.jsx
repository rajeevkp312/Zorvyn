import { useEffect, useState } from 'react'

export default function Toast({ message, open, onClose, duration = 2500 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!open) {
      setVisible(false)
      return
    }

    setVisible(true)
    const t = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(t)
  }, [open, duration, onClose])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-lg dark:border-emerald-900/40 dark:bg-emerald-950/80 dark:text-emerald-200">
        {message}
      </div>
    </div>
  )
}
