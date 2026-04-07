"use client"
import React from 'react';
import { Session } from 'next-auth';
import { Navbar } from './landing/Navbar';
import { Hero } from './landing/Hero';
import { Stats } from './landing/Stats';
import { HowItWorks } from './landing/HowItWorks';
import { Features } from './landing/Features';
import { Integration } from './landing/Integration';
import { Testimonials } from './landing/Testimonials';
import { CTA } from './landing/CTA';
import { Footer } from './landing/Footer';

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

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <CTA />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />

    </div>
  );
}