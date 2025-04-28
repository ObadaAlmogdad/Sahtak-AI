"use client";

import { useEffect, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Protein", value: 82, color: "hsl(var(--chart-1))" },
  { name: "Carbs", value: 96, color: "hsl(var(--chart-2))" },
  { name: "Fat", value: 105, color: "hsl(var(--chart-3))" },
];

export function NutrientProgressCircle() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
            labelLine={false}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend 
            verticalAlign="bottom"
            iconType="circle"
            layout="horizontal"
            formatter={(value, entry, index) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}