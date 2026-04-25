import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";
import { platformStats } from "@/services/mockData";

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  accent: string;
  testId: string;
}

const StatCard: React.FC<StatProps> = ({ icon, label, value, accent, testId }) => (
  <Card data-testid={testId} sx={{ height: "100%" }}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: `${accent}14`,
            color: accent,
          }}
        >
          {icon}
        </Box>
        <Typography variant="overline" sx={{ color: "text.secondary", fontSize: 11 }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="h3" sx={{ mt: 2.5, fontWeight: 700, letterSpacing: "-0.01em" }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl" disableGutters data-testid="home-page">
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          p: { xs: 3, md: 6 },
          mb: 5,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(46, 125, 82, 0.35) 0%, transparent 42%), radial-gradient(circle at 82% 78%, rgba(31, 64, 104, 0.55) 0%, transparent 50%)",
        }}
      >
        <Stack direction={{ xs: "column", lg: "row" }} spacing={5} alignItems="stretch">
          <Box sx={{ flex: 1 }}>
            <Chip
              icon={<SatelliteAltRoundedIcon sx={{ color: "secondary.light !important" }} />}
              label="Copernicus Sentinel · CSDDD aligned"
              data-testid="hero-tagline"
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                color: "common.white",
                border: "1px solid rgba(255,255,255,0.18)",
                fontWeight: 500,
                mb: 3,
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.25rem", sm: "3rem", lg: "3.75rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                mb: 2.5,
              }}
              data-testid="hero-title"
            >
              Apro-Vision
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                maxWidth: 620,
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.65,
                mb: 4,
              }}
              data-testid="hero-description"
            >
              Apro-Vision leverages Copernicus Sentinel satellite data to monitor environmental risk
              exposure across global supply chains, supporting compliance with the Corporate
              Sustainability Due Diligence Directive (CSDDD).
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<BusinessRoundedIcon />}
                onClick={() => navigate("/companies")}
                data-testid="cta-view-companies"
                sx={{
                  bgcolor: "common.white",
                  color: "primary.main",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.92)" },
                }}
              >
                View Companies
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<RadarRoundedIcon />}
                onClick={() => navigate("/solutions")}
                data-testid="cta-open-risk-radar"
                sx={{
                  color: "common.white",
                  borderColor: "rgba(255,255,255,0.5)",
                  "&:hover": { borderColor: "common.white", bgcolor: "rgba(255,255,255,0.08)" },
                }}
              >
                Open Risk Radar
              </Button>
            </Stack>
          </Box>
          <Box
            data-testid="hero-visual"
            sx={{
              flex: 1,
              minHeight: 280,
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.14)",
              bgcolor: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative satellite grid */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <Box sx={{ position: "relative", textAlign: "center" }}>
              <SatelliteAltRoundedIcon sx={{ fontSize: 96, color: "secondary.light", opacity: 0.92 }} />
              <Typography variant="overline" sx={{ display: "block", mt: 1, color: "rgba(255,255,255,0.7)", letterSpacing: "0.16em" }}>
                Sentinel Live Feed
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>

      {/* Stats */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
          gap: 3,
          mb: 6,
        }}
        data-testid="home-stats-grid"
      >
        <StatCard
          icon={<ApartmentRoundedIcon />}
          label="Monitored Companies"
          value={platformStats.totalCompanies}
          accent="#0F2A47"
          testId="stat-companies"
        />
        <StatCard
          icon={<BusinessRoundedIcon />}
          label="Tracked Suppliers"
          value={platformStats.totalSuppliers}
          accent="#2E7D52"
          testId="stat-suppliers"
        />
        <StatCard
          icon={<WarningAmberRoundedIcon />}
          label="Active High Risks"
          value={platformStats.activeRisks}
          accent="#C8362D"
          testId="stat-risks"
        />
        <StatCard
          icon={<PublicRoundedIcon />}
          label="Countries Covered"
          value={platformStats.countriesCovered}
          accent="#1F4068"
          testId="stat-countries"
        />
      </Box>

      {/* Quick guide */}
      <Box>
        <Typography variant="overline" sx={{ color: "secondary.dark" }}>
          How it works
        </Typography>
        <Typography variant="h4" sx={{ mt: 0.5, mb: 3, fontWeight: 700 }}>
          Satellite intelligence, end to end.
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {[
            { title: "Ingest", text: "Copernicus Sentinel imagery is acquired on a 5-day cadence." },
            { title: "Detect", text: "Multispectral analysis flags hydrographic and atmospheric anomalies." },
            { title: "Report", text: "Findings map directly to CSDDD / ESRS E3 obligations." },
          ].map((step, i) => (
            <Card key={step.title} sx={{ p: 3 }} data-testid={`workflow-card-${i}`}>
              <Typography
                variant="overline"
                sx={{ color: "text.secondary", fontFamily: '"IBM Plex Mono", monospace' }}
              >
                Step 0{i + 1}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
                {step.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                {step.text}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
