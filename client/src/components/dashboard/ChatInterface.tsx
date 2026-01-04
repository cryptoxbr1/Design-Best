import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Mic, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  onIntent: (text: string) => void;
  isProcessing: boolean;
}

export function ChatInterface({ onIntent, isProcessing }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isProcessing) return;
    onIntent(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative z-20">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000"></div>
        <div className="relative flex flex-col bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          
          <div className="flex items-start p-4 gap-4">
             <div className="pt-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
             </div>
             
             <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your intent naturally (e.g., 'Deploy a DAO on microchain #4 and mint 100 tokens')..."
                className="flex-1 bg-transparent border-0 focus:ring-0 text-lg font-medium placeholder:text-muted-foreground/50 resize-none min-h-[60px] py-2 outline-none font-sans"
             />

             <div className="flex flex-col gap-2 pt-1">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="rounded-full hover:bg-white/5 text-muted-foreground"
                >
                  <Mic className="w-5 h-5" />
                </Button>
             </div>
          </div>

          <div className="flex items-center justify-between px-4 pb-4 pt-2 border-t border-white/5 bg-white/[0.02]">
             <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
               <span className="flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                 System Ready
               </span>
               <span className="text-white/20">|</span>
               <span>Linera v0.12.0</span>
             </div>

             <Button 
               onClick={() => handleSubmit()} 
               disabled={!input.trim() || isProcessing}
               className={cn(
                 "rounded-xl px-6 font-semibold transition-all duration-300",
                 input.trim() ? "bg-primary text-black hover:bg-primary/90 shadow-[0_0_20px_rgba(0,240,255,0.3)]" : "bg-white/10 text-muted-foreground hover:bg-white/15"
               )}
             >
               {isProcessing ? (
                 <span className="flex items-center gap-2">
                   <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                   Processing
                 </span>
               ) : (
                 <span className="flex items-center gap-2">
                   Execute <Send className="w-4 h-4" />
                 </span>
               )}
             </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
