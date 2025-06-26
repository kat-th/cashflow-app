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

export interface IDefaultAnalysis {
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number;
  strategy: string;
  strategyReason: string;
}

export interface IPropertyAnalysis {
  id: number;
  userId: number;
  address: string;
  city: string;
  state: string;
  propertyType: "single_family" | "multi_family" | "condo" | "townhouse";
  purchasePrice: number;
  rentZestimate: number;
  monthlyCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  onePercentRule: boolean;
  twoPercentRule: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAnalysisId {
  id: number | string;
}

export interface IInvestmentAnalysis {
  id: number;
  userId: number;
  propertyId: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxRate: number;
  insurance: number;
  maintenance: number;
  vacancy: number;
  propertyManagement: number;
  monthlyRent: number;
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number;
  netOperatingIncome: number;
  capRate: number;
  onePercentRule: boolean;
  twoPercentRule: boolean;
  strategy: string;
  strategyReason: string;
}

export interface IInvestmentAnalysisId {
  id: number | string;
}

export interface InvestmentState {
  currentAnalysis: IInvestmentAnalysis | null;
  allAnalyses: IInvestmentAnalysis[] | null;
  byId: Record<number, IInvestmentAnalysis>;
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
