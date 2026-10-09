export interface ProductPriceTier {
  minQty: number;
  maxQty: number | null;
  pricePerUnit: number;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: 'festive-diyas' | 'earthenware' | 'garden-planters' | 'decorative-pottery';
  categoryLabel: string;
  shortDesc: string;
  description: string;
  material: string;
  finish: string;
  dimensions: string;
  weightApprox: string;
  sizesAvailable: string[];
  retailPrice: number;
  priceTiers: ProductPriceTier[];
  moq: number; // Minimum Order Quantity
  readyStock: boolean;
  leadTimeDays: number; // for custom/bulk orders
  imageUrl: string;
  artisanId: string;
  artisanName: string;
  workshopLane: string;
  features: string[];
  customizationOptions: string[];
}

export interface Artisan {
  id: string;
  name: string;
  familyWorkshop: string;
  lane: string;
  experienceYears: number;
  generation: string;
  specialty: string;
  capacityPerMonth: string;
  bio: string;
  craftTechniques: string[];
  imageUrl: string;
  phone: string;
  verifiedArtisan: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export type BuyerType =
  | 'Retailer / Reseller'
  | 'Wholesaler / Distributor'
  | 'Event Organizer'
  | 'Individual Customer'
  | 'Corporate / Hospitality';

export type LeadStatus =
  | 'New Lead'
  | 'Quotation Sent'
  | 'Production In Progress'
  | 'Dispatched'
  | 'Closed';

export interface WholesaleLead {
  id: string;
  createdAt: string;
  buyerName: string;
  businessName?: string;
  buyerType: BuyerType;
  phone: string;
  email?: string;
  deliveryCity: string;
  pincode?: string;
  category: string;
  estimatedQuantity: string;
  productCode?: string;
  itemsRequested?: string[];
  totalEstimatedAmount?: number;
  additionalNotes?: string;
  status: LeadStatus;
  assignedArtisanId?: string;
}
