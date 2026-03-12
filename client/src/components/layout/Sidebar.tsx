import { useNavigate, useLocation } from "react-router-dom";
import {
  Nav,
  NavList,
  NavExpandable,
  NavItem,
  PageSidebar,
  PageSidebarBody,
} from "@patternfly/react-core";
import HomeIcon from "@patternfly/react-icons/dist/esm/icons/home-icon";
import CubeIcon from "@patternfly/react-icons/dist/esm/icons/cube-icon";
import UsersIcon from "@patternfly/react-icons/dist/esm/icons/users-icon";
import ChartBarIcon from "@patternfly/react-icons/dist/esm/icons/chart-bar-icon";
import BriefcaseIcon from "@patternfly/react-icons/dist/esm/icons/briefcase-icon";
import CogIcon from "@patternfly/react-icons/dist/esm/icons/cog-icon";
import CircleIcon from "@patternfly/react-icons/dist/esm/icons/circle-icon";
import CommentsIcon from "@patternfly/react-icons/dist/esm/icons/comments-icon";
import ClipboardCheckIcon from "@patternfly/react-icons/dist/esm/icons/clipboard-check-icon";
import DatabaseIcon from "@patternfly/react-icons/dist/esm/icons/database-icon";
import FolderOpenIcon from "@patternfly/react-icons/dist/esm/icons/folder-open-icon";
import HeartbeatIcon from "@patternfly/react-icons/dist/esm/icons/heartbeat-icon";
import MapMarkedAltIcon from "@patternfly/react-icons/dist/esm/icons/map-marked-alt-icon";
import type { Phase, PhasesConfig } from "../../types/phase";
import type { OrgElement, OrgConfig } from "../../types/organization";
import { useConfig } from "../../hooks/useConfig";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  home: HomeIcon,
  cube: CubeIcon,
  factory: CubeIcon,
  users: UsersIcon,
  "chart-bar": ChartBarIcon,
  briefcase: BriefcaseIcon,
  cog: CogIcon,
  circle: CircleIcon,
};

