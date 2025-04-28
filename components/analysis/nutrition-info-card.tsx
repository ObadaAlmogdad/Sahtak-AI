"use client";

import { motion } from "framer-motion";
import { Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for demonstration
const nutritionData = {
  calories: 320,
  macros: {
    protein: { value: 22, unit: "g", percentage: 75 },
    carbs: { value: 30, unit: "g", percentage: 60 },
    fat: { value: 12, unit: "g", percentage: 45 },
    fiber: { value: 6, unit: "g", percentage: 70 },
  },
  vitamins: [
    { name: "Vitamin A", value: 120, unit: "mcg", percentage: 80 },
    { name: "Vitamin C", value: 30, unit: "mg", percentage: 60 },
    { name: "Vitamin B12", value: 0.8, unit: "mcg", percentage: 40 },
    { name: "Vitamin D", value: 2, unit: "mcg", percentage: 35 },
  ],
  minerals: [
    { name: "Calcium", value: 200, unit: "mg", percentage: 55 },
    { name: "Iron", value: 4, unit: "mg", percentage: 75 },
    { name: "Potassium", value: 650, unit: "mg", percentage: 65 },
    { name: "Magnesium", value: 80, unit: "mg", percentage: 45 },
  ],
  healthScore: 85,
};

export function NutritionInfoCard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Calories</p>
          <p className="text-xl font-semibold">{nutritionData.calories}</p>
          <p className="text-xs text-muted-foreground">kcal</p>
        </div>
        {Object.entries(nutritionData.macros).map(([key, data], index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </p>
            <p className="text-xl font-semibold">{data.value}{data.unit}</p>
            <div className="w-full mt-1">
              <Progress value={data.percentage} className="h-1" />
            </div>
          </div>
        ))}
      </div>
      
      <Tabs defaultValue="macros">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="macros">Macros</TabsTrigger>
          <TabsTrigger value="vitamins">Vitamins</TabsTrigger>
          <TabsTrigger value="minerals">Minerals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="macros" className="pt-4">
          <div className="space-y-4">
            {Object.entries(nutritionData.macros).map(([key, data], index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <Info className="h-3 w-3 text-muted-foreground ml-1 cursor-help" />
                  </div>
                  <span className="text-sm">{data.value}{data.unit}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{data.percentage}% of daily value</p>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="vitamins" className="pt-4">
          <div className="space-y-4">
            {nutritionData.vitamins.map((vitamin, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-medium">{vitamin.name}</span>
                    <Info className="h-3 w-3 text-muted-foreground ml-1 cursor-help" />
                  </div>
                  <span className="text-sm">{vitamin.value}{vitamin.unit}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${vitamin.percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{vitamin.percentage}% of daily value</p>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="minerals" className="pt-4">
          <div className="space-y-4">
            {nutritionData.minerals.map((mineral, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-medium">{mineral.name}</span>
                    <Info className="h-3 w-3 text-muted-foreground ml-1 cursor-help" />
                  </div>
                  <span className="text-sm">{mineral.value}{mineral.unit}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${mineral.percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{mineral.percentage}% of daily value</p>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
        <div>
          <p className="font-medium">Health Score</p>
          <p className="text-sm text-muted-foreground">Based on nutritional value</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-medium">
            {nutritionData.healthScore}
          </div>
          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
        </div>
      </div>
      
      <div className="space-y-3">
        <Button className="w-full flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add to Food Log
        </Button>
        <Button variant="outline" className="w-full">View Detailed Analysis</Button>
      </div>
    </div>
  );
}