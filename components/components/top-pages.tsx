import { formatInteger } from "@/components/components/formater";
import { Button } from "@/components/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/components/ui/table";
import { ArrowRightIcon } from "lucide-react";



export interface TopPagesProps {
	visitors?: { pageUrl: string }[];
}

const getPagePath = (url: string) => {
	try {
		return new URL(url).pathname;
	} catch {
		return url || "/";
	}
};

export function TopPages({ visitors = [] }: TopPagesProps) {
	const pageCounts = visitors.reduce((acc: Record<string, number>, visitor) => {
		const path = getPagePath(visitor.pageUrl || "");
		acc[path] = (acc[path] || 0) + 1;
		return acc;
	}, {});

	const pageRows = Object.entries(pageCounts).map(([path, visits]) => ({
		path,
		visits,
		delta: 0
	})).sort((a, b) => b.visits - a.visits);

	const displayRows = pageRows.slice(0, 5);

	return (
		<Card className="relative md:col-span-2 dark:bg-transparent">
			<CardHeader>
				<CardTitle className="text-balance">Top pages</CardTitle>
				<CardDescription className="text-pretty">
					Active pages ranked by current session visits.
				</CardDescription>
			</CardHeader>
			<CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
				<Table className="border-t">
					<TableCaption className="sr-only">
						Top landing pages by visits with year-over-year change.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6" scope="col">
								Path
							</TableHead>
							<TableHead className="text-end tabular-nums" scope="col">
								Visits
							</TableHead>
							<TableHead className="pr-6 text-end" scope="col">
								Change
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{displayRows.length > 0 ? (
							displayRows.map((row) => (
								<TableRow className="hover:bg-transparent" key={row.path}>
									<TableCell className="max-w-[200px] truncate pl-6 font-medium">
										<span className="w-max rounded border border-border bg-muted/50 px-1 py-px text-xs">
											{row.path}
										</span>
									</TableCell>
									<TableCell className="text-end text-muted-foreground text-xs tabular-nums">
										{formatInteger(row.visits)}
									</TableCell>
									<TableCell className="pr-6 text-end text-muted-foreground text-xs">
										<span className="tabular-nums">
											{row.delta > 0 ? "+" : ""}
											{row.delta}%
										</span>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={3} className="text-center py-8 text-muted-foreground font-mono text-xs">
									No active sessions.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>

			<div className="mask-t-from-30% absolute inset-x-0 bottom-0 flex h-1/5 items-center justify-center bg-background">
				<Button className="relative" variant="ghost" render={<a href="#" />} nativeButton={false}>View All
                						<ArrowRightIcon aria-hidden="true" /></Button>
			</div>
		</Card>
	);
}
