import { useState, Fragment } from "react";
import {
  Card,
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
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  ExpandableSection,
  Flex,
  FlexItem,
  Icon,
} from "@patternfly/react-core";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@patternfly/react-table";
import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";
import TimesCircleIcon from "@patternfly/react-icons/dist/esm/icons/times-circle-icon";
import {
  useCustomers,
  useCustomerModels,
} from "../hooks/useCustomerData";
import ApplicationsPage from "../components/layout/ApplicationsPage";

const STAGE_COLORS: Record<string, "blue" | "green" | "orange" | "red" | "purple" | "grey"> = {
  experiment: "purple",
  registered: "blue",
  validated: "orange",
  deployed: "green",
  monitored: "green",
  retired: "grey",
};

const GATE_LABELS: Array<{ key: string; label: string }> = [
  { key: "bias_tested", label: "Bias" },
  { key: "security_scanned", label: "Security" },
  { key: "performance_validated", label: "Performance" },
  { key: "data_lineage_documented", label: "Lineage" },
  { key: "model_card_completed", label: "Model Card" },
];

export default function ModelRegistry() {
  const { customers, loading: custLoading } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [custSelectOpen, setCustSelectOpen] = useState(false);
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const { models, loading: modelsLoading } = useCustomerModels(
    selectedCustomer || undefined
  );

  return (
    <ApplicationsPage
      title="Model Registry & Governance"
      description="Track model lifecycle stages and governance gate status"
      loading={custLoading}
    >
      <Split hasGutter className="pf-v6-u-mb-lg">
        <SplitItem>
          <Select
            id="cust-select-models"
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
        {models.length > 0 && (
          <SplitItem>
            <Label isCompact>{models.length} models</Label>
          </SplitItem>
        )}
      </Split>

      {!selectedCustomer && (
        <EmptyState titleText="Select a customer" headingLevel="h3">
          <EmptyStateBody>
            Choose a customer to view their model registry.
          </EmptyStateBody>
        </EmptyState>
      )}

      {selectedCustomer && modelsLoading && (
        <EmptyState titleText="Loading models..." headingLevel="h3" />
      )}

      {selectedCustomer && !modelsLoading && models.length === 0 && (
        <EmptyState titleText="No models registered" headingLevel="h3">
          <EmptyStateBody>
            No models have been registered for this customer yet.
          </EmptyStateBody>
        </EmptyState>
      )}

      {models.length > 0 && (
        <Card>
          <CardBody>
            <Table aria-label="Model Registry" variant="compact">
              <Thead>
                <Tr>
                  <Th width={20}>Model</Th>
                  <Th width={10}>Type</Th>
                  <Th width={10}>Version</Th>
                  <Th width={10}>Stage</Th>
                  <Th width={25}>Governance Gates</Th>
                  <Th width={15}>Use Case</Th>
                  <Th width={10}>Updated</Th>
                </Tr>
              </Thead>
              <Tbody>
                {models.map((model) => {
                  const gov = (model as unknown as Record<string, unknown>).governance as
                    | Record<string, unknown>
                    | undefined;
                  const isExpanded = expandedModel === model.id;
                  const history =
                    ((model as unknown as Record<string, unknown>).lifecycle_history as
                      | Array<Record<string, string>>
                      | undefined) ?? [];

                  return (
                    <Fragment key={model.id}>
                      <Tr
                        isClickable
                        onRowClick={() =>
                          setExpandedModel(isExpanded ? null : model.id)
                        }
                      >
                        <Td dataLabel="Model">
                          <strong>{model.name || model.id}</strong>
                          <br />
                          <small className="pf-v6-u-color-200">
                            {model.id}
                          </small>
                        </Td>
                        <Td dataLabel="Type">{model.model_type}</Td>
                        <Td dataLabel="Version">{model.version}</Td>
                        <Td dataLabel="Stage">
                          <Label
                            color={
                              STAGE_COLORS[model.status] ?? "grey"
                            }
                          >
                            {model.status}
                          </Label>
                        </Td>
                        <Td dataLabel="Gates">
                          {gov && (
                            <Flex
                              spaceItems={{
                                default: "spaceItemsXs",
                              }}
                            >
                              {GATE_LABELS.map((g) => (
                                <FlexItem key={g.key}>
                                  <Icon
                                    status={
                                      gov[g.key] ? "success" : "danger"
                                    }
                                    size="sm"
                                  >
                                    {gov[g.key] ? (
                                      <CheckCircleIcon />
                                    ) : (
                                      <TimesCircleIcon />
                                    )}
                                  </Icon>{" "}
                                  <small>{g.label}</small>
                                </FlexItem>
                              ))}
                            </Flex>
                          )}
                        </Td>
                        <Td dataLabel="Use Case">{model.use_case_id}</Td>
                        <Td dataLabel="Updated">
                          {model.updated
                            ? new Date(model.updated).toLocaleDateString()
                            : "—"}
                        </Td>
                      </Tr>
                      {isExpanded && (
                        <Tr key={`${model.id}-detail`}>
                          <Td colSpan={7}>
                            <ExpandableSection
                              isExpanded
                              toggleText="Lifecycle History"
                              isIndented
                            >
                              <DescriptionList
                                isHorizontal
                                isCompact
                              >
                                {history.map((h, i) => (
                                  <DescriptionListGroup key={i}>
                                    <DescriptionListTerm>
                                      <Label
                                        color={
                                          STAGE_COLORS[h.stage] ??
                                          "grey"
                                        }
                                        isCompact
                                      >
                                        {h.stage}
                                      </Label>
                                    </DescriptionListTerm>
                                    <DescriptionListDescription>
                                      {h.notes} —{" "}
                                      <small>
                                        {new Date(
                                          h.timestamp
                                        ).toLocaleString()}
                                      </small>
                                    </DescriptionListDescription>
                                  </DescriptionListGroup>
                                ))}
                              </DescriptionList>
                            </ExpandableSection>
                          </Td>
                        </Tr>
                      )}
                    </Fragment>
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}
    </ApplicationsPage>
  );
}
