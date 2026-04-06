"use client";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/components/ui/button";
import { MobileNav } from "@/components/components/mobile-nav";

export const navLinks = [
	{
		label: "Features",
		href: "#features",
	},
	{
		label: "How It Works",
		href: "#how",
	},
	{
		label: "Code",
		href: "#code",
	},
];

export function Header() {
	return (
		<header
			className="mx-auto w-full pt-10 max-w-4xl border-b border-transparent md:rounded-md md:border md:mt-2 md:max-w-3xl bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:shadow"
		>
			<nav
				className="flex h-14 w-full items-center justify-between px-4 md:h-12 md:px-2"
			>
				<a
					className="flex items-center gap-10 rounded-md p-2 font-bold font-mono"
					href="#"
				>
					WebGhost 👻
				</a>
				<div className="hidden items-center gap-2 md:flex">
					<div>
						{navLinks.map((link) => (
							<Button key={link.label} size="sm" variant="ghost" render={<a href={link.href} />} nativeButton={false}>
                                {link.label}
							</Button>
						))}
					</div>
					<Button size="sm" variant="outline" render={<a href="/auth" />} nativeButton={false}>
						Sign In
					</Button>
					<Button size="sm" render={<a href="/auth" />} nativeButton={false}>Get Started</Button>
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
