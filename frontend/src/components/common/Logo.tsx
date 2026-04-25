import React from "react";
import { Box } from "@mui/material";
import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";

interface LogoProps {
  size?: number;
  variant?: "light" | "dark";
}

export const Logo: React.FC<LogoProps> = ({ size = 36, variant = "dark" }) => {
  const bg = variant === "dark" ? "linear-gradient(135deg, #0F2A47 0%, #1F4068 100%)" : "#FFFFFF";
  const fg = variant === "dark" ? "#FFFFFF" : "#0F2A47";
  return (
    <Box
      data-testid="apro-logo"
      sx={{
        width: size,
        height: size,
        borderRadius: 2,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 16px -8px rgba(15, 42, 71, 0.45)",
        border: "1px solid rgba(15, 42, 71, 0.12)",
      }}
    >
      <SatelliteAltRoundedIcon sx={{ color: fg, fontSize: size * 0.6 }} />
    </Box>
  );
};

export default Logo;
