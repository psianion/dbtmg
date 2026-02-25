export interface BoardMember {
  id: string;
  rank: number;
  name: string;
  designation: string;
  category: string;
  shortBiography: string;
  profileImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExecutiveProfile {
  id: string;
  rank: number;
  name: string;
  slug: string;
  designation: string;
  teamName: string;
  shortDescription: string;
  profileImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  rank: number;
  name: string;
  slug: string;
  city: string;
  area?: number;
  area_text?: string;
  short_desc?: string;
  description?: string;
  images?: string[];
  is_signature?: boolean;
  location?: { lat: number; lon: number } | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsAward {
  id: string;
  title: string;
  slug: string;
  date: string;
  year?: number;
  publication?: string;
  author?: string;
  itemType: string;
  excerpt?: string;
  detailText?: string;
  images?: string[];
  hyperlink?: string;
  featuredOnHomePage?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HowWeThink {
  id: string;
  rank: number;
  slideName: string;
  quote?: string;
  quoteAttribution?: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Relationship {
  id: string;
  name: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}
