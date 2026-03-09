import { Outlet } from "react-router-dom";
import { Page } from "@patternfly/react-core";
import Header from "./Header";
import Sidebar from "./Sidebar";
import type { ViewMode } from "../../types";
import type { Theme } from "../../hooks/useTheme";

export interface AppShellProps {
  viewMode: ViewMode;
  onToggleView: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  username?: string;
  onLogout: () => void;
}

export default function AppShell({
  viewMode,
  onToggleView,
  theme,
  onToggleTheme,
  username,
  onLogout,
}: AppShellProps) {
  const header = (
    <Header
      viewMode={viewMode}
      onToggleView={onToggleView}
      theme={theme}
      onToggleTheme={onToggleTheme}
      username={username}
      onLogout={onLogout}
    />
  );

  const sidebar = <Sidebar />;

  return (
    <Page masthead={header} sidebar={sidebar} isManagedSidebar>
      <Outlet />
    </Page>
  );
}
