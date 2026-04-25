import React from "react";
import { Chip } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { RiskLevel } from "@/types";
import { RISK_COLORS } from "@/theme/theme";

interface RiskBadgeProps {
  level: RiskLevel;
  size?: "small" | "medium";
}

const LABELS: Record<RiskLevel, string> = {
  LOW: "Low Risk",
  MEDIUM: "Medium Risk",
  HIGH: "High Risk",
};

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = "small" }) => {
  const color = RISK_COLORS[level];
  return (
    <Chip
      data-testid={`risk-badge-${level.toLowerCase()}`}
      size={size}
      icon={<CircleIcon sx={{ fontSize: "10px !important", color: `${color} !important` }} />}
      label={LABELS[level]}
      sx={{
        bgcolor: `${color}14`,
        color: color,
        border: `1px solid ${color}40`,
        borderRadius: 1.5,
        fontWeight: 600,
        letterSpacing: "0.02em",
        ".MuiChip-icon": { ml: 1 },
      }}
    />
  );
};

export default RiskBadge;
