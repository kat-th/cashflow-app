import React, { useState } from "react";
import { IProperty } from "../../../redux/types/property";
import { useNavigate } from "react-router-dom";
import { AiFillAlert, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface PropertyCardProps {
  property: IProperty;
  onFavoriteToggle?: (propertyId: number, isFavorite: boolean) => void;
  isFavorite?: boolean;
}
const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onFavoriteToggle,
  isFavorite = false,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const [isPropertyFavorite, setIsPropertyFavorite] = useState(isFavorite);
  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteState = !isPropertyFavorite;
    setIsPropertyFavorite(newFavoriteState);

    if (onFavoriteToggle) {
      onFavoriteToggle(property.id, newFavoriteState);
    }
  };

  const calculateCashOnCash = (property: any) => {
    return 8.5;
  };
  return (
    <div className="property-container" onClick={handleCardClick}>
      <div className="property-card">
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
            <button className="favorite-btn" onClick={handleFavoriteClick}>
              {isPropertyFavorite ? (
                <AiFillHeart size={20} color="#e53e3e" />
              ) : (
                <AiOutlineHeart size={20} color="white" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="property-details">
        <div className="property-price">
          <span>${property.listPrice?.toLocaleString() || "N/A"}</span>
          <span>Rent: ${property.cx}/mo</span>
        </div>
        <div className="property-specs">
          <span className="spec">{property.bedrooms || 0} bds</span>
          <span>|</span>
          <span className="spec">{property.bathrooms || 0} ba</span>
          <span>|</span>
          <span className="spec">
            {property.sqft.toLocaleString() || "N/A"} sqft
          </span>
        </div>
        <div className="property-address">
          {property.address || "Address not available"}, {property.city},{" "}
          {property.state}, {property.zipcode}
        </div>
        <div className="cash-on-cash-tag">
          CoC {calculateCashOnCash(property)}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
