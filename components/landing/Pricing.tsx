'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { 
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { cn, CARD, MONO, fadeUp, staggerContainer, Button } from '@/components/landing/Primitives';
import { motion } from 'framer-motion';

export function Pricing() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'PRO' | null>(null)

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: '/mo',
      description: 'Perfect for getting started',
      features: [
        'Up to 2 projects',
        'Basic analytics',
        'Real-time visitor tracking',
        '7-day data retention',
        'Standard support'
      ],
      limitations: [
        'No geo tracking',
        'No advanced exports',
        'No custom domains'
      ],
      buttonText: 'Get Started Free',
      popular: false,
      plan: 'FREE' as const
    },
    {
      name: 'Pro',
      price: '₹499',
      period: '/mo',
      description: 'For serious developers and teams',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Geo tracking & insights',
        '30-day data retention',
        'Priority support',
        'Custom domains',
        'Data exports',
        'Team collaboration'
      ],
      limitations: [],
      buttonText: 'Upgrade to Pro',
      popular: true,
      plan: 'PRO' as const
    }
  ]

  const handlePlanSelect = async (plan: 'FREE' | 'PRO') => {
    if (!session) {
      router.push('/auth')
      return
    }

    setSelectedPlan(plan)
    setIsLoading(true)

    try {
      if (plan === 'FREE') {
        router.push('/dashboard')
      } else if (plan === 'PRO') {
        const response = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: 'PRO'
          }),
        })

        if (response.ok) {
          const { url } = await response.json()
          window.location.href = url
        } else {
          throw new Error('Failed to create checkout session')
        }
      }
    } catch (error) {
      console.error('Error selecting plan:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
      setSelectedPlan(null)
    }
  }

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className={cn(MONO, "text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4")}>
            Simple Pricing
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Choose Your Plan
          </motion.h2>
          <motion.p variants={fadeUp} className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Start free and upgrade when you need more power. All plans include real-time analytics and privacy-first tracking.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              custom={i}
              className={cn(
                CARD,
                "relative p-8 flex flex-col shadow-2xl transition-all duration-300",
                plan.popular ? "border-zinc-500/50 bg-zinc-900/60 ring-1 ring-zinc-500/10" : "bg-zinc-900/40"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-6">
                  <span className="bg-zinc-100 text-zinc-950 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-xl shadow-black/20">
                    <SparklesIcon className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className={cn(MONO, "text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2")}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-500 font-medium">{plan.period}</span>
                </div>
                <p className="mt-4 text-zinc-400 text-sm leading-relaxed">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-6 mb-8">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckIcon className="h-4 w-4 text-zinc-100 mt-0.5 shrink-0" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="pt-6 border-t border-zinc-800 space-y-3">
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start gap-3 opacity-50">
                        <XMarkIcon className="h-4 w-4 text-zinc-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-zinc-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <Button
                variant={plan.popular ? 'default' : 'outline'}
                size="lg"
                className="w-full justify-between group"
                onClick={() => handlePlanSelect(plan.plan)}
                disabled={isLoading && selectedPlan === plan.plan}
              >
                {isLoading && selectedPlan === plan.plan ? (
                  <div className="w-full flex justify-center py-0.5">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                  </div>
                ) : (
                  <>
                    <span>{plan.buttonText}</span>
                    <ArrowRightIcon className={cn(
                      "h-4 w-4 transition-transform",
                      plan.popular ? "group-hover:translate-x-1" : ""
                    )} />
                  </>
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}