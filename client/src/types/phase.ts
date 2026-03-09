import type { Audience } from "./program";

export interface Deliverable {
  title: string;
  description: string;
  audience: Audience[];
}

export interface Phase {
  id: string;
  title: string;
  subtitle: string;
  order: number;
  duration: string;
  status: string;
  track: string;
  icon: string;
  red_hat_engagement: string;
  audience: Audience[];
  related_org: string[];
  prerequisites: string[];
  value_gate: string;
  content_file: string;
  deliverables: Deliverable[];
  decision_points: string[];
  risks: string[];
}

export interface PhasesConfig {
  phases: Phase[];
}
