"use client"
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn, CARD, MONO, Button, fadeUp, staggerContainer, scaleIn } from './Primitives';

export function CTA() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-24">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={staggerContainer}
        className={cn(CARD, "p-10 sm:p-16 text-center border-zinc-700 relative overflow-hidden group")}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        
        <motion.div variants={fadeUp} custom={0} className={cn(MONO, "text-[11px] text-zinc-600 mb-6 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800 w-fit mx-auto")}>
          $ webghost init --site=your-domain.com
        </motion.div>
        
        <motion.h2 variants={fadeUp} custom={1} className="font-mono text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight mb-4 text-balance">
          Start Tracking in Seconds
        </motion.h2>
        
        <motion.p variants={fadeUp} custom={2} className="text-zinc-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
          Free forever for solo devs. No credit card. No cookie banners. No nonsense.
        </motion.p>
        
        <motion.div variants={scaleIn} custom={3}>
          <a href="/auth">
            <Button size="lg" className="font-semibold px-8 group">
              Get Started Free <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
        
        <motion.p variants={fadeUp} custom={4} className={cn(MONO, "mt-8 text-[11px] text-zinc-700")}>
          trusted by indie hackers, solo devs & small startups
        </motion.p>
      </motion.div>
    </section>
  );
}