function getIcon(name: string): React.ComponentType<{ className?: string }> {
  return ICON_MAP[name.toLowerCase()] ?? CircleIcon;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: phasesData } = useConfig<PhasesConfig>("phases");
  const { data: orgData } = useConfig<OrgConfig>("organization");

  const phases = (phasesData?.phases ?? []).sort(
    (a: Phase, b: Phase) => a.order - b.order
  );
  const orgElements = (orgData?.elements ?? []).sort(
    (a: OrgElement, b: OrgElement) => a.order - b.order
  );

  const isPathActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleSelect = (
    _event: React.FormEvent<HTMLInputElement>,
    result: { itemId: number | string; groupId: number | string | null }
  ) => {
    const route = result.itemId;
    if (typeof route === "string" && route.startsWith("/")) {
      navigate(route);
    }
  };

  return (
    <PageSidebar id="app-sidebar">
      <PageSidebarBody>
        <Nav aria-label="Main navigation" onSelect={handleSelect}>
          <NavList>
            <NavItem
              itemId="/"
              to="/"
              isActive={location.pathname === "/"}
              icon={<HomeIcon />}
            >
              Overview
            </NavItem>

            <NavItem
              itemId="/chat"
              to="/chat"
              isActive={isPathActive("/chat")}
              icon={<CommentsIcon />}
            >
              AI Assistant
            </NavItem>

            <NavExpandable
              title="Dashboards"
              groupId="dashboards"
              isExpanded={
                ["/assessment", "/models", "/portfolio", "/monitoring", "/roadmap"].some(
                  (p) => location.pathname.startsWith(p)
                )
              }
              isActive={
                ["/assessment", "/models", "/portfolio", "/monitoring", "/roadmap"].some(
                  (p) => location.pathname.startsWith(p)
                )
              }
            >
              <NavItem
                groupId="dashboards"
                itemId="/assessment"
                to="/assessment"
                isActive={isPathActive("/assessment")}
                icon={<ClipboardCheckIcon />}
              >
                Assessment
              </NavItem>
              <NavItem
                groupId="dashboards"
                itemId="/models"
                to="/models"
                isActive={isPathActive("/models")}
                icon={<DatabaseIcon />}
              >
                Model Registry
              </NavItem>
              <NavItem
                groupId="dashboards"
                itemId="/portfolio"
                to="/portfolio"
                isActive={isPathActive("/portfolio")}
                icon={<FolderOpenIcon />}
              >
                Use Case Portfolio
              </NavItem>
              <NavItem
                groupId="dashboards"
                itemId="/monitoring"
                to="/monitoring"
                isActive={isPathActive("/monitoring")}
                icon={<HeartbeatIcon />}
              >
                Model Monitoring
              </NavItem>
              <NavItem
                groupId="dashboards"
                itemId="/roadmap"
                to="/roadmap"
                isActive={isPathActive("/roadmap")}
                icon={<MapMarkedAltIcon />}
              >
                Program Roadmap
              </NavItem>
            </NavExpandable>

            <NavExpandable
              title="Platform Maturity"
              groupId="technical-track"
              isExpanded={location.pathname.startsWith("/phases")}
              isActive={location.pathname.startsWith("/phases")}
            >
              {phases.map((phase) => {
                const Icon = getIcon(phase.icon);
                return (
                  <NavItem
                    key={phase.id}
                    groupId="technical-track"
                    itemId={`/phases/${phase.id}`}
                    to={`/phases/${phase.id}`}
                    isActive={isPathActive(`/phases/${phase.id}`)}
                    icon={<Icon />}
                  >
                    {phase.title}
                  </NavItem>
                );
              })}
            </NavExpandable>

            <NavExpandable
              title="Operating Model"
              groupId="organizational-track"
              isExpanded={location.pathname.startsWith("/organization")}
              isActive={location.pathname.startsWith("/organization")}
            >
              {orgElements.map((el) => {
                const Icon = getIcon(el.icon);
                return (
                  <NavItem
                    key={el.id}
                    groupId="organizational-track"
                    itemId={`/organization/${el.id}`}
                    to={`/organization/${el.id}`}
                    isActive={isPathActive(`/organization/${el.id}`)}
                    icon={<Icon />}
                  >
                    {el.title}
                  </NavItem>
                );
              })}
            </NavExpandable>

            <NavExpandable
              title="Reference"
              groupId="reference"
              isExpanded={location.pathname.startsWith("/reference")}
              isActive={location.pathname.startsWith("/reference")}
            >
              <NavItem
                groupId="reference"
                itemId="/reference/architecture"
                to="/reference/architecture"
                isActive={isPathActive("/reference/architecture")}
                icon={<CubeIcon />}
              >
                Architecture
              </NavItem>
              <NavItem
                groupId="reference"
                itemId="/reference/tech-stack"
                to="/reference/tech-stack"
                isActive={isPathActive("/reference/tech-stack")}
                icon={<CubeIcon />}
              >
                Technology Stack
              </NavItem>
              <NavItem
                groupId="reference"
                itemId="/reference/roles"
                to="/reference/roles"
                isActive={isPathActive("/reference/roles")}
                icon={<UsersIcon />}
              >
                Roles
              </NavItem>
              <NavItem
                groupId="reference"
                itemId="/reference/metrics"
                to="/reference/metrics"
                isActive={isPathActive("/reference/metrics")}
                icon={<ChartBarIcon />}
              >
                Success Metrics
              </NavItem>
            </NavExpandable>

            <NavItem
              itemId="/use-cases"
              to="/use-cases"
              isActive={isPathActive("/use-cases")}
              icon={<BriefcaseIcon />}
            >
              Use Cases
            </NavItem>

            <NavItem
              itemId="/admin"
              to="/admin"
              isActive={isPathActive("/admin")}
              icon={<CogIcon />}
            >
              Content Manager
            </NavItem>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );
}
