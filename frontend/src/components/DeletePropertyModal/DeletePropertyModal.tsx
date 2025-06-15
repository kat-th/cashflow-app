import React from "react";
import { useDispatch } from "react-redux";
import { thunkRemoveProperty } from "../../redux/property";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";

interface DeletePropertyModalProps {
  propertyId: number;
}

const DeletePropertyModal: React.FC<DeletePropertyModalProps> = ({
  propertyId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await dispatch(thunkRemoveProperty({ id: Number(propertyId) }));
    closeModal();
    navigate("/property");
  };

  return (
    <div className="delete-modal-backdrop">
      <div className="delete-modal-content">
        <h2 className="delete-modal-title">Confirm Delete</h2>
        <p className="delete-modal-message">
          Are you sure you want to delete this property?
        </p>
        <div className="delete-modal-buttons">
          <button
            className="delete-modal-button delete-modal-button-no"
            onClick={closeModal}
          >
            No (Keep Property)
          </button>
          <button
            className="delete-modal-button delete-modal-button-yes"
            onClick={handleDelete}
          >
            Yes (Delete Property)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePropertyModal;
