import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllProperties } from "../../redux/property";
import "./ViewAllProperties.css";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ReviewStar from '../ReviewStar/ReviewStar';
import { IPropertyFilter } from "../../redux/types/property";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function ViewAllProperties() {
  const properties = useSelector(
    (state: RootState) => state.property.allProperties
  );
  // console.log('=========THIS IS property=====', propertyes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const filters: IPropertyFilter = {};
  // console.log('propertyes:', propertyes);

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

  const calculateCashOnCash = (property: any) => {
    return "7%";
  };

  return (
    <>
      <div>
        {properties.length === 0 ? (
          <p>No property available</p>
        ) : (
          <div className="property-list">
            {properties.map((property, index) => (
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
                      <h3>${property.listPrice?.toLocaleString() || "N/A"}</h3>
                    </div>
                    <div className="property-specs">
                      <span className="spec">{property.bedrooms || 0} bds</span>
                      <span>|</span>
                      <span className="spec">{property.bathrooms || 0} ba</span>
                      <span>|</span>
                      <span className="spec">
                        {property.sqft.toLocaleString() || "N/A"} ba
                      </span>
                    </div>
                    <div className="property-address">
                      {property.address || "Address not available"},{" "}
                      {property.city}, {property.state}, {property.zipcode}
                    </div>
                    <div className="cash-on-cash-tag">
                      CoC {calculateCashOnCash(property)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
