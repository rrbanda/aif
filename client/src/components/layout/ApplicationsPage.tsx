import type { ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  PageSection,
  Title,
  Spinner,
  Alert,
  Bullseye,
  EmptyState,
  EmptyStateBody,
} from "@patternfly/react-core";
import { Link } from "react-router-dom";

export interface BreadcrumbItemConfig {
  label: string;
  to?: string;
}

export interface ApplicationsPageProps {
  /** Breadcrumb items; last item is current page (no link) */
  breadcrumbs?: BreadcrumbItemConfig[];
  /** Page title */
  title?: string;
  /** Optional description below title */
  description?: string;
  /** Show loading spinner when true */
  loading?: boolean;
  /** Error message; when set, shows error Alert and hides children */
  error?: string | null;
  /** Empty state message; when set (and no error), shows empty state and hides children */
  empty?: string | null;
  /** Page content */
  children: ReactNode;
}

export default function ApplicationsPage({
  breadcrumbs,
  title,
  description,
  loading = false,
  error = null,
  empty = null,
  children,
}: ApplicationsPageProps) {
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

  if (empty) {
    return (
      <PageSection>
        <EmptyState titleText={empty} headingLevel="h2">
          <EmptyStateBody>{empty}</EmptyStateBody>
        </EmptyState>
      </PageSection>
    );
  }

  return (
    <PageSection>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb className="pf-v6-u-mb-md">
          {breadcrumbs.map((item, i) => (
            <BreadcrumbItem
              key={i}
              to={item.to}
              render={
                item.to
                  ? ({ className, ariaCurrent }) => (
                      <Link to={item.to!} className={className} aria-current={ariaCurrent}>
                        {item.label}
                      </Link>
                    )
                  : undefined
              }
              isActive={i === breadcrumbs.length - 1 && !item.to}
            >
              {item.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}
      {title && (
        <Title headingLevel="h1" size="2xl" className="pf-v6-u-mb-sm">
          {title}
        </Title>
      )}
      {description && (
        <p className="pf-v6-u-mb-md pf-v6-u-color-200">{description}</p>
      )}
      {children}
    </PageSection>
  );
}
