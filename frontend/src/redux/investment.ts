import {
  IAnalysisInputs,
  IInvestmentAnalysis,
  IInvestmentActionCreator,
  InvestmentState,
} from "./types/investment";

// ============ ACTION TYPES =================
export const GET_PROPERTY_ANALYSIS = "Investment/getPropertyAnalysis";
export const GET_ALL_PROPERTY_ANALYSES = "Investment/getAllPropertyAnalyses";
export const CALCULATE_ANALYSIS = "Investment/calculateAnalysis";
export const SET_ANALYSIS_INPUTS = "Investment/setAnalysisInputs";

// ============ ACTION CREATOR =================
const getPropertyAnalysisAction = (
  propertyId: string,
  analysis: IInvestmentAnalysis
) => ({
  type: GET_PROPERTY_ANALYSIS,
  payload: { propertyId, analysis },
});

const getAllPropertyAnalysesAction = (
  analyses: Record<string, IInvestmentAnalysis>
) => ({
  type: GET_ALL_PROPERTY_ANALYSES,
  payload: analyses,
});

const calculateAnalysisAction = (analysis: IInvestmentAnalysis) => ({
  type: CALCULATE_ANALYSIS,
  payload: analysis,
});

const setAnalysisInputsAction = (inputs: IAnalysisInputs) => ({
  type: SET_ANALYSIS_INPUTS,
  payload: inputs,
});

// ============ THUNK =================

// Get default analysis for property
export const thunkGetPropertyAnalysis =
  (propertyId: string): any =>
  async (dispatch: any) => {
    try {
      const response = await fetch(`/api/property/${propertyId}/investment`);
      if (response.ok) {
        const data = await response.json();
        dispatch(getPropertyAnalysisAction(propertyId, data));
        return data;
      } else {
        const errorText = await response.text();
        const errorData = {
          error: `HTTP ${response.status}: ${response.statusText}`,
          details: errorText,
        };
        return errorData;
      }
    } catch (e) {
      console.error("Network or parsing error:", e);
      return {
        error: "Network error occurred",
        details: e instanceof Error ? e.message : "Unknown error",
      };
    }
  };

// Get investment analyses for all properties
export const thunkGetAllPropertyAnalyses =
  (propertyIds: string[]): any =>
  async (dispatch: any) => {
    try {
      // Option 1: Individual requests (since no bulk endpoint mentioned)
      const analyses: Record<string, IInvestmentAnalysis> = {};

      const promises = propertyIds.map(async (propertyId) => {
        try {
          const response = await fetch(
            `/api/property/${propertyId}/investment`
          );
          if (response.ok) {
            const data = await response.json();
            analyses[propertyId] = data;
          }
        } catch (error) {
          console.error(
            `Error fetching analysis for property ${propertyId}:`,
            error
          );
        }
      });

      await Promise.allSettled(promises);
      dispatch(getAllPropertyAnalysesAction(analyses));
      return analyses;
    } catch (e) {
      console.error("Network or parsing error:", e);
      return {
        error: "Network error occurred",
        details: e instanceof Error ? e.message : "Unknown error",
      };
    }
  };

// Calculate custom analysis
export const thunkCalculateAnalysis =
  (propertyId: string, inputs: IAnalysisInputs): any =>
  async (dispatch: any) => {
    try {
      const response = await fetch(`/api/property/${propertyId}/investment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(calculateAnalysisAction(data));
        return data;
      } else {
        const errorText = await response.text();
        const errorData = {
          error: `HTTP ${response.status}: ${response.statusText}`,
          details: errorText,
        };
        return errorData;
      }
    } catch (e) {
      console.error("Network or parsing error:", e);
      return {
        error: "Network error occurred",
        details: e instanceof Error ? e.message : "Unknown error",
      };
    }
  };

// ============ SYNC ACTION CREATORS =================
export const setAnalysisInputs =
  (inputs: IAnalysisInputs) => (dispatch: any) => {
    dispatch(setAnalysisInputsAction(inputs));
  };

export const selectAnalysisForProperty = (state: any, propertyId: string) => {
  return state.investment.analysesByPropertyId[propertyId] || null;
};

// ============ REDUCER =================
const initialState: InvestmentState = {
  currentAnalysis: null,
  analysesByPropertyId: {},
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
      const getPayload = action.payload as {
        propertyId: string;
        analysis: IInvestmentAnalysis;
      };
      return {
        ...state,
        currentAnalysis: getPayload.analysis,
        analysesByPropertyId: {
          ...state.analysesByPropertyId,
          [getPayload.propertyId]: getPayload.analysis,
        },
      };

    case GET_ALL_PROPERTY_ANALYSES:
      return {
        ...state,
        analysesByPropertyId: {
          ...state.analysesByPropertyId,
          ...(action.payload as Record<string, IInvestmentAnalysis>),
        },
      };

    case CALCULATE_ANALYSIS:
      const calcPayload = action.payload as {
        propertyId: string;
        analysis: IInvestmentAnalysis;
      };
      return {
        ...state,
        currentAnalysis: calcPayload.analysis,
        analysesByPropertyId: {
          ...state.analysesByPropertyId,
          [calcPayload.propertyId]: calcPayload.analysis,
        },
      };

    case SET_ANALYSIS_INPUTS:
      return {
        ...state,
        analysisInputs: action.payload as IAnalysisInputs,
      };

    default:
      return state;
  }
}
