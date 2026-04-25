import { createTheme, ThemeOptions } from "@mui/material/styles";

// Risk colors (mandatory mapping from spec)
export const RISK_COLORS = {
  LOW: "#2E7D52",
  MEDIUM: "#E08A1A",
  HIGH: "#C8362D",
} as const;

// Deep Navy Blue primary (Technology, Authority, Trust)
const PRIMARY = "#0F2A47";
const PRIMARY_LIGHT = "#1F4068";
const PRIMARY_DARK = "#08182B";

// Environmental green secondary
const SECONDARY = "#2E7D52";

const baseOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: PRIMARY,
      light: PRIMARY_LIGHT,
      dark: PRIMARY_DARK,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: SECONDARY,
      light: "#4FA374",
      dark: "#1E5837",
      contrastText: "#FFFFFF",
    },
    success: { main: RISK_COLORS.LOW },
    warning: { main: RISK_COLORS.MEDIUM },
    error: { main: RISK_COLORS.HIGH },
    background: {
      default: "#F4F6F9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F2A47",
      secondary: "#4A5A6E",
    },
    divider: "rgba(15, 42, 71, 0.08)",
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 700, letterSpacing: "-0.015em" },
    h3: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600, letterSpacing: "-0.01em" },
    h4: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600, letterSpacing: 0 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0 },
    overline: { letterSpacing: "0.12em", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F4F6F9",
          fontFeatureSettings: '"ss01", "cv11"',
        },
        "*::-webkit-scrollbar": { width: 10, height: 10 },
        "*::-webkit-scrollbar-track": { background: "transparent" },
        "*::-webkit-scrollbar-thumb": {
          background: "rgba(15, 42, 71, 0.18)",
          borderRadius: 8,
        },
        "*::-webkit-scrollbar-thumb:hover": { background: "rgba(15, 42, 71, 0.32)" },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: PRIMARY,
          borderBottom: "1px solid rgba(15, 42, 71, 0.08)",
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(15, 42, 71, 0.06)",
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: "1px solid rgba(15, 42, 71, 0.06)",
          transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
          "&:hover": {
            boxShadow: "0 12px 32px -16px rgba(15, 42, 71, 0.18)",
            borderColor: "rgba(15, 42, 71, 0.14)",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
          paddingBlock: 10,
          transition: "transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
          "&:hover": { transform: "translateY(-1px)" },
        },
        containedPrimary: {
          boxShadow: "0 8px 18px -10px rgba(15, 42, 71, 0.55)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, letterSpacing: "0.02em" },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F7F9FC",
          "& .MuiTableCell-head": {
            fontWeight: 700,
            color: "#0F2A47",
            textTransform: "uppercase",
            fontSize: 12,
            letterSpacing: "0.08em",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 160ms ease",
          "&:hover": { backgroundColor: "rgba(15, 42, 71, 0.03)" },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: PRIMARY,
          fontSize: 12,
          fontWeight: 500,
        },
        arrow: { color: PRIMARY },
      },
    },
  },
};

export const theme = createTheme(baseOptions);

export default theme;
