import React from "react";
import { useDispatch } from "react-redux";
import { thunkRemoveAnalysis } from "../../redux/investment";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";

export interface DeleteAnalysisModalProps {
  analysisId: number;
}

const DeleteAnalysisModal: React.FC<DeleteAnalysisModalProps> = ({
  analysisId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await dispatch(thunkRemoveAnalysis(analysisId));
    closeModal();
    navigate("/investment");
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Confirm Delete</h4>
          <p>Are you sure you want to remove this spot?</p>
        </div>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleDelete}>
            Yes (Delete Analysis)
          </button>
          <button className="cancel-button" onClick={closeModal}>
            No (Keep Analysis)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAnalysisModal;
