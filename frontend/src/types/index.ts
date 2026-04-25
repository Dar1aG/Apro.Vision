export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface SupplierLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export interface Supplier {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  location: SupplierLocation;
  riskLevel: RiskLevel;
  pollutionIndex: number;
  category: string;
  lastScan: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  headquarters: string;
  supplierCount: number;
  averageRisk: RiskLevel;
  riskScore: number;
  lastUpdated: string;
}

export interface PollutionData {
  date: string;
  value: number;
}

export interface Anomaly {
  date: string;
  description: string;
  severity: RiskLevel;
}

export interface DataSource {
  title: string;
  description: string;
  reference: string;
  icon: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}
