import { useConfig } from "../hooks/useConfig";
import { useContent } from "../hooks/useContent";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import MarkdownRenderer from "../components/content/MarkdownRenderer";
import type { ProgramConfig, ViewMode } from "../types";
import { Card, CardTitle, CardBody, Gallery, GalleryItem } from "@patternfly/react-core";

export default function Overview({ viewMode }: { viewMode: ViewMode }) {
  const { data, loading, error } = useConfig<ProgramConfig>("program");
  const { content, loading: contentLoading } = useContent(
    "overview/program-overview.md"
  );

  const program = data?.program;
  const description = program?.description;

  return (
    <ApplicationsPage
      title="AI Factory"
      description={description}
      loading={loading}
      error={error}
      empty={!loading && !error && !program ? "Program configuration not found" : null}
    >
      {program && (
        <>
          <Gallery hasGutter className="pf-v6-u-mb-xl">
            {program.factory_outputs.map((output) => (
              <GalleryItem key={output.id}>
                <Card>
                  <CardTitle>{output.title}</CardTitle>
                  <CardBody>{output.description}</CardBody>
                </Card>
              </GalleryItem>
            ))}
          </Gallery>

          <Gallery hasGutter className="pf-v6-u-mb-xl">
            {program.tracks.map((track) => (
              <GalleryItem key={track.id}>
                <Card>
                  <CardTitle>{track.title}</CardTitle>
                  <CardBody>{track.description}</CardBody>
                </Card>
              </GalleryItem>
            ))}
          </Gallery>

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
