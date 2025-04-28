"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Info, Settings } from "lucide-react";

const nutrients = [
  { 
    name: "Protein", 
    current: 98, 
    goal: 120, 
    unit: "g", 
    percentage: 82,
    color: "bg-[hsl(var(--chart-1))]" 
  },
  { 
    name: "Carbs", 
    current: 240, 
    goal: 250, 
    unit: "g", 
    percentage: 96,
    color: "bg-[hsl(var(--chart-2))]" 
  },
  { 
    name: "Fat", 
    current: 68, 
    goal: 65, 
    unit: "g", 
    percentage: 105,
    color: "bg-[hsl(var(--chart-3))]" 
  },
  { 
    name: "Fiber", 
    current: 22, 
    goal: 35, 
    unit: "g", 
    percentage: 63,
    color: "bg-[hsl(var(--chart-4))]" 
  },
  { 
    name: "Water", 
    current: 1.8, 
    goal: 2.5, 
    unit: "L", 
    percentage: 72,
    color: "bg-[hsl(var(--chart-5))]" 
  }
];

export function NutrientGoals() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Tracking your daily targets</p>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {nutrients.map((nutrient, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-medium">{nutrient.name}</span>
                <Info className="h-3 w-3 text-muted-foreground ml-1 cursor-help" />
              </div>
              <span className="text-sm">
                {nutrient.current}{nutrient.unit} / {nutrient.goal}{nutrient.unit}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className={`h-full rounded-full ${nutrient.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(nutrient.percentage, 100)}%` }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              />
            </div>
            <p className="text-xs text-muted-foreground flex justify-between">
              <span>{nutrient.percentage}% of goal</span>
              {nutrient.percentage > 100 ? (
                <span className="text-amber-500">Over goal</span>
              ) : nutrient.percentage > 80 ? (
                <span className="text-green-500">Good progress</span>
              ) : (
                <span className="text-amber-500">Needs attention</span>
              )}
            </p>
          </motion.div>
        ))}
      </div>
      
      <div className="pt-2">
        <Button variant="outline" className="w-full">
          Adjust Nutritional Goals
        </Button>
      </div>
    </div>
  );
}