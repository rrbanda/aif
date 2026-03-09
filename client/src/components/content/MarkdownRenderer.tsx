import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Content } from "@patternfly/react-core";
import type { ViewMode } from "../../types";

export interface MarkdownRendererProps {
  content: string;
  viewMode: ViewMode;
}

function filterAudienceBlocks(content: string, viewMode: ViewMode): string {
  if (viewMode === "internal") return content;

  return content.replace(
    /<!-- audience: internal -->([\s\S]*?)<!-- \/audience -->/g,
    ""
  );
}

export default function MarkdownRenderer({
  content,
  viewMode,
}: MarkdownRendererProps) {
  const filtered = useMemo(
    () => filterAudienceBlocks(content, viewMode),
    [content, viewMode]
  );

  return (
    <Content>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {filtered}
      </ReactMarkdown>
    </Content>
  );
}
