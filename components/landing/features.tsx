"use client";

import { motion } from "framer-motion";
import { Camera, BarChart3, Scale as Scales, Apple, Clock, Heart, Zap, BrainCircuit } from "lucide-react";

const features = [
  {
    icon: <Camera className="h-5 w-5" />,
    title: "Image Recognition",
    description: "Take a photo of your food and let our AI instantly identify and analyze it for nutritional content."
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Nutrition Tracking",
    description: "Track your daily nutrition intake with detailed breakdowns of calories, macronutrients, and vitamins."
  },
  {
    icon: <Scales className="h-5 w-5" />,
    title: "Progress Monitoring",
    description: "Monitor your health journey with personalized charts and analytics to reach your goals."
  },
  {
    icon: <Apple className="h-5 w-5" />,
    title: "Meal Recommendations",
    description: "Get AI-powered meal suggestions based on your preferences, dietary needs and goals."
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Real-time Analysis",
    description: "Receive instant food analysis with our state-of-the-art AI technology, even without internet."
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Health Scoring",
    description: "Understand the health impact of your food choices with our comprehensive scoring system."
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Fitness Integration",
    description: "Connect with your favorite fitness apps to get a complete picture of your health."
  },
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: "Smart Learning",
    description: "Our AI learns your preferences and habits over time to provide more personalized insights."
  }
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Powerful Features for Your Health Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our intelligent platform combines cutting-edge AI with nutrition science to help you make better food choices.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-background border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}