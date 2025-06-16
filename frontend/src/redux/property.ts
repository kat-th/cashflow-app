import {
  IProperty,
  PropertyState,
  IPropertyActionCreator,
  IPropertyId,
  IPropertyFilter,
} from "./types/property";

// ============ ACTION TYPES =================
export const GET_ALL_PROPERTY = "Property/getallProperties";
export const GET_ONE_PROPERTY = "Property/getOneProperty";
export const CREATE_PROPERTY = "Property/createProperty";
export const UPDATE_PROPERTY = "Property/updateProperty";
export const REMOVE_PROPERTY = "Property/removeProperty";

// ============ ACTION CREATOR =================
const getAllPropertiesAction = (properties: IProperty[]) => ({
  type: GET_ALL_PROPERTY,
  payload: properties,
});

const createPropertyAction = (property: IProperty) => ({
  type: CREATE_PROPERTY,
  payload: property,
});

const getOnePropertyAction = (property: IProperty) => ({
  type: GET_ONE_PROPERTY,
  payload: property,
});

const updatePropertyAction = (property: IProperty) => ({
  type: UPDATE_PROPERTY,
  payload: property,
});

const removePropertyAction = (propertyId: IPropertyId) => ({
  type: REMOVE_PROPERTY,
  payload: propertyId,
});

// ============ THUNK =================

// Get all Property
export const thunkGetAllProperties =
  (filters: IPropertyFilter): any =>
  async (dispatch: any) => {
    try {
      const response = await fetch("/api/property");

      if (response.ok) {
        const propertiesWithAnalysis = await response.json();
        // console.log("API Response:", propertiesWithAnalysis[0]);

        dispatch(getAllPropertiesAction(propertiesWithAnalysis));

        return propertiesWithAnalysis;
      } else {
        const errorText = await response.text();
        return {
          error: `HTTP ${response.status}: ${response.statusText}`,
          details: errorText,
        };
      }
    } catch (e) {
      console.error("Network or parsing error:", e);
      return {
        error: "Network error occurred",
        details: e instanceof Error ? e.message : "Unknown error",
      };
    }
  };

// Get one property
export const thunkGetOneProperty =
  (propertyId: string): any =>
  async (dispatch: any) => {
    try {
      const response = await fetch(`/api/property/${propertyId}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(getOnePropertyAction(data));
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

// Create a new property
export const thunkCreateProperty =
  (propertyData: IProperty): any =>
  async (dispatch: any) => {
    try {
      const response = await fetch("/api/property/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(createPropertyAction(data));
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

// Update a new property
export const thunkUpdateProperty =
  (propertyData: IProperty, propertyId: number | string): any =>
  async (dispatch: any) => {
    try {
      const response = await fetch(`/api/property/${propertyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(updatePropertyAction(data));
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

// Delete a new property
export const thunkRemoveProperty =
  (propertyId: IPropertyId): any =>
  async (dispatch: any) => {
    try {
      const response = await fetch(`/api/property/${propertyId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(removePropertyAction(propertyId));
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

// ============ REDUCER =================
const initialState: PropertyState = {
  byId: {},
  allProperties: [],
};

export default function propertyReducer(
  state = initialState,
  action: IPropertyActionCreator
): PropertyState {
  let newState = {
    ...state,
  };
  let newById = { ...newState.byId };
  let allProperties = [...newState.allProperties];

  switch (action.type) {
    case GET_ALL_PROPERTY:
      if (Array.isArray(action.payload)) {
        const Property = action.payload;
        Property.forEach((b: IProperty) => {
          newById[b.id] = b;
        });
        allProperties = action.payload;

        newState.byId = newById;
        newState.allProperties = allProperties;
        return newState;
      }
      return state;

    case GET_ONE_PROPERTY:
      //   if (!Array.isArray(action.payload)) {

      //   }
      //   return state;
      const property = action.payload as IProperty;
      newById[property.id] = property;

      newState.byId = { ...newState.byId, [property.id]: property };
      newState.allProperties = [...newState.allProperties, property];

      return newState;

    case CREATE_PROPERTY:
      //   if (!Array.isArray(action.payload)) {

      //   }
      //   return state;

      const newProperty = action.payload as IProperty;

      return {
        ...state,
        allProperties: [...state.allProperties, newProperty],
        byId: { ...state.byId, [newProperty.id]: newProperty },
      };

    case UPDATE_PROPERTY:
      const updatedProperty = action.payload as IProperty;

      return {
        ...state,
        allProperties: state.allProperties.map((property) =>
          property.id === updatedProperty.id ? updatedProperty : property
        ),
        byId: { ...state.byId, [updatedProperty.id]: updatedProperty },
      };

    case REMOVE_PROPERTY:
      const propertyIdToRemove = action.payload as IPropertyId;
      newState.allProperties = newState.allProperties.filter(
        (property) => property.id !== propertyIdToRemove.id
      );
      delete newById[propertyIdToRemove.id];

      return newState;

    default:
      return state;
  }
}
