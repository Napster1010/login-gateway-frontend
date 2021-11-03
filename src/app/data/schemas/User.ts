export interface User {
  id: number;
  name: string;
  designation: GenericEntity;
  userType: GenericEntity;
  office: GenericEntity;
  identificationType: GenericEntity;
  identificationNumber: string;
  mobileNumber: string;
  email: string;
  role: GenericEntity;
  location: Location;
  status: string;
  startDate: Date;
  endDate: Date;
}

export interface Location {
  id: number;
  code: string;
  name: string;
  division: Division;
}

export interface Division {
  id: number;
  code: string;
  name: string;
  circle: Circle;
}

export interface Circle {
  id: number;
  code: string;
  name: string;
  region: Region;
}

export interface Region {
  id: number;
  code: string;
  name: string;
  corporate: Corporate;
}

export interface Corporate {
  id: number;
  code: string;
  name: string;
}

export interface GenericEntity {
  id: number;
  name: string;
}

export interface UserToken {
  identificationNumber: string;
  name: string;
}