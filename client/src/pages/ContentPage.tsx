import { useParams } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import ApplicationsPage from "../components/layout/ApplicationsPage";
import MarkdownRenderer from "../components/content/MarkdownRenderer";
import type { ViewMode } from "../types";

export default function ContentPage({ viewMode }: { viewMode: ViewMode }) {
  const params = useParams();
  const contentPath = params["*"] ?? "";
  const { content, loading, error } = useContent(contentPath);

  return (
    <ApplicationsPage
      loading={loading}
      error={error ?? (!loading && !content ? "Content not found" : null)}
    >
      {content && <MarkdownRenderer content={content} viewMode={viewMode} />}
    </ApplicationsPage>
  );
}
