import type { Audience } from "./program";

export interface DualRole {
  as_product: string;
  for_factory: string;
}

export interface UseCase {
  id: string;
  title: string;
  industry: string;
  icon: string;
  complexity: string;
  ai_type: string[];
  related_phases: string[];
  audience: Audience[];
  content_file: string;
  summary: string;
  why_ai_factory: string;
  factory_output: string;
  key_metrics: string[];
  dual_role?: DualRole;
}

export interface UseCasesConfig {
  use_cases: UseCase[];
}
