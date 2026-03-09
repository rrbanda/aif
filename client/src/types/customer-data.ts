export interface CustomerSummary {
  id: string;
  name: string;
  industry: string;
  tier: string;
  region: string;
  current_phase: string;
  overall_readiness: string;
}

export interface CustomerAccount {
  account: {
    id: string;
    name: string;
    industry: string;
    tier: string;
    region: string;
    openshift_version?: string;
    created: string;
    updated: string;
  };
  contacts: Array<{ name: string; role: string; engagement: string }>;
  red_hat_team: Record<string, string>;
  program_state: {
    current_phase: string;
    phases_completed: Array<{
      id: string;
      completed_date: string;
      value_gate_passed: boolean;
      deliverables: string[];
    }>;
    phases_in_progress: Array<{
      id: string;
      started_date: string;
      target_date?: string;
      completion_pct: number;
    }>;
  };
  assessment: {
    overall_readiness?: string;
    data_readiness?: string;
    org_maturity?: string;
    team_readiness?: string;
    infra_readiness?: string;
    use_case_pipeline?: string;
    assessment_date?: string;
  };
  use_cases: Array<{
    id: string;
    name: string;
    status: string;
    priority: number;
    business_impact_score: number;
    complexity_score: number;
    qualified: boolean;
  }>;
  models: Array<{
    id: string;
    name: string;
    use_case: string;
    status: string;
    type: string;
    deployed_date?: string;
    endpoint?: string;
    metrics?: Record<string, number>;
  }>;
  engagement: Record<string, unknown>;
}

export interface ModelRecord {
  id: string;
  name: string;
  use_case_id: string;
  model_type: string;
  framework: string;
  version: string;
  description: string;
  status: string;
  created: string;
  updated: string;
  lifecycle_history: Array<{
    stage: string;
    timestamp: string;
    actor: string;
    notes: string;
  }>;
  metrics: Record<string, unknown>;
  governance: {
    bias_tested: boolean;
    security_scanned: boolean;
    performance_validated: boolean;
    data_lineage_documented: boolean;
    model_card_completed: boolean;
    risk_classification: string;
    approvals: unknown[];
  };
  deployment: Record<string, unknown>;
}

export interface UseCaseRecord {
  id: string;
  name: string;
  description: string;
  business_unit: string;
  sponsor: string;
  stage: string;
  priority: number;
  scores: {
    business_impact: number;
    complexity: number;
    data_readiness: number;
  };
  estimated_value_usd: number;
  dependencies: string[];
  kpis: Record<string, unknown>;
  lifecycle_history: Array<{
    stage: string;
    timestamp: string;
    notes: string;
  }>;
  created: string;
  updated: string;
}

export interface MetricsEntry {
  entries: Array<{
    timestamp: string;
    accuracy: number;
    latency_p95_ms: number;
    throughput_rps: number;
    drift_score: number;
    error_rate: number;
    data_quality_score: number;
  }>;
}

export interface DeliverableSummary {
  filename: string;
  title: string;
  size: number;
}
