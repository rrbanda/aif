import { useConfig } from "../hooks/useConfig";
import type { ProgramConfig, PartnersConfig, ViewMode } from "../types";
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
  Label,
  List,
  ListItem,
} from "@patternfly/react-core";
import { Link } from "react-router-dom";

export default function Overview({ viewMode }: { viewMode: ViewMode }) {
  const { data, loading, error } = useConfig<ProgramConfig>("program");
  const { data: partnersData } = useConfig<PartnersConfig>("partners");

  const program = data?.program;
  const partners = partnersData?.partners;

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
            {stats.map((stat, i) => (
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

      {program.value_propositions && program.value_propositions.length > 0 && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
            The Red Hat AI Factory
          </Title>
          <Gallery hasGutter>
            {program.value_propositions.map((vp) => (
              <GalleryItem key={vp.id}>
                <Card isCompact>
                  <CardTitle>{vp.title}</CardTitle>
                  <CardBody>{vp.description}</CardBody>
                </Card>
              </GalleryItem>
            ))}
          </Gallery>
        </PageSection>
      )}

      {program.benefit_pillars && program.benefit_pillars.length > 0 && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
            Why an AI Factory
          </Title>
          <Gallery hasGutter>
            {program.benefit_pillars.map((pillar) => (
              <GalleryItem key={pillar.id}>
                <Card>
                  <CardTitle>{pillar.title}</CardTitle>
                  <CardBody>
                    <p className="pf-v6-u-mb-md">{pillar.description}</p>
                    {pillar.details && pillar.details.length > 0 && (
                      <List>
                        {pillar.details.map((d, i) => (
                          <ListItem key={i}>{d}</ListItem>
                        ))}
                      </List>
                    )}
                  </CardBody>
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
          Two parallel dimensions
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

      {partners && partners.length > 0 && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-sm">
            Partner Ecosystem
          </Title>
          <p className="pf-v6-u-color-200 pf-v6-u-mb-md">
            The AI Factory works with your chosen technology partners. Red Hat validates and certifies integrations across the ecosystem.
          </p>
          <Gallery hasGutter>
            {partners.map((partner) => (
              <GalleryItem key={partner.id}>
                <Card isCompact>
                  <CardTitle>
                    <Flex>
                      <FlexItem>{partner.name}</FlexItem>
                      <FlexItem>
                        <Label isCompact color={partner.tier === "premier" ? "blue" : "grey"}>
                          {partner.tier}
                        </Label>
                      </FlexItem>
                    </Flex>
                  </CardTitle>
                  <CardBody>
                    <p className="pf-v6-u-mb-sm">{partner.description}</p>
                    {partner.key_differentiator && (
                      <p className="pf-v6-u-font-size-sm pf-v6-u-color-200">
                        {partner.key_differentiator}
                      </p>
                    )}
                  </CardBody>
                </Card>
              </GalleryItem>
            ))}
          </Gallery>
        </PageSection>
      )}

      {program.services_package && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-sm">
            {program.services_package.title}
          </Title>
          <p className="pf-v6-u-color-200 pf-v6-u-mb-md">
            {program.services_package.description}
          </p>
          <Gallery hasGutter>
            {program.services_package.phases.map((phase) => (
              <GalleryItem key={phase.id}>
                <Card>
                  <CardTitle>
                    <Flex>
                      <FlexItem>{phase.title}</FlexItem>
                      <FlexItem>
                        <Label isCompact>{phase.timeline}</Label>
                      </FlexItem>
                    </Flex>
                  </CardTitle>
                  <CardBody>
                    <p className="pf-v6-u-font-weight-bold pf-v6-u-mb-sm">{phase.milestone}</p>
                    <p className="pf-v6-u-mb-md">{phase.description}</p>
                    {phase.details && phase.details.length > 0 && (
                      <List>
                        {phase.details.map((d, i) => (
                          <ListItem key={i}>{d}</ListItem>
                        ))}
                      </List>
                    )}
                  </CardBody>
                </Card>
              </GalleryItem>
            ))}
          </Gallery>
        </PageSection>
      )}

      {viewMode === "internal" && program.why_ai_factory && program.why_ai_factory.length > 0 && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
            Internal: Data sovereignty & competitive moat
          </Title>
          <Gallery hasGutter>
            {program.why_ai_factory.map((item, i) => (
              <GalleryItem key={i}>
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
        <Flex>
          <FlexItem>
            <Button
              variant="link"
              component={(props) => <Link {...props} to="/reference/overview/program-overview" />}
            >
              Read the full program overview
            </Button>
          </FlexItem>
          <FlexItem>
            <Button
              variant="link"
              component={(props) => <Link {...props} to="/reference/overview/executive-summary" />}
            >
              Executive summary
            </Button>
          </FlexItem>
        </Flex>
      </PageSection>
    </>
  );
}
