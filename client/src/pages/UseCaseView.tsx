import { useParams } from "react-router-dom";
import { useConfigEntry } from "../hooks/useConfig";
import { useContent } from "../hooks/useContent";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import MarkdownRenderer from "../components/content/MarkdownRenderer";
import type { UseCase, ViewMode } from "../types";
import {
  Alert,
  AlertVariant,
  Card,
  CardTitle,
  CardBody,
  Gallery,
  GalleryItem,
  List,
  ListItem,
} from "@patternfly/react-core";

export default function UseCaseView({ viewMode }: { viewMode: ViewMode }) {
  const { id } = useParams<{ id: string }>();
  const { data: uc, loading, error } = useConfigEntry<UseCase>("use-cases", id);
  const { content, loading: contentLoading } = useContent(uc?.content_file);

  const breadcrumbs = uc
    ? [
        { label: "Use Cases", to: "/use-cases" },
        { label: uc.title },
      ]
    : undefined;

  return (
    <ApplicationsPage
      breadcrumbs={breadcrumbs}
      title={uc?.title}
      description={uc?.summary}
      loading={loading}
      error={error ?? (!loading && !uc ? "Use case not found" : null)}
    >
      {uc && (
        <>
          {uc.why_ai_factory && (
            <Alert
              variant={AlertVariant.info}
              title="Why the AI Factory?"
              className="pf-v6-u-mb-lg"
            >
              {uc.why_ai_factory}
            </Alert>
          )}

          {uc.dual_role && (
            <Gallery hasGutter className="pf-v6-u-mb-lg">
              <GalleryItem>
                <Card>
                  <CardTitle>As a Product</CardTitle>
                  <CardBody>{uc.dual_role.as_product}</CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem>
                <Card>
                  <CardTitle>For the Factory</CardTitle>
                  <CardBody>{uc.dual_role.for_factory}</CardBody>
                </Card>
              </GalleryItem>
            </Gallery>
          )}

          {uc.key_metrics.length > 0 && (
            <div className="pf-v6-u-mb-lg">
              <h2 className="pf-v6-c-title pf-m-2xl pf-v6-u-mb-sm">
                Key Metrics
              </h2>
              <List>
                {uc.key_metrics.map((m, i) => (
                  <ListItem key={i}>{m}</ListItem>
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
