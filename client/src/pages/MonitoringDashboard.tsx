import { useState } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  Label,
  Split,
  SplitItem,
  EmptyState,
  EmptyStateBody,
  Select,
  SelectOption,
  SelectList,
  MenuToggle,
  Flex,
  FlexItem,
  Gallery,
  GalleryItem,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Alert,
  Icon,
} from "@patternfly/react-core";
import ExclamationTriangleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon";
import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";
import {
  useCustomers,
  useCustomerModels,
  useCustomerAccount,
} from "../hooks/useCustomerData";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import type { ViewMode } from "../types";

function MetricBar({
  label,
  value,
  max,
  threshold,
  unit,
  inverse,
}: {
  label: string;
  value: number;
  max: number;
  threshold: number;
  unit: string;
  inverse?: boolean;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const isOk = inverse ? value <= threshold : value >= threshold;
  const color = isOk
    ? "var(--pf-t--global--color--status--success--default)"
    : "var(--pf-t--global--color--status--danger--default)";

  return (
    <div className="pf-v6-u-mb-sm">
      <Flex justifyContent={{ default: "justifyContentSpaceBetween" }}>
        <FlexItem>
          <small>{label}</small>
        </FlexItem>
        <FlexItem>
          <small style={{ fontWeight: 600 }}>
            {value.toFixed(value < 10 ? 2 : 0)}
            {unit}
          </small>
        </FlexItem>
      </Flex>
      <div
        style={{
          width: "100%",
          height: 6,
          background: "var(--pf-t--global--border--color--default)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: 3,
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>
  );
}

export default function MonitoringDashboard({ viewMode }: { viewMode: ViewMode }) {
  const { customers, loading: custLoading } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [custSelectOpen, setCustSelectOpen] = useState(false);
  const { models, loading: modelsLoading } = useCustomerModels(
    selectedCustomer || undefined
  );
  const { data: account } = useCustomerAccount(selectedCustomer || undefined);

  const acctModels = account?.models ?? [];
  const deployedModels = models.length > 0
    ? models.filter(
        (m) =>
          m.status === "deployed" || m.status === "monitored"
      )
    : acctModels.filter(
        (m) => m.status === "deployed" || m.status === "monitored"
      );

  return (
    <ApplicationsPage
      title="Model Monitoring"
      description="Production model health, metrics, and anomaly detection"
      loading={custLoading}
    >
      <Split hasGutter className="pf-v6-u-mb-lg">
        <SplitItem>
          <Select
            id="cust-select-monitoring"
            isOpen={custSelectOpen}
            selected={selectedCustomer}
            onSelect={(_e, value) => {
              setSelectedCustomer(value as string);
              setCustSelectOpen(false);
            }}
            onOpenChange={setCustSelectOpen}
            toggle={(toggleRef) => (
              <MenuToggle
                ref={toggleRef}
                onClick={() => setCustSelectOpen(!custSelectOpen)}
                isExpanded={custSelectOpen}
                style={{ minWidth: "280px" }}
              >
                {selectedCustomer
                  ? customers.find((c) => c.id === selectedCustomer)?.name ??
                    selectedCustomer
                  : "Select customer..."}
              </MenuToggle>
            )}
          >
            <SelectList>
              {customers.map((c) => (
                <SelectOption key={c.id} value={c.id}>
                  {c.name}
                </SelectOption>
              ))}
            </SelectList>
          </Select>
        </SplitItem>
        {deployedModels.length > 0 && (
          <SplitItem>
            <Label isCompact color="green">
              {deployedModels.length} active model
              {deployedModels.length !== 1 ? "s" : ""}
            </Label>
          </SplitItem>
        )}
      </Split>

      {!selectedCustomer && (
        <EmptyState titleText="Select a customer" headingLevel="h3">
          <EmptyStateBody>
            Choose a customer to monitor their deployed models.
          </EmptyStateBody>
        </EmptyState>
      )}

      {selectedCustomer && modelsLoading && (
        <EmptyState titleText="Loading..." headingLevel="h3" />
      )}

      {selectedCustomer && !modelsLoading && deployedModels.length === 0 && (
        <EmptyState titleText="No deployed models" headingLevel="h3">
          <EmptyStateBody>
            No models are currently deployed or monitored.
          </EmptyStateBody>
        </EmptyState>
      )}

      {deployedModels.length > 0 && (
        <Gallery hasGutter minWidths={{ default: "350px" }}>
          {deployedModels.map((model) => {
            const m = model as Record<string, unknown>;
            const metrics = (m.metrics ?? {}) as Record<string, number>;
            const accuracy = metrics.accuracy ?? metrics.f1_score ?? 0;
            const latency = metrics.latency_p95_ms ?? 0;
            const throughput = metrics.throughput_rps ?? 0;
            const drift = metrics.drift_score ?? 0;
            const errorRate = metrics.error_rate ?? 0;

            const alerts: string[] = [];
            if (accuracy > 0 && accuracy < 0.85) alerts.push("Accuracy below SLA");
            if (latency > 200) alerts.push("Latency exceeds 200ms P95");
            if (drift > 0.3) alerts.push("Data drift detected");
            if (errorRate > 0.01) alerts.push("Error rate elevated");

            const isHealthy = alerts.length === 0;

            return (
              <GalleryItem key={(m.id as string) ?? ""}>
                <Card>
                  <CardTitle>
                    <Flex justifyContent={{ default: "justifyContentSpaceBetween" }}>
                      <FlexItem>
                        <strong>{(m.name as string) ?? (m.id as string)}</strong>
                      </FlexItem>
                      <FlexItem>
                        {isHealthy ? (
                          <Icon status="success" size="md">
                            <CheckCircleIcon />
                          </Icon>
                        ) : (
                          <Icon status="warning" size="md">
                            <ExclamationTriangleIcon />
                          </Icon>
                        )}
                      </FlexItem>
                    </Flex>
                  </CardTitle>
                  <CardBody>
                    <Label
                      isCompact
                      color={m.status === "monitored" ? "green" : "blue"}
                      className="pf-v6-u-mb-sm"
                    >
                      {m.status as string}
                    </Label>

                    {alerts.map((a, i) => (
                      <Alert
                        key={i}
                        variant="warning"
                        title={a}
                        isInline
                        isPlain
                        className="pf-v6-u-mb-xs"
                      />
                    ))}

                    <div className="pf-v6-u-mt-md">
                      {accuracy > 0 && (
                        <MetricBar
                          label="Accuracy"
                          value={accuracy}
                          max={1}
                          threshold={0.85}
                          unit=""
                        />
                      )}
                      {latency > 0 && (
                        <MetricBar
                          label="Latency P95"
                          value={latency}
                          max={500}
                          threshold={200}
                          unit="ms"
                          inverse
                        />
                      )}
                      {throughput > 0 && (
                        <MetricBar
                          label="Throughput"
                          value={throughput}
                          max={5000}
                          threshold={100}
                          unit=" rps"
                        />
                      )}
                      {drift > 0 && (
                        <MetricBar
                          label="Drift Score"
                          value={drift}
                          max={1}
                          threshold={0.3}
                          unit=""
                          inverse
                        />
                      )}
                      {errorRate > 0 && (
                        <MetricBar
                          label="Error Rate"
                          value={errorRate * 100}
                          max={10}
                          threshold={1}
                          unit="%"
                          inverse
                        />
                      )}
                    </div>

                    <DescriptionList isCompact className="pf-v6-u-mt-md">
                      {!!m.use_case_id && (
                        <DescriptionListGroup>
                          <DescriptionListTerm>Use Case</DescriptionListTerm>
                          <DescriptionListDescription>
                            {String(m.use_case_id)}
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      )}
                      {!!m.use_case && (
                        <DescriptionListGroup>
                          <DescriptionListTerm>Use Case</DescriptionListTerm>
                          <DescriptionListDescription>
                            {String(m.use_case)}
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      )}
                      {!!(m.model_type || m.type) && (
                        <DescriptionListGroup>
                          <DescriptionListTerm>Type</DescriptionListTerm>
                          <DescriptionListDescription>
                            {String(m.model_type ?? m.type)}
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      )}
                      {viewMode === "internal" && (() => {
                        const deploy = m.deployment as Record<string, unknown> | undefined;
                        if (!deploy) return null;
                        return (
                          <>
                            {deploy.endpoint && (
                              <DescriptionListGroup>
                                <DescriptionListTerm>Endpoint</DescriptionListTerm>
                                <DescriptionListDescription>
                                  <code style={{ fontSize: "0.85em" }}>{String(deploy.endpoint)}</code>
                                </DescriptionListDescription>
                              </DescriptionListGroup>
                            )}
                            {deploy.serving_runtime && (
                              <DescriptionListGroup>
                                <DescriptionListTerm>Runtime</DescriptionListTerm>
                                <DescriptionListDescription>{String(deploy.serving_runtime)}</DescriptionListDescription>
                              </DescriptionListGroup>
                            )}
                            {deploy.replicas !== undefined && (
                              <DescriptionListGroup>
                                <DescriptionListTerm>Replicas</DescriptionListTerm>
                                <DescriptionListDescription>{String(deploy.replicas)}</DescriptionListDescription>
                              </DescriptionListGroup>
                            )}
                          </>
                        );
                      })()}
                    </DescriptionList>
                  </CardBody>
                </Card>
              </GalleryItem>
            );
          })}
        </Gallery>
      )}
    </ApplicationsPage>
  );
}
