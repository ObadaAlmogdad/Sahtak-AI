"use client";

import { useState } from "react";
import { Info, MoreHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for the food log
const foodLogData = [
  {
    id: "1",
    date: "Today, 8:30 AM",
    meal: "Breakfast",
    food: "Greek Yogurt with Berries",
    calories: 320,
    protein: 22,
    carbs: 30,
    fat: 12,
  },
  {
    id: "2",
    date: "Today, 12:45 PM",
    meal: "Lunch",
    food: "Grilled Chicken Salad",
    calories: 480,
    protein: 38,
    carbs: 25,
    fat: 22,
  },
  {
    id: "3",
    date: "Today, 3:15 PM",
    meal: "Snack",
    food: "Protein Bar",
    calories: 210,
    protein: 18,
    carbs: 22,
    fat: 6,
  },
  {
    id: "4",
    date: "Today, 7:00 PM",
    meal: "Dinner",
    food: "Salmon with Quinoa and Vegetables",
    calories: 580,
    protein: 42,
    carbs: 45,
    fat: 26,
  },
  {
    id: "5",
    date: "Yesterday, 8:00 AM",
    meal: "Breakfast",
    food: "Oatmeal with Banana",
    calories: 280,
    protein: 12,
    carbs: 48,
    fat: 6,
  },
  {
    id: "6",
    date: "Yesterday, 1:00 PM",
    meal: "Lunch",
    food: "Turkey Sandwich",
    calories: 420,
    protein: 28,
    carbs: 38,
    fat: 18,
  },
];

export function FoodLogTable() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredData = foodLogData.filter(item => 
    item.food.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.meal.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search food entries..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Meal</TableHead>
              <TableHead className="hidden md:table-cell">Food</TableHead>
              <TableHead className="text-right">Calories</TableHead>
              <TableHead className="hidden md:table-cell text-right">Protein</TableHead>
              <TableHead className="hidden md:table-cell text-right">Carbs</TableHead>
              <TableHead className="hidden md:table-cell text-right">Fat</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.date}</TableCell>
                <TableCell>{item.meal}</TableCell>
                <TableCell className="hidden md:table-cell">{item.food}</TableCell>
                <TableCell className="text-right">{item.calories} kcal</TableCell>
                <TableCell className="hidden md:table-cell text-right">{item.protein}g</TableCell>
                <TableCell className="hidden md:table-cell text-right">{item.carbs}g</TableCell>
                <TableCell className="hidden md:table-cell text-right">{item.fat}g</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Entry</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  <div className="flex flex-col items-center gap-2">
                    <Info className="h-8 w-8 text-muted-foreground" />
                    <p>No food entries found</p>
                    {searchQuery && (
                      <p className="text-sm text-muted-foreground">
                        Try a different search term
                      </p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}