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

  if (viewMode === "customer") {
    return <CustomerOverview program={program} partners={partners} />;
  }

  return <InternalOverview program={program} partners={partners} />;
}

function CustomerOverview({
  program,
  partners,
}: {
  program: ProgramConfig["program"];
  partners: PartnersConfig["partners"] | undefined;
}) {
  const hero = program.hero;
  const stats = hero?.stats;
  const vps = program.value_propositions_customer ?? [];
  const customerWhy = program.customer_why ?? [];

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
            <Button variant="primary" component={(props) => <Link {...props} to="/chat" />}>
              Talk to the AI Factory Assistant
            </Button>
          </FlexItem>
          <FlexItem>
            <Button variant="secondary" component={(props) => <Link {...props} to="/use-cases" />}>
              Explore use cases
            </Button>
          </FlexItem>
        </Flex>
      </PageSection>

      {program.customer_journey && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-sm">
            {program.customer_journey.title}
          </Title>
          <p className="pf-v6-u-color-200 pf-v6-u-mb-md">
            {program.customer_journey.description}
          </p>
          <Gallery hasGutter>
            {program.customer_journey.stages.map((stage, idx) => (
              <GalleryItem key={stage.id}>
                <Card>
                  <CardTitle>
                    <Flex>
                      <FlexItem>
                        <Label isCompact color="blue" className="pf-v6-u-mr-sm">
                          {idx + 1}
                        </Label>
                        {stage.title}
                      </FlexItem>
                      <FlexItem>
                        <Label isCompact>{stage.timeline}</Label>
                      </FlexItem>
                    </Flex>
                  </CardTitle>
                  <CardBody>{stage.description}</CardBody>
                </Card>
              </GalleryItem>
            ))}
          </Gallery>
        </PageSection>
      )}

      {vps.length > 0 && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
            What you get
          </Title>
          <Gallery hasGutter>
            {vps.map((vp) => (
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

      {customerWhy.length > 0 && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
            Why build your own AI Factory
          </Title>
          <Gallery hasGutter>
            {customerWhy.map((item, i) => (
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
        <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
          What the factory produces
        </Title>
        <Gallery hasGutter>
          {program.factory_outputs.map((output) => (
            <GalleryItem key={output.id}>
              <Card>
                <CardTitle>{output.title}</CardTitle>
                <CardBody>{output.description}</CardBody>
              </Card>
            </GalleryItem>
          ))}
        </Gallery>
      </PageSection>

      {partners && partners.length > 0 && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-sm">
            Works with your infrastructure partners
          </Title>
          <p className="pf-v6-u-color-200 pf-v6-u-mb-md">
            The AI Factory integrates with leading technology partners — so it works with the hardware you already have or plan to acquire.
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
                    <p>{partner.description}</p>
                  </CardBody>
                </Card>
              </GalleryItem>
            ))}
          </Gallery>
        </PageSection>
      )}

      {program.next_steps && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
            Get started
          </Title>
          <List>
            {program.next_steps.steps.map((step, i) => (
              <ListItem key={i}>{step}</ListItem>
            ))}
          </List>
          {program.next_steps.call_to_action && (
            <p className="pf-v6-u-font-weight-bold pf-v6-u-mt-lg pf-v6-u-font-size-lg">
              {program.next_steps.call_to_action}
            </p>
          )}
          <Flex className="pf-v6-u-mt-lg">
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
      )}
    </>
  );
}

function InternalOverview({
  program,
  partners,
}: {
  program: ProgramConfig["program"];
  partners: PartnersConfig["partners"] | undefined;
}) {
  const hero = program.hero;
  const stats = hero?.stats;
  const dq = program.deal_qualification;

  return (
    <>
      <PageSection className="pf-v6-u-py-2xl">
        <Title headingLevel="h1" size="4xl" className="pf-v6-u-mb-sm">
          {hero?.headline_internal || hero?.headline || program.name}
        </Title>
        <p className="pf-v6-u-font-size-xl pf-v6-u-color-200 pf-v6-u-mb-lg">
          {hero?.subheadline_internal || hero?.subheadline}
        </p>
        <p className="pf-v6-u-font-size-md pf-v6-u-mb-xl" style={{ maxWidth: "72ch" }}>
          {hero?.description_internal || program.description}
        </p>

        {stats && stats.length > 0 && (
          <>
            <p className="pf-v6-u-font-size-sm pf-v6-u-font-weight-bold pf-v6-u-mb-sm pf-v6-u-color-200">
              Key talking points for customer conversations:
            </p>
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
          </>
        )}

        <Flex>
          <FlexItem>
            <Button variant="primary" component={(props) => <Link {...props} to="/roadmap" />}>
              Customer roadmaps
            </Button>
          </FlexItem>
          <FlexItem>
            <Button variant="secondary" component={(props) => <Link {...props} to="/assessment" />}>
              Readiness assessments
            </Button>
          </FlexItem>
          <FlexItem>
            <Button variant="tertiary" component={(props) => <Link {...props} to="/chat" />}>
              AI Assistant
            </Button>
          </FlexItem>
        </Flex>
      </PageSection>

      {dq && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
            {dq.title}
          </Title>
          <Split hasGutter>
            <SplitItem isFilled>
              <Card>
                <CardTitle>Ideal customer profile</CardTitle>
                <CardBody>
                  <List>
                    {dq.ideal_customer_profile.map((item, i) => (
                      <ListItem key={i}>{item}</ListItem>
                    ))}
                  </List>
                </CardBody>
              </Card>
            </SplitItem>
            <SplitItem isFilled>
              <Card>
                <CardTitle>Disqualifiers</CardTitle>
                <CardBody>
                  <List>
                    {dq.disqualifiers.map((item, i) => (
                      <ListItem key={i}>{item}</ListItem>
                    ))}
                  </List>
                </CardBody>
              </Card>
            </SplitItem>
          </Split>

          {dq.competitive_positioning && dq.competitive_positioning.length > 0 && (
            <div className="pf-v6-u-mt-lg">
              <Title headingLevel="h3" size="lg" className="pf-v6-u-mb-md">
                Competitive positioning
              </Title>
              <Gallery hasGutter>
                {dq.competitive_positioning.map((cp, i) => (
                  <GalleryItem key={i}>
                    <Card isCompact>
                      <CardTitle>vs. {cp.competitor}</CardTitle>
                      <CardBody>{cp.differentiator}</CardBody>
                    </Card>
                  </GalleryItem>
                ))}
              </Gallery>
            </div>
          )}
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

      {program.why_ai_factory && program.why_ai_factory.length > 0 && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
            Customer value arguments
          </Title>
          <p className="pf-v6-u-color-200 pf-v6-u-mb-md">
            Use these when positioning against SaaS-only or hyperscaler alternatives:
          </p>
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

      {program.value_propositions && program.value_propositions.length > 0 && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
            Four pillars of the AI Factory
          </Title>
          <p className="pf-v6-u-color-200 pf-v6-u-mb-md">
            Use these to structure customer conversations and proposals:
          </p>
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

      <PageSection>
        <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-md">
          Factory output categories
        </Title>
        <p className="pf-v6-u-color-200 pf-v6-u-mb-md">
          Map customer use cases to these categories during qualification:
        </p>
        <Gallery hasGutter>
          {program.factory_outputs.map((output) => (
            <GalleryItem key={output.id}>
              <Card>
                <CardTitle>{output.title}</CardTitle>
                <CardBody>{output.description}</CardBody>
              </Card>
            </GalleryItem>
          ))}
        </Gallery>
      </PageSection>

      {partners && partners.length > 0 && (
        <PageSection>
          <Title headingLevel="h2" size="xl" className="pf-v6-u-mb-sm">
            Partner ecosystem — co-sell opportunities
          </Title>
          <p className="pf-v6-u-color-200 pf-v6-u-mb-md">
            Leverage partner relationships for deal acceleration. Each partner has certified integrations with Red Hat AI.
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

      <PageSection>
        <Title headingLevel="h3" size="lg" className="pf-v6-u-mb-md">
          Quick links
        </Title>
        <Flex>
          <FlexItem>
            <Button
              variant="link"
              component={(props) => <Link {...props} to="/reference/overview/program-overview" />}
            >
              Program overview
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
          <FlexItem>
            <Button
              variant="link"
              component={(props) => <Link {...props} to="/reference/architecture" />}
            >
              Architecture reference
            </Button>
          </FlexItem>
          <FlexItem>
            <Button
              variant="link"
              component={(props) => <Link {...props} to="/admin" />}
            >
              Content manager
            </Button>
          </FlexItem>
        </Flex>
      </PageSection>
    </>
  );
}
