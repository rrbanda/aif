export type Audience = "customer" | "internal";

export interface FactoryOutput {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
}

export interface HeroStat {
  value: string;
  label: string;
  source?: string;
}

export interface Hero {
  headline: string;
  subheadline?: string;
  stats?: HeroStat[];
}

export interface WhyAIFactory {
  title: string;
  description: string;
}

export interface Program {
  name: string;
  tagline: string;
  description: string;
  version: string;
  industry_lead?: string;
  industries?: string[];
  /** @deprecated Use industry_lead instead */
  industry?: string;
  customer_placeholder: string;
  hero?: Hero;
  factory_outputs: FactoryOutput[];
  tracks: Track[];
  why_ai_factory?: WhyAIFactory[];
  principles: string[];
}

export interface ProgramConfig {
  program: Program;
}
