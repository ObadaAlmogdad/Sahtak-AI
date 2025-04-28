import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Sahtak AI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered food analysis for a healthier lifestyle. Track your nutrition and achieve your health goals.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/analyze" className="text-muted-foreground hover:text-foreground transition-colors">
                  Food Analysis
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-muted-foreground hover:text-foreground transition-colors">
                  Progress Tracking
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Meal Recommendations
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2025 Sahtak AI. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-foreground transition-colors">
              Twitter
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Instagram
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Facebook
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}