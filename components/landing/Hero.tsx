"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Logo } from "./Logo";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function Hero() {
  const { data: session, status } = useSession();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Integration", href: "#code" },
  ];

  // Hide the default global header safely on the client-side
  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      header.style.setProperty("display", "none", "important");
    }
    return () => {
      if (header) {
        header.style.display = "";
      }
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Full-screen Container */}
      <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a]">
        
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto"
        >
          <source
            src="/bg-video.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />

        {/* Navbar */}
        <nav className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-4xl">
          <div className="bg-black/80 backdrop-blur-md rounded-full px-4 py-2 sm:px-6 md:px-8 flex items-center justify-between shadow-2xl border border-white/[0.05]">
            
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Logo className="h-5 sm:h-6 w-auto" />
            </Link>

            {/* Nav Items */}
            <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10">
              {navItems.map((item, idx) => (
                <a
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    color: hoveredIdx === idx ? "#E1E0CC" : "rgba(225, 224, 204, 0.8)",
                    transition: "color 0.25s ease",
                  }}
                  className="text-[10px] sm:text-xs md:text-sm font-medium tracking-wide whitespace-nowrap"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Auth Action */}
            <div className="flex items-center shrink-0">
              {status !== "loading" && (
                session?.user ? (
                  <Link href="/dashboard">
                    <button className="h-8 px-4 rounded-full bg-[#DEDBC8] text-zinc-950 font-semibold text-[10px] sm:text-xs hover:bg-[#E1E0CC] transition-all cursor-pointer whitespace-nowrap">
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <Link href="/auth">
                    <button className="h-8 px-4 rounded-full bg-white text-zinc-950 font-semibold text-[10px] sm:text-xs hover:bg-zinc-200 transition-all cursor-pointer whitespace-nowrap">
                      Sign In
                    </button>
                  </Link>
                )
              )}
            </div>

          </div>
        </nav>

        {/* Bottom-left Aligned Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-20 flex flex-col items-start text-left max-w-4xl gap-6 select-none"
        >
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-bold tracking-tight text-white leading-[1.05] text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.5vw] xl:text-[4.2vw] 2xl:text-[4.5vw]"
          >
            See Who&apos;s On Your<br />
            Site <span className="text-[#DEDBC8]">Right Now.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl font-medium"
          >
            Privacy-first, zero-cookie analytics built for developers. Know who&apos;s visiting, where they came from, and exactly what they&apos;re doing.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2"
          >
            <Link href="/auth" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#DEDBC8] text-zinc-950 font-semibold text-sm flex items-center justify-center gap-2 group transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Start Tracking Free</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto h-12 px-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <Code2 className="h-4 w-4 text-white" /> See How It Works
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
