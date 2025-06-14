import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetAllProperties } from "../../redux/property";
import { thunkGetAllPropertyAnalyses } from "../../redux/investment";
import "./ViewAllProperties.css";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { IPropertyFilter } from "../../redux/types/property";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ViewAllProperties: React.FC = () => {
  const properties = useAppSelector(
    (state: RootState) => state.property.allProperties
  );
  const allInvestmentAnalyses = useAppSelector(
    (state: RootState) => state.investment.analysesByPropertyId
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const filters: IPropertyFilter = {};

  useEffect(() => {
    const getProperties = async () => {
      dispatch(thunkGetAllProperties(filters));
      setIsLoaded(true);
    };
    if (!isLoaded) {
      getProperties();
    }
  }, [dispatch, isLoaded]);

  useEffect(() => {
    if (properties.length > 0) {
      const propertyIds = properties.map((property) => property.id.toString());
      dispatch(thunkGetAllPropertyAnalyses(propertyIds));
    }
  }, [properties.length, dispatch]);

  const goToPropertyDetail = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    property: { id: number }
  ) => {
    e.preventDefault();
    navigate(`/property/${property.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent, propertyId: number) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const newFavorite = new Set(prev);
      if (newFavorite.has(propertyId)) {
        newFavorite.delete(propertyId);
      } else {
        newFavorite.add(propertyId);
      }
      return newFavorite;
    });
  };

  const getReturnColorClass = (returnValue: number): string => {
    if (returnValue >= 8) return "return-excellent";
    if (returnValue >= 4) return "return-good";
    return "return-poor";
  };

  const getStrategyColorClass = (strategy: string): string => {
    const strategyLower = strategy.toLowerCase().replace(" ", "-");
    return `strategy-${strategyLower}`;
  };

  return (
    <>
      <div>
        {properties.length === 0 ? (
          <p>No property available</p>
        ) : (
          <div className="property-list">
            {properties.map((property, index) => {
              // Get investment analysis for this specific property from the state
              const investmentAnalysis =
                allInvestmentAnalyses[property.id.toString()];

              return (
                <div
                  key={property.id || index}
                  className="property-container"
                  onClick={(e) => goToPropertyDetail(e, property)}
                >
                  <div key={index} className="property-card">
                    <div className="image-container">
                      <div className="property-image-wrapper">
                        {property.previewImage ? (
                          <>
                            <img
                              src={property.previewImage}
                              alt={property.propertyType}
                              className="property-image"
                            />
                          </>
                        ) : (
                          <div className="no-image-placeholder">
                            <span>No Image</span>
                          </div>
                        )}
                        <button
                          className="favorite-btn"
                          onClick={(e) => handleFavoriteClick(e, property.id)}
                        >
                          {favorites.has(property.id) ? (
                            <AiFillHeart size={20} color="#e53e3e" />
                          ) : (
                            <AiOutlineHeart size={20} color="white" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="property-details">
                      <div className="property-price">
                        <h3>
                          ${property.listPrice?.toLocaleString() || "N/A"}
                        </h3>
                      </div>
                      <div className="property-specs">
                        <span className="spec">
                          {property.bedrooms || 0} bds
                        </span>
                        <span>|</span>
                        <span className="spec">
                          {property.bathrooms || 0} ba
                        </span>
                        <span>|</span>
                        <span className="spec">
                          {property.sqft?.toLocaleString() || "N/A"} sqft
                        </span>
                      </div>
                      <div className="property-address">
                        {property.address || "Address not available"},{" "}
                        {property.city}, {property.state}, {property.zipcode}
                      </div>

                      <div className="cash-on-cash-tag">
                        CoC{" "}
                        {investmentAnalysis.analysis.cashOnCashReturn.toFixed(
                          1
                        )}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewAllProperties;
