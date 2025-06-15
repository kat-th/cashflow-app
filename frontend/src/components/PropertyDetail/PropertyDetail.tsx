import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { thunkGetOneProperty } from "../../redux/property";
// import ReviewStar from "../ReviewStar/ReviewStar"; //change with analysis route
// import Reviews from "../Reviews/Reviews"; //change with analysis
import InvestmentCalculator from "../InvestmentCalculator"; //change with inline analysis form
// import InteractiveButtons from "./InteractiveButtons/InteractiveButtons"; //change with key info
import "./PropertyDetail.css";
// import OpenModalButton from "../OpenModalButton";
// import DeletePropertyModal from "../DeletePropertyModal";

const propertyDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { propertyId } = useParams<{ propertyId: string }>();
  const property = useAppSelector((state) =>
    propertyId ? state.property.byId[Number(propertyId)] : undefined
  );
  // console.log(property, 'THIS IS property');
  //   const reviews = useAppSelector((state) => state.reviews.allReviews);
  const currentUser = useAppSelector((state) => state.session.user);
  //   const isOwner = currentUser?.id === property?.owner_id;
  //   const hasReviewed = reviews.some(
  //     (review) => review.user_id === currentUser?.id
  //   );

  const [isLoaded, setIsLoaded] = useState(false);

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

  const handleUpdateproperty = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate(`/update-property/${propertyId}`);
  };

  if (!isLoaded || !property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="property-page">
      <div className="image-gallery">
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
      </div>

      <div className="detail-container">
        <div className="detail-left">
          {/* <div>
            <InteractiveButtons property={property} />
          </div> */}
          <div className="top-info">
            <div className="price-address">
              <div className="property-price">{property.listPrice}</div>
              <div className="property-address">
                {property.address}, {property.city}, {property.state},{" "}
                {property.zipcode}
              </div>
            </div>
            <div className="bed-bath-sqft">
              <div className="property-stat">
                <span className="stat-number">{property.bedrooms}</span>
                <span className="stat-label">Bedrooms</span>
              </div>
              <div className="property-stat">
                <span className="state-number">{property.bathrooms}</span>
                <span className="stat-label">Bathrooms</span>
              </div>
              <div className="property-state">
                <span className="stat-number">{property.sqft}</span>
                <span className="stat-label">Sqft</span>
              </div>
            </div>
          </div>

          <div className="additional-info">
            <span className="tag">{property.propertyType}</span>
            <span className="tag">{property.yearBuilt}</span>
            <span className="tag">{property.sqft}</span>
            <span className="tag">{property.listDate}</span>
          </div>

          <hr className="separator" />
          <h2>About the property</h2>
          <div className="property-description">{property.description}</div>

          <hr className="separator" />
        </div>

        <div className="analysis-section">
          <InvestmentCalculator />
        </div>
      </div>
    </div>
  );
};

export default propertyDetailPage;
