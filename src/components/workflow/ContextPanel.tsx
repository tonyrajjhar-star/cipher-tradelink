interface Props {
  whatsHappening: string;
  whatToDo: string;
  ifNothing: string;
  documents?: string[];
}

export const ContextPanel = ({ whatsHappening, whatToDo, ifNothing }: Props) => (
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
  </div>
);
