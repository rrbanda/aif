import { useConfig } from "../hooks/useConfig";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import type { MetricsConfig, ViewMode } from "../types";
import {
  Card,
  CardTitle,
  CardBody,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Gallery,
  GalleryItem,
} from "@patternfly/react-core";

export default function Metrics({ viewMode }: { viewMode: ViewMode }) {
  const { data, loading, error } = useConfig<MetricsConfig>("metrics");

  return (
    <ApplicationsPage
      title="Success Metrics"
      description={
        viewMode === "customer"
          ? "How we measure your AI Factory is delivering value"
          : "How we measure the AI Factory is working — use for value gate assessments"
      }
      loading={loading}
      error={error}
      empty={
        !loading && !error && !data?.categories?.length
          ? "No metrics configured"
          : null
      }
    >
      {data?.categories && (
        <Gallery hasGutter>
          {data.categories.map((cat) => (
            <GalleryItem key={cat.id}>
              <Card>
                <CardTitle>{cat.title}</CardTitle>
                <CardBody>
                  <p className="pf-v6-u-mb-md pf-v6-u-color-200">{cat.why}</p>
                  <DescriptionList>
                    {cat.metrics.map((m, i) => (
                      <DescriptionListGroup key={i}>
                        <DescriptionListTerm>
                          {m.name}
                          {m.unit && (
                            <span className="pf-v6-u-color-200 pf-v6-u-ml-sm">
                              ({m.unit})
                            </span>
                          )}
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {m.target}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    ))}
                  </DescriptionList>
                </CardBody>
              </Card>
            </GalleryItem>
          ))}
        </Gallery>
      )}
    </ApplicationsPage>
  );
}
