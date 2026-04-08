"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal, Copy, Check,
} from 'lucide-react';
import { cn, CARD, MONO, fadeUp } from './Primitives';
import { VISITORS } from './Constants';

function FlagIcon({ code }: { code: string }) {
  return (
    <span className={cn(MONO, "text-[10px] font-bold text-zinc-500 bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5")}>
      {code}
    </span>
  );
}

function LiveFeed() {
  const [rows, setRows] = useState(VISITORS.slice(0, 4));
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setTick(p => !p);
      setRows([...VISITORS].sort(() => Math.random() - 0.5).slice(0, 4));
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={cn(CARD, "w-full max-w-md mx-auto overflow-hidden")}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-zinc-500" />
          <span className={cn(MONO, "text-xs text-zinc-400")}>live_visitors.log</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-emerald-400"
            style={{ boxShadow: tick ? '0 0 8px #34d399' : '0 0 4px #34d399', transition: 'box-shadow 0.4s' }}
          />
          <span className="text-[11px] text-zinc-600 font-mono">LIVE</span>
        </div>
      </div>
      <div className="divide-y divide-zinc-800/60">
        {rows.map((v, i) => (
          <motion.div
            key={`${v.flag}-${v.page}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className="flex items-center justify-between px-4 py-2.5 text-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <FlagIcon code={v.flag} />
              <span className={cn(MONO, "text-zinc-300 truncate")}>{v.page}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0 pl-3">
              <span className="text-zinc-600 hidden sm:block">{v.device}</span>
              <span className={cn(MONO, "text-zinc-500 text-[11px]")}>{v.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center gap-2">
        <span className={cn(MONO, "text-[11px] text-emerald-400")}>●</span>
        <span className="text-[11px] text-zinc-600">Streaming from 4 active sessions</span>
      </div>
    </div>
  );
}

const ONE_LINER = '<script src="https://webghost.vercel.app/track.js" data-site="YOUR_SITE_ID" defer></script>';

export function HeroScript() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(ONE_LINER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = [
    { tokens: [{ t: '<', c: 'text-zinc-500' }, { t: 'script', c: 'text-sky-400' }] },
    { tokens: [{ t: '  src', c: 'text-violet-400' }, { t: '=', c: 'text-zinc-500' }, { t: '"https://webghost.vercel.app/track.js"', c: 'text-emerald-400' }] },
    { tokens: [{ t: '  data-site', c: 'text-violet-400' }, { t: '=', c: 'text-zinc-500' }, { t: '"YOUR_SITE_ID"', c: 'text-amber-400' }] },
    { tokens: [{ t: '  defer', c: 'text-violet-400' }] },
    { tokens: [{ t: '>', c: 'text-zinc-500' }, { t: '</', c: 'text-zinc-500' }, { t: 'script', c: 'text-sky-400' }, { t: '>', c: 'text-zinc-500' }] },
  ];

  return (
    <div className={cn(CARD, "w-full max-w-lg mx-auto overflow-hidden")}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-950">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className={cn(MONO, "ml-2 text-[11px] text-zinc-600")}>index.html</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-200 transition-colors px-2 py-1 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-900"
        >
          {copied
            ? <><Check className="h-3 w-3 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
            : <><Copy className="h-3 w-3" /><span>Copy</span></>}
        </button>
      </div>
      <div className="px-5 py-4 bg-zinc-950">
        <pre className={cn(MONO, "text-sm leading-relaxed")}>
          {lines.map((line, i) => (
            <div key={i}>
              {line.tokens.map((tok, j) => (
                <span key={j} className={tok.c}>{tok.t}</span>
              ))}
            </div>
          ))}
        </pre>
      </div>
      <div className="flex items-center gap-2 px-5 py-3 border-t border-zinc-800 bg-zinc-950 flex-wrap">
        {['< 2KB', 'No npm', 'GDPR safe'].map(b => (
          <span key={b} className={cn(MONO, "text-[10px] text-zinc-500 border border-zinc-800 rounded px-2 py-0.5")}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroVisuals() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={fadeUp} custom={0}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      >
        <div className="flex flex-col gap-3">
          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-2 font-mono">Step 1 — Install</p>
          </div>
          <HeroScript />
          <div className="flex items-center gap-2 text-xs text-zinc-600 px-1">
            <Check className="h-3 w-3 text-emerald-500 shrink-0" />
            <span>Works with React, Next.js, Vue, or plain HTML</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-2 font-mono">Step 2 — Watch it live</p>
          </div>
          <LiveFeed />
          <div className="flex items-center gap-2 text-xs text-zinc-600 px-1">
            <Check className="h-3 w-3 text-emerald-500 shrink-0" />
            <span>Data appears within seconds of installing</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
