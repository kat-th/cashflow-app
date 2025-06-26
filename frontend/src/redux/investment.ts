import {
  IAnalysisInputs,
  IInvestmentAnalysis,
  IInvestmentActionCreator,
  InvestmentState,
  IAnalysisResults,
  IAnalysisId,
} from "./types/investment";
import { csrfFetch } from "./csrf";

// ============ ACTION TYPES =================
export const GET_PROPERTY_ANALYSIS = "Investment/getPropertyAnalysis";
export const GET_SAVED_ANALYSES = "Investment/getSavedPropertyAnalyses";
export const CREATE_ANALYSIS = "Investment/createAnalysis";
export const REMOVE_ANALYSIS = "Property/removeProperty";

// ============ ACTION CREATOR =================
const getPropertyAnalysisAction = (
  propertyId: string,
  analysis: IInvestmentAnalysis
) => ({
  type: GET_PROPERTY_ANALYSIS,
  payload: { propertyId, analysis },
});

const getSavedAnalysesAction = (analyses: IInvestmentAnalysis[]) => ({
  type: GET_SAVED_ANALYSES,
  payload: analyses,
});

const createAnalysisAction = (analysis: IAnalysisResults) => ({
  type: CREATE_ANALYSIS,
  payload: analysis,
});

const removeAnalysisAction = (analysisId: number) => ({
  type: REMOVE_ANALYSIS,
  payload: analysisId,
});

// ============ THUNK =================

// Get default analysis for property
export const thunkGetPropertyAnalysis =
  (propertyId: string): any =>
  async (dispatch: any) => {
    try {
      const response = await csrfFetch(
        `/api/property/${propertyId}/investment`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(getPropertyAnalysisAction(propertyId, data));
        return data;
      } else {
        throw response;
      }
    } catch (e) {
      const err = e as Response;
      const errorMessages = await err.json();
      return errorMessages;
    }
  };

// Get investment analyses for current user
export const thunkGetSavedAnalyses = (): any => async (dispatch: any) => {
  try {
    const response = await csrfFetch(`/api/investment/current`);

    if (response.ok) {
      const data = await response.json();
      dispatch(getSavedAnalysesAction(data.userAnalyses));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    const errorMessages = await err.json();
    return errorMessages;
  }
};

// Calculate custom analysis
export const thunkCreateAnalysis =
  (propertyId: number, analysisInputs: IAnalysisResults): any =>
  async (dispatch: any) => {
    try {
      const response = await csrfFetch(
        `/api/property/${propertyId}/investment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ analysisInputs }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(createAnalysisAction(data));
        return data;
      } else {
        throw response;
      }
    } catch (e) {
      const err = e as Response;
      const errorMessages = await err.json();
      console.error("Error creating analysis:", errorMessages);
      return errorMessages;
    }
  };

// Remove analysis
export const thunkRemoveAnalysis =
  (analysisId: number): any =>
  async (dispatch: any) => {
    try {
      const response = await csrfFetch(`/api/investment/${analysisId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        dispatch(removeAnalysisAction(analysisId));
        return { success: true };
      } else {
        throw response;
      }
    } catch (e) {
      const err = e as Response;
      const errorMessages = await err.json();
      console.error("Error removing analysis:", errorMessages);
      return errorMessages;
    }
  };

// ============ REDUCER =================
const initialState: InvestmentState = {
  currentAnalysis: null,
  allAnalyses: [],
  byId: {},
  analysisInputs: {
    downPayment: 20,
    interestRate: 7.5,
    loanTerm: 30,
    propertyTaxRate: 1.2,
    insurance: 1200,
    maintenance: 1,
    vacancy: 5,
    propertyManagement: 8,
  },
};

export default function investmentReducer(
  state = initialState,
  action: IInvestmentActionCreator
): InvestmentState {
  switch (action.type) {
    case GET_PROPERTY_ANALYSIS:
      const propertyData = action.payload as {
        propertyId: string;
        analysis: IInvestmentAnalysis;
      };
      return {
        ...state,
        currentAnalysis: propertyData.analysis,
        byId: {
          ...state.byId,
          [propertyData.analysis.id]: propertyData.analysis,
        },
      };

    case GET_SAVED_ANALYSES:
      if (Array.isArray(action.payload)) {
        const analyses = action.payload as IInvestmentAnalysis[];
        const newState = { ...state };
        const newById = { ...newState.byId };

        analyses.forEach((analysis: IInvestmentAnalysis) => {
          newById[analysis.id] = analysis;
        });

        newState.byId = newById;
        newState.allAnalyses = analyses;

        return newState;
      }
      return state;

    case CREATE_ANALYSIS:
      const newAnalysis = action.payload as IInvestmentAnalysis;
      const currentAnalysis = state.allAnalyses || [];
      return {
        ...state,
        currentAnalysis: newAnalysis,
        allAnalyses: [...currentAnalysis, newAnalysis],
        byId: {
          ...state.byId,
          [newAnalysis.id]: newAnalysis,
        },
      };

    case REMOVE_ANALYSIS:
      const analysisIdToRemove = action.payload as IAnalysisId;
      const newState = { ...state };
      const newById = { ...newState.byId };
      const currentAnalyses = newState.allAnalyses || [];

      newState.allAnalyses = currentAnalyses.filter(
        (analysis) => analysis.id !== analysisIdToRemove.id
      );
      delete newById[analysisIdToRemove.id as number];
      newState.byId = newById;

      return newState;

    default:
      return state;
  }
}
