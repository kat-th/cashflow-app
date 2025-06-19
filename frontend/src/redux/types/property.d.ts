import { IAnalysisResults } from "./investment";

export interface IProperty {
  id: number;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  lotSize: number;
  propertyType: string;
  listPrice: number;
  rentEstimate: number;
  listDate: Date;
  images: string[];
  previewImage: string;
  investmentAnalysis?: IAnalysisResults | null;
}

export interface IPropertyDetails {
  id: number;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  lotSize: number;
  propertyType: string;
  listPrice: number;
  rentZestimate: number;
  listDate: string;
  images: string[];
  previewImage: string;
  investmentAnalysis: InvestmentAnalysis;
}

export interface IPropertyFilter {
  searchQuery?: string;
  propertyType?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  minBedrooms?: number | null;
  maxBedrooms?: number | null;
  minBathrooms?: number | null;
  maxBathrooms?: number | null;
}

export interface IPropertyId {
  id: number | string;
}

export interface PropertyState {
  byId: PropertyId;
  allProperties: IProperty[];
}

export interface IPropertyActionCreator {
  type: string;
  payload: IProperty | IProperty[];
}
export interface IProperty {
  id: number;
  address: string;
  city: string;
  state: string;
  listPrice: number;
  rentZestimate: number;
}
