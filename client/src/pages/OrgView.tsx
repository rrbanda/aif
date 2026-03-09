import { useParams } from "react-router-dom";
import { useConfigEntry } from "../hooks/useConfig";
import { useContent } from "../hooks/useContent";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import MarkdownRenderer from "../components/content/MarkdownRenderer";
import type { OrgElement, ViewMode } from "../types";
import {
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  List,
  ListItem,
  Card,
  CardTitle,
  CardBody,
  Gallery,
  GalleryItem,
} from "@patternfly/react-core";

function InfoList({
  title,
  items,
}: {
  title: string;
  items: string[] | undefined;
}) {
  if (!items?.length) return null;
  return (
    <div className="pf-v6-u-mb-lg">
      <h3 className="pf-v6-c-title pf-m-lg pf-v6-u-mb-sm">{title}</h3>
      <List>
        {items.map((item, i) => (
          <ListItem key={i}>{item}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default function OrgView({ viewMode }: { viewMode: ViewMode }) {
  const { id } = useParams<{ id: string }>();
  const { data: element, loading, error } = useConfigEntry<OrgElement>(
    "organization",
    id
  );
  const { content, loading: contentLoading } = useContent(element?.content_file);

  const breadcrumbs = element
    ? [
        { label: "Overview", to: "/" },
        { label: "Organization" },
        { label: element.title },
      ]
    : undefined;

  return (
    <ApplicationsPage
      breadcrumbs={breadcrumbs}
      title={element?.title}
      description={element?.summary}
      loading={loading}
      error={error ?? (!loading && !element ? "Not found" : null)}
    >
      {element && (
        <>
          <DescriptionList className="pf-v6-u-mb-lg">
            <DescriptionListGroup>
              <DescriptionListTerm>Cadence</DescriptionListTerm>
              <DescriptionListDescription>{element.cadence}</DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Phase range</DescriptionListTerm>
              <DescriptionListDescription>
                Phase {element.starts_with_phase} → {element.runs_through}
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Type</DescriptionListTerm>
              <DescriptionListDescription>{element.type}</DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>

          <InfoList title="Members" items={element.members} />
          <InfoList title="Services" items={element.services} />
          <InfoList title="Formats" items={element.formats} />
          <InfoList title="Activities" items={element.activities} />
          <InfoList title="Workstreams" items={element.workstreams} />

          {element.tracks && element.tracks.length > 0 && (
            <div className="pf-v6-u-mb-lg">
              <h3 className="pf-v6-c-title pf-m-lg pf-v6-u-mb-md">
                Training Tracks
              </h3>
              <Gallery hasGutter>
                {element.tracks.map((track, i) => (
                  <GalleryItem key={i}>
                    <Card>
                      <CardTitle>{track.name}</CardTitle>
                      <CardBody>
                        <p>{track.focus}</p>
                        {track.red_hat_courses && (
                          <List>
                            {track.red_hat_courses.map((c, j) => (
                              <ListItem key={j}>{c}</ListItem>
                            ))}
                          </List>
                        )}
                      </CardBody>
                    </Card>
                  </GalleryItem>
                ))}
              </Gallery>
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
