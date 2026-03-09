import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Content, Tabs, Tab, TabTitleText } from "@patternfly/react-core";
import { FileAltIcon } from "@patternfly/react-icons";
import CogIcon from "@patternfly/react-icons/dist/esm/icons/cog-icon";
import CodeBranchIcon from "@patternfly/react-icons/dist/esm/icons/code-branch-icon";

const TAB_ROUTES = ["/admin", "/admin/config", "/admin/history"] as const;

const TABS = [
  { eventKey: 0, title: "Content Files", icon: FileAltIcon },
  { eventKey: 1, title: "YAML Config", icon: CogIcon },
  { eventKey: 2, title: "Git History", icon: CodeBranchIcon },
] as const;

function getActiveKey(pathname: string): number {
  const idx = TAB_ROUTES.indexOf(pathname as (typeof TAB_ROUTES)[number]);
  return idx >= 0 ? idx : 0;
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = getActiveKey(location.pathname);

  return (
    <Content>
      <h1>Content Manager</h1>
      <Tabs
        activeKey={activeKey}
        onSelect={(_, key) => {
          const k = typeof key === "string" ? parseInt(key, 10) : key;
          if (!Number.isNaN(k) && k >= 0 && k < TAB_ROUTES.length) {
            navigate(TAB_ROUTES[k]);
          }
        }}
        aria-label="Content Manager tabs"
      >
        {TABS.map(({ eventKey, title, icon: Icon }) => (
          <Tab
            key={eventKey}
            eventKey={eventKey}
            title={
              <TabTitleText>
                <Icon className="pf-v6-u-mr-sm" />
                {title}
              </TabTitleText>
            }
          />
        ))}
      </Tabs>
      <Outlet />
    </Content>
  );
}
