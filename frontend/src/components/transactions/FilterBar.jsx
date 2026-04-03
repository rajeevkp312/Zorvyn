function SearchIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  )
}

function SortIcon({ className = '' }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 15l-4 4-4-4" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function FilterBar({
  query,
  onQueryChange,
  typeFilter,
  onTypeFilterChange,
  sortKey,
  onSortKeyChange,
  sortDir,
  onToggleSortDir,
  right,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Search + Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {/* Search Input with Icon */}
          <div className="relative flex-1 sm:max-w-xs">
            <label className="sr-only" htmlFor="txn-search">
              Search
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-slate-500">
              <SearchIcon />
            </div>
            <input
              id="txn-search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by category or type..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
            />
          </div>

          {/* Divider */}
          <div className="hidden h-6 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

          {/* Filter Group */}
          <div className="flex items-center gap-2">
            {/* Type Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 dark:text-slate-500">
                <FilterIcon />
              </span>
              <label className="sr-only" htmlFor="txn-type">
                Type
              </label>
              <select
                id="txn-type"
                value={typeFilter}
                onChange={(e) => onTypeFilterChange(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-2.5 pr-8 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Sort Key */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 dark:text-slate-500">
                <SortIcon />
              </span>
              <label className="sr-only" htmlFor="txn-sort">
                Sort by
              </label>
              <select
                id="txn-sort"
                value={sortKey}
                onChange={(e) => onSortKeyChange(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-2.5 pr-8 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>

            {/* Sort Direction Toggle */}
            <button
              type="button"
              onClick={onToggleSortDir}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:border-indigo-400"
              title={`Sort direction: ${sortDir}`}
            >
              <SortIcon className={sortDir === 'asc' ? 'rotate-180' : ''} />
              <span className="hidden sm:inline">{sortDir === 'asc' ? 'Oldest' : 'Newest'}</span>
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        {right ? (
          <div className="flex items-center gap-2 border-t border-slate-200 pt-3 dark:border-slate-700 lg:border-t-0 lg:pt-0">
            {right}
          </div>
        ) : null}
      </div>
    </div>
  )
}
