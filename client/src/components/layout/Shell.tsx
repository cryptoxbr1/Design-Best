import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Activity, Cpu, Menu, Bell, Search, Hexagon } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="border-r border-border bg-card/50 backdrop-blur-xl h-screen flex-shrink-0 relative z-20 flex flex-col"
      >
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <Hexagon className="w-8 h-8 text-primary animate-pulse" strokeWidth={1.5} />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 font-display font-bold text-xl tracking-wider text-white"
              >
                LINERA<span className="text-primary">.AI</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <NavItem icon={<Terminal />} label="Command Center" href="/" active={location === "/"} expanded={isSidebarOpen} />
          <NavItem icon={<Cpu />} label="Agent Swarm" href="/agents" active={location === "/agents"} expanded={isSidebarOpen} />
          <NavItem icon={<Activity />} label="Network State" href="/network" active={location === "/network"} expanded={isSidebarOpen} />
          <NavItem icon={<Shield />} label="Security Policy" href="/security" active={location === "/security"} expanded={isSidebarOpen} />
        </nav>

        <div className="p-4 border-t border-border/50">
           <div className={cn("flex items-center", isSidebarOpen ? "justify-between" : "justify-center")}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-mono text-xs">
                  US
                </div>
                {isSidebarOpen && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">User_0x82</span>
                    <span className="text-xs text-muted-foreground">Connected</span>
                  </div>
                )}
              </div>
           </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen relative overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-muted-foreground hover:text-white transition-colors">
               <Menu className="w-5 h-5" />
             </button>
             <div className="h-6 w-[1px] bg-border mx-2" />
             <div className="flex items-center gap-2 text-xs font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               MAINNET_BETA
             </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-md px-3 py-1.5 bg-black/20">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search intents...</span>
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
             </div>
             <Bell className="w-5 h-5 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, href, active, expanded }: { icon: React.ReactNode, label: string, href: string, active: boolean, expanded: boolean }) {
  return (
    <Link href={href}>
      <div className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group cursor-pointer",
        active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-white hover:bg-white/5"
      )}>
        <div className={cn("transition-transform duration-200", active && "scale-110")}>{icon}</div>
        <AnimatePresence>
          {expanded && (
            <motion.span 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="font-medium whitespace-nowrap overflow-hidden"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
        {active && expanded && (
          <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary box-shadow-neon" />
        )}
      </div>
    </Link>
  );
}
