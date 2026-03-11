import { useConfig } from "../hooks/useConfig";
import { useContent } from "../hooks/useContent";
import MarkdownRenderer from "../components/content/MarkdownRenderer";
import type { ProgramConfig, ViewMode } from "../types";
import {
  Card,
  CardTitle,
  CardBody,
  Gallery,
  GalleryItem,
  PageSection,
  Title,
  Spinner,
  Bullseye,
  Alert,
  Split,
  SplitItem,
  Flex,
  FlexItem,
  Button,
} from "@patternfly/react-core";
import { Link } from "react-router-dom";

export default function Overview({ viewMode }: { viewMode: ViewMode }) {
  const { data, loading, error } = useConfig<ProgramConfig>("program");
  const { content, loading: contentLoading } = useContent(
    "overview/program-overview.md"
  );

  const program = data?.program;

  if (loading) {
    return (
      <PageSection>
        <Bullseye>
          <Spinner size="xl" aria-label="Loading" />
        </Bullseye>
      </PageSection>
    );
  }

  if (error) {
    return (
      <PageSection>
        <Alert variant="danger" title={error} />
      </PageSection>
    );
  }

  if (!program) {
    return (
      <PageSection>
        <Alert variant="warning" title="Program configuration not found" />
      </PageSection>
    );
  }

  const hero = program.hero;
  const stats = hero?.stats;

  return (
    <>
      <PageSection className="pf-v6-u-py-2xl">
        <Title headingLevel="h1" size="4xl" className="pf-v6-u-mb-sm">
          {hero?.headline || program.name}
        </Title>
        {hero?.subheadline && (
          <p className="pf-v6-u-font-size-xl pf-v6-u-color-200 pf-v6-u-mb-lg">
            {hero.subheadline}
          </p>
        )}
        <p className="pf-v6-u-font-size-md pf-v6-u-mb-xl" style={{ maxWidth: "72ch" }}>
          {program.description}
        </p>

        {stats && stats.length > 0 && (
          <Split hasGutter className="pf-v6-u-mb-xl">
            {stats.map((stat: { value: string; label: string; source?: string }, i: number) => (
              <SplitItem key={i} isFilled>
                <Card isCompact>
                  <CardBody>
                    <Title headingLevel="h3" size="2xl">
                      {stat.value}
                    </Title>
                    <p className="pf-v6-u-color-200 pf-v6-u-mt-sm">{stat.label}</p>
                    {stat.source && (
                      <p className="pf-v6-u-font-size-xs pf-v6-u-color-300 pf-v6-u-mt-xs">
                        {stat.source}
                      </p>
                    )}
                  </CardBody>
                </Card>
              </SplitItem>
            ))}
          </Split>
        )}

        <Flex>
          <FlexItem>
            <Button variant="primary" component={(props) => <Link {...props} to="/roadmap" />}>
              Explore the roadmap
            </Button>
          </FlexItem>
          <FlexItem>
            <Button variant="secondary" component={(props) => <Link {...props} to="/chat" />}>
              Talk to the AI Factory Assistant
            </Button>
          </FlexItem>
        </Flex>
      </PageSection>

      {program.why_ai_factory && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
            Why the AI Factory
          </Title>
          <Gallery hasGutter>
            {program.why_ai_factory.map((item: { title: string; description: string }) => (
              <GalleryItem key={item.title}>
                <Card isCompact>
                  <CardTitle>{item.title}</CardTitle>
                  <CardBody>{item.description}</CardBody>
                </Card>
              </GalleryItem>
            ))}
          </Gallery>
        </PageSection>
      )}

      <PageSection>
        <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
          What the factory produces
        </Title>
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

        <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
          Two parallel tracks
        </Title>
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
      </PageSection>

      {contentLoading ? (
        <PageSection>
          <p className="pf-v6-u-color-200">Loading content...</p>
        </PageSection>
      ) : content ? (
        <PageSection>
          <MarkdownRenderer content={content} viewMode={viewMode} />
        </PageSection>
      ) : null}
    </>
  );
}
