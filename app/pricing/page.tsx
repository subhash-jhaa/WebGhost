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
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { cn, CARD, MONO, fadeUp, staggerContainer, Button } from '@/components/landing/Primitives';
import { motion } from 'framer-motion';

const Pricing = () => {
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

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          <div className={cn(MONO, "text-zinc-500 text-sm")}>INITIALIZING...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen selection:bg-white/10">
      <Navbar />

      <main className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className={cn(MONO, "text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4")}>
              Simple Pricing
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Choose Your Plan
            </motion.h1>
            <motion.p variants={fadeUp} className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Start free and upgrade when you need more power. All plans include real-time analytics and privacy-first tracking.
            </motion.p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
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

                <Button
                  onClick={() => handlePlanSelect(plan.plan)}
                  disabled={isLoading}
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                  className="w-full group"
                >
                  {isLoading && selectedPlan === plan.plan ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  ) : (
                    <>
                      {plan.buttonText}
                      <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white tracking-tight text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-4">
              {[
                {
                  q: "Can I upgrade or downgrade anytime?",
                  a: "Yes! You can upgrade to Pro anytime. Downgrading to Free will take effect at the end of your current billing period."
                },
                {
                  q: "What happens to my data if I downgrade?",
                  a: "Your existing data is safe. You'll keep access to your first 2 projects, and we'll archive the rest until you upgrade again."
                },
                {
                  q: "Is there a free trial for Pro?",
                  a: "Yes! You can try Pro features free for 7 days. No credit card required to start."
                }
              ].map((faq, i) => (
                <div key={i} className={cn(CARD, "p-6 bg-zinc-900/30")}>
                  <h3 className="text-zinc-100 font-semibold mb-2">{faq.q}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Pricing