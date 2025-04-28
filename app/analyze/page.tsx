"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Upload, Info, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { NutritionInfoCard } from "@/components/analysis/nutrition-info-card";
import { CameraCapture } from "@/components/analysis/camera-capture";
import { ImageUpload } from "@/components/analysis/image-upload";

export default function AnalyzePage() {
  const { user } = useAuth();
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [foodImage, setFoodImage] = useState<string | null>(null);

  const handleImageCapture = (imageSrc: string) => {
    setFoodImage(imageSrc);
    handleAnalyzeFood();
  };

  const handleImageUpload = (imageSrc: string) => {
    setFoodImage(imageSrc);
    handleAnalyzeFood();
  };

  const handleAnalyzeFood = () => {
    setAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="container max-w-6xl px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Analyze Your Food</h1>
            <p className="text-lg text-muted-foreground">
              Take a photo or upload an image of your food for instant nutritional analysis
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Image Analysis</CardTitle>
              <CardDescription>
                Capture or upload an image of your food for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="camera" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="camera" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Camera
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="camera">
                  <CameraCapture onCapture={handleImageCapture} />
                </TabsContent>

                <TabsContent value="upload">
                  <ImageUpload onUpload={handleImageUpload} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {foodImage && (
            <Card>
              <CardHeader>
                <CardTitle>{analyzed ? "Analysis Results" : "Analyzing Food"}</CardTitle>
                <CardDescription>
                  {analyzed
                    ? "Here's the nutritional breakdown of your food"
                    : "Our AI is analyzing your food image"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative h-[200px] md:h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={foodImage}
                      alt="Food image"
                      fill
                      className="object-cover"
                    />

                    {analyzing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center space-y-3">
                          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto" />
                          <p className="text-white font-medium">Analyzing your food...</p>
                        </div>
                      </div>
                    )}

                    {analyzed && (
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-md px-3 py-1.5 text-sm font-medium">
                        Greek Salad with Grilled Chicken
                      </div>
                    )}
                  </div>

                  {analyzed && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <NutritionInfoCard />
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Food Entries</CardTitle>
              <CardDescription>
                Your food log from the past 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-4">
                  {["Breakfast", "Lunch", "Snack"].map((meal, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                      <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Image</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{meal}</h4>
                        <p className="text-sm text-muted-foreground">Today, {10 + index}:30 AM</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{320 + index * 100} kcal</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>Details</span>
                          <ChevronDown className="h-3 w-3 ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">View Full History</Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Info className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-medium text-lg mb-1">Sign in to view history</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track your food history and nutrition trends over time
                  </p>
                  <div className="space-x-3">
                    <Button variant="default" asChild>
                      <a href="/sign-up">Sign Up</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/sign-in">Sign In</a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Accurate Analysis</CardTitle>
              <CardDescription>
                Get the most accurate results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    1
                  </div>
                  <p className="text-sm">Take a clear, well-lit photo of your food</p>
                </li>
                <li className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    2
                  </div>
                  <p className="text-sm">Capture from above to show all food items</p>
                </li>
                <li className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    3
                  </div>
                  <p className="text-sm">Include all components of your meal in the frame</p>
                </li>
                <li className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    4
                  </div>
                  <p className="text-sm">Place a common object nearby for size reference</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}