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

export interface ValueProposition {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BenefitPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  details?: string[];
}

export interface ServicePhase {
  id: string;
  title: string;
  timeline: string;
  milestone: string;
  description: string;
  details?: string[];
}

export interface ServicesPackage {
  title: string;
  subtitle: string;
  description: string;
  phases: ServicePhase[];
}

export interface PlatformAvailability {
  current: { name: string; status: string };
  upcoming: { name: string; status: string; note?: string };
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
  value_propositions?: ValueProposition[];
  benefit_pillars?: BenefitPillar[];
  factory_outputs: FactoryOutput[];
  tracks: Track[];
  why_ai_factory?: WhyAIFactory[];
  platform_availability?: PlatformAvailability;
  services_package?: ServicesPackage;
  next_steps?: string[];
  principles: string[];
}

export interface ProgramConfig {
  program: Program;
}
