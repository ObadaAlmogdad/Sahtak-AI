"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, BarChart3, Salad, Award } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "analyze",
      icon: <Camera className="h-5 w-5" />,
      title: "Analyze Your Food",
      description: "Take a photo of your meal or upload an image for instant AI analysis and nutritional information.",
      image: "/analyze.jpeg"
    },
    {
      id: "track",
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Track Your Progress",
      description: "Monitor your nutrition intake, calories, and health metrics with detailed interactive charts.",
      image: "/track.jpeg"
    },
    {
      id: "recommend",
      icon: <Salad className="h-5 w-5" />,
      title: "Get Recommendations",
      description: "Receive personalized meal suggestions and dietary advice based on your goals and preferences.",
      image: "/recommend.jpeg"
    },
    {
      id: "achieve",
      icon: <Award className="h-5 w-5" />,
      title: "Achieve Your Goals",
      description: "Stay motivated with personalized insights and celebrate your nutritional and health milestones.",
      image: "/achieve.jpeg"
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our simple four-step process makes tracking your nutrition and health effortless.
          </p>
        </div>

        <Tabs defaultValue="analyze" className="w-full">
          <div className="flex justify-center mb-8 z-20 relative">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl bg-white/80 backdrop-blur-md shadow-md rounded-xl">
              {steps.map((step) => (
                <TabsTrigger key={step.id} value={step.id} className="flex flex-col items-center gap-2 p-4">
                  <div className="rounded-full bg-muted p-2 text-foreground">
                    {step.icon}
                  </div>
                  <span className="text-sm font-medium">{step.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="h-8 md:h-12" />

          {steps.map((step, index) => (
            <TabsContent key={step.id} value={step.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="order-2 lg:order-1 space-y-4 bg-white/90 rounded-2xl shadow-md p-6 md:p-10 z-10 relative"
                >
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
                    Step {index + 1}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{step.title}</h3>
                  <p className="text-lg text-muted-foreground mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {[
                      "Instant AI-powered analysis",
                      "Detailed nutritional breakdown",
                      "Simple and user-friendly interface",
                      "Works online and offline"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="order-1 lg:order-2 flex justify-center z-0"
                >
                  <div className="relative h-[260px] w-full md:h-[400px] max-w-xl rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 text-white">
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-white/80">Simple and effective health management</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}