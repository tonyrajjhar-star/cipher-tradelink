import { useState } from "react";
import { CheckCircle2, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onProceed: () => void;
  onClose: () => void;
  trackerId?: string;
}

export const Stage3SuccessModal = ({ open, onClose, trackerId = "TRK-NEG-2026-0841" }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(trackerId);
    setCopied(true);
    toast({ title: "Copied", description: `${trackerId} copied to clipboard.` });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-emerald-200">
        <div className="relative bg-gradient-to-br from-emerald-50 via-card to-card p-8 text-center">
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-emerald-300/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-[#3386C3]/20 blur-3xl" />

          <div className="relative">
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl mb-5 animate-scale-in relative">
              <CheckCircle2 className="w-14 h-14 text-white drop-shadow-lg" strokeWidth={2.2} />
              <span className="absolute inset-0 rounded-full border-4 border-emerald-400/40 animate-ping" />
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 animate-pulse" />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700 mb-2">
              Stage 3 Complete
            </p>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight mb-2">
              LC Issuance Completed Successfully
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Letter of Credit has been issued and locked for audit.
            </p>

            {/* Tracker ID with copy */}
            <div className="mt-6 mx-auto max-w-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Generated Tracker ID
              </p>
              <div className="flex items-center gap-2 p-3 rounded-xl border-2 border-dashed border-[#3386C3]/40 bg-[#3386C3]/5">
                <code className="flex-1 text-base font-mono font-bold text-[#1F5E8A] tracking-wider">
                  {trackerId}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="gap-1.5 text-xs border-[#3386C3]/40 text-[#1F5E8A] hover:bg-[#3386C3]/10"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                Please copy and enter it as <span className="font-semibold text-foreground">Tracker ID</span> in the
                <span className="font-semibold text-foreground"> Negotiating Bank — Document Verification</span> section.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
