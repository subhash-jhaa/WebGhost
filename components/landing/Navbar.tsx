"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { Menu, X, LogIn, ChevronRight } from 'lucide-react';
import { Button } from './Primitives';

interface NavbarProps {
  session?: Session | null;
}

export function Navbar({ session }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-mono text-base font-bold tracking-tight text-zinc-100">WebGhost</span>
            <span className="text-base">👻</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 text-sm">
            {[['#features', 'Features'], ['#how-it-works', 'How It Works'], ['#code', 'Integration']].map(([href, label]) => (
              <a key={href} href={href} className="rounded-md px-3 py-1.5 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-colors text-[15px] font-medium">
                {label}
              </a>
            ))}
            <div className="mx-2 h-4 w-px bg-zinc-800" />
            {session?.user ? (
              <a href="/dashboard">
                <Button variant="outline" size="default"><LogIn className="h-4 w-4" />Dashboard</Button>
              </a>
            ) : (
              <a href="/auth">
                <Button variant="outline" size="default"><LogIn className="h-4 w-4" />Login</Button>
              </a>
            )}
            <a href="/auth" className="ml-1">
              <Button size="default">Get Started <ChevronRight className="h-4 w-4" /></Button>
            </a>
          </div>

          <button className="md:hidden rounded-md p-2 text-zinc-400 hover:bg-zinc-800" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 h-14">
            <span className="font-mono font-bold text-zinc-100">WebGhost 👻</span>
            <button className="p-2 text-zinc-400 hover:bg-zinc-800 rounded-md" onClick={() => setMobileOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-6 text-base">
            {[['#features', 'Features'], ['#how-it-works', 'How It Works'], ['#code', 'Integration']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)} className="text-zinc-300 hover:text-white transition font-medium">
                {label}
              </a>
            ))}
            <div className="w-48 border-t border-zinc-800 my-1" />
            <a href="/auth" onClick={() => setMobileOpen(false)} className="w-4/5">
              <Button size="lg" className="w-full">Get Started Free</Button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
