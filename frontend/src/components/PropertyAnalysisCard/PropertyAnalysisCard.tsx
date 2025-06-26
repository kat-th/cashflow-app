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
  //   onDelete: (id: number) => void;
}

const PropertyAnalysisCard: React.FC<PropertyAnalysisCardProps> = ({
  analysis,
  //   onDelete,
}) => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

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
          <div className="analysis-section">
            <h3>{analysis.address}</h3>
            <p>
              {analysis.city}, {analysis.state}
              {/* , {analysis.zipcode} */}
            </p>
            <p>{analysis.propertyType}</p>
          </div>
        </div>

        {/* Action button */}
        <div className="action-buttons">
          <button>
            <Edit />
          </button>
          <OpenModalButton
            icon={<Trash2 />}
            onModalClose={null}
            modalComponent={
              <DeleteAnalysisModal analysisId={analysis.id as number} />
            }
          />
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="">
        <div className="financial-grid">
          <div className="financial-item">
            <p>Purchase Price</p>
            <p>{analysis.purchasePrice}</p>
          </div>
          <div className="financial-item">
            <p>Monthly Rent</p>
            <p>{analysis.rentZestimate}</p>
          </div>

          <div className="financial-item">
            <p>Cash Flow</p>
            <p>{analysis.monthlyCashFlow}</p>
          </div>
          <div className="financial-item">
            <p>Cap Rate</p>
            <p>{analysis.capRate}</p>
          </div>
        </div>

        {/* Investment Rule */}
        <div className="investment-rules">
          {/* <div> */}
          <div className="rule-one-pct">
            {analysis.onePercentRule ? <CheckCircle /> : <XCircle />}
            <span className="rule-label">1% Rule</span>
          </div>
          <div className="rule-two-pct">
            {analysis.twoPercentRule ? <CheckCircle /> : <XCircle />}
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
