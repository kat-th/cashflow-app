export interface IAnalysisInputs {
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxRate: number;
  insurance: number;
  maintenance: number;
  vacancy: number;
  propertyManagement: number;
}

export interface IInvestmentCalculator {
  cashOnCashReturn: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  strategy: string;
  strategyReason: string;
}

export interface IAnalysisResults {
  analysisInputs: IAnalysisInputs;
  investmentCalculator: IInvestmentCalculator;
}

export interface IUserMetrics {
  // purchasePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxRate: number;
  insurance: number;
  maintenance: number;
  vacancy: number;
  // analysisYears: number
}

export interface MonthlyBreakdown {
  rent: number;
  mortgage: number;
  propertyTax: number;
  insurance: number;
  maintenance: number;
  totalExpenses: number;
  cashFlow: number;
}

export interface YearlyBreakdown {
  cashFlow: number;
  cashOnCashReturn: number;
  capRate: number;
  totalReturn: number;
  averageAnnualReturn: number;
}
export interface YearlyProjection {
  year: number;
  propertyValue: number;
  annualCashFlow: number;
  cumulativeCashFlow: number;
  equity: number;
  totalReturn: number;
  returnPercent: number;
}

export interface IProperty {
  id: number;
  address: string;
  city: string;
  state: string;
  listPrice: number;
  rentZestimate: number;
}

export interface IInvestmentAnalysis {
  property: IProperty;
  inputs: IAnalysisInputs;
  analysis: IAnalysisResults;
  isDefault?: boolean;
  message?: string;
}

export interface IPropertyDetails {
  property: IProperty;
  inputs: IAnalysisInputs;
  analysis: IAnalysisResults;
  isDefault?: boolean;
  message?: string;
}

export interface IInvestmentAnalysisId {
  id: number | string;
}

export interface InvestmentState {
  currentAnalysis: IInvestmentAnalysis | null;
  analysesByPropertyId: Record<string, IInvestmentAnalysis>;
  analysisInputs: IAnalysisInputs;
}

export interface IInvestmentActionCreator {
  type: string;
  payload?:
    | IInvestmentAnalysis
    | IAnalysisInputs
    | Record<string, IInvestmentAnalysis>
    | { propertyId: string; analysis: IInvestmentAnalysis }
    | boolean
    | null;
}

export interface IAnalysisPreset {
  name: string;
  description: string;
  inputs: IAnalysisInputs;
}
