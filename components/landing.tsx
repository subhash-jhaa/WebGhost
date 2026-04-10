import React from 'react';
import { Session } from 'next-auth';
import { Navbar } from './landing/Navbar';
import { Hero } from './landing/Hero';
import { HeroVisuals } from './landing/HeroVisuals';
import { Stats } from './landing/Stats';
import { HowItWorks } from './landing/HowItWorks';
import { Features } from './landing/Features';
import { Integration } from './landing/Integration';
import { Testimonials } from './landing/Testimonials';
import { CTA } from './landing/CTA';
import { Footer } from './landing/Footer';
import { Pricing } from './landing/Pricing';

interface LandingProps {
  session?: Session | null;
}

export default function Landing({ session }: LandingProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <Navbar session={session} />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── Hero Visuals ───────────────────────────────────────────────────── */}
      <HeroVisuals />

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <Stats />

      {/* ── Divider ────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="h-px w-full bg-zinc-800" />
      </div>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <Features />

      {/* ── Integration / Code section ─────────────────────────────────────── */}
      <Integration />

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <Pricing />

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <CTA />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />

    </div>
  );
}