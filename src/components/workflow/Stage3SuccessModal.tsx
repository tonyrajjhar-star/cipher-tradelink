import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onProceed: () => void;
  onClose: () => void;
}

export const Stage3SuccessModal = ({ open, onProceed, onClose }: Props) => (
  <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
    <DialogContent className="max-w-lg p-0 overflow-hidden border-emerald-200">
      <div className="relative bg-gradient-to-br from-emerald-50 via-card to-card p-8 text-center">
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-[#3386C3]/20 blur-3xl" />

        <div className="relative">
          {/* Animated check */}
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
            Letter of Credit has been issued, locked for audit, and is now ready for negotiation.
            Proceed to Stage 4 to begin document verification & decisioning.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline" onClick={onClose} className="text-sm">
              Stay on Stage 3
            </Button>
            <Button
              onClick={onProceed}
              className="text-sm font-semibold gap-2 bg-gradient-to-r from-[#3386C3] to-[#1F5E8A] hover:opacity-90 text-white border-0"
            >
              Proceed to Stage 4 — Negotiating Bank
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
