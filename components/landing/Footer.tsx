"use client"
import { motion } from 'framer-motion';
import { cn, MONO, fadeIn, staggerContainer } from './Primitives';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10 bg-zinc-950/20">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <motion.span variants={fadeIn} className={cn(MONO, "text-[12px] text-zinc-600 tracking-tight")}>
          © 2026 WebGhost 👻 <span className="mx-2 text-zinc-800">|</span> <span className="hover:text-zinc-500 transition-colors cursor-default">Privacy First Analytics</span>
        </motion.span>
        
        <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[12px] text-zinc-600">
          <a href="https://x.com/subhash-jh" target="_blank" rel="noopener" className="hover:text-zinc-200 transition-colors">Twitter</a>
          <a href="https://github.com/subhash-jhaa/" target="_blank" rel="noopener" className="hover:text-zinc-200 transition-colors">GitHub</a>
          <span className="text-zinc-700">Made with ❤️ by <a href="https://x.com/subhash-jh" target="_blank" rel="noopener" className="text-zinc-400 hover:text-zinc-100 transition-colors font-medium">Subhash</a></span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
