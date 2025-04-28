"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const data = [
  { name: "Protein", value: 98, color: "hsl(var(--chart-1))", percentage: "24%", dailyGoal: "120g", current: "98g" },
  { name: "Carbs", value: 240, color: "hsl(var(--chart-2))", percentage: "59%", dailyGoal: "250g", current: "240g" },
  { name: "Fat", value: 68, color: "hsl(var(--chart-3))", percentage: "17%", dailyGoal: "65g", current: "68g" }
];

const dayOptions = ["Today", "Yesterday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function NutrientDistribution() {
  const [selectedDay, setSelectedDay] = useState("Today");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {selectedDay}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dayOptions.map((day) => (
              <DropdownMenuItem key={day} onClick={() => setSelectedDay(day)}>
                {day}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                dataKey="value"
                label={false}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                }} 
                formatter={(value, name) => [`${value}g`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-3 flex flex-col justify-center">
          {data.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm">{item.percentage}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.current} of {item.dailyGoal}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="pt-2">
        <div className="text-center">
          <div className="text-2xl font-bold">1,876 kcal</div>
          <p className="text-sm text-muted-foreground">Total calorie intake</p>
        </div>
      </div>
    </div>
  );
}