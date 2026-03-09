import { Link } from "react-router-dom";
import { useConfig } from "../hooks/useConfig";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import type { UseCasesConfig } from "../types";
import {
  Card,
  CardTitle,
  CardBody,
  Gallery,
  GalleryItem,
  Badge,
} from "@patternfly/react-core";

export default function UseCases() {
  const { data, loading, error } = useConfig<UseCasesConfig>("use-cases");

  return (
    <ApplicationsPage
      title="Use Cases"
      description="Real-world examples of what the AI Factory produces"
      loading={loading}
      error={error}
      empty={!loading && !error && !data?.use_cases?.length ? "No use cases found" : null}
    >
      {data?.use_cases && (
        <Gallery hasGutter>
          {data.use_cases.map((uc) => (
            <GalleryItem key={uc.id}>
              <Link to={`/use-cases/${uc.id}`} style={{ textDecoration: "none" }}>
                <Card isClickable>
                  <CardTitle>{uc.title}</CardTitle>
                  <CardBody>
                    <p className="pf-v6-u-mb-sm">{uc.summary}</p>
                    <Badge className="pf-v6-u-mb-sm" isRead>
                      {uc.complexity} complexity
                    </Badge>
                    <div className="pf-v6-u-mt-sm">
                      {uc.ai_type.map((t) => (
                        <Badge key={t} isRead className="pf-v6-u-mr-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </GalleryItem>
          ))}
        </Gallery>
      )}
    </ApplicationsPage>
  );
}
