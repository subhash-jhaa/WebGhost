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
import { AddProject } from './landing/AddProject';
import { FAQ } from './landing/FAQ';

interface LandingProps {
  session?: Session | null;
}

export default function Landing({ session }: LandingProps) {
  return (
    <div className="min-h-screen bg-black text-zinc-100 overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <Navbar session={session} />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── Hero Visuals ───────────────────────────────────────────────────── */}
      <HeroVisuals />

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <Stats />

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Add Project ────────────────────────────────────────────────────── */}
      <AddProject />

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <Features />

      {/* ── Integration / Code section ─────────────────────────────────────── */}
      <Integration />

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <Pricing />

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <FAQ />

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <CTA />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />

    </div>
  );
}