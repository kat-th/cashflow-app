export interface InvestmentCalculation {
  monthlyRent: number;
  purchasePrice: number;
  downpaymentPercent: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  annualInsurance: number;
  propertyMgmtPercent: number;
  maintenancePercent: number;
  vacancyPercent: number;
  monthlyHoa: number;
  closingCostsPercent: number;
}

export interface CashFlowResult {
  monthlyCashflow: number;
  annualCashFlow: number;
  monthlyMortgage: number;
  monthlyExpenses: number;
  downPayment: number;
  totalCashInvested: number;
  cashOnCashReturn: number;
}
