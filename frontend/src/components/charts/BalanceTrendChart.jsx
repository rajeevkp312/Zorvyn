import CartesianGrid from 'recharts/es6/cartesian/CartesianGrid'
import Line from 'recharts/es6/cartesian/Line'
import LineChart from 'recharts/es6/charts/LineChart'
import ResponsiveContainer from 'recharts/es6/component/ResponsiveContainer'
import Tooltip from 'recharts/es6/component/Tooltip'
import XAxis from 'recharts/es6/cartesian/XAxis'
import YAxis from 'recharts/es6/cartesian/YAxis'

function formatCurrency(value) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function BalanceTrendChart({ data }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Balance trend
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Cumulative balance over time
          </div>
        </div>
      </div>

      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
            <XAxis
              dataKey="dateLabel"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => formatCurrency(v)}
              width={84}
            />
            <Tooltip
              formatter={(v) => formatCurrency(v)}
              labelStyle={{ fontSize: 12 }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid rgba(148,163,184,0.35)',
              }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
