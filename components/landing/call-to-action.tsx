"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export default function CallToAction() {
  const features = [
    "AI-powered food recognition",
    "Detailed nutritional breakdown",
    "Personalized meal recommendations",
    "Progress tracking and analytics",
    "Health scoring system",
    "Fitness app integration"
  ];

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl opacity-70" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Start Your Health Journey Today
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of users who have transformed their relationship with food and improved their health with Sahtak AI.
              </p>
              
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="rounded-full bg-primary/20 p-1 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link href="/sign-up">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Pricing
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-muted-foreground">
                No credit card required. Free plan available with premium upgrades.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative lg:h-[500px] flex justify-center"
            >
              <div className="relative max-w-[300px] bg-background rounded-2xl shadow-xl overflow-hidden border">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Daily Summary</h3>
                    <span className="text-xs text-muted-foreground">Today</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">Calories</p>
                        <p className="text-lg font-semibold">1,820</p>
                        <p className="text-xs text-green-500">-180 kcal</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">Water</p>
                        <p className="text-lg font-semibold">1.8L</p>
                        <p className="text-xs text-amber-500">+0.7L left</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Macronutrients</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Protein</span>
                          <span className="text-xs">95g / 120g</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div className="h-2 bg-primary rounded-full w-[75%]" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Carbs</span>
                          <span className="text-xs">210g / 250g</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div className="h-2 bg-secondary rounded-full w-[80%]" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Fat</span>
                          <span className="text-xs">50g / 65g</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div className="h-2 bg-amber-500 rounded-full w-[70%]" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-3">Meal Analysis</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                          <div className="w-10 h-10 bg-muted rounded-md" />
                          <div>
                            <p className="text-xs font-medium">Breakfast</p>
                            <p className="text-xs text-muted-foreground">480 kcal</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-primary/10 rounded-lg">
                          <div className="w-10 h-10 bg-muted rounded-md" />
                          <div>
                            <p className="text-xs font-medium">Lunch</p>
                            <p className="text-xs text-muted-foreground">650 kcal</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                          <div className="w-10 h-10 bg-muted rounded-md" />
                          <div>
                            <p className="text-xs font-medium">Dinner</p>
                            <p className="text-xs text-muted-foreground">690 kcal</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}