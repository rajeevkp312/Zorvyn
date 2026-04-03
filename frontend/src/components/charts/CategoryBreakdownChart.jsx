import Cell from 'recharts/es6/component/Cell'
import Legend from 'recharts/es6/component/Legend'
import Pie from 'recharts/es6/polar/Pie'
import PieChart from 'recharts/es6/charts/PieChart'
import ResponsiveContainer from 'recharts/es6/component/ResponsiveContainer'
import Tooltip from 'recharts/es6/component/Tooltip'

const COLORS = ['#4f46e5', '#06b6d4', '#f97316', '#10b981', '#ef4444', '#a855f7']

function formatCurrency(value) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function CategoryBreakdownChart({ data }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div>
        <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Spending by category
        </div>
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Expenses grouped by category
        </div>
      </div>

      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip formatter={(v) => formatCurrency(v)} />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: 12 }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={3}
            >
              {data.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        Tip: values reflect *expenses only*.
      </div>
    </div>
  )
}
