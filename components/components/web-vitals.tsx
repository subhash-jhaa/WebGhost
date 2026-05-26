import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/components/delta";

const vitals = [
	{
		label: "LCP",
		name: "Largest Contentful Paint",
		value: "1.9s",
		delta: 120,
		deltaLabel: "faster vs prior month",
		suffix: "ms",
	},
	{
		label: "INP",
		name: "Interaction to Next Paint",
		value: "142ms",
		delta: 18,
		deltaLabel: "faster vs prior month",
		suffix: "ms",
	},
	{
		label: "CLS",
		name: "Cumulative Layout Shift",
		value: "0.04",
		delta: 0.07,
		deltaLabel: "lower vs prior month",
		suffix: "",
	},
] as const;

export function WebVitals() {
	return (
		<Card className="md:col-span-2 lg:col-span-4 dark:bg-transparent">
			<CardHeader className="border-b">
				<CardTitle className="text-balance">Core Web Vitals</CardTitle>
				<CardDescription className="text-pretty">
					Field experience on real sessions, measured at the origin.
				</CardDescription>
			</CardHeader>
			<CardContent className="py-12">
				<div className="text-center text-muted-foreground font-mono text-xs max-w-md mx-auto">
					No Web Vitals telemetry received. Add the tracking script to your site header to automatically monitor Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).
				</div>
			</CardContent>
		</Card>
	);
}
