"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn, SectionLabel, CARD } from './Primitives';
import { TESTIMONIALS } from './Constants';

// ─── Local UI Wrappers ────────────────────────────────────────────────────────
const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root ref={ref} className={cn("relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full border border-zinc-700 bg-zinc-800", className)} {...props} />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback ref={ref} className={cn("flex h-full w-full items-center justify-center rounded-full bg-zinc-800 text-zinc-400", className)} {...props} />
));
AvatarFallback.displayName = "AvatarFallback";

const Separator = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>>(({ className, orientation = "horizontal", ...props }, ref) => (
  <SeparatorPrimitive.Root ref={ref} className={cn("shrink-0 bg-zinc-800", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)} {...props} />
));
Separator.displayName = "Separator";

// ─── Main Component ───────────────────────────────────────────────────────────
export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoRotateInterval = 6000;
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  useEffect(() => {
    if (TESTIMONIALS.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, autoRotateInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="mx-auto max-w-6xl px-4 sm:px-6 py-24 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Content */}
        <motion.div
          initial="hidden" animate={controls}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
          className="flex flex-col gap-6"
        >
          <div>
            <SectionLabel>From the community</SectionLabel>
            <h2 className="font-mono text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight mb-4">
              Devs Love WebGhost
            </h2>
            <p className="text-zinc-500 text-base max-w-md leading-relaxed">
              Fast, clean analytics that stay out of your way. See what our early adopters are saying about the platform.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-8 bg-zinc-100" : "w-1.5 bg-zinc-800 hover:bg-zinc-700"
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Side: Animated Card Stack */}
        <div className="relative h-[320px] sm:h-[350px]">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{
                opacity: activeIndex === i ? 1 : 0,
                scale: activeIndex === i ? 1 : 0.9,
                x: activeIndex === i ? 0 : 20,
                pointerEvents: activeIndex === i ? 'auto' : 'none'
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ zIndex: activeIndex === i ? 10 : 0 }}
            >
              <div className={cn(CARD, "h-full p-8 flex flex-col shadow-2xl border-zinc-800/50 bg-zinc-900/80 backdrop-blur-sm")}>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, starI) => (
                    <Star key={starI} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <div className="relative flex-1">
                  <Quote className="absolute -top-3 -left-3 h-8 w-8 text-zinc-800 opacity-50 rotate-180" />
                  <p className="relative z-10 text-lg font-medium text-zinc-100 leading-relaxed italic">
                    {`"${t.content}"`}
                  </p>
                </div>

                <Separator className="my-6 opacity-30" />

                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">{t.name}</h3>
                    <p className="text-xs text-zinc-500">
                      {t.role} @ {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Decorative Backdrops */}
          <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-zinc-800 bg-zinc-900/20 -z-10" />
          <div className="absolute -bottom-8 -right-8 h-full w-full rounded-2xl border border-zinc-800 bg-zinc-900/10 -z-20" />
        </div>

      </div>
    </section>
  );
}
