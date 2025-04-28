"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Info, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressChart } from "@/components/progress/progress-chart";
import { NutrientDistribution } from "@/components/progress/nutrient-distribution";
import { CalorieIntake } from "@/components/progress/calorie-intake";
import { NutrientGoals } from "@/components/progress/nutrient-goals";
import { FoodLogTable } from "@/components/progress/food-log-table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

export default function ProgressPage() {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [period, setPeriod] = useState<string>("week");
  
  if (!user) {
    return (
      <div className="container max-w-6xl px-4 py-16">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Info className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Sign in to track your progress</h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Create an account to track your nutrition progress and get personalized insights
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="/sign-up">Create Account</a>
            </Button>
            <Button variant="outline" asChild size="lg">
              <a href="/sign-in">Sign In</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-6xl px-4 py-8 md:py-12">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Progress Tracking</h1>
            <p className="text-lg text-muted-foreground">
              Monitor your nutrition and health data over time
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 h-9">
                    <CalendarIcon className="h-4 w-4" />
                    {period === "day" ? (
                      format(date, "MMMM d, yyyy")
                    ) : period === "week" ? (
                      `Week of ${format(date, "MMM d")}`
                    ) : period === "month" ? (
                      format(date, "MMMM yyyy")
                    ) : (
                      format(date, "yyyy")
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Button variant="outline" size="icon" className="h-9 w-9">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium">Daily Average</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-3xl font-bold">1,876</div>
              <p className="text-sm text-muted-foreground">calories/day</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium">Calorie Goal</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-3xl font-bold">2,000</div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                124 calories under goal
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium">Protein</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-3xl font-bold">98g</div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
                81% of daily goal
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium">Health Score</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-3xl font-bold">82</div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                +3 from last week
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Nutrition Overview</CardTitle>
              <CardDescription>
                Track your nutrition intake over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressChart period={period} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Macronutrient Distribution</CardTitle>
              <CardDescription>
                Breakdown of your daily macros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NutrientDistribution />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Calorie Intake</CardTitle>
              <CardDescription>
                Daily calorie consumption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalorieIntake />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Nutrient Goals</CardTitle>
              <CardDescription>
                Progress towards your nutritional targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NutrientGoals />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Food Log</CardTitle>
                <CardDescription>
                  Your recent food entries
                </CardDescription>
              </div>
              <Button>
                Export Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <FoodLogTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}