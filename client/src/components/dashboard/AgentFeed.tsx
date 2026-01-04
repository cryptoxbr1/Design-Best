import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CircleDashed, Clock, XCircle, Terminal, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface LogEntry {
  id: string;
  timestamp: Date;
  source: "ORCHESTRATOR" | "AGENT-01" | "AGENT-02" | "WALLET" | "DAO" | "SYSTEM";
  message: string;
  type: "info" | "success" | "warning" | "error";
  details?: string;
}

interface AgentFeedProps {
  logs: LogEntry[];
}

export function AgentFeed({ logs }: AgentFeedProps) {
  // Auto-scroll to bottom logic would go here
  
  return (
    <div className="h-full flex flex-col bg-black/40 border border-border/50 rounded-xl overflow-hidden glass-panel">
      <div className="h-10 flex items-center px-4 border-b border-white/10 bg-white/5 justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground">
          <Terminal className="w-3.5 h-3.5" />
          <span>LIVE EXECUTION FEED</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-mono text-primary">REALTIME</span>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 font-mono text-xs md:text-sm">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex gap-3 p-2 rounded-lg border-l-2 transition-colors",
                  log.type === "info" && "border-blue-500/50 bg-blue-500/5",
                  log.type === "success" && "border-green-500/50 bg-green-500/5",
                  log.type === "warning" && "border-amber-500/50 bg-amber-500/5",
                  log.type === "error" && "border-red-500/50 bg-red-500/5"
                )}
              >
                <div className="flex-shrink-0 pt-0.5 opacity-70">
                   {log.type === "info" && <CircleDashed className="w-4 h-4 text-blue-400" />}
                   {log.type === "success" && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                   {log.type === "warning" && <Clock className="w-4 h-4 text-amber-400" />}
                   {log.type === "error" && <XCircle className="w-4 h-4 text-red-400" />}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 opacity-60 text-[10px]">
                    <span>{log.timestamp.toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
                    <span>•</span>
                    <span className={cn(
                      "font-bold",
                      log.source === "ORCHESTRATOR" && "text-purple-400",
                      log.source.startsWith("AGENT") && "text-primary",
                      log.source === "WALLET" && "text-amber-400"
                    )}>{log.source}</span>
                  </div>
                  <div className="text-foreground/90 leading-relaxed">
                    {log.message}
                  </div>
                  {log.details && (
                    <div className="mt-1 p-2 rounded bg-black/40 border border-white/5 text-muted-foreground overflow-x-auto">
                      <pre className="text-[10px]">{log.details}</pre>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {logs.length === 0 && (
            <div className="text-center py-10 text-muted-foreground opacity-50 italic">
              Awaiting system events...
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
