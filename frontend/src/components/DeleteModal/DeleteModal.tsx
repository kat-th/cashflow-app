import React from "react";
import { useDispatch } from "react-redux";
import { thunkRemoveAnalysis } from "../../redux/investment";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./DeleteModal.css";
import { thunkRemoveProperty } from "../../redux/property";

export interface DeleteAnalysisModalProps {
  analysisId?: number;
  propertyId?: number;
}

const DeleteAnalysisModal: React.FC<DeleteAnalysisModalProps> = ({
  analysisId,
  propertyId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (analysisId !== undefined) {
      const itemToDelete = "Analysis";
      await dispatch(thunkRemoveAnalysis(analysisId));
    } else if (propertyId !== undefined) {
      const itemToDelete = "Property";
      await dispatch(thunkRemoveProperty(propertyId));
    }

    closeModal();
  };

  const modalMessage = () => {
    if (analysisId !== undefined) {
      return {
        message: "Are you sure you want to remove this analysis?",
      };
    } else if (propertyId !== undefined) {
      return {
        message: "Are you sure you want to remove this property?",
      };
    }
  };

  const content = modalMessage();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="delete-modal-header">
          <h4>Confirm Delete</h4>
          <p>{content?.message}</p>
        </div>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleDelete}>
            Confirm
          </button>
          <button className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAnalysisModal;
