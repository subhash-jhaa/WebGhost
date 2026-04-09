import {
  Eye, BarChart3, Code2, Cpu, ShieldCheck, Plug,
  Globe, Users, Zap, MousePointer, Activity,
} from 'lucide-react';

export const VISITORS = [
  { flag: "US", page: "/pricing", device: "Chrome · Mac", time: "just now" },
  { flag: "DE", page: "/docs", device: "Firefox · Win", time: "3s ago" },
  { flag: "IN", page: "/dashboard", device: "Safari · iOS", time: "7s ago" },
  { flag: "GB", page: "/", device: "Edge · Win", time: "11s ago" },
  { flag: "JP", page: "/pricing", device: "Chrome · Android", time: "14s ago" },
  { flag: "BR", page: "/docs", device: "Chrome · Win", time: "18s ago" },
];

export const STATS = [
  { label: "Active Now", value: "1,284", icon: Activity, unit: "visitors" },
  { label: "Events Today", value: "94.2K", icon: Zap, unit: "+18% vs yesterday" },
  { label: "Countries", value: "112", icon: Globe, unit: "regions tracked" },
];

export const FEATURES = [
  { 
    icon: Eye, 
    title: 'Live User Feed', 
    desc: 'Every visitor in real time — device, browser, country. Zero delay, zero sampling.',
    variant: 'realtime',
    span: 4
  },
  { 
    icon: ShieldCheck, 
    title: 'Privacy-First', 
    desc: 'No cookies, no fingerprinting. Fully GDPR & CCPA compliant — ethical by default.',
    variant: 'privacy',
    span: 2
  },
  { 
    icon: Cpu, 
    title: 'Dev Console Mode', 
    desc: 'Open a live analytics console in your browser. Feels like devtools, built for users.',
    variant: 'console',
    span: 2
  },
  { 
    icon: Code2, 
    title: '1-Line Script', 
    desc: 'Integrate in seconds. One copy-paste. No bloat, no npm, no build step required.',
    variant: 'script',
    span: 4
  },
  { 
    icon: BarChart3, 
    title: 'Referrer & Country Insights', 
    desc: 'Know exactly where traffic comes from, which links perform, and which regions are active.',
    variant: 'insights',
    span: 3
  },
  { 
    icon: Plug, 
    title: 'Open REST API', 
    desc: 'Fetch analytics programmatically. Build Slack bots, CLI tools, or custom dashboards.',
    variant: 'api',
    span: 3
  },
];

export const STEPS = [
  { n: '01', icon: Code2, title: 'Add the Script', desc: 'Paste one line into your HTML. Works with any framework or static site.' },
  { n: '02', icon: MousePointer, title: 'Visitors Get Tracked', desc: 'Every page view captured instantly — no delay, no data loss, no sampling.' },
  { n: '03', icon: Users, title: 'Analyze & Grow', desc: 'Open your dashboard or hit the API. Understand your audience and ship with confidence.' },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Full Stack Developer",
    company: "TechFlow",
    content: "Dropped it in 30 seconds and had live data instantly. This is exactly what indie devs need. The privacy-first approach is exactly what I was looking for.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "Frontend Engineer",
    company: "DesignHub",
    content: "Finally analytics that don't slow down my site or need GDPR consent banners. Perfect for my portfolio and client projects.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&h=250&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Product Lead",
    company: "InnovateLabs",
    content: "The dev console mode is wild. I can see users browsing in real time while I'm debugging. It has changed how we look at user behavior.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&auto=format&fit=crop",
  },
];
