import { useState } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  Gallery,
  GalleryItem,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Label,
  Split,
  SplitItem,
  EmptyState,
  EmptyStateBody,
  Select,
  SelectOption,
  SelectList,
  MenuToggle,
  Content,
} from "@patternfly/react-core";
import {
  useCustomers,
  useCustomerAccount,
} from "../hooks/useCustomerData";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import type { ViewMode } from "../types";

const DIMENSIONS = [
  { key: "data_readiness", label: "Data Readiness", color: "#0066CC" },
  { key: "org_maturity", label: "Organization", color: "#3E8635" },
  { key: "team_readiness", label: "Team", color: "#F0AB00" },
  { key: "infra_readiness", label: "Infrastructure", color: "#C9190B" },
  { key: "use_case_pipeline", label: "Use Cases", color: "#6753AC" },
] as const;

function readinessToScore(val: string | undefined): number {
  if (!val) return 0;
  const lower = val.toLowerCase();
  if (lower.includes("3") || lower.includes("advanced") || lower.includes("ready")) return 90;
  if (lower.includes("2") || lower.includes("division") || lower.includes("adequate")) return 60;
  if (lower.includes("1") || lower.includes("emerging") || lower.includes("basic")) return 35;
  if (lower.includes("0") || lower.includes("none") || lower.includes("not")) return 10;
  return 50;
}

