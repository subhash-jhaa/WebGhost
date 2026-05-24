'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-neutral-800 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className="text-base md:text-lg font-medium text-neutral-200 group-hover:text-white transition-colors duration-200">
          {question}
        </span>
        <span className="ml-4 flex-shrink-0 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200">
          {isOpen ? (
            <Minus className="h-5 w-5 md:h-6 md:w-6" />
          ) : (
            <Plus className="h-5 w-5 md:h-6 md:w-6" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-12 text-sm md:text-base text-neutral-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does spectr track visitors without cookies?",
      answer: "We use privacy-friendly hashes and metadata that rotates daily. This means we don't store persistent identifiers on user devices and don't need cookie consent banners."
    },
    {
      question: "How easy is it to integrate spectr in my website?",
      answer: "Extremely easy. You just copy-paste a single light script tag into your HTML or install our npm library for React/Next.js/Vue."
    },
    {
      question: "Does spectr track personal data (PII)?",
      answer: "No, we are fully GDPR, CCPA, and PECR compliant. We do not track IP addresses or store any personal data."
    },
    {
      question: "What analytics metrics do you provide?",
      answer: "We show real-time visitor counts, page views, referrers, browser/device info, country/geography, and user session flows."
    },
    {
      question: "Can I export my analytics data?",
      answer: "Yes, Pro users can export all their analytics data as CSV/JSON at any time."
    }
  ];

  return (
    <section id="faq" className="relative py-24 bg-black overflow-hidden border-t border-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="inline-block text-3xl md:text-6xl font-bold bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent tracking-tight leading-tight">
            Let&apos;s Answer Your Questions
          </h2>
          <p className="max-w-lg text-sm text-neutral-400 mx-auto mt-4 leading-relaxed">
            Simplify web analytics, visitor tracking, and developer console insights with cutting-edge tools designed for modern creators.
          </p>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto divide-y divide-neutral-800">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
export default FAQ;
