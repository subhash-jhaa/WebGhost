import { cn } from "@/components/lib/utils";
import { SidebarInset, SidebarProvider } from "@/components/components/ui/sidebar";
import { AppHeader } from "@/components/components/app-header";
import { AppSidebar } from "@/components/components/app-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider
			className={cn(
				"[--app-wrapper-max-width:80rem]",
				"[--app-header-height:3rem]"
			)}
		>
			<AppSidebar />
			<SidebarInset className="bg-muted dark:bg-background">
				<AppHeader />
				<div
					className={cn(
						"flex flex-1 flex-col p-4 md:p-6",
						"mx-auto w-full max-w-(--app-wrapper-max-width)"
					)}
				>
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
