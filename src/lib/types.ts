export interface PropertyImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

export interface PropertyResponse {
  id: string;
  title: string;
  description?: string;
  price: number;
  type: string;
  propertyType: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number | null;
  longitude?: number | null;
  amenities?: string[];
  images: PropertyImage[];
  agentName?: string | null;
  agentPhone?: string | null;
  agentEmail?: string | null;
  featured: boolean;
  possessionStatus?: string | null;
  possessionDate?: string | null;
  facing?: string | null;
  vastuCompliant?: boolean | null;
  nearbyMetro?: string | null;
  nearbySchool?: string | null;
  nearbyHospital?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyListResponse {
  properties: PropertyResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
