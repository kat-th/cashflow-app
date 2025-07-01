import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import OpenModalButton from "../OpenModalButton";
import DeleteAnalysisModal from "../DeleteModal";
import {
  Home,
  Building,
  CheckCircle,
  XCircle,
  Tag,
  Calendar,
  Trash2,
  Edit,
} from "lucide-react";
import { IPropertyAnalysis } from "../../redux/types/investment";
import "./PropertyAnalysisCard.css";

interface PropertyAnalysisCardProps {
  analysis: IPropertyAnalysis;
}

const PropertyAnalysisCard: React.FC<PropertyAnalysisCardProps> = ({
  analysis,
}) => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log("THIS IS THE USER SAVED ANALYSES", analysis.createdAt);

  const propertyTypeIcon = {
    single_family: Home,
    multi_family: Building,
  };

  return (
    <div className="analysis-card">
      <div className="card-header">
        <div className="header-content">
          <div>
            <div className="icon"></div>
          </div>
          <div className="property-info">
            <h3>{analysis.address}</h3>
            <p className="property-city">
              {analysis.city}, {analysis.state}
              {/* , {analysis.zipcode} */}
            </p>
            <p className="property-type">{analysis.propertyType}</p>
          </div>
        </div>

        {/* Action button */}
        <div className="action-buttons">
          <button className="update-button">
            <Edit size={16} />
          </button>
          <div className="delete-button">
            <OpenModalButton
              icon={<Trash2 size={16} />}
              onModalClose={null}
              modalComponent={
                <DeleteAnalysisModal analysisId={analysis.id as number} />
              }
            />
          </div>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="card-content">
        <div className="financial-grid">
          <div className="financial-metric">
            <p className="metric-label">Purchase Price</p>
            <p className="metric-value">
              ${analysis.purchasePrice.toLocaleString()}
            </p>
          </div>
          <div className="financial-metric">
            <p className="metric-label">Monthly Rent</p>
            <p className="metric-value">
              ${analysis.rentZestimate.toLocaleString()}
            </p>
          </div>

          <div className="financial-kpi">
            <p className="kpi-label">Cash Flow</p>
            <p className="kpi-value">
              {" "}
              ${analysis.monthlyCashFlow.toLocaleString()}
            </p>
          </div>
          <div className="financial-kpi">
            <p className="kpi-label">Cap Rate</p>
            <p className="kpi-value">{analysis.capRate}%</p>
          </div>
        </div>

        {/* Investment Rule */}
        <div className="investment-rules">
          {/* <div> */}
          <div className="rule-one-pct">
            {analysis.onePercentRule ? (
              <CheckCircle className="check-icon" />
            ) : (
              <XCircle className="x-icon" />
            )}
            <span className="rule-label">1% Rule</span>
          </div>
          <div className="rule-two-pct">
            {analysis.twoPercentRule ? (
              <CheckCircle className="check-icon" />
            ) : (
              <XCircle className="x-icon" />
            )}
            <span className="rule-label">2% Rule</span>
          </div>
          {/* </div> */}
        </div>

        {/* Tags */}
        {/* <div className="analysis-tags">
          {analysis.tags.slice(0, 3).map((tag, index) => (
            <div>
              <Tag />
              {tag}
            </div>
          ))}
        </div> */}

        {/* Footer */}
        <div className="analysis-footer">
          <div className="analysis-date">
            <Calendar />
            {new Date(analysis.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAnalysisCard;
