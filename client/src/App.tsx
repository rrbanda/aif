import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Bullseye, Spinner } from "@patternfly/react-core";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { useViewMode } from "./hooks/useViewMode";
import { useTheme } from "./hooks/useTheme";
import AppShell from "./components/layout/AppShell";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import PhaseView from "./pages/PhaseView";
import OrgView from "./pages/OrgView";
import UseCases from "./pages/UseCases";
import UseCaseView from "./pages/UseCaseView";
import TechStack from "./pages/TechStack";
import Roles from "./pages/Roles";
import Metrics from "./pages/Metrics";
import ContentPage from "./pages/ContentPage";
import AdminLayout from "./pages/admin/AdminLayout";
import ContentFiles from "./pages/admin/ContentFiles";
import ConfigEditor from "./pages/admin/ConfigEditor";
import GitHistory from "./pages/admin/GitHistory";
import Chat from "./pages/Chat";
import AssessmentDashboard from "./pages/AssessmentDashboard";
import ModelRegistry from "./pages/ModelRegistry";
import Portfolio from "./pages/Portfolio";
import MonitoringDashboard from "./pages/MonitoringDashboard";
import Roadmap from "./pages/Roadmap";

function AppRoutes() {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const { viewMode, toggleViewMode } = useViewMode();
  const { theme, toggleTheme } = useTheme();

  if (loading) {
    return (
      <Bullseye>
        <Spinner aria-label="Starting AI Factory..." />
      </Bullseye>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {isAuthenticated ? (
        <Route
          path="/"
          element={
            <AppShell
              viewMode={viewMode}
              onToggleView={toggleViewMode}
              theme={theme}
              onToggleTheme={toggleTheme}
              username={user?.username}
              onLogout={logout}
            />
          }
        >
          <Route index element={<Overview viewMode={viewMode} />} />
          <Route path="chat" element={<Chat viewMode={viewMode} />} />
          <Route path="assessment" element={<AssessmentDashboard viewMode={viewMode} />} />
          <Route path="models" element={<ModelRegistry viewMode={viewMode} />} />
          <Route path="portfolio" element={<Portfolio viewMode={viewMode} />} />
          <Route path="monitoring" element={<MonitoringDashboard viewMode={viewMode} />} />
          <Route path="roadmap" element={<Roadmap viewMode={viewMode} />} />
          <Route
            path="phases/:id"
            element={<PhaseView viewMode={viewMode} />}
          />
          <Route
            path="organization/:id"
            element={<OrgView viewMode={viewMode} />}
          />
          <Route path="use-cases" element={<UseCases />} />
          <Route
            path="use-cases/:id"
            element={<UseCaseView viewMode={viewMode} />}
          />
          <Route path="reference/tech-stack" element={<TechStack />} />
          <Route path="reference/roles" element={<Roles />} />
          <Route path="reference/metrics" element={<Metrics />} />
          <Route
            path="reference/*"
            element={<ContentPage viewMode={viewMode} />}
          />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<ContentFiles />} />
            <Route path="config" element={<ConfigEditor />} />
            <Route path="history" element={<GitHistory />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
