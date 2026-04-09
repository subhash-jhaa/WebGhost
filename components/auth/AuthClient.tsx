'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LogoMark } from '@/components/landing/Logo';
import { cn, MONO } from '@/components/landing/Primitives';
import { motion, AnimatePresence } from 'framer-motion';

const Noise = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] z-[1]" 
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
  />
);

const BracketIcon = ({ className, active }: { className?: string, active?: boolean }) => (
  <motion.svg 
    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" 
    className={className}
    animate={{ opacity: active ? 1 : 0.7, scale: active ? 1.05 : 1 }}
    transition={{ duration: 0.2 }}
  >
    <path d="M2 10V5C2 3.34315 3.34315 2 5 2H10" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </motion.svg>
);

const OAuthButton = ({ provider, icon, label }: { provider: string, icon: React.ReactNode, label: string }) => (
  <button
    onClick={() => signIn(provider, { callbackUrl: '/dashboard' })}
    className="flex-1 flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 active:scale-[0.98] text-black py-3 rounded-lg transition-all duration-200 text-sm font-bold shadow-sm"
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default function AuthClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [isFocused, setIsFocused] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");

  const handleInitialClick = () => {
    setShowEmailInput(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#121212] flex items-center justify-center overflow-hidden selection:bg-white/10 selection:text-white">
      <Noise />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[440px] px-10 py-12 flex flex-col items-center bg-[#22272e] rounded-2xl shadow-2xl border border-white/5"
      >
        {/* Logo & Branding */}
        <div className="flex items-center gap-2.5 mb-8">
          <LogoMark size={32} />
          <span className={cn(MONO, "text-xl font-bold text-white tracking-tight")}>spectr</span>
        </div>

        {/* Heading */}
        <h3 className="text-[17px] font-medium text-zinc-400 text-center mb-10 tracking-tight">
         Sign in to access your analytics dashboard
        </h3>

        {/* Error Messages */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-8 text-center"
          >
            <p className="text-red-400 text-xs font-medium uppercase tracking-wider">
              {error === 'OAuthSignin' || error === 'OAuthCallback' 
                ? 'Authentication Failed' 
                : error === 'OAuthAccountNotLinked'
                ? 'Email already linked to another provider'
                : 'Something went wrong. Please try again.'}
            </p>
          </motion.div>
        )}

        {/* OAuth Buttons Row */}
        <div className="flex w-full gap-4 mb-8 text-center">
          <OAuthButton 
            provider="google" 
            label="Google"
            icon={<svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>}
          />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-10" />

        {/* Email Section */}
        <div className="w-full flex flex-col items-center">
           <AnimatePresence mode="wait">
             {!showEmailInput ? (
               <motion.button
                 key="initial-button"
                 initial={{ opacity: 0, y: 5 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 onClick={handleInitialClick}
                 className="w-full bg-white text-zinc-950 hover:bg-zinc-100 active:scale-[0.98] py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
               >
                 Continue with Email
               </motion.button>
             ) : (
               <motion.div 
                 key="email-input-reveal"
                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 className="relative w-full p-6"
               >
                  {/* Corner Brackets */}
                  <BracketIcon className="absolute top-0 left-0" active={isFocused} />
                  <BracketIcon className="absolute top-0 right-0 rotate-90" active={isFocused} />
                  <BracketIcon className="absolute bottom-0 left-0 -rotate-90" active={isFocused} />
                  <BracketIcon className="absolute bottom-0 right-0 rotate-180" active={isFocused} />
                  
                  <div className="space-y-4">
                    <input 
                      type="email"
                      name="email"
                      autoFocus
                      autoComplete="email"
                      placeholder="name@company.com"
                      className="w-full bg-zinc-900/50 text-white placeholder-zinc-500 text-center border border-white/10 focus:border-white/20 rounded-lg focus:outline-none py-3 text-sm transition-all duration-300"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button 
                      className="w-full bg-white text-zinc-950 hover:bg-zinc-200 py-3.5 rounded-lg text-sm font-bold transition-all duration-200"
                    >
                      Sign In
                    </button>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Footer Text from Image */}
        <div className="mt-12 text-zinc-500 text-sm font-medium opacity-60">
          Privacy-first analytics for developers
        </div>

        <Link href="/" className="mt-8 text-zinc-600 hover:text-zinc-400 transition-colors text-xs flex items-center gap-2">
           <span className="h-px w-4 bg-zinc-800" />
           Back to home
           <span className="h-px w-4 bg-zinc-800" />
        </Link>
      </motion.div>
    </div>
  )
}
