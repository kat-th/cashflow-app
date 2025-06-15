// utils/investmentCalculator.ts
interface Property {
  listPrice: number;
  rentZestimate?: number;
}

interface AnalysisInputs {
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxRate: number;
  insurance: number;
  maintenance: number;
  vacancy: number;
  propertyManagement: number;
}

interface AnalysisResults {
  monthlyRent: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  downPaymentAmount: number;
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

export const calculateInvestmentMetrics = (
  property: Property,
  inputs: AnalysisInputs
): AnalysisResults => {
  const purchasePrice = property.listPrice;
  const monthlyRent = property.rentZestimate || purchasePrice * 0.01; // 1% rule fallback
  const downPaymentAmount = (purchasePrice * inputs.downPayment) / 100;
  const loanAmount = purchasePrice - downPaymentAmount;

  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;

  let monthlyMortgage = 0;
  if (monthlyRate > 0) {
    monthlyMortgage =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    monthlyMortgage = loanAmount / numPayments; // 0% interest case
  }

  const monthlyPropertyTax =
    (purchasePrice * inputs.propertyTaxRate) / 100 / 12;
  const monthlyInsurance = inputs.insurance / 12;
  const monthlyMaintenance = (purchasePrice * inputs.maintenance) / 100 / 12;
  const monthlyVacancy = (monthlyRent * inputs.vacancy) / 100;
  const monthlyPropMgmt = (monthlyRent * inputs.propertyManagement) / 100;

  const totalMonthlyExpenses =
    monthlyMortgage +
    monthlyPropertyTax +
    monthlyInsurance +
    monthlyMaintenance +
    monthlyVacancy +
    monthlyPropMgmt;

  const monthlyCashFlow = monthlyRent - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const cashOnCashReturn =
    downPaymentAmount > 0 ? (annualCashFlow / downPaymentAmount) * 100 : 0;

  let strategy = "Hold";
  let strategyReason = "Stable cash flow property with moderate returns";

  if (cashOnCashReturn > 12) {
    strategy = "Strong Buy";
    strategyReason =
      "Excellent cash-on-cash return above 12% indicates strong investment potential";
  } else if (cashOnCashReturn > 8) {
    strategy = "Buy";
    strategyReason =
      "Good cash-on-cash return above 8% shows solid investment opportunity";
  } else if (cashOnCashReturn > 4) {
    strategy = "Consider";
    strategyReason =
      "Moderate returns between 4-8%. Analyze market appreciation potential and location factors";
  } else if (cashOnCashReturn > 0) {
    strategy = "Hold";
    strategyReason =
      "Low but positive returns. Consider if appreciation potential justifies the investment";
  } else {
    strategy = "Avoid";
    strategyReason =
      "Negative cash flow means expenses exceed rental income. Not recommended without significant appreciation potential";
  }

  return {
    monthlyRent: Math.round(monthlyRent * 100) / 100,
    monthlyCashFlow: Math.round(monthlyCashFlow * 100) / 100,
    annualCashFlow: Math.round(annualCashFlow * 100) / 100,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    downPaymentAmount: Math.round(downPaymentAmount * 100) / 100,
    totalMonthlyExpenses: Math.round(totalMonthlyExpenses * 100) / 100,
    strategy,
    strategyReason,
    monthlyMortgage: Math.round(monthlyMortgage * 100) / 100,
    monthlyPropertyTax: Math.round(monthlyPropertyTax * 100) / 100,
    monthlyInsurance: Math.round(monthlyInsurance * 100) / 100,
    monthlyMaintenance: Math.round(monthlyMaintenance * 100) / 100,
    monthlyVacancy: Math.round(monthlyVacancy * 100) / 100,
    monthlyPropMgmt: Math.round(monthlyPropMgmt * 100) / 100,
  };
};
