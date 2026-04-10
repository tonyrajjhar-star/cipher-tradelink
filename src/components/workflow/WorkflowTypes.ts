export type StageStatus = "completed" | "active" | "pending" | "failed" | "hold";

export interface Stage {
  id: number;
  title: string;
  status: StageStatus;
  confidence?: number;
  lastAction?: string;
}

export interface ValidationStep {
  label: string;
  status: "completed" | "running" | "pending" | "failed" | "hold";
  duration?: string;
  explanation: string;
}

export interface LCDocument {
  name: string;
  type: string;
  size: string;
  date: string;
}
