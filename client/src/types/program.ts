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

export interface Program {
  name: string;
  tagline: string;
  description: string;
  version: string;
  industry: string;
  customer_placeholder: string;
  factory_outputs: FactoryOutput[];
  tracks: Track[];
  principles: string[];
}

export interface ProgramConfig {
  program: Program;
}
