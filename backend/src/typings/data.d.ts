export interface LoginUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  isHost: boolean;
}

export interface PaginationValues {
  limit?: number;
  offset?: number;
}

export interface WhereValues {
  lat?: any;
  lng?: any;
  price?: any;
}

export interface Property {
  id: number;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  lotSize: number;
  propertyType: string;
  listPrice: number;
  listDate: Date;
  previewImage?: string;
}

export interface AnalysisInputs {
  purchasePrice: number;
  monthlyRent: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  insurance: number;
  maintenance: number;
  vacancy: number;
  propertyTaxRate: number;
  propertyManagement: number;
}

export interface AnalysisResults {
  monthlyRent: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number;
  capRate: number;
  onePercentRule: boolean;
  twoPercentRule: boolean;
  totalMonthlyExpenses: number;
  netOperatingIncome: number;
  strategy: string;
  strategyReason: string;
}

export interface CreateAnalysisBody {
  inputs: AnalysisInputs;
  address: string;
}
export interface IMarketProperty {
  address: string;
  city: string;
  state: string;
  propertyType: "single_family" | "multi_family" | "condo" | "townhouse";
  listPrice: number;
  rentZestimate: number;
}

export interface IPropertyAnalysis {
  id: number;
  userId: number;
  propertyId?: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  insurance: number;
  maintenance: number;
  vacancy: number;
  propertyTaxRate: number;
  propertyManagement: number;
  purchasePrice?: number;
  monthlyRent?: number;
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number;
  netOperatingIncome: number;
  capRate: number;
  onePercentRule: boolean;
  twoPercentRule: boolean;
  strategy: string;
  strategyReason: string;
  createdAt: string;
  updatedAt: string;
  MarketProperty: IMarketProperty;
}

export interface IInvestmentAnalysisResult {
  MarketProperty: IMarketProperty;
  UserInputs: AnalysisInputs;
  id: number;
  userId: number;
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  onePercentRule: boolean;
  twoPercentRule: boolean;
  createdAt: string;
  updatedAt: string;
}
