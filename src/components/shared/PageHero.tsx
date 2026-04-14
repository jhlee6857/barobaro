import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHero({ title, description, className }: PageHeroProps) {
  return (
    <div className={cn("bg-brand-dark pt-20 pb-16 text-center text-white", className)}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
        {description && (
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
