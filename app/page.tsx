import Link from "next/link";
import { ArrowRight, UtensilsCrossed, ChartPieIcon, Sparkles, Shield } from "lucide-react";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import HowItWorks from "@/components/landing/how-it-works";
import Testimonials from "@/components/landing/testimonials";
import CallToAction from "@/components/landing/call-to-action";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </div>
  );
}