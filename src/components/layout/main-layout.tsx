
import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className={cn("flex-1 container py-6 px-4", className)}>
        {children}
      </main>
      
      <footer className="bg-muted p-4">
        <div className="container text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            "TheCricLine is a free-to-play cricket experience platform. No real money, rewards, or transfers are involved. CricPoints are virtual and for entertainment only."
          </p>
        </div>
      </footer>
    </div>
  );
}
