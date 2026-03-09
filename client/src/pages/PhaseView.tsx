import { useParams } from "react-router-dom";
import { useConfigEntry } from "../hooks/useConfig";
import { useContent } from "../hooks/useContent";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import MarkdownRenderer from "../components/content/MarkdownRenderer";
import type { Phase, ViewMode } from "../types";
import {
  Alert,
  AlertVariant,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  List,
  ListItem,
} from "@patternfly/react-core";

export default function PhaseView({ viewMode }: { viewMode: ViewMode }) {
  const { id } = useParams<{ id: string }>();
  const { data: phase, loading, error } = useConfigEntry<Phase>("phases", id);
  const { content, loading: contentLoading } = useContent(phase?.content_file);

  const filteredDeliverables =
    phase && viewMode === "customer"
      ? phase.deliverables.filter((d) => d.audience.includes("customer"))
      : phase?.deliverables ?? [];

  const breadcrumbs = phase
    ? [
        { label: "Overview", to: "/" },
        { label: `Phase ${phase.order}` },
        { label: phase.title },
      ]
    : undefined;

  return (
    <ApplicationsPage
      breadcrumbs={breadcrumbs}
      title={phase?.title}
      description={phase?.subtitle}
      loading={loading}
      error={error ?? (!loading && !phase ? "Phase not found" : null)}
    >
      {phase && (
        <>
          {phase.value_gate && (
            <Alert
              variant={AlertVariant.info}
              title="Value Gate"
              className="pf-v6-u-mb-lg"
            >
              {phase.value_gate}
            </Alert>
          )}

          <DescriptionList className="pf-v6-u-mb-lg">
            {filteredDeliverables.map((d, i) => (
              <DescriptionListGroup key={i}>
                <DescriptionListTerm>{d.title}</DescriptionListTerm>
                <DescriptionListDescription>{d.description}</DescriptionListDescription>
              </DescriptionListGroup>
            ))}
          </DescriptionList>

          {phase.decision_points.length > 0 && (
            <div className="pf-v6-u-mb-lg">
              <h2 className="pf-v6-c-title pf-m-2xl pf-v6-u-mb-sm">
                Decision Points
              </h2>
              <List>
                {phase.decision_points.map((dp, i) => (
                  <ListItem key={i}>{dp}</ListItem>
                ))}
              </List>
            </div>
          )}

          {phase.risks.length > 0 && (
            <div className="pf-v6-u-mb-lg">
              <h2 className="pf-v6-c-title pf-m-2xl pf-v6-u-mb-sm">Risks</h2>
              <List>
                {phase.risks.map((r, i) => (
                  <ListItem key={i}>{r}</ListItem>
                ))}
              </List>
            </div>
          )}

          {contentLoading ? (
            <p className="pf-v6-u-color-200">Loading content...</p>
          ) : content ? (
            <MarkdownRenderer content={content} viewMode={viewMode} />
          ) : null}
        </>
      )}
    </ApplicationsPage>
  );
}
