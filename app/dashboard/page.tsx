"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CalendarClock, Camera, ChevronRight, LineChart, Utensils } from "lucide-react";
import { NutrientProgressCircle } from "@/components/dashboard/nutrient-progress-circle";
import { CalorieChart } from "@/components/dashboard/calorie-chart";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="container max-w-6xl px-4 py-8 md:py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Hello, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's an overview of your nutrition today
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Daily Calories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,876</div>
              <p className="text-sm text-muted-foreground">of 2,000 goal</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Protein</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">98g</div>
              <p className="text-sm text-muted-foreground">of 120g goal</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Carbs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">240g</div>
              <p className="text-sm text-muted-foreground">of 250g goal</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Fat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">68g</div>
              <p className="text-sm text-muted-foreground">of 65g goal</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Nutrition Overview</CardTitle>
                  <CardDescription>Your daily nutrition summary</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <LineChart className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <CalorieChart />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Nutrient Balance</CardTitle>
                  <CardDescription>Progress towards your goals</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex justify-center">
                <NutrientProgressCircle />
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/analyze" className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Analyze Food
                    <ArrowUpRight className="h-4 w-4 ml-auto" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/progress" className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2" />
                    View Progress
                    <ArrowUpRight className="h-4 w-4 ml-auto" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/recommendations" className="flex items-center">
                    <Utensils className="h-5 w-5 mr-2" />
                    Get Meal Recommendations
                    <ArrowUpRight className="h-4 w-4 ml-auto" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/plan" className="flex items-center">
                    <CalendarClock className="h-5 w-5 mr-2" />
                    Create Meal Plan
                    <ArrowUpRight className="h-4 w-4 ml-auto" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Today's Meals</CardTitle>
                <CardDescription>Your food log for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="font-medium">Breakfast</div>
                    <div>320 kcal</div>
                  </div>
                  <div className="p-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-md" />
                      <div className="flex-1">
                        <p className="font-medium">Greek Yogurt with Berries</p>
                        <p className="text-sm text-muted-foreground">8:30 AM</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="font-medium">Lunch</div>
                    <div>480 kcal</div>
                  </div>
                  <div className="p-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-md" />
                      <div className="flex-1">
                        <p className="font-medium">Grilled Chicken Salad</p>
                        <p className="text-sm text-muted-foreground">12:45 PM</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="font-medium">Snack</div>
                    <div>210 kcal</div>
                  </div>
                  <div className="p-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-md" />
                      <div className="flex-1">
                        <p className="font-medium">Protein Bar</p>
                        <p className="text-sm text-muted-foreground">3:15 PM</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg border-dashed">
                  <div className="flex items-center justify-between p-3 border-b border-dashed">
                    <div className="font-medium">Dinner</div>
                    <div>Not logged yet</div>
                  </div>
                  <div className="p-3">
                    <Button variant="outline" className="w-full">
                      <Camera className="h-4 w-4 mr-2" />
                      Log Dinner
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Complete Food Log</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}