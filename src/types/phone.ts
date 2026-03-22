export interface Phone {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  releaseDate: string;
  rating: number;
  reviewCount: number;
  colors: string[];
  summary: string;
  bestFor: string[];
  specs: PhoneSpecs;
  pros: string[];
  cons: string[];
  reviews: Review[];
}

export interface PhoneSpecs {
  display: {
    size: string;
    type: string;
    resolution: string;
    refreshRate: string;
    brightness: string;
  };
  processor: {
    chipset: string;
    cpu: string;
    gpu: string;
  };
  memory: {
    ram: string;
    storage: string;
    expandable: boolean;
  };
  camera: {
    main: string;
    ultrawide: string;
    telephoto?: string;
    front: string;
    video: string;
  };
  battery: {
    capacity: string;
    charging: string;
    wireless: boolean;
  };
  connectivity: {
    fiveG: boolean;
    wifi: string;
    bluetooth: string;
    nfc: boolean;
    usb: string;
  };
  dimensions: {
    height: string;
    width: string;
    thickness: string;
    weight: string;
  };
  os: string;
  waterResistance: string;
  biometrics: string[];
}

export interface Review {
  id: string;
  source: string;
  title: string;
  author: string;
  rating: number;
  snippet: string;
  url: string;
  youtubeId?: string;
  date: string;
  type: "video" | "article";
}

export interface QuizAnswer {
  questionId: string;
  value: string | string[];
}

export interface QuizResult {
  phone: Phone;
  matchScore: number;
  reasons: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface CompareItem {
  phone: Phone;
}

export type SortOption = "price-asc" | "price-desc" | "rating" | "newest" | "name";

export interface FilterState {
  brands: string[];
  priceRange: [number, number];
  minRating: number;
  features: string[];
  searchQuery: string;
}
