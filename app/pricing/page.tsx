'use client'

import React from 'react'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { Pricing } from '@/components/landing/Pricing'

const PricingPage = () => {
  return (
    <div className="bg-black text-zinc-100 min-h-screen selection:bg-white/10">
      <Navbar />
      <main className="pt-24 pb-12">
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

export default PricingPage
