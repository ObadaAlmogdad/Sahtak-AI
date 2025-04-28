"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Sahtak AI completely changed my approach to nutrition. The AI analysis is incredibly accurate, and I love being able to track everything in one place.",
    author: "Sarah Johnson",
    role: "Fitness Coach",
    avatar: "/placeholder-avatar-1.jpg"
  },
  {
    quote: "As a nutritionist, I recommend Sahtak AI to all my clients. The food recognition technology and health insights are invaluable for building healthy habits.",
    author: "Dr. Michael Chen",
    role: "Nutritionist",
    avatar: "/placeholder-avatar-2.jpg"
  },
  {
    quote: "I've lost 20 pounds since I started using Sahtak AI. The personalized meal recommendations and progress tracking keep me motivated every day.",
    author: "Emily Rodriguez",
    role: "Software Engineer",
    avatar: "/placeholder-avatar-3.jpg"
  },
  {
    quote: "The real-time analysis and food recognition is mind-blowing. It's like having a personal nutritionist in my pocket at all times.",
    author: "James Wilson",
    role: "Marathon Runner",
    avatar: "/placeholder-avatar-4.jpg"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of people who have transformed their relationship with food using Sahtak AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background border rounded-xl p-6 shadow-sm relative"
            >
              <div className="absolute -top-4 -left-4 text-primary bg-background rounded-full p-2 shadow-md">
                <Quote className="h-6 w-6" />
              </div>
              <div className="mb-6 pt-4">
                <p className="text-lg">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-primary/10 rounded-2xl -z-10" />
          <div className="relative bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold">
                  Join Our Community of Health Enthusiasts
                </h3>
                <p className="text-lg">
                  Over 100,000 people use Sahtak AI to make better food choices, track their nutrition, and improve their health.
                </p>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-4xl font-bold">4.8</p>
                    <p className="text-sm text-muted-foreground">App Store Rating</p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <p className="text-4xl font-bold">98%</p>
                    <p className="text-sm text-muted-foreground">User Satisfaction</p>
                  </div>
                </div>
              </div>
              
              <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/7991583/pexels-photo-7991583.jpeg"
                  alt="People using Sahtak AI"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}