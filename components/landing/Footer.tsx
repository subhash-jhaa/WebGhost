"use client"
import React from 'react';
import { cn, MONO } from './Primitives';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className={cn(MONO, "text-[12px] text-zinc-600")}>© 2026 WebGhost 👻</span>
        <div className="flex items-center gap-5 text-[12px] text-zinc-600">
          <a href="https://x.com/subhash-jh" target="_blank" rel="noopener" className="hover:text-zinc-300 transition">Twitter</a>
          <a href="https://github.com/subhash-jhaa/" target="_blank" rel="noopener" className="hover:text-zinc-300 transition">GitHub</a>
          <span>Made with ❤️ by <a href="https://x.com/subhash-jh" target="_blank" rel="noopener" className="text-zinc-400 hover:text-zinc-100 transition">Subhash</a></span>
        </div>
      </div>
    </footer>
  );
}
