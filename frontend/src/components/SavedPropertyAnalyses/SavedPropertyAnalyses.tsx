import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "../../redux/store";
import { IPropertyAnalysis } from "../../redux/types/investment";
import { Plus } from "lucide-react";
import { thunkGetSavedAnalyses } from "../../redux/investment";
import PropertyAnalysisCard from "../PropertyAnalysisCard";
import "./SavedPropertyAnalyses.css";

const SavedPropertyAnalyses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const currentUser = useAppSelector((state) => state.session.user);
  const savedAnalyses = useAppSelector((state) => state.investment.allAnalyses);
  // console.log("THIS IS THE USER SAVED ANALYSES", savedAnalyses);

  // const analyses = useAppSelector(
  //   (state: RootState) => state.analysis.allAnalyses
  // );

  useEffect(() => {
    const fetchUserAnalysis = async () => {
      dispatch(thunkGetSavedAnalyses());
      setIsLoaded(true);
    };
    if (!isLoaded) {
      fetchUserAnalysis();
    }
  }, [dispatch, isLoaded]);

  // const goToAnalysisDetail = (
  //   e:
  //     | React.MouseEvent<HTMLAnchorElement>
  //     | React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   analysis: { id: number }
  // ) => {
  //   e.preventDefault();
  //   navigate(`/analysis/${analysis.id}`);
  // };

  return (
    <div className="analysis-container">
      <div>
        {/* Header */}
        <div className="page-header">
          <div className="page-title">
            <h1>Property Analyses</h1>
            <p>Manage and reivew your real estate investment analyses</p>
          </div>

          <button className="new-analysis-button">
            <Plus size={16} />
            New Analysis
          </button>
        </div>

        {/* Search Feature */}
        {/* TODO */}

        {/* Filter Feature */}
        {/* TODO */}

        {/* Property Analysis Grid */}
        <div className="analysis-grid">
          {savedAnalyses?.map((analysis) => (
            <PropertyAnalysisCard analysis={analysis} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedPropertyAnalyses;
