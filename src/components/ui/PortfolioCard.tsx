"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * PortfolioCard
 * A reusable card component with glassmorphism, hover effects, and entrance animations.
 * Supports an optional background image mode where text is revealed on hover.
 */

interface PortfolioCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  noHover?: boolean;
  image?: string;
}

export const PortfolioCard = React.forwardRef<HTMLDivElement, PortfolioCardProps>(
  ({ children, className, noHover = false, image, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={!noHover ? { scale: 1.02 } : undefined}
        className={cn(
          "group relative overflow-hidden rounded-xl border border-white/10 bg-background/5 p-6 backdrop-blur-sm transition-all",
          !noHover && !image &&
            "hover:bg-background/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
          image && "p-0", // Remove padding if image is present to let it fill
          className
        )}
        {...props}
      >
        {image ? (
          <>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
               <img 
                 src={image} 
                 alt="" 
                 className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
               />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-300" />
            </div>

            {/* Content Overlay - Hidden by default, shown on hover */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
               {children}
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
            <div className="relative z-10">
              {children}
            </div>
          </>
        )}
      </motion.div>
    );
  }
);

PortfolioCard.displayName = "PortfolioCard";
