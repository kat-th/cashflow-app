export interface LoginUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  isHost: boolean;
}

export interface PaginationValues {
  limit?: number;
  offset?: number;
}

export interface WhereValues {
  lat?: any;
  lng?: any;
  price?: any;
}

export interface Property {
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
  listDate: Date;
  previewImage?: string;
}
