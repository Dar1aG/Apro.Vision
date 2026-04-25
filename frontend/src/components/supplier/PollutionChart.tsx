import React from "react";
import { Box } from "@mui/material";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Anomaly, PollutionData } from "@/types";
import { RISK_COLORS } from "@/theme/theme";

interface PollutionChartProps {
  data: PollutionData[];
  anomalies: Anomaly[];
}

const TooltipContent: React.FC<{ active?: boolean; payload?: Array<{ value: number }>; label?: string }> = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  const v = payload[0].value;
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        px: 1.5,
        py: 1,
        borderRadius: 1.5,
        boxShadow: "0 8px 22px -8px rgba(15, 42, 71, 0.55)",
        fontSize: 12,
      }}
    >
      <Box sx={{ opacity: 0.7, fontFamily: '"IBM Plex Mono", monospace', fontSize: 11 }}>{label}</Box>
      <Box sx={{ fontWeight: 700, mt: 0.25 }}>WPI {v}</Box>
    </Box>
  );
};

export const PollutionChart: React.FC<PollutionChartProps> = ({ data, anomalies }) => {
  return (
    <Box sx={{ width: "100%", height: 360 }} data-testid="pollution-chart">
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="poll-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1F4068" stopOpacity={0.32} />
              <stop offset="95%" stopColor="#1F4068" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 6" stroke="rgba(15, 42, 71, 0.08)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#4A5A6E", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "rgba(15, 42, 71, 0.12)" }}
            interval={2}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#4A5A6E", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "rgba(15, 42, 71, 0.12)" }}
            label={{ value: "Pollution Index", angle: -90, position: "insideLeft", offset: 20, fill: "#4A5A6E", fontSize: 11 }}
          />
          <Tooltip content={<TooltipContent />} cursor={{ stroke: "#1F4068", strokeDasharray: "3 4", strokeOpacity: 0.5 }} />
          <Area type="monotone" dataKey="value" stroke="none" fill="url(#poll-fill)" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0F2A47"
            strokeWidth={2.4}
            dot={{ r: 3, fill: "#0F2A47", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#1F4068", stroke: "#FFF", strokeWidth: 2 }}
            isAnimationActive
            animationDuration={750}
          />
          {anomalies.map((a, i) => {
            const point = data.find((d) => d.date.startsWith(a.date.slice(0, 7)));
            if (!point) return null;
            return (
              <ReferenceDot
                key={i}
                x={point.date}
                y={point.value}
                r={7}
                fill={RISK_COLORS[a.severity]}
                stroke="#FFF"
                strokeWidth={2.5}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PollutionChart;
