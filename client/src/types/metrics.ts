export interface Metric {
  name: string;
  unit: string;
  target: string;
}

export interface MetricCategory {
  id: string;
  title: string;
  icon: string;
  why: string;
  metrics: Metric[];
}

export interface MetricsConfig {
  categories: MetricCategory[];
}
