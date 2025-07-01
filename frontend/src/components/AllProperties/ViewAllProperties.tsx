import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { thunkGetAllProperties } from "../../redux/property";
// import { thunkGetAllPropertyAnalyses } from "../../redux/investment";
import DeleteModal from "../DeleteModal";
import OpenModalButton from "../OpenModalButton";
import { IPropertyFilter } from "../../redux/types/property";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Trash2, Edit, Heart, MapPin } from "lucide-react";
import "./ViewAllProperties.css";

const ViewAllProperties: React.FC = () => {
  const properties = useAppSelector(
    (state: RootState) => state.property.allProperties
  );
  // console.log("THIS IS THE PROPERTIES", properties);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const filters: IPropertyFilter = {};

  const isLoggedIn = useAppSelector((state) => state.session.user);
  const { propertyId } = useParams<{ propertyId: string }>();

  useEffect(() => {
    const getProperties = async () => {
      dispatch(thunkGetAllProperties(filters));
      setIsLoaded(true);
    };
    if (!isLoaded) {
      getProperties();
    }
  }, [dispatch, isLoaded]);

  const goToPropertyDetail = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    property: { id: number }
  ) => {
    e.preventDefault();
    navigate(`/property/${property.id}`);
  };

  const handleUpdateProperty = (
    propertyId: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/update-property/${propertyId}`);
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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // const getReturnColorClass = (returnValue: number): string => {
  //   if (returnValue >= 8) return "return-excellent";
  //   if (returnValue >= 4) return "return-good";
  //   return "return-poor";
  // };

  // const getStrategyColorClass = (strategy: string): string => {
  //   const strategyLower = strategy.toLowerCase().replace(" ", "-");
  //   return `strategy-${strategyLower}`;
  // };

  return (
    <>
      <div>
        {properties.length === 0 ? (
          <p>No property available</p>
        ) : (
          <div className="property-list">
            {properties.map((property, index) => {
              // Get investment analysis for this specific property from the state
              // const investmentAnalysis =
              //   allInvestmentAnalyses[property.id.toString()];
              // console.log("THIS IS PROPERTY", index, property);
              return (
                <div
                  key={`${property.id}-${index}`}
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

                      <div className="footer">
                        <div className="cash-on-cash-tag">
                          CoC{" "}
                          {property.investmentAnalysis?.cashOnCashReturn.toFixed(
                            1
                          )}
                          %
                        </div>
                        {isLoggedIn && (
                          <div className="action-buttons">
                            <button
                              onClick={(e) =>
                                handleUpdateProperty(property.id, e)
                              }
                              className="update-button"
                            >
                              <Edit size={16} />
                            </button>
                            <div
                              onClick={handleDeleteClick}
                              className="delete-button"
                            >
                              <OpenModalButton
                                icon={<Trash2 size={16} />}
                                onModalClose={null}
                                modalComponent={
                                  <DeleteModal propertyId={property.id} />
                                }
                              />
                            </div>
                          </div>
                        )}
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
