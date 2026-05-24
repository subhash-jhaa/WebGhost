'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/components/landing/Primitives';

export function Pricing() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'PRO' | null>(null);

  const plans = [
    {
      name: 'Basic',
      price: '₹0',
      period: 'lifetime',
      description: 'Try For Free',
      features: [
        'Up to 2 projects',
        'Basic analytics feed',
        'Real-time visitor logs',
        '7-day data retention',
        'Standard support'
      ],
      limitations: [
        'Access advanced geo tracking',
        'Access advanced CSV/JSON exports',
        'Custom domain support',
        'Team collaboration'
      ],
      buttonText: 'Get Access Now',
      popular: false,
      badge: '',
      plan: 'FREE' as const
    },
    {
      name: 'Pro Lifetime',
      price: '₹4,999',
      period: 'one-time',
      description: 'Lifetime Deal',
      features: [
        'Unlimited projects',
        'Advanced analytics dashboard',
        'Geo tracking & insights',
        '30-day data retention',
        'Priority support',
        'Custom domains',
        'CSV & JSON exports',
        'Team collaboration',
        'All future updates'
      ],
      limitations: [],
      buttonText: 'Get Lifetime Access Now',
      popular: true,
      badge: 'BUSY CREATORS\' CHOICE',
      plan: 'PRO' as const
    },
    {
      name: 'Pro Annual',
      price: '₹1,999',
      period: 'per year',
      description: '1 Year Access',
      features: [
        'Unlimited projects',
        'Advanced analytics dashboard',
        'Geo tracking & insights',
        '30-day data retention',
        'Priority support',
        'Custom domains',
        'CSV & JSON exports'
      ],
      limitations: [
        'Team collaboration features',
        'All future updates guarantee'
      ],
      buttonText: 'Get Annual Access',
      popular: false,
      badge: '',
      plan: 'PRO' as const
    }
  ];

  const handlePlanSelect = async (plan: 'FREE' | 'PRO') => {
    if (!session) {
      router.push('/auth');
      return;
    }

    setSelectedPlan(plan);
    setIsLoading(true);

    try {
      if (plan === 'FREE') {
        router.push('/dashboard');
      } else if (plan === 'PRO') {
        const response = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: 'PRO'
          }),
        });

        if (response.ok) {
          const { url } = await response.json();
          window.location.href = url;
        } else {
          throw new Error('Failed to create checkout session');
        }
      }
    } catch (error) {
      console.error('Error selecting plan:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <section id="pricing" className="relative py-24 md:py-40 bg-black overflow-hidden px-4">
      
      {/* ─── Circular Radial Glow Grid Background ──────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
          style={{
            width: '1400px',
            height: '1400px',
            clipPath: 'circle(50% at 50% 50%)',
            background: 'radial-gradient(circle at center, rgba(30, 30, 30, 0.4) 0%, rgba(15, 15, 15, 0.2) 40%, rgba(0, 0, 0, 0.9) 80%)'
          }}
        >
          <div 
            className="absolute inset-0 opacity-5" 
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
              backgroundSize: '60px 120px'
            }}
          />
        </div>
        <div 
          className="absolute bg-black left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03] shadow-[0_0_200px_80px_rgba(255,255,255,0.02)]" 
          style={{ width: '1000px', height: '1000px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="inline-block text-3xl md:text-6xl font-bold bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent tracking-tight leading-tight">
            Choose Your Plan
          </h2>
          <p className="max-w-md text-sm text-neutral-400 mx-auto mt-4 leading-relaxed">
            Track visitor flows, live dashboards, and api access. Pay once for lifetime, or start with basic usage.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((p) => (
            <div 
              key={p.name}
              className={cn(
                "rounded-3xl bg-black/60 backdrop-blur-md p-8 border transition-all duration-300 relative flex flex-col justify-between",
                p.popular ? "border-neutral-700 ring-1 ring-white/10" : "border-neutral-800/80"
              )}
            >
              {p.badge && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="text-[9px] font-bold text-white tracking-widest px-4 py-1.5 rounded-full bg-gradient-to-b from-[#393939] via-[#141414] to-[#303030] shadow-md border border-neutral-700">
                    {p.badge}
                  </span>
                </div>
              )}

              <div className="flex flex-col h-full">
                {/* Upper card area */}
                <div className="mb-8">
                  <div className="inline-flex items-center font-bold justify-center px-3 py-1 rounded-lg border border-neutral-800 bg-black/40">
                    <h3 className="text-xs text-white uppercase tracking-wider">{p.name}</h3>
                  </div>
                  <p className="text-sm text-neutral-400 mt-4 font-medium">{p.description}</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-5xl font-bold text-white">{p.price}</span>
                    <span className="text-neutral-500 text-xs ml-2">/ {p.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8 flex-1">
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-300 leading-tight">{f}</span>
                    </div>
                  ))}

                  {p.limitations.map((l, i) => (
                    <div key={i} className="flex items-start gap-3 opacity-40">
                      <X className="h-4 w-4 text-neutral-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-500 leading-tight">{l}</span>
                    </div>
                  ))}
                </div>

                {/* Button container */}
                <div className="mt-auto">
                  <button
                    onClick={() => handlePlanSelect(p.plan)}
                    disabled={isLoading && selectedPlan === p.plan}
                    className={cn(
                      "w-full py-3 rounded-xl text-sm font-bold relative transition duration-200 flex items-center justify-center border border-neutral-800 shadow-md",
                      p.popular
                        ? "text-white bg-gradient-to-b from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700 [background:linear-gradient(0deg,#151515,#151515),linear-gradient(180deg,rgba(21,21,21,0)_66.3%,rgba(255,255,255,0.5)_100%)]"
                        : "text-zinc-300 bg-black hover:bg-neutral-950 border-neutral-800"
                    )}
                  >
                    {isLoading && selectedPlan === p.plan ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                    ) : (
                      p.buttonText
                    )}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
export default Pricing;