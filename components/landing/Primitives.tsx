import React from 'react';

// ─── Utility ──────────────────────────────────────────────────────────────────
export function cn(...c: (string | undefined | false)[]) { return c.filter(Boolean).join(' '); }

// ─── Primitives ───────────────────────────────────────────────────────────────
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-400",
      className
    )}>
      {children}
    </span>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-8 bg-zinc-700" />
      <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">{children}</span>
      <div className="h-px w-8 bg-zinc-700" />
    </div>
  );
}

export function Button({
  children, className, variant = 'default', size = 'default', onClick, ...props
}: {
  children: React.ReactNode; className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void; [key: string]: unknown;
}) {
  const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-zinc-100 text-zinc-950 hover:bg-white border border-transparent",
    outline: "border border-zinc-700 bg-transparent text-zinc-300 hover:border-zinc-500 hover:text-zinc-100",
    ghost: "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
  };
  const sizes = { default: "h-10 px-4", sm: "h-8 px-3 text-xs", lg: "h-12 px-7 text-[15px]", icon: "h-9 w-9" };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

// ─── Fade-up variant ──────────────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

// ─── Design Tokens ────────────────────────────────────────────────────────────
export const CARD = "rounded-xl border border-zinc-800 bg-zinc-900";
export const CARD_HOVER = "hover:border-zinc-700 transition-colors duration-200";
// Uses the JetBrains Mono variable injected by the root layout
export const MONO = "font-[family-name:var(--font-mono)]";
