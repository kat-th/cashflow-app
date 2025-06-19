import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useAppSelector } from "../../redux/store";
import {
  IAnalysisInputs,
  IAnalysisResults,
  IInvestmentCalculator,
  IProperty,
} from "../../redux/types/investment";
import { useDispatch } from "react-redux";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Home,
  Edit3,
  Save,
  X,
  RefreshCw,
} from "lucide-react";
import { thunkCreateAnalysis } from "../../redux/investment";
import "./UpdateAnalysisModal.css";

interface UpdateAnalysisModalProps {
  property: IProperty;
  onClose: () => void;
}

const UpdateAnalysisModal: React.FC<UpdateAnalysisModalProps> = ({
  property,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isLoaded, setIsLoaded] = useState(false);
  const [calculatedAnalysis, setCalculatedAnalysis] =
    useState<IInvestmentCalculator | null>(null);
  const [analysisInputs, setAnalysisInputs] = useState<IAnalysisInputs>({
    downPayment: 20,
    interestRate: 7.0,
    loanTerm: 30,
    propertyTaxRate: 1.2,
    insurance: 1200,
    maintenance: 1,
    vacancy: 5,
    propertyManagement: 8,
  });

  // const { propertyId } = useParams<{ propretyId: string }>;
  // const property = useAppSelector((state) =>
  //   propertyId ? state.property.byId[Number(propertyId)] : undefined
  // );

  //Update investment analysis result based on user inputs
  const calculateInvestmentMetrics = (
    property: IProperty,
    inputs: IAnalysisInputs
  ) => {
    const purchasePrice = property.listPrice;
    const monthlyRent = property.rentZestimate;
    const downPaymentAmount = (purchasePrice * inputs.downPayment) / 100;
    const loanAmount = purchasePrice - downPaymentAmount;

    // Estimate monthly mortgage
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numPayments = inputs.loanTerm * 12;
    const monthlyMortgage =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Estimate monthly expenses
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
    const cashOnCashReturn = (annualCashFlow / downPaymentAmount) * 100;

    let strategy = "Hold";
    let strategyReason = "Stable cash flow property";

    if (cashOnCashReturn > 12) {
      strategy = "Strong Buy";
      strategyReason = "Excellent cash-on-cash return above 12%";
    } else if (cashOnCashReturn > 8) {
      strategy = "Buy";
      strategyReason = "Good cash-on-cash return above 8%";
    } else if (cashOnCashReturn > 4) {
      strategy = "Consider";
      strategyReason = "Moderate return, analyze market appreciation potential";
    } else if (cashOnCashReturn < 0) {
      strategy = "Avoid";
      strategyReason = "Negative cash flow - expenses exceed rental income";
    }

    return {
      monthlyRent,
      monthlyCashFlow,
      annualCashFlow,
      cashOnCashReturn,
      totalMonthlyExpenses,
      strategy,
      strategyReason,
      breakdown: {
        mortgage: monthlyMortgage,
        propertyTax: monthlyPropertyTax,
        insurance: monthlyInsurance,
        maintenance: monthlyMaintenance,
        vacancy: monthlyVacancy,
        propertyManagement: monthlyPropMgmt,
      },
    };
  };

  const handleCalculateAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    const analysisResult = calculateInvestmentMetrics(property, analysisInputs);
    setCalculatedAnalysis(analysisResult);
  };

  const newUserAnalysis = {
    // propertyId: property.id,
    analysisInputs: analysisInputs,
    investmentCalculator: calculatedAnalysis,
  };

  const handleSaveAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newUserAnalysis && property) {
      await dispatch(thunkCreateAnalysis(property.id, newUserAnalysis));
      setIsLoaded(!isLoaded);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Update Investment Analysis</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label>Downpayment (%)</label>
            <input
              type="number"
              value={analysisInputs.downPayment}
              onChange={(e) =>
                setAnalysisInputs({
                  ...analysisInputs,
                  downPayment: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div className="form-field">
            <label>Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={analysisInputs.interestRate}
              onChange={(e) =>
                setAnalysisInputs({
                  ...analysisInputs,
                  interestRate: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div className="form-field">
            <label>Loan Term (years)</label>
            <input
              type="number"
              value={analysisInputs.loanTerm}
              onChange={(e) =>
                setAnalysisInputs({
                  ...analysisInputs,
                  loanTerm: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div className="form-field">
            <label>Property Tax Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={analysisInputs.propertyTaxRate}
              onChange={(e) =>
                setAnalysisInputs({
                  ...analysisInputs,
                  propertyTaxRate: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div className="form-field">
            <label>Annual Insurance ($)</label>
            <input
              type="number"
              value={analysisInputs.insurance}
              onChange={(e) =>
                setAnalysisInputs({
                  ...analysisInputs,
                  insurance: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div className="form-field">
            <label>Maintenance (% of value)</label>
            <input
              type="number"
              step="0.1"
              value={analysisInputs.maintenance}
              onChange={(e) =>
                setAnalysisInputs({
                  ...analysisInputs,
                  maintenance: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div className="form-field">
            <label>Vacancy Rate (%)</label>
            <input
              type="number"
              value={analysisInputs.vacancy}
              onChange={(e) =>
                setAnalysisInputs({
                  ...analysisInputs,
                  vacancy: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="form-field">
            <label>Property Management (%)</label>
            <input
              type="number"
              step="0.1"
              value={analysisInputs.propertyManagement}
              onChange={(e) =>
                setAnalysisInputs({
                  ...analysisInputs,
                  propertyManagement: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div>
            <button
              className="button-calculate calculate"
              onClick={handleCalculateAnalysis}
            >
              <Calculator className="btn-icon" size={16} />
              <span>Calculate</span>
            </button>
          </div>
        </div>
        {calculatedAnalysis && (
          <div className="analysis-result">
            <h3>Update Analysis Results</h3>

            <div className="result-grid">
              <div className="metric-card">
                <div>Cash-on-Cash Return</div>
                <div
                  className={`metric-value ${
                    calculatedAnalysis.cashOnCashReturn >= 8
                      ? "text-green"
                      : "text-red"
                  }`}
                >
                  ${calculatedAnalysis.cashOnCashReturn.toFixed(0)}
                </div>
              </div>

              <div className="metric-card">
                <div>Monthly Cash Flow</div>
                <div
                  className={`metric-value${
                    calculatedAnalysis.monthlyCashFlow >= 0
                      ? "text-green"
                      : "text-red"
                  }`}
                >
                  ${calculatedAnalysis.monthlyCashFlow.toFixed(0)}
                </div>
              </div>

              <div className="metric-card">
                <div>Annual Cash Flow</div>
                <div
                  className={`metric-value${
                    calculatedAnalysis.annualCashFlow >= 0
                      ? "text-green"
                      : "text-red"
                  }`}
                >
                  ${calculatedAnalysis.annualCashFlow.toFixed(0)}
                </div>
              </div>

              <div className="metric-card">
                <div>Investment Strategy</div>
                <div
                  className={`metric-value${
                    calculatedAnalysis.strategy === "Strong Buy"
                      ? "text-green"
                      : calculatedAnalysis.strategy === "Buy"
                      ? "text-blue"
                      : calculatedAnalysis.strategy === "Consider"
                      ? "text-yellow"
                      : calculatedAnalysis.strategy === "Hold"
                      ? "text-gray"
                      : "text-red-600"
                  }`}
                >
                  ${calculatedAnalysis.strategy}
                </div>
              </div>

              <div className="strategy-reason">
                <p>{calculatedAnalysis.strategyReason}</p>
              </div>
            </div>
            <button className="button-save save" onClick={handleSaveAnalysis}>
              <Save className="btn-icon" size={16} />
              Save Analysis to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UpdateAnalysisModal;
