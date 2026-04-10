import { CheckCircle2, FileText } from "lucide-react";

interface Props {
  whatsHappening: string;
  whatToDo: string;
  ifNothing: string;
  documents: string[];
}

export const ContextPanel = ({ whatsHappening, whatToDo, ifNothing, documents }: Props) => (
  <div className="space-y-4">
    <div className="rounded-xl border border-border bg-card p-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">What's Happening</h4>
      <p className="text-sm text-foreground leading-relaxed">{whatsHappening}</p>
    </div>

    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">What Must You Do Next</h4>
      <p className="text-sm text-foreground leading-relaxed">{whatToDo}</p>
    </div>

    <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-3">If You Do Nothing</h4>
      <p className="text-sm text-foreground leading-relaxed">{ifNothing}</p>
    </div>

    <div className="rounded-xl border border-border bg-card p-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Documents</h4>
      <div className="space-y-2">
        {documents.map((doc) => (
          <div key={doc} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-foreground">{doc}</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
