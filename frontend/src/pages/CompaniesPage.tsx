import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { useNavigate } from "react-router-dom";
import { companies, suppliers } from "@/services/mockData";
import { Company, RiskLevel } from "@/types";
import RiskBadge from "@/components/common/RiskBadge";
import { RISK_COLORS } from "@/theme/theme";

type SortKey = "name" | "supplierCount" | "riskScore" | "averageRisk";

const RISK_OPTIONS: Array<RiskLevel | "ALL"> = ["ALL", "LOW", "MEDIUM", "HIGH"];

const CompaniesPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "ALL">("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("riskScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    let list = companies.slice();
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.headquarters.toLowerCase().includes(q));
    }
    if (riskFilter !== "ALL") {
      list = list.filter((c) => c.averageRisk === riskFilter);
    }
    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return list;
  }, [search, riskFilter, sortKey, sortDir]);

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const handleRowClick = (company: Company) => {
    const firstSupplier = suppliers.find((s) => s.companyId === company.id);
    if (firstSupplier) navigate(`/supplier/${firstSupplier.id}`);
    else navigate("/solutions");
  };

  return (
    <Container maxWidth="xl" disableGutters data-testid="companies-page">
      <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-start", md: "flex-end" }} justifyContent="space-between" spacing={2} mb={4}>
        <Box>
          <Typography variant="overline" sx={{ color: "#00c9a7" }}>Portfolio</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>Monitored Companies</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            European fashion brands ranked by aggregated supply-chain pollution risk.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Chip data-testid="company-count-chip" label={`${filtered.length} companies`} variant="outlined" sx={{ borderRadius: 1.5 }} />
        </Stack>
      </Stack>

      {/* Filter / search bar */}
      <Card sx={{ p: 2, mb: 3 }} data-testid="filter-panel">
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "stretch", md: "center" }}>
          <TextField
            data-testid="company-search-input"
            placeholder="Search by company or headquarters…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ minWidth: { xs: "100%", md: 320 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            data-testid="risk-filter-select"
            select
            label="Risk level"
            size="small"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value as RiskLevel | "ALL")}
            sx={{ minWidth: 180 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterAltRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          >
            {RISK_OPTIONS.map((r) => (
              <MenuItem key={r} value={r}>{r === "ALL" ? "All risk levels" : r.charAt(0) + r.slice(1).toLowerCase()}</MenuItem>
            ))}
          </TextField>
          <Box sx={{ flex: 1 }} />
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Click a row to drill down into the supplier-level report.
          </Typography>
        </Stack>
      </Card>

      <Card data-testid="companies-table-card">
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 220 }}>
                  <TableSortLabel active={sortKey === "name"} direction={sortDir} onClick={() => handleSort("name")}>
                    Company
                  </TableSortLabel>
                </TableCell>
                <TableCell>Headquarters</TableCell>
                <TableCell align="center">
                  <TableSortLabel active={sortKey === "supplierCount"} direction={sortDir} onClick={() => handleSort("supplierCount")}>
                    Suppliers
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={sortKey === "averageRisk"} direction={sortDir} onClick={() => handleSort("averageRisk")}>
                    Avg. risk
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ minWidth: 200 }}>
                  <TableSortLabel active={sortKey === "riskScore"} direction={sortDir} onClick={() => handleSort("riskScore")}>
                    Risk score
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right" sx={{ width: 56 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((c) => {
                const color = RISK_COLORS[c.averageRisk];
                return (
                  <TableRow
                    hover
                    key={c.id}
                    data-testid={`company-row-${c.id}`}
                    onClick={() => handleRowClick(c)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <Stack>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{c.name}</Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>{c.industry}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>{c.headquarters}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{c.supplierCount}</Typography>
                    </TableCell>
                    <TableCell>
                      <RiskBadge level={c.averageRisk} />
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <LinearProgress
                          variant="determinate"
                          value={c.riskScore}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: `${color}1A`,
                            "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 4 },
                          }}
                        />
                        <Typography variant="caption" sx={{ color: "text.secondary", fontFamily: '"DM Mono", monospace' }}>
                          {c.riskScore} / 100
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        size="small"
                        label="Active"
                        sx={{
                          bgcolor: "rgba(34,197,94,0.12)",
                          color: "#22c55e",
                          border: "1px solid rgba(34,197,94,0.32)",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Open report">
                        <IconButton size="small" data-testid={`company-open-${c.id}`}>
                          <ArrowOutwardRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ py: 6, textAlign: "center" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>No companies match the current filters.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filtered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Card>
    </Container>
  );
};

export default CompaniesPage;
