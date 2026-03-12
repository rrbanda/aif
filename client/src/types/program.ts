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
  headline_internal?: string;
  subheadline?: string;
  subheadline_internal?: string;
  description_internal?: string;
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

export interface CustomerJourneyStage {
  id: string;
  title: string;
  timeline: string;
  description: string;
}

export interface CustomerJourney {
  title: string;
  description: string;
  stages: CustomerJourneyStage[];
}

export interface CustomerValueProp {
  id: string;
  title: string;
  description: string;
}

export interface CompetitiveEntry {
  competitor: string;
  differentiator: string;
}

export interface DealQualification {
  title: string;
  ideal_customer_profile: string[];
  disqualifiers: string[];
  competitive_positioning?: CompetitiveEntry[];
}

export interface NextSteps {
  steps: string[];
  call_to_action?: string;
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
  value_propositions_customer?: CustomerValueProp[];
  benefit_pillars?: BenefitPillar[];
  factory_outputs: FactoryOutput[];
  tracks: Track[];
  customer_journey?: CustomerJourney;
  customer_why?: WhyAIFactory[];
  why_ai_factory?: WhyAIFactory[];
  deal_qualification?: DealQualification;
  platform_availability?: PlatformAvailability;
  services_package?: ServicesPackage;
  next_steps?: NextSteps;
  principles: string[];
}

export interface ProgramConfig {
  program: Program;
}

export interface PartnerContribution {
  layer: string;
  products: string[];
}

export interface Partner {
  id: string;
  name: string;
  type: string;
  tier: string;
  icon?: string;
  website?: string;
  description: string;
  contributions: PartnerContribution[];
  industries?: string[];
  key_differentiator?: string;
}

export interface PartnersConfig {
  partners: Partner[];
}
