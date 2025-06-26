import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../redux/store";
import { thunkGetAllProperties } from "../../redux/property";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { thunkRemoveProperty } from "../../redux/property";
// import DeleteSpotModal from "./DeleteSpotModal";
import "./ManageProperty.css";
import { IProperty } from "../../redux/types/property";

const ManageProperty: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  //Get the current user Id
  const loggedInUser = useAppSelector((state) => state.session.user?.id);
  const allProperties = useAppSelector((state) => state.property);
  const userProperty = Object.values(allProperties).filter(
    (property) => property.userId === loggedInUser
  );

  const goToSpotDetail = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    property: IProperty
  ) => {
    e.preventDefault();
    navigate(`/property/${property.id}`);
  };

  const goToUpdateForm = (e, spot) => {
    e.preventDefault();
    navigate(`/spots/${spot.id}/edit`);
  };

  useEffect(() => {
    const getSpots = async () => {
      dispatch(thunkGetAllProperties(filters));
      setIsLoaded(true);
    };

    if (!isLoaded) {
      getSpots();
    }
  }, [dispatch, userProperty, isLoaded]);

  return (
    <div>
      {userSpots.length === 0 ? (
        <p>No spots available</p>
      ) : (
        <div className="spots-container">
          {userSpots.map((spot, index) => (
            <div
              key={`${index}-${spot.id}`}
              className="property-container"
              onClick={(e) => goToSpotDetail(e, spot)}
              title={spot.name}
            >
              <div className="image-container">
                {spot.previewImage ? (
                  <>
                    <img
                      src={spot.previewImage}
                      alt={spot.name}
                      className="property-img"
                    />
                    <div className="tooltip">{spot.name}</div>
                  </>
                ) : (
                  <div>
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <div className="property-details">
                <div className="property-top-row">
                  <span className="city-state">
                    {spot.city}, {spot.state}
                  </span>
                  <span className="star-rating">
                    {spot.avgRating
                      ? parseFloat(spot.avgRating).toFixed(1)
                      : "New"}{" "}
                    <FaStar />
                  </span>
                </div>
                <p className="price">
                  <strong>${spot.price}</strong> <span>night</span>
                </p>
              </div>
              <div className="buttons">
                <button
                  className="update-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToUpdateForm(e, spot);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(spot.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {showModal && (
            <DeleteSpotModal
              onCancel={() => setShowModal(false)}
              onConfirm={confirmDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ManageSpot;
