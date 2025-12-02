export enum StatusType {
  AVAILABLE = 'Available',
  PROPOSAL_READY = 'Proposal Ready',
  PENDING = 'Pending'
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  address?: string; 
  googleMapsUrl?: string; 
  mapPreviewImage?: string; // New: Image URL for the map snapshot
  rating: number;
  conceptTitle: string;
  conceptDescription: string;
  menuHighlights?: string[]; 
  priceDisplay: string;
  priceValue: number;
  status: StatusType;
  isProposalHighlight?: boolean;
  warnings?: string[];
  notes?: string[];
}