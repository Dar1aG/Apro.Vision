import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";

const SIDEBAR_WIDTH = 248;
const SIDEBAR_COLLAPSED = 76;

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const ITEMS = [
  { label: "Home", path: "/", icon: <HomeRoundedIcon /> },
  { label: "Companies", path: "/companies", icon: <BusinessRoundedIcon /> },
  { label: "Risk Radar", path: "/solutions", icon: <RadarRoundedIcon /> },
  { label: "Conformity", path: "/conformity", icon: <GavelRoundedIcon /> },
  { label: "About", path: "/about", icon: <InfoRoundedIcon /> },
];

const SidebarContent: React.FC<{ collapsed: boolean; onToggleCollapse: () => void; onItemClick?: () => void }> = ({
  collapsed,
  onToggleCollapse,
  onItemClick,
}) => {
  const location = useLocation();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
      data-testid="sidebar"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={collapsed ? "center" : "space-between"}
        sx={{ px: collapsed ? 1 : 2.5, py: 2, minHeight: 64, borderBottom: "1px solid", borderColor: "divider" }}
      >
        {!collapsed && (
          <Typography variant="overline" sx={{ color: "text.secondary", fontSize: 10 }}>
            Workspace
          </Typography>
        )}
        <IconButton
          size="small"
          onClick={onToggleCollapse}
          sx={{ display: { xs: "none", lg: "inline-flex" } }}
          data-testid="sidebar-collapse-btn"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRightRoundedIcon /> : <ChevronLeftRoundedIcon />}
        </IconButton>
      </Stack>

      <List sx={{ flexGrow: 1, px: 1.25, py: 2 }}>
        {ITEMS.map((item) => {
          const active = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
          const button = (
            <ListItemButton
              key={item.path}
              component={RouterLink}
              to={item.path}
              onClick={onItemClick}
              data-testid={`sidebar-link-${item.label.toLowerCase().replace(/\s/g, "-")}`}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                px: collapsed ? 1.25 : 1.75,
                py: 1.1,
                justifyContent: collapsed ? "center" : "flex-start",
                color: active ? "primary.main" : "text.secondary",
                bgcolor: active ? "rgba(15, 42, 71, 0.06)" : "transparent",
                position: "relative",
                "&:hover": { bgcolor: "rgba(15, 42, 71, 0.04)", color: "primary.main" },
                "&:before": active
                  ? {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 8,
                      bottom: 8,
                      width: 3,
                      borderRadius: 2,
                      bgcolor: "secondary.main",
                    }
                  : undefined,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 0 : 36,
                  color: "inherit",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                  }}
                />
              )}
            </ListItemButton>
          );
          return collapsed ? (
            <Tooltip key={item.path} title={item.label} placement="right" arrow>
              <span>{button}</span>
            </Tooltip>
          ) : (
            button
          );
        })}
      </List>

      {!collapsed && (
        <Box sx={{ p: 2, m: 2, borderRadius: 2, bgcolor: "rgba(46, 125, 82, 0.08)", border: "1px solid rgba(46, 125, 82, 0.18)" }}>
          <Typography variant="caption" sx={{ color: "secondary.dark", fontWeight: 700, display: "block", mb: 0.5 }}>
            ESA POWERED
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.45 }}>
            Built on Copernicus Sentinel data feeds
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse, mobileOpen, onMobileClose }) => {
  const width = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH;
  return (
    <>
      <Box
        component="nav"
        sx={{
          width,
          flexShrink: 0,
          display: { xs: "none", lg: "block" },
          transition: "width 280ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        aria-label="Primary navigation"
      >
        <Box
          sx={{
            position: "fixed",
            top: 72,
            bottom: 0,
            width,
            transition: "width 280ms cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: (t) => t.zIndex.appBar - 1,
          }}
        >
          <SidebarContent collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
        </Box>
      </Box>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", lg: "none" }, "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH } }}
      >
        <SidebarContent collapsed={false} onToggleCollapse={() => {}} onItemClick={onMobileClose} />
      </Drawer>
    </>
  );
};

export const SIDEBAR_WIDTHS = { open: SIDEBAR_WIDTH, closed: SIDEBAR_COLLAPSED };

export default Sidebar;
