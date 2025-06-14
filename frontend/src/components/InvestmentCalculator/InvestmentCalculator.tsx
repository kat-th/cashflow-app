// components/InvestmentCalculator/InvestmentCalculator.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import {
  thunkGetPropertyAnalysis,
  selectAnalysisForProperty,
} from "../../redux/investment";
import "./InvestmentCalculator.css";

const InvestmentCalculator: React.FC = () => {
  const dispatch = useDispatch();
  const { propertyId } = useParams<{ propertyId: string }>();
  const [isLoaded, setIsLoaded] = useState(false);

  // Get data from Redux store
  //   const investmentAnalysis = useAppSelector((state) =>
  //     propertyId ? selectAnalysisForProperty(state, propertyId) : null
  //   );

  const investmentAnalysis = useAppSelector((state) =>
    propertyId ? selectAnalysisForProperty(state, propertyId) : null
  );

  console.log("====THIS IS INVESTMENT ANALYSIS", investmentAnalysis);
  //   console.log("====THIS IS cash on cash", investmentAnalysis.cashOnCashReturn);

  useEffect(() => {
    const getAnalysis = async () => {
      dispatch(thunkGetPropertyAnalysis(propertyId as string));
      setIsLoaded(true);
    };
    if (!isLoaded) {
      getAnalysis();
    }
  }, [dispatch, isLoaded]);

  if (!propertyId) {
    return (
      <div className="investment-calculator">
        <div className="error-container">
          <p>Property ID is required</p>
        </div>
      </div>
    );
  }

  if (!investmentAnalysis || !investmentAnalysis.analysis) {
    return (
      <div className="investment-calculator">
        <div className="error-container">
          <p>Unable to load investment analysis</p>
        </div>
      </div>
    );
  }

  const { analysis } = investmentAnalysis;

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
    <div className="investment-calculator">
      <div className="calculator-header">
        <div className="header-content">
          <div className="calculator-icon">📊</div>
          <h3 className="calculator-title">Investment Analysis</h3>
        </div>
      </div>

      <div className="metrics-container">
        <div className="metric-card">
          <div className="metric-content">
            <span className="metric-label">Cash-on-Cash Return</span>
            <span
              className={`metric-value ${getReturnColorClass(
                analysis.cashOnCashReturn
              )}`}
            >
              {analysis.cashOnCashReturn.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-content">
            <span className="metric-label">Monthly Cash Flow</span>
            <span
              className={`metric-value ${getCashFlowColorClass(
                analysis.monthlyCashFlow
              )}`}
            >
              ${analysis.monthlyCashFlow.toFixed(0)}
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-content">
            <span className="metric-label">Annual Cash Flow</span>
            <span
              className={`metric-value ${getCashFlowColorClass(
                analysis.annualCashFlow
              )}`}
            >
              ${analysis.annualCashFlow.toFixed(0)}
            </span>
          </div>
        </div>

        <div className="metric-card strategy-card">
          <div className="metric-content strategy-content">
            <span className="metric-label">Investment Strategy</span>
            <span
              className={`strategy-badge ${getStrategyColorClass(
                analysis.strategy
              )}`}
            >
              {analysis.strategy}
            </span>
          </div>
          <p className="strategy-reason">{analysis.strategyReason}</p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
