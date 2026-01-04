import React, { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { ChatInterface } from "@/components/dashboard/ChatInterface";
import { AgentFeed, LogEntry } from "@/components/dashboard/AgentFeed";
import { MicrochainVisualizer } from "@/components/dashboard/MicrochainVisualizer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Wallet, Coins, Layers, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeChain, setActiveChain] = useState<string | null>("USER-MAIN");
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      timestamp: new Date(),
      source: "SYSTEM",
      message: "Microchain Client Initialized",
      type: "info",
      details: "Connected to Linera Devnet (Chain ID: 89a...2b)"
    }
  ]);

  const handleIntent = (text: string) => {
    setIsProcessing(true);
    
    // Simulate initial receipt
    addLog("ORCHESTRATOR", "Receiving intent...", "info");
    
    setTimeout(() => {
      addLog("AI-PARSER", "Intent parsed: { action: 'MINT_DAO_PROPOSAL', target: 'DAO-GOV' }", "success");
      setActiveChain("AGENT-01");
      
      setTimeout(() => {
        addLog("AGENT-01", "Verifying policy constraints for User_0x82", "info");
        
        setTimeout(() => {
          addLog("AGENT-01", "Constructing multi-chain transaction...", "warning");
          setActiveChain("DAO-GOV");
          
          setTimeout(() => {
             addLog("DAO-GOV", "Proposal Created: 'Upgrade Protocol v2'", "success", "TxHash: 0x992...aa");
             setIsProcessing(false);
             setActiveChain("USER-MAIN");
          }, 1500);
        }, 1200);
      }, 1000);
    }, 800);
  };

  const addLog = (source: LogEntry["source"] | string, message: string, type: LogEntry["type"], details?: string) => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(),
      timestamp: new Date(),
      source: source as any,
      message,
      type,
      details
    }]);
  };

  return (
    <Shell>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
        
        {/* Left Column: Visualizer & Chat */}
        <div className="lg:col-span-8 flex flex-col gap-6 h-full">
           
           {/* Top: Stats/Wallet */}
           <div className="grid grid-cols-3 gap-4 h-32 flex-shrink-0">
              <Card className="bg-card/50 border-white/5 backdrop-blur-sm p-4 relative overflow-hidden group hover:border-primary/50 transition-colors">
                 <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Wallet className="w-12 h-12 text-primary" />
                 </div>
                 <div className="text-muted-foreground text-xs font-mono uppercase tracking-widest mb-1">Total Balance</div>
                 <div className="text-3xl font-display font-bold text-white mb-2">1,240.50 <span className="text-lg text-primary">LIN</span></div>
                 <div className="flex items-center gap-2 text-green-400 text-xs font-mono">
                    <Activity className="w-3 h-3" /> +12.5% this epoch
                 </div>
              </Card>

              <Card className="bg-card/50 border-white/5 backdrop-blur-sm p-4 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                 <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Layers className="w-12 h-12 text-purple-500" />
                 </div>
                 <div className="text-muted-foreground text-xs font-mono uppercase tracking-widest mb-1">Active Chains</div>
                 <div className="text-3xl font-display font-bold text-white mb-2">4 <span className="text-lg text-purple-500">/ 12</span></div>
                 <div className="flex items-center gap-2 text-purple-400 text-xs font-mono">
                    2 Agents Active
                 </div>
              </Card>

              <Card className="bg-card/50 border-white/5 backdrop-blur-sm p-4 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
                 <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Coins className="w-12 h-12 text-amber-500" />
                 </div>
                 <div className="text-muted-foreground text-xs font-mono uppercase tracking-widest mb-1">Pending Actions</div>
                 <div className="text-3xl font-display font-bold text-white mb-2">0</div>
                 <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                    All systems nominal
                 </div>
              </Card>
           </div>

           {/* Middle: Visualizer */}
           <div className="flex-1 min-h-[300px] relative rounded-2xl border border-white/10 overflow-hidden bg-black/40">
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                 <Badge variant="outline" className="bg-black/50 backdrop-blur border-primary/20 text-primary font-mono text-[10px]">
                    LIVE VISUALIZATION
                 </Badge>
              </div>
              <MicrochainVisualizer activeChain={activeChain} />
           </div>

           {/* Bottom: Chat */}
           <div className="flex-shrink-0">
              <ChatInterface onIntent={handleIntent} isProcessing={isProcessing} />
           </div>
        </div>

        {/* Right Column: Feed */}
        <div className="lg:col-span-4 h-full">
           <AgentFeed logs={logs} />
        </div>

      </div>
    </Shell>
  );
}
