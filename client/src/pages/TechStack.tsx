import { useConfig } from "../hooks/useConfig";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import type { TechStackConfig } from "../types";
import {
  Card,
  CardTitle,
  CardBody,
  Gallery,
  GalleryItem,
  List,
  ListItem,
} from "@patternfly/react-core";

export default function TechStack() {
  const { data, loading, error } = useConfig<TechStackConfig>("tech-stack");

  const layers = data?.layers
    ? [...data.layers].sort((a, b) => a.order - b.order)
    : [];

  return (
    <ApplicationsPage
      title="Technology Stack"
      description="Products and platforms that compose the AI Factory"
      loading={loading}
      error={error}
      empty={
        !loading && !error && !data?.products?.length
          ? "No technology stack configured"
          : null
      }
    >
      {layers.map((layer) => {
        const products = data!.products.filter((p) => p.layer === layer.id);
        if (products.length === 0) return null;

        return (
          <div key={layer.id} className="pf-v6-u-mb-xl">
            <h2 className="pf-v6-c-title pf-m-lg pf-v6-u-mb-md">
              {layer.title}
            </h2>
            <Gallery hasGutter>
              {products.map((product) => (
                <GalleryItem key={product.id}>
                  <Card>
                    <CardTitle>{product.name}</CardTitle>
                    <CardBody>
                      <p className="pf-v6-u-mb-sm">{product.role}</p>
                      {product.features && product.features.length > 0 && (
                        <List>
                          {product.features.map((f, i) => (
                            <ListItem key={i}>{f}</ListItem>
                          ))}
                        </List>
                      )}
                    </CardBody>
                  </Card>
                </GalleryItem>
              ))}
            </Gallery>
          </div>
        );
      })}
    </ApplicationsPage>
  );
}
