"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "10-K Reports", value: 8, color: "#0f172a" },
  { name: "10-Q Reports", value: 6, color: "#1e40af" },
  { name: "8-K Reports", value: 4, color: "#3b82f6" },
  { name: "Contracts", value: 3, color: "#60a5fa" },
  { name: "Compliance", value: 2, color: "#93c5fd" },
  { name: "Legal Memos", value: 1, color: "#bfdbfe" },
]

export function DocumentTypeDistribution() {
  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          "10-K Reports": {
            label: "10-K Reports",
            color: "#0f172a",
          },
          "10-Q Reports": {
            label: "10-Q Reports",
            color: "#1e40af",
          },
          "8-K Reports": {
            label: "8-K Reports",
            color: "#3b82f6",
          },
          Contracts: {
            label: "Contracts",
            color: "#60a5fa",
          },
          Compliance: {
            label: "Compliance",
            color: "#93c5fd",
          },
          "Legal Memos": {
            label: "Legal Memos",
            color: "#bfdbfe",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
