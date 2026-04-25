# Apro-Vision PRD

## Original problem statement
Build a production-quality, frontend-only React + TypeScript + Material UI dashboard called **Apro-Vision** — an ESG compliance intelligence platform that uses Copernicus Sentinel satellite data to monitor environmental pollution risks across global supply chains for European fashion companies, supporting CSDDD compliance.

## Tech stack (confirmed with user)
- React 18 + TypeScript (strict)
- Material UI v6 (theme provider, sx prop, grid)
- React Router v6
- Leaflet + react-leaflet (map)
- Recharts (charts)
- Frontend-only (mock data, no backend)
- Realistic textile-supply-chain locations (Turkey, Bangladesh, India, China, Vietnam, Pakistan, Cambodia, Morocco, Indonesia, Egypt, Portugal, Peru)

## User personas
- ESG compliance officers at European fashion companies
- Sustainability analysts mapping Tier-1/Tier-2 supplier risk
- Procurement teams running CSDDD due-diligence

## Core requirements
- 6 pages: Home, Companies, Solutions (Risk Radar map), Supplier Report, Conformity, About
- Top navigation with active highlight, sticky header, avatar/settings
- Collapsible sidebar with tooltips when collapsed
- Footer with ESA reference + legal note
- Custom MUI theme (deep navy primary, environmental green secondary, strict risk color mapping LOW=#2E7D52 / MED=#E08A1A / HIGH=#C8362D)
- Sortable / searchable / filterable / paginated company table with risk badges and progress-style risk score
- Global supplier map with color-coded markers, popups, floating legend, navigation to supplier report
- Supplier report with summary cards, pollution chart (24-month line + anomaly markers), anomaly list
- Conformity page with data sources, legal disclaimer, whitepaper download CTA
- About page with 5-step workflow diagram + pipeline metrics

## Implemented (2026-02-25)
- Project converted from JS to TypeScript (tsconfig, @types, MUI v6)
- Theme system (`/src/theme/theme.ts`) with full risk color palette
- Mock data service (`/src/services/mockData.ts`) — 6 companies, 15 suppliers, 24-month pollution timeseries, anomaly generator
- Layout system: `AppLayout`, `TopNavigation`, `Sidebar` (collapsible + mobile drawer), `Footer`
- Pages: HomePage (hero + stat cards + workflow teaser), CompaniesPage (full table), SolutionsPage (Risk Map), SupplierReportPage (KPIs + chart + anomalies), ConformityPage, AboutPage
- Components: RiskBadge, Logo, RiskMap (Leaflet + CARTO light tiles), PollutionChart (Recharts ComposedChart), WorkflowDiagram
- Lazy-loaded routes via React.Suspense
- Source-map-loader exclusion for @mui packages in craco.config.js
- IBM Plex Sans + IBM Plex Mono web fonts
- All interactive elements have data-testid attributes

## Backlog (next phase)
- P1: Dark mode toggle + responsive tablet polish
- P1: Risk alerts panel (use the existing notifications icon hot-spot)
- P2: Export pollution chart as PNG / PDF report download
- P2: Map cluster support at low zoom
- P2: Custom company creation flow (would require backend)

## Files of interest
- `/app/frontend/src/theme/theme.ts`
- `/app/frontend/src/services/mockData.ts`
- `/app/frontend/src/types/index.ts`
- `/app/frontend/src/App.tsx`, `/src/index.tsx`
- `/app/frontend/src/layouts/AppLayout.tsx`
- `/app/frontend/src/components/layout/{TopNavigation,Sidebar,Footer}.tsx`
- `/app/frontend/src/components/{common/RiskBadge,common/Logo,map/RiskMap,supplier/PollutionChart,about/WorkflowDiagram}.tsx`
- `/app/frontend/src/pages/{HomePage,CompaniesPage,SolutionsPage,SupplierReportPage,ConformityPage,AboutPage}.tsx`
- `/app/frontend/craco.config.js` (source-map-loader exclusion)
