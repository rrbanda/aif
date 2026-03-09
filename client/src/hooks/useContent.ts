import { useState, useEffect } from "react";
import { api } from "../lib/api";

export function useContent(contentPath: string | undefined) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contentPath) {
      setContent(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    api
      .get<string>(`/content/${contentPath}`)
      .then(setContent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [contentPath]);

  return { content, loading, error };
}
