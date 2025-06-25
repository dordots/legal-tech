"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "10-K Annual Reports", value: 8, color: "#3b82f6" },
  { name: "10-Q Quarterly Reports", value: 12, color: "#10b981" },
  { name: "8-K Current Reports", value: 6, color: "#f59e0b" },
  { name: "Proxy Statements", value: 3, color: "#ef4444" },
  { name: "Registration Statements", value: 2, color: "#8b5cf6" },
]

export function DocumentTypeDistribution() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value} documents`, "Count"]} labelStyle={{ color: "#374151" }} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
