import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { thunkGetOneProperty } from "../../redux/property";
import InvestmentCalculator from "../InvestmentCalculator";
import OpenModalButton from "../OpenModalButton";

import "./PropertyDetail.css";

const propertyDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const { propertyId } = useParams<{ propertyId: string }>();
  const property = useAppSelector((state) =>
    propertyId ? state.property.byId[Number(propertyId)] : undefined
  );
  // console.log(property, "THIS IS property");
  const currentUser = useAppSelector((state) => state.session.user);
  //   const isOwner = currentUser?.id === property?.owner_id;
  //   const hasReviewed = reviews.some(
  //     (review) => review.user_id === currentUser?.id
  //   );

  useEffect(() => {
    const fetchpropertyDetail = async () => {
      if (propertyId && !isNaN(Number(propertyId))) {
        await dispatch(thunkGetOneProperty(propertyId));
        setIsLoaded(true);
      } else {
        navigate("/");
      }
    };
    if (!isLoaded) {
      fetchpropertyDetail();
    }
  }, [propertyId, dispatch, navigate]);

  if (!property) {
    return <div>Property not found</div>;
  }

  const daysOnMarket = Math.floor(
    (Date.now() - new Date(property.listDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  // console.log("THIS IS DAYS ON MARKET", daysOnMarket);

  const handleUpdateproperty = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate(`/update-property/${propertyId}`);
  };

  if (!isLoaded || !property) {
    return <div>Property not found</div>;
  }

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
    <div className="property-detail-grid">
      <div className="property-content">
        <div className="spot-images">
          {property.previewImage ? (
            <div className="image-grid">
              <img
                src={property.previewImage}
                alt="Main picture"
                className="preview-image"
              />
              <div className="other-images">
                {property.images.map((url: string, index: number) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Property image ${index + 1}`}
                    className="other-image"
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>No Images Available</p>
          )}
        </div>

        <h2 className="property-title">
          {property.address}
          {/* {property.city}, {property.state},{" "}{property.zipcode} */}
        </h2>
        <div className="property-price-info">
          <span className="property-price">
            ${property.listPrice.toLocaleString()}
          </span>
          <span className="property-rent">
            RentEstimate: ${property.rentZestimate}/mo
          </span>
        </div>

        <div className="property-detail">
          <div className="detail-left">
            {/* <div>
            <InteractiveButtons property={property} />
          </div> */}

            <div className="property-stats-grid">
              <div className="stat-item">
                <div className="stat-number">{property.bedrooms}</div>
                <div className="stat-label">Bedrooms</div>
              </div>
              <div className="stat-item">
                <div className="state-number">{property.bathrooms}</div>
                <div className="stat-label">Bathrooms</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{property.sqft}</div>
                <div className="stat-label">Sqft</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{daysOnMarket}</div>
                <div className="stat-label">Days On Market</div>
              </div>
            </div>
          </div>

          {/* <hr className="separator" /> */}
          {/* <div className="property-description-card">
            <h2 className="description-title">Property Description</h2>
            <p className="description-text">{property.description}</p>
            <div className="property-type-tag">
              <span className="property-type-badge">
                {property.propertyType}
              </span>
              <span className="property-type-badge">
                {getReturnColorClass(
                  property.investmentAnalysis.cashOnCashReturn
                )}
              </span>
              <span className="property-type-badge">
                {getCashFlowColorClass(
                  property.investmentAnalysis.cashOnCashReturn
                )}
              </span>
              <span className="property-type-badge">
                {getStrategyColorClass(
                  property.investmentAnalysis.cashOnCashReturn
                )}
              </span>
            </div>
          </div> */}

          {/* <hr className="separator" /> */}
        </div>

        <div className="analysis-section">
          <InvestmentCalculator
            property={property}
            // onClose={() => setShowAnalysisModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default propertyDetailPage;
