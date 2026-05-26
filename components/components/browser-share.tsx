"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/components/ui/card";
import {
	ShareBarList,
	ShareBarListContent,
	ShareBarListFill,
	ShareBarListItem,
	ShareBarListLabel,
	ShareBarListValue,
} from "@/components/components/share-bar-list";

const browsers = [
	{ label: "Chrome", share: 58 },
	{ label: "Safari", share: 22 },
	{ label: "Edge", share: 9 },
	{ label: "Firefox", share: 7 },
	{ label: "Other", share: 4 },
] as const;

export interface BrowserShareProps {
	visitors?: { userAgent: string }[];
}

const getBrowser = (ua: string) => {
	const lowercaseUa = ua.toLowerCase();
	if (lowercaseUa.includes("chrome") && !lowercaseUa.includes("chromium") && !lowercaseUa.includes("edg")) return "Chrome";
	if (lowercaseUa.includes("safari") && !lowercaseUa.includes("chrome") && !lowercaseUa.includes("chromium")) return "Safari";
	if (lowercaseUa.includes("firefox")) return "Firefox";
	if (lowercaseUa.includes("edg")) return "Edge";
	return "Other";
};

export function BrowserShare({ visitors = [] }: BrowserShareProps) {
	const total = visitors.length;

	const browserCounts = visitors.reduce((acc: Record<string, number>, visitor) => {
		const browser = getBrowser(visitor.userAgent || "");
		acc[browser] = (acc[browser] || 0) + 1;
		return acc;
	}, { Chrome: 0, Safari: 0, Edge: 0, Firefox: 0, Other: 0 });

	const browserShares = total > 0
		? [
				{ label: "Chrome" as const, share: Math.round((browserCounts.Chrome / total) * 100) },
				{ label: "Safari" as const, share: Math.round((browserCounts.Safari / total) * 100) },
				{ label: "Edge" as const, share: Math.round((browserCounts.Edge / total) * 100) },
				{ label: "Firefox" as const, share: Math.round((browserCounts.Firefox / total) * 100) },
				{ label: "Other" as const, share: Math.round((browserCounts.Other / total) * 100) },
			].sort((a, b) => b.share - a.share)
		: browsers;

	return (
		<Card className="dark:bg-transparent">
			<CardHeader className="border-b">
				<CardTitle className="text-balance">Browsers</CardTitle>
				<CardDescription className="text-pretty">
					Share of active sessions by browser family.
				</CardDescription>
			</CardHeader>
			<CardContent className="p-0 py-1">
				<ShareBarList aria-label="Sessions by browser">
					{browserShares.map((row) => (
						<ShareBarListItem key={row.label} value={row.share}>
							<ShareBarListContent>
								<ShareBarListLabel>{row.label}</ShareBarListLabel>
								<ShareBarListValue>{row.share}%</ShareBarListValue>
							</ShareBarListContent>
							<ShareBarListFill />
						</ShareBarListItem>
					))}
				</ShareBarList>
			</CardContent>
		</Card>
	);
}
