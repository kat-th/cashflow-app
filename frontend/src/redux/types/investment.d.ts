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

export interface IAnalysisResults {
  monthlyRent: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  totalMonthlyExpenses: number;
  strategy: string;
  strategyReason: string;
  monthlyMortgage: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyMaintenance: number;
  monthlyVacancy: number;
  monthlyPropMgmt: number;
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
