import type { Audience } from "./program";

export interface BootcampTrack {
  name: string;
  focus: string;
  duration: string;
  red_hat_courses?: string[];
}

export interface WorkshopFormat {
  duration: string;
  participants: string;
  outputs: string[];
}

export interface ProcessExample {
  process: string;
  before: string;
  after: string;
}

export interface ValueGate {
  between: [string, string];
  criteria: string;
}

export interface MetricCategoryRef {
  category: string;
  metrics: string[];
}

export interface OrgElement {
  id: string;
  title: string;
  type: string;
  icon: string;
  order: number;
  starts_with_phase: string;
  runs_through: string;
  cadence: string;
  audience: Audience[];
  related_phases: string[];
  content_file: string;
  summary: string;
  members?: string[];
  services?: string[];
  formats?: string[];
  activities?: string[];
  workstreams?: string[];
  rationale?: string;
  tracks?: BootcampTrack[];
  templates?: string[];
  format?: WorkshopFormat;
  approach?: string[];
  banking_examples?: ProcessExample[];
  metric_categories?: MetricCategoryRef[];
  gates?: ValueGate[];
}

export interface OrgConfig {
  elements: OrgElement[];
}
