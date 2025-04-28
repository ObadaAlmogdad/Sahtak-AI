"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20 pointer-events-none" />
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 relative z-10"
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm">
              <span className="text-primary font-medium">New: AI Food Recognition v2.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Smart Food Analysis <br />
              <span className="text-primary">Powered by AI</span>
            </h1>
            <p className="text-xl text-foreground/90 max-w-md">
              Track your nutrition, analyze your meals, and reach your health goals with our advanced AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setVideoModalOpen(true)}
                className="flex items-center gap-2 bg-background/80 backdrop-blur-sm"
              >
                <PlayCircle className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
                alt="Food analysis on a smartphone"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent mix-blend-overlay" />
              
              {/* App UI Mockup Overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[260px] rounded-xl bg-background/95 backdrop-blur-sm p-4 shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Your Meal Analysis</h3>
                    <span className="text-xs text-muted-foreground">Now</span>
                  </div>
                  <div className="h-32 bg-muted rounded-lg overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Food Image</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs font-medium">Calories</span>
                      <span className="text-xs">320 kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-medium">Protein</span>
                      <span className="text-xs">22g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-medium">Carbs</span>
                      <span className="text-xs">42g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-medium">Fat</span>
                      <span className="text-xs">10g</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="h-8 bg-primary/10 rounded-md flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">View Details</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Accent elements */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
      
      {/* Clients/Trust logos */}
      <div className="container px-4 md:px-6 mt-24">
        <div className="text-center mb-8">
          <p className="text-sm text-foreground/80">TRUSTED BY HEALTH PROFESSIONALS</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 opacity-70">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-32 bg-muted/50 rounded" />
          ))}
        </div>
      </div>
    </section>
  );
}