import React, { useMemo } from "react";
import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { suppliers } from "@/services/mockData";
import { RISK_COLORS } from "@/theme/theme";
import RiskBadge from "@/components/common/RiskBadge";
import { RiskLevel } from "@/types";

const buildIcon = (level: RiskLevel) =>
  L.divIcon({
    className: "",
    html: `<div class="risk-marker" style="background:${RISK_COLORS[level]}"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -10],
  });

const ICONS: Record<RiskLevel, L.DivIcon> = {
  LOW: buildIcon("LOW"),
  MEDIUM: buildIcon("MEDIUM"),
  HIGH: buildIcon("HIGH"),
};

const LEGEND: { level: RiskLevel; label: string }[] = [
  { level: "LOW", label: "Low risk" },
  { level: "MEDIUM", label: "Medium risk" },
  { level: "HIGH", label: "High risk" },
];

export const RiskMap: React.FC = () => {
  const navigate = useNavigate();
  const counts = useMemo(() => {
    return suppliers.reduce(
      (acc, s) => {
        acc[s.riskLevel] += 1;
        return acc;
      },
      { LOW: 0, MEDIUM: 0, HIGH: 0 } as Record<RiskLevel, number>
    );
  }, []);

  return (
    <Card data-testid="risk-map-card" sx={{ position: "relative", overflow: "hidden", height: { xs: 520, md: 640 } }}>
      <MapContainer
        center={[20, 30]}
        zoom={2.4}
        minZoom={2}
        scrollWheelZoom
        worldCopyJump
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        {suppliers.map((s) => (
          <Marker
            key={s.id}
            position={[s.location.lat, s.location.lng]}
            icon={ICONS[s.riskLevel]}
            eventHandlers={{ click: () => {} }}
          >
            <Popup maxWidth={280}>
              <Box sx={{ p: 0.5, minWidth: 220 }} data-testid={`map-popup-${s.id}`}>
                <Typography variant="overline" sx={{ color: "text.secondary", fontSize: 10 }}>
                  {s.location.city}, {s.location.country}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3, mt: 0.25 }}>
                  {s.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <RiskBadge level={s.riskLevel} />
                  <Chip size="small" label={`WPI ${s.pollutionIndex}`} variant="outlined" sx={{ fontFamily: '"IBM Plex Mono", monospace' }} />
                </Stack>
                <button
                  data-testid={`map-popup-view-${s.id}`}
                  onClick={() => navigate(`/supplier/${s.id}`)}
                  style={{
                    marginTop: 12,
                    width: "100%",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: 8,
                    background: "#0F2A47",
                    color: "#fff",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  View details →
                </button>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating legend */}
      <Card
        data-testid="map-legend"
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          p: 2,
          minWidth: 200,
          zIndex: 999,
          backdropFilter: "blur(10px)",
          bgcolor: "rgba(255,255,255,0.92)",
          boxShadow: "0 12px 28px -16px rgba(15, 42, 71, 0.3)",
        }}
      >
        <Typography variant="overline" sx={{ color: "text.secondary", fontSize: 10 }}>Risk legend</Typography>
        <Stack spacing={1} mt={1}>
          {LEGEND.map((l) => (
            <Stack key={l.level} direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: RISK_COLORS[l.level], boxShadow: `0 0 0 3px ${RISK_COLORS[l.level]}22` }} />
                <Typography variant="body2">{l.label}</Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: "text.secondary", fontFamily: '"IBM Plex Mono", monospace' }}>
                {counts[l.level]}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Card>
    </Card>
  );
};

export default RiskMap;
