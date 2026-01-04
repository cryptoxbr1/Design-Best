import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function MicrochainVisualizer({ activeChain }: { activeChain?: string | null }) {
  const chains = [
    { id: "USER-MAIN", x: 50, y: 50, type: "user" },
    { id: "AGENT-01", x: 30, y: 20, type: "agent" },
    { id: "AGENT-02", x: 70, y: 20, type: "agent" },
    { id: "DAO-GOV", x: 80, y: 60, type: "dao" },
    { id: "NFT-STORE", x: 20, y: 70, type: "app" },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden bg-black/20 rounded-xl border border-white/5">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)]" />
       
       {/* Connections */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <motion.line x1="50%" y1="50%" x2="30%" y2="20%" stroke="#00f0ff" strokeWidth="1" />
          <motion.line x1="50%" y1="50%" x2="70%" y2="20%" stroke="#00f0ff" strokeWidth="1" />
          <motion.line x1="50%" y1="50%" x2="80%" y2="60%" stroke="#bd00ff" strokeWidth="1" />
          <motion.line x1="50%" y1="50%" x2="20%" y2="70%" stroke="#ffb800" strokeWidth="1" />
       </svg>

       {/* Nodes */}
       {chains.map((chain) => (
         <motion.div
           key={chain.id}
           className="absolute w-16 h-16 -ml-8 -mt-8 flex flex-col items-center justify-center group cursor-pointer"
           style={{ left: `${chain.x}%`, top: `${chain.y}%` }}
           whileHover={{ scale: 1.1 }}
         >
           <div className={cn(
             "w-10 h-10 rounded-full border-2 flex items-center justify-center bg-black/80 backdrop-blur-sm z-10 transition-all duration-300 relative",
             activeChain === chain.id ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-110" : 
             chain.type === "user" ? "border-primary text-primary" :
             chain.type === "agent" ? "border-cyan-400 text-cyan-400" :
             chain.type === "dao" ? "border-purple-500 text-purple-500" :
             "border-amber-500 text-amber-500"
           )}>
             {activeChain === chain.id && (
               <motion.div 
                 layoutId="pulse"
                 className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping"
               />
             )}
             <span className="text-[10px] font-mono font-bold">{chain.id.substring(0, 2)}</span>
           </div>
           
           <div className="mt-2 text-[10px] font-mono text-muted-foreground opacity-50 group-hover:opacity-100 bg-black/60 px-2 py-0.5 rounded border border-white/10">
              {chain.id}
           </div>
         </motion.div>
       ))}
    </div>
  );
}

// Simple utility for CN since we can't import the one from utils inside this file block efficiently without separate read
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
