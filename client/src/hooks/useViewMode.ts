import { useState, useCallback } from "react";
import type { ViewMode } from "../types";

export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const stored = localStorage.getItem("viewMode");
    return stored === "customer" || stored === "internal" ? stored : "customer";
  });
  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => {
      const next = prev === "customer" ? "internal" : "customer";
      localStorage.setItem("viewMode", next);
      return next;
    });
  }, []);
  return { viewMode, toggleViewMode, isInternal: viewMode === "internal" };
}
