"use client";

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Legend
} from "recharts";

const data = [
  {
    time: '6AM',
    calories: 320,
    goal: 2000 / 5,
  },
  {
    time: '9AM',
    calories: 180,
    goal: 2000 / 5,
  },
  {
    time: '12PM',
    calories: 580,
    goal: 2000 / 5,
  },
  {
    time: '3PM',
    calories: 220,
    goal: 2000 / 5,
  },
  {
    time: '6PM',
    calories: 490,
    goal: 2000 / 5,
  },
  {
    time: '9PM',
    calories: 0,
    goal: 2000 / 5,
  },
];

// Add cumulative calories
let cumulativeCalories = 0;
const chartData = data.map(entry => {
  cumulativeCalories += entry.calories;
  return {
    ...entry,
    totalCalories: cumulativeCalories,
  };
});

export function CalorieChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--muted))" }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            domain={[0, 2000]}
            tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            domain={[0, 800]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "0.5rem",
            }} 
          />
          <Legend />
          <ReferenceLine 
            y={2000} 
            yAxisId="left"
            stroke="hsl(var(--chart-5))" 
            strokeDasharray="3 3" 
            label={{ 
              value: "Daily Goal", 
              position: "right", 
              fill: "hsl(var(--chart-5))",
              fontSize: 12
            }}
          />
          <Line
            yAxisId="left"
            name="Total Calories"
            type="monotone"
            dataKey="totalCalories"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            name="Meal Calories"
            type="monotone"
            dataKey="calories"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}