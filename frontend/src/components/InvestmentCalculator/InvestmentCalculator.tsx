// components/InvestmentCalculator/InvestmentCalculator.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import {
  thunkGetPropertyAnalysis,
  selectAnalysisForProperty,
} from "../../redux/investment";
import { Calculator, RefreshCw } from "lucide-react";
import "./InvestmentCalculator.css";

const InvestmentCalculator: React.FC = () => {
  const dispatch = useDispatch();
  const { propertyId } = useParams<{ propertyId: string }>();
  const [isLoaded, setIsLoaded] = useState(false);

  // Get analysis from property state
  const property = useAppSelector((state) =>
    propertyId ? state.property.byId[Number(propertyId)] : undefined
  );

  // Get analysis from investment state
  const investmentAnalysis = useAppSelector((state) =>
    propertyId ? selectAnalysisForProperty(state, propertyId) : null
  );

  console.log("Property from detail:", property);
  console.log("Property investment analysis:", property?.investmentAnalysis);
  console.log(
    "Property investment analysis:",
    property?.investmentAnalysis.cashOnCashReturn
  );
  console.log("Investment analysis from state:", investmentAnalysis);

  useEffect(() => {
    const getAnalysis = async () => {
      dispatch(thunkGetPropertyAnalysis(propertyId as string));
      setIsLoaded(true);
    };
    if (!isLoaded && propertyId) {
      getAnalysis();
    }
  }, [dispatch, isLoaded, propertyId]);

  if (!propertyId) {
    return (
      <div className="investment-calculator">
        <div className="error-container">
          <p>Property ID is required</p>
        </div>
      </div>
    );
  }

  const analysis = property?.investmentAnalysis || investmentAnalysis?.analysis;

  if (!analysis) {
    return (
      <div className="investment-calculator">
        <div className="error-container">
          <p>Unable to load investment analysis</p>
        </div>
      </div>
    );
  }

  //   const { analysis } = property?.investmentAnalysis;

  const getReturnColorClass = (returnValue: number): string => {
    if (returnValue >= 8) return "return-excellent";
    if (returnValue >= 4) return "return-good";
    return "return-poor";
  };

  const getCashFlowColorClass = (cashFlow: number): string => {
    return cashFlow >= 0 ? "cash-flow-positive" : "cash-flow-negative";
  };

  const getStrategyColorClass = (strategy: string): string => {
    switch (strategy) {
      case "Strong Buy":
        return "strategy-strong-buy";
      case "Buy":
        return "strategy-buy";
      case "Consider":
        return "strategy-consider";
      case "Hold":
        return "strategy-hold";
      default:
        return "strategy-avoid";
    }
  };

  return (
    <div className="investment-analysis-container">
      <div className="investment-analysis-header">
        <h3 className="calculator-title">
          <Calculator className="title-icon" size={20} />
          Investment Analysis
        </h3>
        <button
          onClick={() => setShowAnalysisModal(true)}
          className="refresh-button"
        >
          <RefreshCw size={14} className="refresh-icon" />
          Refresh Analysis
        </button>
      </div>

      <div className="analysis-metrics">
        <div className="metric-card">
          <div className="metric-row">
            <span className="metric-label">Cash-on-Cash Return</span>
            <span
              className={`metric-value ${getReturnColorClass(
                analysis.cashOnCashReturn
              )}`}
            >
              {analysis.cashOnCashReturn?.toFixed(2) || "N/A"}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-row">
            <span className="metric-label">Monthly Cash Flow</span>
            <span
              className={`metric-value ${getCashFlowColorClass(
                analysis.monthlyCashFlow || 0
              )}`}
            >
              ${analysis.monthlyCashFlow?.toFixed(0)}
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-row">
            <span className="metric-label">Annual Cash Flow</span>
            <span
              className={`metric-value ${getCashFlowColorClass(
                analysis.annualCashFlow || 0
              )}`}
            >
              ${analysis.annualCashFlow?.toFixed(0)}
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-row">
            <span className="metric-label">Investment Strategy</span>
            <span
              className={`strategy-badge ${getStrategyColorClass(
                analysis.strategy || "Unknown"
              )}`}
            >
              {analysis.strategy || "Unknown"}
            </span>
          </div>
          <p className="strategy-reason">
            {analysis.strategyReason || "No strategy reason available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
