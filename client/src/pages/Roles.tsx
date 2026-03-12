import { useConfig } from "../hooks/useConfig";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import type { RolesConfig, ViewMode } from "../types";
import {
  Card,
  CardTitle,
  CardBody,
  Gallery,
  GalleryItem,
  Badge,
} from "@patternfly/react-core";

const ORG_LABELS: Record<string, string> = {
  "red-hat": "Red Hat",
  customer: "Customer",
  joint: "Joint",
};

const ORG_ORDER = ["red-hat", "customer", "joint"] as const;

export default function Roles({ viewMode }: { viewMode: ViewMode }) {
  const { data, loading, error } = useConfig<RolesConfig>("roles");

  const groups = data?.roles
    ? ORG_ORDER.reduce<Record<string, typeof data.roles>>((acc, org) => {
        acc[org] = data.roles.filter((r) => r.organization === org);
        return acc;
      }, {})
    : {};

  return (
    <ApplicationsPage
      title="Roles & Responsibilities"
      description={
        viewMode === "customer"
          ? "Your team and Red Hat's team — who does what at each stage"
          : "Key roles across the AI Factory program — use for resource planning and SOW scoping"
      }
      loading={loading}
      error={error}
      empty={
        !loading && !error && !data?.roles?.length
          ? "No roles configured"
          : null
      }
    >
      {ORG_ORDER.map((org) => {
        const roles = groups[org];
        if (!roles?.length) return null;

        return (
          <div key={org} className="pf-v6-u-mb-xl">
            <h2 className="pf-v6-c-title pf-m-lg pf-v6-u-mb-md">
              {ORG_LABELS[org] ?? org} Team
            </h2>
            <Gallery hasGutter>
              {roles.map((role) => (
                <GalleryItem key={role.id}>
                  <Card>
                    <CardTitle>{role.title}</CardTitle>
                    <CardBody>
                      <p className="pf-v6-u-mb-sm">{role.description}</p>
                      <div className="pf-v6-u-mt-sm">
                        {role.phases.map((p) => (
                          <Badge key={p} isRead className="pf-v6-u-mr-xs">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </GalleryItem>
              ))}
            </Gallery>
          </div>
        );
      })}
    </ApplicationsPage>
  );
}
