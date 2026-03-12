import {
  Masthead,
  MastheadMain,
  MastheadToggle,
  MastheadBrand,
  MastheadLogo,
  MastheadContent,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  PageToggleButton,
  Button,
  ToggleGroup,
  ToggleGroupItem,
} from "@patternfly/react-core";
import SignOutAltIcon from "@patternfly/react-icons/dist/esm/icons/sign-out-alt-icon";
import SunIcon from "@patternfly/react-icons/dist/esm/icons/sun-icon";
import MoonIcon from "@patternfly/react-icons/dist/esm/icons/moon-icon";
import type { ViewMode } from "../../types";
import type { Theme } from "../../hooks/useTheme";

export interface HeaderProps {
  viewMode: ViewMode;
  onToggleView: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  username?: string;
  onLogout: () => void;
}

export default function Header({
  viewMode,
  onToggleView,
  theme,
  onToggleTheme,
  username,
  onLogout,
}: HeaderProps) {
  return (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            isHamburgerButton
            aria-label="Global navigation"
            id="nav-toggle"
          />
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo>AI Factory</MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar id="header-toolbar">
          <ToolbarContent>
            <ToolbarGroup>
              <ToolbarItem>
                <ToggleGroup aria-label="View mode toggle">
                  <ToggleGroupItem
                    text="Customer"
                    isSelected={viewMode === "customer"}
                    onChange={(_, selected) =>
                      selected && viewMode === "internal" && onToggleView()
                    }
                    aria-label="Customer view"
                  />
                  <ToggleGroupItem
                    text="Red Hat"
                    isSelected={viewMode === "internal"}
                    onChange={(_, selected) =>
                      selected && viewMode === "customer" && onToggleView()
                    }
                    aria-label="Red Hat internal view"
                  />
                </ToggleGroup>
              </ToolbarItem>
              <ToolbarItem>
                <ToggleGroup aria-label="Theme toggle">
                  <ToggleGroupItem
                    icon={<SunIcon />}
                    isSelected={theme === "light"}
                    onChange={(_, selected) =>
                      selected && theme === "dark" && onToggleTheme()
                    }
                    aria-label="Light theme"
                  />
                  <ToggleGroupItem
                    icon={<MoonIcon />}
                    isSelected={theme === "dark"}
                    onChange={(_, selected) =>
                      selected && theme === "light" && onToggleTheme()
                    }
                    aria-label="Dark theme"
                  />
                </ToggleGroup>
              </ToolbarItem>
              {username && (
                <ToolbarItem>
                  <span>{username}</span>
                </ToolbarItem>
              )}
              <ToolbarItem>
                <Button
                  variant="link"
                  aria-label="Sign out"
                  icon={<SignOutAltIcon />}
                  onClick={onLogout}
                >
                  Sign out
                </Button>
              </ToolbarItem>
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );
}
