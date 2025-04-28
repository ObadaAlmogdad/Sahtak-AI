"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Bookmark, Clock, Filter, Flame, Heart, Info, Leaf, Search, Utensils } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

const dietaryRestrictions = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Paleo",
  "Low-Carb",
  "High-Protein"
];

const mealSuggestions = [
  {
    id: "1",
    title: "Greek Yogurt Bowl",
    description: "Greek yogurt with mixed berries, honey, and granola",
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg",
    type: "Breakfast",
    calories: 320,
    protein: 22,
    carbs: 30,
    fat: 12,
    time: "5 min",
    tags: ["High-Protein", "Vegetarian"]
  },
  {
    id: "2",
    title: "Avocado Toast with Egg",
    description: "Whole grain toast with avocado, poached egg, and red pepper flakes",
    image: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg",
    type: "Breakfast",
    calories: 380,
    protein: 18,
    carbs: 36,
    fat: 22,
    time: "10 min",
    tags: ["Vegetarian", "High-Protein"]
  },
  {
    id: "3",
    title: "Grilled Chicken Salad",
    description: "Mixed greens with grilled chicken, cherry tomatoes, cucumber, and balsamic dressing",
    image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg",
    type: "Lunch",
    calories: 480,
    protein: 38,
    carbs: 25,
    fat: 22,
    time: "15 min",
    tags: ["High-Protein", "Low-Carb"]
  },
  {
    id: "4",
    title: "Quinoa Buddha Bowl",
    description: "Quinoa, roasted vegetables, chickpeas, and tahini dressing",
    image: "https://images.pexels.com/photos/1546896/pexels-photo-1546896.jpeg",
    type: "Lunch",
    calories: 450,
    protein: 16,
    carbs: 65,
    fat: 18,
    time: "20 min",
    tags: ["Vegan", "Gluten-Free"]
  },
  {
    id: "5",
    title: "Salmon with Asparagus",
    description: "Baked salmon fillet with roasted asparagus and lemon",
    image: "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg",
    type: "Dinner",
    calories: 520,
    protein: 42,
    carbs: 12,
    fat: 32,
    time: "25 min",
    tags: ["High-Protein", "Low-Carb", "Keto"]
  },
  {
    id: "6",
    title: "Vegetable Stir Fry",
    description: "Mixed vegetables stir-fried with tofu in a ginger soy sauce",
    image: "https://images.pexels.com/photos/7439978/pexels-photo-7439978.jpeg",
    type: "Dinner",
    calories: 380,
    protein: 18,
    carbs: 42,
    fat: 16,
    time: "15 min",
    tags: ["Vegetarian", "Vegan"]
  },
  {
    id: "7",
    title: "Protein Smoothie",
    description: "Banana, protein powder, almond milk, and peanut butter",
    image: "https://images.pexels.com/photos/3625372/pexels-photo-3625372.jpeg",
    type: "Snack",
    calories: 280,
    protein: 24,
    carbs: 26,
    fat: 10,
    time: "5 min",
    tags: ["Vegetarian", "High-Protein"]
  },
  {
    id: "8",
    title: "Hummus with Veggies",
    description: "Homemade hummus with carrot, cucumber, and bell pepper sticks",
    image: "https://images.pexels.com/photos/1618897/pexels-photo-1618897.jpeg",
    type: "Snack",
    calories: 210,
    protein: 8,
    carbs: 24,
    fat: 11,
    time: "5 min",
    tags: ["Vegan", "Gluten-Free"]
  }
];

