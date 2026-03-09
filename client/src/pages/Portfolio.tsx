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
  Title,
  Content,
} from "@patternfly/react-core";
import {
  useCustomers,
  useCustomerPortfolio,
  useCustomerAccount,
} from "../hooks/useCustomerData";
import ApplicationsPage from "../components/layout/ApplicationsPage";

const STAGES = [
  { id: "proposed", label: "Proposed", color: "grey" as const },
  { id: "qualified", label: "Qualified", color: "blue" as const },
  { id: "piloting", label: "Piloting", color: "orange" as const },
  { id: "production", label: "Production", color: "green" as const },
  { id: "scaled", label: "Scaled", color: "purple" as const },
  { id: "retired", label: "Retired", color: "grey" as const },
];

function formatUSD(val: number): string {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
  return `$${val}`;
}

export default function Portfolio() {
  const { customers, loading: custLoading } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [custSelectOpen, setCustSelectOpen] = useState(false);
  const { useCases, loading: ucLoading } = useCustomerPortfolio(
    selectedCustomer || undefined
  );
  const { data: account } = useCustomerAccount(selectedCustomer || undefined);

  const accountUCs = account?.use_cases ?? [];

  const allCases = useCases.length > 0
    ? useCases.map((uc) => {
        const r = uc as Record<string, unknown>;
        return {
          id: (r.id as string) ?? "",
          name: (r.name as string) ?? "",
          stage: (r.stage as string) ?? "proposed",
          priority: (r.priority as number) ?? 0,
          scores: r.scores as Record<string, number> | undefined,
          estimated_value_usd: (r.estimated_value_usd as number) ?? 0,
          business_unit: (r.business_unit as string) ?? "",
          sponsor: (r.sponsor as string) ?? "",
        };
      })
    : accountUCs.map((uc) => ({
        id: uc.id,
        name: uc.name,
        stage: uc.status,
        priority: uc.priority,
        scores: {
          business_impact: uc.business_impact_score,
          complexity: uc.complexity_score,
        },
        estimated_value_usd: 0,
        business_unit: "",
        sponsor: "",
      }));

  const stageGroups = STAGES.map((s) => ({
    ...s,
    cases: allCases.filter((c) => c.stage === s.id),
  }));

  const totalValue = allCases.reduce((s, c) => s + c.estimated_value_usd, 0);

  return (
    <ApplicationsPage
      title="Use Case Portfolio"
      description="Track AI use cases through their lifecycle from proposal to scale"
      loading={custLoading}
    >
      <Split hasGutter className="pf-v6-u-mb-lg">
        <SplitItem>
          <Select
            id="cust-select-portfolio"
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
        {allCases.length > 0 && (
          <>
            <SplitItem>
              <Label isCompact>{allCases.length} use cases</Label>
            </SplitItem>
            {totalValue > 0 && (
              <SplitItem>
                <Label isCompact color="green">
                  Est. value: {formatUSD(totalValue)}
                </Label>
              </SplitItem>
            )}
          </>
        )}
      </Split>

      {!selectedCustomer && (
        <EmptyState titleText="Select a customer" headingLevel="h3">
          <EmptyStateBody>
            Choose a customer to view their use case portfolio.
          </EmptyStateBody>
        </EmptyState>
      )}

      {selectedCustomer && ucLoading && (
        <EmptyState titleText="Loading..." headingLevel="h3" />
      )}

      {selectedCustomer && !ucLoading && allCases.length === 0 && (
        <EmptyState titleText="No use cases" headingLevel="h3">
          <EmptyStateBody>
            No use cases have been created for this customer yet.
          </EmptyStateBody>
        </EmptyState>
      )}

      {allCases.length > 0 && (
        <>
          <Flex className="pf-v6-u-mb-lg" spaceItems={{ default: "spaceItemsLg" }}>
            {stageGroups
              .filter((s) => s.id !== "retired")
              .map((s) => (
                <FlexItem key={s.id}>
                  <Card isCompact>
                    <CardBody style={{ textAlign: "center", padding: "var(--pf-t--global--spacer--sm) var(--pf-t--global--spacer--lg)" }}>
                      <Title headingLevel="h3" size="2xl">
                        {s.cases.length}
                      </Title>
                      <Label color={s.color} isCompact>
                        {s.label}
                      </Label>
                    </CardBody>
                  </Card>
                </FlexItem>
              ))}
          </Flex>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${STAGES.filter((s) => s.id !== "retired").length}, 1fr)`,
              gap: "var(--pf-t--global--spacer--md)",
              overflowX: "auto",
            }}
          >
            {stageGroups
              .filter((s) => s.id !== "retired")
              .map((stage) => (
                <div key={stage.id}>
                  <Content
                    component="h4"
                    className="pf-v6-u-mb-sm pf-v6-u-text-align-center"
                  >
                    <Label color={stage.color}>{stage.label}</Label>
                  </Content>
                  {stage.cases.map((uc) => (
                    <Card
                      key={uc.id}
                      isCompact
                      className="pf-v6-u-mb-sm"
                    >
                      <CardBody>
                        <strong>{uc.name}</strong>
                        <br />
                        <small className="pf-v6-u-color-200">{uc.id}</small>
                        {uc.priority > 0 && (
                          <div>
                            <Label isCompact color="blue">
                              P{uc.priority}
                            </Label>
                          </div>
                        )}
                        {uc.scores && (
                          <DescriptionList isCompact className="pf-v6-u-mt-sm">
                            {uc.scores.business_impact > 0 && (
                              <DescriptionListGroup>
                                <DescriptionListTerm>Impact</DescriptionListTerm>
                                <DescriptionListDescription>
                                  {uc.scores.business_impact}/5
                                </DescriptionListDescription>
                              </DescriptionListGroup>
                            )}
                            {uc.scores.complexity > 0 && (
                              <DescriptionListGroup>
                                <DescriptionListTerm>Complexity</DescriptionListTerm>
                                <DescriptionListDescription>
                                  {uc.scores.complexity}/5
                                </DescriptionListDescription>
                              </DescriptionListGroup>
                            )}
                          </DescriptionList>
                        )}
                        {uc.estimated_value_usd > 0 && (
                          <div className="pf-v6-u-mt-sm">
                            <Label isCompact color="green">
                              {formatUSD(uc.estimated_value_usd)}
                            </Label>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  ))}
                  {stage.cases.length === 0 && (
                    <Card isCompact>
                      <CardBody>
                        <Content component="small" className="pf-v6-u-color-200">
                          No use cases
                        </Content>
                      </CardBody>
                    </Card>
                  )}
                </div>
              ))}
          </div>
        </>
      )}
    </ApplicationsPage>
  );
}
