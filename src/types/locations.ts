export interface ApiResponse<T> {
  data: T;
}

export interface DivisionApiResponse {
  id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface DistrictApiResponse {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
}

export interface UpazilaApiResponse {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface UnionApiResponse {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
}
