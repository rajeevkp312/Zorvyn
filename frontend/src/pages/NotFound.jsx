import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Page not found
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          The page you’re looking for doesn’t exist.
        </p>
      </div>

      <Link
        to="/"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}
