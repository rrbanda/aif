export interface Role {
  id: string;
  title: string;
  organization: string;
  description: string;
  phases: string[];
}

export interface RolesConfig {
  roles: Role[];
}