function RadarChart({
  scores,
}: {
  scores: Array<{ label: string; value: number; color: string }>;
}) {
  const cx = 150,
    cy = 150,
    r = 110;
  const n = scores.length;
  const angleStep = (2 * Math.PI) / n;

  const points = scores.map((s, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const ratio = s.value / 100;
    return {
      x: cx + r * ratio * Math.cos(angle),
      y: cy + r * ratio * Math.sin(angle),
      lx: cx + (r + 20) * Math.cos(angle),
      ly: cy + (r + 20) * Math.sin(angle),
      label: s.label,
      color: s.color,
      value: s.value,
    };
  });

  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox="0 0 300 300" style={{ maxWidth: 360, margin: "0 auto", display: "block" }}>
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={Array.from({ length: n }, (_, i) => {
            const angle = -Math.PI / 2 + i * angleStep;
            return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
          }).join(" ")}
          fill="none"
          stroke="var(--pf-t--global--border--color--default)"
          strokeWidth="0.5"
          opacity="0.5"
        />
      ))}
      {points.map((_p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + r * Math.cos(-Math.PI / 2 + i * angleStep)}
          y2={cy + r * Math.sin(-Math.PI / 2 + i * angleStep)}
          stroke="var(--pf-t--global--border--color--default)"
          strokeWidth="0.5"
          opacity="0.5"
        />
      ))}
      <polygon
        points={polyPoints}
        fill="var(--pf-t--global--color--brand--default)"
        fillOpacity="0.2"
        stroke="var(--pf-t--global--color--brand--default)"
        strokeWidth="2"
      />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill={p.color} />
          <text
            x={p.lx}
            y={p.ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="var(--pf-t--global--text--color--regular)"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function AssessmentDashboard({ viewMode }: { viewMode: ViewMode }) {
  const { customers, loading: custLoading } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [custSelectOpen, setCustSelectOpen] = useState(false);
  const { data: account, loading: acctLoading } =
    useCustomerAccount(selectedCustomer || undefined);

  const assessment = account?.assessment;
  const hasAssessment = assessment && assessment.overall_readiness;

  const radarScores = DIMENSIONS.map((d) => ({
    label: d.label,
    value: readinessToScore(
      assessment?.[d.key as keyof typeof assessment] as string | undefined
    ),
    color: d.color,
  }));

  return (
    <ApplicationsPage
      title="Assessment Dashboard"
      description="View AI Factory readiness assessments across dimensions"
      loading={custLoading}
    >
      <Split hasGutter className="pf-v6-u-mb-lg">
        <SplitItem>
          <Select
            id="customer-select"
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
      </Split>

      {!selectedCustomer && (
        <EmptyState titleText="Select a customer" headingLevel="h3">
          <EmptyStateBody>
            Choose a customer account above to view their readiness assessment.
          </EmptyStateBody>
        </EmptyState>
      )}

      {selectedCustomer && acctLoading && (
        <EmptyState titleText="Loading..." headingLevel="h3" />
      )}

      {selectedCustomer && !acctLoading && !hasAssessment && (
        <EmptyState titleText="No assessment data" headingLevel="h3">
          <EmptyStateBody>
            This customer has not been assessed yet. Use the AI Assistant to
            run a readiness assessment.
          </EmptyStateBody>
        </EmptyState>
      )}

      {hasAssessment && (
        <Gallery hasGutter minWidths={{ default: "400px" }}>
          <GalleryItem>
            <Card>
              <CardTitle>Readiness Radar</CardTitle>
              <CardBody>
                <RadarChart scores={radarScores} />
                <div style={{ textAlign: "center", marginTop: "var(--pf-t--global--spacer--sm)" }}>
                  <Label
                    color="blue"
                    isCompact
                  >
                    Overall: {assessment.overall_readiness}
                  </Label>
                  {assessment.assessment_date && (
                    <Content
                      component="small"
                      className="pf-v6-u-ml-sm pf-v6-u-color-200"
                    >
                      Assessed {assessment.assessment_date}
                    </Content>
                  )}
                </div>
              </CardBody>
            </Card>
          </GalleryItem>

          <GalleryItem>
            <Card>
              <CardTitle>Dimension Details</CardTitle>
              <CardBody>
                <DescriptionList isHorizontal>
                  {DIMENSIONS.map((d) => {
                    const val = assessment[d.key as keyof typeof assessment] as
                      | string
                      | undefined;
                    const score = readinessToScore(val);
                    return (
                      <DescriptionListGroup key={d.key}>
                        <DescriptionListTerm>{d.label}</DescriptionListTerm>
                        <DescriptionListDescription>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div
                              style={{
                                width: 120,
                                height: 8,
                                background: "var(--pf-t--global--border--color--default)",
                                borderRadius: 4,
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${score}%`,
                                  height: "100%",
                                  background: d.color,
                                  borderRadius: 4,
                                }}
                              />
                            </div>
                            <span>{val ?? "Not assessed"}</span>
                          </div>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    );
                  })}
                </DescriptionList>
              </CardBody>
            </Card>
          </GalleryItem>

          <GalleryItem>
            <Card>
              <CardTitle>Program Status</CardTitle>
              <CardBody>
                <DescriptionList isHorizontal>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Current Phase</DescriptionListTerm>
                    <DescriptionListDescription>
                      <Label color="blue">
                        {account?.program_state?.current_phase ?? "N/A"}
                      </Label>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Phases Completed</DescriptionListTerm>
                    <DescriptionListDescription>
                      {(account?.program_state?.phases_completed ?? []).length}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Use Cases</DescriptionListTerm>
                    <DescriptionListDescription>
                      {(account?.use_cases ?? []).length} total
                      {" / "}
                      {(account?.use_cases ?? []).filter((u) => u.qualified).length}{" "}
                      qualified
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Models</DescriptionListTerm>
                    <DescriptionListDescription>
                      {(account?.models ?? []).length} tracked
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </GalleryItem>

          {(account?.contacts ?? []).length > 0 && (
            <GalleryItem>
              <Card>
                <CardTitle>Key Contacts</CardTitle>
                <CardBody>
                  <DescriptionList isHorizontal>
                    {(account?.contacts ?? []).map((c, i) => (
                      <DescriptionListGroup key={i}>
                        <DescriptionListTerm>{c.role}</DescriptionListTerm>
                        <DescriptionListDescription>
                          {c.name}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    ))}
                  </DescriptionList>
                </CardBody>
              </Card>
            </GalleryItem>
          )}

          {viewMode === "internal" && account?.red_hat_team && (
            <GalleryItem>
              <Card>
                <CardTitle>Red Hat Account Team</CardTitle>
                <CardBody>
                  <DescriptionList isHorizontal>
                    {account.red_hat_team.ae && (
                      <DescriptionListGroup>
                        <DescriptionListTerm>AE</DescriptionListTerm>
                        <DescriptionListDescription>{account.red_hat_team.ae}</DescriptionListDescription>
                      </DescriptionListGroup>
                    )}
                    {account.red_hat_team.account_sa && (
                      <DescriptionListGroup>
                        <DescriptionListTerm>Account SA</DescriptionListTerm>
                        <DescriptionListDescription>{account.red_hat_team.account_sa}</DescriptionListDescription>
                      </DescriptionListGroup>
                    )}
                    {account.red_hat_team.ai_specialist_sa && (
                      <DescriptionListGroup>
                        <DescriptionListTerm>AI Specialist SA</DescriptionListTerm>
                        <DescriptionListDescription>{account.red_hat_team.ai_specialist_sa}</DescriptionListDescription>
                      </DescriptionListGroup>
                    )}
                    {account.red_hat_team.field_cto && (
                      <DescriptionListGroup>
                        <DescriptionListTerm>Field CTO</DescriptionListTerm>
                        <DescriptionListDescription>{account.red_hat_team.field_cto}</DescriptionListDescription>
                      </DescriptionListGroup>
                    )}
                  </DescriptionList>
                </CardBody>
              </Card>
            </GalleryItem>
          )}

          {viewMode === "internal" && account?.engagement && (
            <GalleryItem>
              <Card>
                <CardTitle>Engagement Details</CardTitle>
                <CardBody>
                  <DescriptionList isHorizontal>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Type</DescriptionListTerm>
                      <DescriptionListDescription>
                        <Label isCompact>{account.engagement.engagement_type}</Label>
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>SOW</DescriptionListTerm>
                      <DescriptionListDescription>{account.engagement.current_sow}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Start</DescriptionListTerm>
                      <DescriptionListDescription>{account.engagement.start_date}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Est. End</DescriptionListTerm>
                      <DescriptionListDescription>{account.engagement.estimated_end}</DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </CardBody>
              </Card>
            </GalleryItem>
          )}
        </Gallery>
      )}
    </ApplicationsPage>
  );
}
