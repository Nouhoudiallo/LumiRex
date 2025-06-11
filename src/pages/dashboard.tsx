import { AppSidebar } from "@/src/components/app-sidebar";
import { SiteHeader } from "@/src/components/site-header";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { cn } from "@/src/lib/utils";
import { PropsWithChildren } from "react";

// import data from "./data.json"

interface DashboardProps extends PropsWithChildren {
  className?: string;
}

export default function Dashboard({ children, className }: DashboardProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className={cn("flex flex-col justify-center items-center min-h-[calc(100vh-var(--header-height))] w-full max-w-4xl mx-auto p-6", className)}>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
