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
  { icon: Eye, title: 'Live User Feed', desc: 'Every visitor in real time — device, browser, country. Zero delay, zero sampling.' },
  { icon: BarChart3, title: 'Referrer & Country Insights', desc: 'Know exactly where traffic comes from, which links perform, and which regions are active.' },
  { icon: Code2, title: '1-Line Script', desc: 'Integrate in seconds. One copy-paste. No bloat, no npm, no build step required.' },
  { icon: Cpu, title: 'Dev Console Mode', desc: 'Open a live analytics console in your browser. Feels like devtools, built for users.' },
  { icon: ShieldCheck, title: 'Privacy-First', desc: 'No cookies, no fingerprinting. Fully GDPR & CCPA compliant — ethical by default.' },
  { icon: Plug, title: 'Open REST API', desc: 'Fetch analytics programmatically. Build Slack bots, CLI tools, or custom dashboards.' },
];

export const STEPS = [
  { n: '01', icon: Code2, title: 'Add the Script', desc: 'Paste one line into your HTML. Works with any framework or static site.' },
  { n: '02', icon: MousePointer, title: 'Visitors Get Tracked', desc: 'Every page view captured instantly — no delay, no data loss, no sampling.' },
  { n: '03', icon: Users, title: 'Analyze & Grow', desc: 'Open your dashboard or hit the API. Understand your audience and ship with confidence.' },
];

export const TESTIMONIALS = [
  { quote: "Dropped it in 30 seconds and had live data instantly. This is exactly what indie devs need.", name: "Alex K.", handle: "@alexbuilds" },
  { quote: "Finally analytics that don't slow down my site or need GDPR consent banners. Perfect.", name: "Mia T.", handle: "@mia_codes" },
  { quote: "The dev console mode is wild. I can see users browsing in real time while I'm debugging.", name: "Ravi S.", handle: "@ravi_dev" },
];
