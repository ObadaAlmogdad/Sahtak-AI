"use client";

import { useState } from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for different periods
const dayData = [
  { time: "6 AM", calories: 320, protein: 12, carbs: 45, fat: 10 },
  { time: "9 AM", calories: 180, protein: 8, carbs: 20, fat: 7 },
  { time: "12 PM", calories: 580, protein: 32, carbs: 65, fat: 18 },
  { time: "3 PM", calories: 220, protein: 10, carbs: 30, fat: 8 },
  { time: "6 PM", calories: 490, protein: 28, carbs: 60, fat: 14 },
  { time: "9 PM", calories: 180, protein: 8, carbs: 25, fat: 6 },
];

const weekData = [
  { day: "Mon", calories: 1780, protein: 92, carbs: 220, fat: 60 },
  { day: "Tue", calories: 1850, protein: 98, carbs: 230, fat: 64 },
  { day: "Wed", calories: 1920, protein: 102, carbs: 245, fat: 68 },
  { day: "Thu", calories: 1760, protein: 94, carbs: 215, fat: 58 },
  { day: "Fri", calories: 2100, protein: 110, carbs: 260, fat: 74 },
  { day: "Sat", calories: 2200, protein: 115, carbs: 270, fat: 78 },
  { day: "Sun", calories: 1900, protein: 100, carbs: 240, fat: 66 },
];

const monthData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}`,
  calories: 1700 + Math.random() * 600,
  protein: 85 + Math.random() * 40,
  carbs: 200 + Math.random() * 80,
  fat: 55 + Math.random() * 30,
}));

const yearData = [
  { month: "Jan", calories: 1850, protein: 95, carbs: 230, fat: 62 },
  { month: "Feb", calories: 1800, protein: 93, carbs: 225, fat: 60 },
  { month: "Mar", calories: 1900, protein: 98, carbs: 235, fat: 64 },
  { month: "Apr", calories: 1950, protein: 102, carbs: 240, fat: 66 },
  { month: "May", calories: 2000, protein: 105, carbs: 250, fat: 68 },
  { month: "Jun", calories: 1980, protein: 104, carbs: 245, fat: 67 },
  { month: "Jul", calories: 1920, protein: 100, carbs: 238, fat: 65 },
  { month: "Aug", calories: 1890, protein: 98, carbs: 235, fat: 64 },
  { month: "Sep", calories: 1950, protein: 102, carbs: 242, fat: 66 },
  { month: "Oct", calories: 1980, protein: 103, carbs: 245, fat: 67 },
  { month: "Nov", calories: 1920, protein: 100, carbs: 238, fat: 65 },
  { month: "Dec", calories: 2100, protein: 108, carbs: 260, fat: 72 },
];

const getDataForPeriod = (period: string) => {
  switch (period) {
    case "day":
      return dayData;
    case "week":
      return weekData;
    case "month":
      return monthData;
    case "year":
      return yearData;
    default:
      return weekData;
  }
};

const getXAxisKey = (period: string) => {
  switch (period) {
    case "day":
      return "time";
    case "week":
      return "day";
    case "month":
      return "date";
    case "year":
      return "month";
    default:
      return "day";
  }
};

interface ProgressChartProps {
  period: string;
}

export function ProgressChart({ period }: ProgressChartProps) {
  const [metric, setMetric] = useState("calories");
  const data = getDataForPeriod(period);
  const xAxisKey = getXAxisKey(period);
  
  const metricColors: Record<string, string> = {
    calories: "hsl(var(--chart-1))",
    protein: "hsl(var(--chart-2))",
    carbs: "hsl(var(--chart-3))",
    fat: "hsl(var(--chart-4))",
  };
  
  const chartData = data.map(entry => ({
    ...entry,
    [metric]: entry[metric as keyof typeof entry],
  }));

  return (
    <div className="space-y-4">
      <Tabs value={metric} onValueChange={setMetric}>
        <TabsList>
          <TabsTrigger value="calories">Calories</TabsTrigger>
          <TabsTrigger value="protein">Protein</TabsTrigger>
          <TabsTrigger value="carbs">Carbs</TabsTrigger>
          <TabsTrigger value="fat">Fat</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`color${metric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={metricColors[metric]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={metricColors[metric]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--muted))" }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                if (metric === "calories") {
                  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
                }
                return value;
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              }} 
              formatter={(value) => [`${value} ${metric === "calories" ? "kcal" : "g"}`, metric]}
            />
            <Area 
              type="monotone" 
              dataKey={metric} 
              stroke={metricColors[metric]} 
              fillOpacity={1}
              fill={`url(#color${metric})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}