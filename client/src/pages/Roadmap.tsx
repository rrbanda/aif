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
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Content,
  ProgressStep,
  ProgressStepper,
  Icon,
} from "@patternfly/react-core";
import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";
import InProgressIcon from "@patternfly/react-icons/dist/esm/icons/in-progress-icon";
import {
  useCustomers,
  useCustomerAccount,
  useDeliverables,
} from "../hooks/useCustomerData";
import { useConfig } from "../hooks/useConfig";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import type { PhasesConfig, Phase, ViewMode } from "../types";

export default function Roadmap({ viewMode }: { viewMode: ViewMode }) {
  const { customers, loading: custLoading } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [custSelectOpen, setCustSelectOpen] = useState(false);
  const { data: account, loading: acctLoading } = useCustomerAccount(
    selectedCustomer || undefined
  );
  const { deliverables } = useDeliverables(selectedCustomer || undefined);
  const { data: phasesConfig } = useConfig<PhasesConfig>("phases");

  const phases = (phasesConfig?.phases ?? []).sort(
    (a: Phase, b: Phase) => a.order - b.order
  );

  const completedIds = new Set(
    (account?.program_state?.phases_completed ?? []).map((p) => p.id)
  );
  const inProgressMap = new Map(
    (account?.program_state?.phases_in_progress ?? []).map((p) => [p.id, p])
  );

  function phaseStatus(
    phase: Phase
  ): "success" | "info" | "pending" | "default" {
    if (completedIds.has(phase.id)) return "success";
    if (inProgressMap.has(phase.id)) return "info";
    return "pending";
  }

  function phaseVariant(
    phase: Phase
  ): "success" | "info" | "pending" | "default" {
    return phaseStatus(phase);
  }

  return (
    <ApplicationsPage
      title="Program Roadmap"
      description="Track AI Factory program phases, progress, and deliverables"
      loading={custLoading}
    >
      <Split hasGutter className="pf-v6-u-mb-lg">
        <SplitItem>
          <Select
            id="cust-select-roadmap"
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
            Choose a customer to view their program roadmap.
          </EmptyStateBody>
        </EmptyState>
      )}

      {selectedCustomer && acctLoading && (
        <EmptyState titleText="Loading..." headingLevel="h3" />
      )}

      {selectedCustomer && !acctLoading && account && (
        <>
          <Card className="pf-v6-u-mb-lg">
            <CardTitle>Phase Progress</CardTitle>
            <CardBody>
              <ProgressStepper>
                {phases.map((phase) => {
                  const status = phaseStatus(phase);
                  const ip = inProgressMap.get(phase.id);
                  return (
                    <ProgressStep
                      key={phase.id}
                      variant={phaseVariant(phase)}
                      id={phase.id}
                      titleId={`step-${phase.id}`}
                      aria-label={phase.title}
                      description={
                        status === "success"
                          ? "Completed"
                          : ip
                            ? `${ip.completion_pct}% complete`
                            : phase.duration
                      }
                    >
                      {phase.title}
                    </ProgressStep>
                  );
                })}
              </ProgressStepper>
            </CardBody>
          </Card>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "var(--pf-t--global--spacer--md)",
            }}
          >
            {phases.map((phase) => {
              const completed = (account?.program_state?.phases_completed ?? []).find(
                (p) => p.id === phase.id
              );
              const ip = inProgressMap.get(phase.id);
              const status = completed
                ? "completed"
                : ip
                  ? "in_progress"
                  : "not_started";

              return (
                <Card key={phase.id}>
                  <CardTitle>
                    <Flex
                      justifyContent={{
                        default: "justifyContentSpaceBetween",
                      }}
                    >
                      <FlexItem>
                        {phase.title}
                      </FlexItem>
                      <FlexItem>
                        {status === "completed" && (
                          <Label color="green" icon={<CheckCircleIcon />}>
                            Completed
                          </Label>
                        )}
                        {status === "in_progress" && (
                          <Label color="blue" icon={<InProgressIcon />}>
                            {ip?.completion_pct}%
                          </Label>
                        )}
                        {status === "not_started" && (
                          <Label color="grey">Not started</Label>
                        )}
                      </FlexItem>
                    </Flex>
                  </CardTitle>
                  <CardBody>
                    <Content component="p" className="pf-v6-u-mb-sm pf-v6-u-color-200">
                      {phase.subtitle}
                    </Content>

                    <DescriptionList isCompact isHorizontal>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Duration</DescriptionListTerm>
                        <DescriptionListDescription>
                          {phase.duration}
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>Value Gate</DescriptionListTerm>
                        <DescriptionListDescription>
                          {completed?.value_gate_passed ? (
                            <Icon status="success" size="sm">
                              <CheckCircleIcon />
                            </Icon>
                          ) : null}{" "}
                          {phase.value_gate}
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      {completed?.completed_date && (
                        <DescriptionListGroup>
                          <DescriptionListTerm>Completed</DescriptionListTerm>
                          <DescriptionListDescription>
                            {completed.completed_date}
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      )}

                      {ip?.started_date && (
                        <DescriptionListGroup>
                          <DescriptionListTerm>Started</DescriptionListTerm>
                          <DescriptionListDescription>
                            {ip.started_date}
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      )}

                      {ip && ip.completion_pct > 0 && (
                        <DescriptionListGroup>
                          <DescriptionListTerm>Progress</DescriptionListTerm>
                          <DescriptionListDescription>
                            <div
                              style={{
                                width: "100%",
                                height: 8,
                                background:
                                  "var(--pf-t--global--border--color--default)",
                                borderRadius: 4,
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${ip.completion_pct}%`,
                                  height: "100%",
                                  background:
                                    "var(--pf-t--global--color--brand--default)",
                                  borderRadius: 4,
                                }}
                              />
                            </div>
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      )}
                    </DescriptionList>

                    {phase.deliverables.length > 0 && (
                      <div className="pf-v6-u-mt-sm">
                        <Content component="small">
                          <strong>Deliverables:</strong>
                        </Content>
                        <Flex
                          spaceItems={{ default: "spaceItemsXs" }}
                          className="pf-v6-u-mt-xs"
                        >
                          {phase.deliverables.map((d, i) => (
                            <FlexItem key={i}>
                              <Label isCompact>{d.title}</Label>
                            </FlexItem>
                          ))}
                        </Flex>
                      </div>
                    )}
                  </CardBody>
                </Card>
              );
            })}
          </div>

          {viewMode === "internal" && account?.red_hat_team && (
            <Card className="pf-v6-u-mt-lg">
              <CardTitle>Red Hat Account Team</CardTitle>
              <CardBody>
                <DescriptionList isHorizontal isCompact>
                  {account.red_hat_team.ae && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>Account Executive</DescriptionListTerm>
                      <DescriptionListDescription>{String(account.red_hat_team.ae)}</DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                  {account.red_hat_team.account_sa && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>Account SA</DescriptionListTerm>
                      <DescriptionListDescription>{String(account.red_hat_team.account_sa)}</DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                  {account.red_hat_team.ai_specialist_sa && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>AI Specialist SA</DescriptionListTerm>
                      <DescriptionListDescription>{String(account.red_hat_team.ai_specialist_sa)}</DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                  {account.red_hat_team.field_cto && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>Field CTO</DescriptionListTerm>
                      <DescriptionListDescription>{String(account.red_hat_team.field_cto)}</DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                </DescriptionList>
                {account.engagement && (
                  <DescriptionList isHorizontal isCompact className="pf-v6-u-mt-md">
                    <DescriptionListGroup>
                      <DescriptionListTerm>Engagement Type</DescriptionListTerm>
                      <DescriptionListDescription>
                        <Label isCompact>{String(account.engagement.engagement_type)}</Label>
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>SOW</DescriptionListTerm>
                      <DescriptionListDescription>{String(account.engagement.current_sow)}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Timeline</DescriptionListTerm>
                      <DescriptionListDescription>
                        {String(account.engagement.start_date)} — {String(account.engagement.estimated_end)}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                )}
              </CardBody>
            </Card>
          )}

          {deliverables.length > 0 && (
            <Card className="pf-v6-u-mt-lg">
              <CardTitle>Generated Deliverables</CardTitle>
              <CardBody>
                <DescriptionList isHorizontal isCompact>
                  {deliverables.map((d) => (
                    <DescriptionListGroup key={d.filename}>
                      <DescriptionListTerm>{d.title}</DescriptionListTerm>
                      <DescriptionListDescription>
                        {d.filename}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  ))}
                </DescriptionList>
              </CardBody>
            </Card>
          )}
        </>
      )}
    </ApplicationsPage>
  );
}
