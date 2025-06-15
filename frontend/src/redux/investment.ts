import {
  IAnalysisInputs,
  IInvestmentAnalysis,
  IInvestmentActionCreator,
  InvestmentState,
} from "./types/investment";

// ============ ACTION TYPES =================
export const GET_PROPERTY_ANALYSIS = "Investment/getPropertyAnalysis";
export const CALCULATE_ANALYSIS = "Investment/calculateAnalysis";
export const SET_ANALYSIS_INPUTS = "Investment/setAnalysisInputs";

// ============ ACTION CREATOR =================
const getPropertyAnalysisAction = (analysis: IInvestmentAnalysis) => ({
  type: GET_PROPERTY_ANALYSIS,
  payload: analysis,
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
        dispatch(getPropertyAnalysisAction(data));
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

// ============ REDUCER =================
const initialState: InvestmentState = {
  currentAnalysis: null,
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
      return {
        ...state,
        currentAnalysis: action.payload as IInvestmentAnalysis,
      };

    case CALCULATE_ANALYSIS:
      return {
        ...state,
        currentAnalysis: action.payload as IInvestmentAnalysis,
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
