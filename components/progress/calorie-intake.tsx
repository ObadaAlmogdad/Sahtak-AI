"use client";

import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

const data = [
  { day: "Mon", calories: 1780, goal: 2000 },
  { day: "Tue", calories: 1850, goal: 2000 },
  { day: "Wed", calories: 1920, goal: 2000 },
  { day: "Thu", calories: 1760, goal: 2000 },
  { day: "Fri", calories: 2100, goal: 2000 },
  { day: "Sat", calories: 2200, goal: 2000 },
  { day: "Sun", calories: 1900, goal: 2000 },
];

export function CalorieIntake() {
  return (
    <div className="space-y-6">
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--muted))" }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
              }} 
              formatter={(value) => [`${value} kcal`, "Calories"]}
            />
            <ReferenceLine y={2000} stroke="hsl(var(--chart-5))" strokeDasharray="3 3" />
            <Bar 
              dataKey="calories" 
              fill="hsl(var(--chart-1))" 
              radius={[4, 4, 0, 0]} 
              barSize={30} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-muted/50 rounded-lg p-4"
        >
          <p className="text-sm text-muted-foreground mb-1">Daily Average</p>
          <p className="text-2xl font-bold">1,876 kcal</p>
          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
            124 calories under goal
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-muted/50 rounded-lg p-4"
        >
          <p className="text-sm text-muted-foreground mb-1">Weekly Total</p>
          <p className="text-2xl font-bold">13,510 kcal</p>
          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
            vs 14,000 kcal goal
          </div>
        </motion.div>
      </div>
    </div>
  );
}