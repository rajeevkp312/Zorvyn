import Bar from 'recharts/es6/cartesian/Bar'
import BarChart from 'recharts/es6/charts/BarChart'
import CartesianGrid from 'recharts/es6/cartesian/CartesianGrid'
import ResponsiveContainer from 'recharts/es6/component/ResponsiveContainer'
import Tooltip from 'recharts/es6/component/Tooltip'
import XAxis from 'recharts/es6/cartesian/XAxis'
import YAxis from 'recharts/es6/cartesian/YAxis'

import { formatCurrency } from '@/data/insightsUtils'

export default function TopCategoriesBarChart({ data }) {
  if (!data?.length) return null

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div>
        <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Top expense categories
        </div>
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Current month (by total spend)
        </div>
      </div>

      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => formatCurrency(v)} width={84} />
            <Tooltip formatter={(v) => formatCurrency(v)} />
            <Bar dataKey="total" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
