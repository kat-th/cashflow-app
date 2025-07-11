import { AnalysisInputs, AnalysisResults } from "../typings/data";

interface Property {
  listPrice: number;
  rentZestimate: number;
}

export const investmentCalculator = (
  property: Property,
  inputs: AnalysisInputs
): AnalysisResults => {
  const purchasePrice = inputs.purchasePrice || property.listPrice;
  const monthlyRent = inputs.monthlyRent || property.rentZestimate;
  const downPaymentAmount = (purchasePrice * inputs.downPayment) / 100;
  const loanAmount = purchasePrice - downPaymentAmount;

  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12; // in months

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

  const monthlyOperatingExpenses =
    monthlyPropertyTax +
    monthlyInsurance +
    monthlyMaintenance +
    monthlyVacancy +
    monthlyPropMgmt;

  // Calculate Net Operating Income (NOI) - excludes mortgage payments
  const annualRent = monthlyRent * 12;
  const annualOperatingExpenses = monthlyOperatingExpenses * 12;
  const netOperatingIncome = annualRent - annualOperatingExpenses;

  // Calculate Cap Rate: NOI / Purchase Price
  const capRate = (netOperatingIncome / purchasePrice) * 100;

  // Calculate Cash Flow and Cash-on-Cash Return
  const monthlyCashFlow = monthlyRent - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const cashOnCashReturn =
    downPaymentAmount > 0 ? (annualCashFlow / downPaymentAmount) * 100 : 0;

  // Check 1% and 2% Rules
  const onePercentRule = monthlyRent >= purchasePrice * 0.01;
  const twoPercentRule = monthlyRent >= purchasePrice * 0.02;

  // Determine the appropriate strategy
  let strategy = "Hold";
  let strategyReason = "Stable cash flow property with moderate returns";

  // Primary strategy matrix: Cap Rate + Cash-on-Cash Return
  if (capRate >= 10 && cashOnCashReturn >= 15) {
    strategy = twoPercentRule ? "Exceptional Buy" : "Exceptional Buy";
    strategyReason = `Outstanding investment: ${capRate.toFixed(
      1
    )}% cap rate and ${cashOnCashReturn.toFixed(1)}% CoC return.${
      twoPercentRule ? " Meets 2% rule!" : ""
    } High property returns with excellent personal returns.`;
  } else if (capRate >= 8 && cashOnCashReturn >= 12) {
    strategy = onePercentRule ? "Exceptional Buy" : "Strong Buy";
    strategyReason = `Excellent investment: ${capRate.toFixed(
      1
    )}% cap rate and ${cashOnCashReturn.toFixed(1)}% CoC return.${
      onePercentRule ? " Meets 1% rule!" : ""
    } Strong property fundamentals with high personal returns.`;
  } else if (capRate >= 6 && cashOnCashReturn >= 8) {
    strategy = "Buy";
    strategyReason = `Good investment opportunity: ${capRate.toFixed(
      1
    )}% cap rate and ${cashOnCashReturn.toFixed(
      1
    )}% CoC return. Solid property fundamentals with good personal returns.`;
  } else if (capRate >= 6 && cashOnCashReturn >= 4) {
    strategy = onePercentRule ? "Consider" : "Hold/Pass";
    strategyReason = `Fair investment: ${capRate.toFixed(
      1
    )}% cap rate and ${cashOnCashReturn.toFixed(1)}% CoC return.${
      onePercentRule ? " Meets 1% rule." : " Fails 1% rule."
    } Analyze appreciation potential and location factors.`;
  } else if (cashOnCashReturn >= 8) {
    strategy = "Consider";
    strategyReason = `High personal returns (${cashOnCashReturn.toFixed(
      1
    )}% CoC) but lower cap rate (${capRate.toFixed(
      1
    )}%). Property may be in appreciating market - verify location fundamentals.`;
  } else if (cashOnCashReturn >= 4 && capRate >= 4) {
    strategy = onePercentRule ? "Consider" : "Hold/Pass";
    strategyReason = `Moderate returns: ${cashOnCashReturn.toFixed(
      1
    )}% CoC return and ${capRate.toFixed(1)}% cap rate.${
      onePercentRule ? " Meets 1% rule." : " Fails 1% rule."
    } Consider for appreciation plays only.`;
  } else if (cashOnCashReturn > 0) {
    strategy = "Hold/Pass";
    strategyReason = `Low returns: ${cashOnCashReturn.toFixed(
      1
    )}% CoC return and ${capRate.toFixed(1)}% cap rate.${
      !onePercentRule ? " Fails 1% rule." : ""
    } Minimal cash flow - consider appreciation potential carefully.`;
  } else {
    strategy = "Avoid";
    strategyReason = `Negative cash flow: ${monthlyCashFlow.toFixed(
      0
    )}/month loss with ${capRate.toFixed(1)}% cap rate.${
      !onePercentRule ? " Fails 1% rule." : ""
    } Poor fundamentals - not recommended without major improvements.`;
  }

  return {
    monthlyRent: Math.round(monthlyRent * 100) / 100,
    totalMonthlyExpenses: Math.round(totalMonthlyExpenses * 100) / 100,
    monthlyCashFlow: Math.round(monthlyCashFlow * 100) / 100,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    netOperatingIncome: Math.round(netOperatingIncome * 100) / 100,
    capRate: Math.round(capRate * 100) / 100,
    onePercentRule,
    twoPercentRule,
    strategy,
    strategyReason,
  };
};

// Helper function to get investment rule target values
export const getInvestmentRuleStatus = (
  monthlyRent: number,
  purchasePrice: number
): {
  onePercent: { passes: boolean; required: number; actual: number };
  twoPercent: { passes: boolean; required: number; actual: number };
} => {
  const onePercentRequired = purchasePrice * 0.01;
  const twoPercentRequired = purchasePrice * 0.02;

  return {
    onePercent: {
      passes: monthlyRent >= onePercentRequired,
      required: Math.round(onePercentRequired),
      actual: Math.round(monthlyRent),
    },
    twoPercent: {
      passes: monthlyRent >= twoPercentRequired,
      required: Math.round(twoPercentRequired),
      actual: Math.round(monthlyRent),
    },
  };
};

// Helper function to categorize Cap Rate with suggestions
export const categorizeCapRate = (
  capRate: number
): {
  category: string;
  description: string;
  color: "green" | "yellow" | "orange" | "red";
} => {
  if (capRate >= 10) {
    return {
      category: "Excellent",
      description: "High return, potentially higher risk area",
      color: "green",
    };
  } else if (capRate >= 8) {
    return {
      category: "Good",
      description: "Solid return with balanced risk",
      color: "green",
    };
  } else if (capRate >= 6) {
    return {
      category: "Fair",
      description: "Moderate return, may indicate appreciating area",
      color: "yellow",
    };
  } else if (capRate >= 4) {
    return {
      category: "Low",
      description: "Low return, likely stable/appreciating market",
      color: "orange",
    };
  } else {
    return {
      category: "Poor",
      description: "Very low return, high appreciation area or poor deal",
      color: "red",
    };
  }
};