export default function RecommendationsPage() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [calorieRange, setCalorieRange] = useState([200, 600]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const filteredMeals = mealSuggestions.filter(meal => {
    // Filter by meal type tab
    if (selectedTab !== "all" && meal.type.toLowerCase() !== selectedTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !meal.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !meal.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by calorie range
    if (meal.calories < calorieRange[0] || meal.calories > calorieRange[1]) {
      return false;
    }
    
    // Filter by dietary restrictions
    if (selectedFilters.length > 0 && !selectedFilters.some(filter => meal.tags.includes(filter))) {
      return false;
    }
    
    return true;
  });
  
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  
  if (!user) {
    return (
      <div className="container max-w-6xl px-4 py-16">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Utensils className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Personalized meal recommendations</h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Sign in to get AI-powered meal recommendations based on your preferences and nutrition goals
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
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Meal Recommendations</h1>
          <p className="text-lg text-muted-foreground">
            Personalized meal suggestions based on your nutrition goals and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search meals..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                    {selectedFilters.length > 0 && (
                      <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                        {selectedFilters.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <p className="font-medium mb-2">Dietary Restrictions</p>
                    <div className="flex flex-wrap gap-2">
                      {dietaryRestrictions.map((filter) => (
                        <Button
                          key={filter}
                          variant={selectedFilters.includes(filter) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter(filter)}
                          className="text-xs"
                        >
                          {filter}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <p className="font-medium mb-2">Calorie Range</p>
                      <Slider
                        defaultValue={calorieRange}
                        min={100}
                        max={800}
                        step={10}
                        onValueChange={(value) => setCalorieRange(value as number[])}
                        className="my-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{calorieRange[0]} kcal</span>
                        <span>{calorieRange[1]} kcal</span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Tabs defaultValue="all" onValueChange={setSelectedTab}>
              <TabsList className="grid grid-cols-5 w-full max-w-2xl">
                <TabsTrigger value="all">All</TabsTrigger>
                {mealTypes.map((type) => (
                  <TabsTrigger key={type} value={type.toLowerCase()}>
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <MealGrid meals={filteredMeals} />
              </TabsContent>
              
              {mealTypes.map((type) => (
                <TabsContent key={type} value={type.toLowerCase()} className="mt-6">
                  <MealGrid meals={filteredMeals} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Goals</CardTitle>
                <CardDescription>Your daily targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Calories</span>
                    <span>1,876 / 2,000 kcal</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[94%]" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Protein</span>
                    <span>98 / 120 g</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full w-[82%]" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Carbs</span>
                    <span>240 / 250 g</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full w-[96%]" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fat</span>
                    <span>68 / 65 g</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-destructive rounded-full w-[105%]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Saved Meals</CardTitle>
                <CardDescription>Your favorite recipes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mealSuggestions.slice(0, 3).map((meal) => (
                    <div key={meal.id} className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-md overflow-hidden relative flex-shrink-0">
                        <Image 
                          src={meal.image} 
                          alt={meal.title} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{meal.title}</p>
                        <p className="text-xs text-muted-foreground">{meal.calories} kcal</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4 fill-primary text-primary" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    View All Saved Meals
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Meal Planning</CardTitle>
                <CardDescription>Plan your weekly meals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <p className="font-medium mb-2">Generate Meal Plan</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get a personalized meal plan based on your nutrition goals
                    </p>
                    <Button className="w-full">Create Meal Plan</Button>
                  </div>
                  
                  <div className="text-center py-6">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Calendar className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No active meal plans. Create a plan to get started.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MealGridProps {
  meals: typeof mealSuggestions;
}

function MealGrid({ meals }: MealGridProps) {
  if (meals.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Info className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No meals found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {meals.map((meal, index) => (
        <motion.div
          key={meal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden h-full">
            <div className="relative h-48">
              <Image
                src={meal.image}
                alt={meal.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm hover:bg-background/90">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-2 left-2 flex gap-2">
                {meal.tags.map((tag, i) => (
                  <div 
                    key={i} 
                    className="bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full"
                  >
                    {tag === "Vegetarian" && <Leaf className="h-3 w-3 inline mr-1 text-green-500" />}
                    {tag === "Vegan" && <Leaf className="h-3 w-3 inline mr-1 text-green-600" />}
                    {tag === "High-Protein" && <Flame className="h-3 w-3 inline mr-1 text-red-500" />}
                    {tag === "Low-Carb" && <Flame className="h-3 w-3 inline mr-1 text-blue-500" />}
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            
            <CardHeader>
              <CardTitle>{meal.title}</CardTitle>
              <CardDescription>{meal.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <p className="text-sm font-medium">{meal.calories}</p>
                  <p className="text-xs text-muted-foreground">kcal</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{meal.protein}g</p>
                  <p className="text-xs text-muted-foreground">protein</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{meal.carbs}g</p>
                  <p className="text-xs text-muted-foreground">carbs</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{meal.fat}g</p>
                  <p className="text-xs text-muted-foreground">fat</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {meal.time}
              </div>
              <Button>View Recipe</Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}