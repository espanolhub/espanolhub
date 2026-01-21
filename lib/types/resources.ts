/**
 * Types for Resource Downloads
 */

export type ResourceType = 'pdf' | 'video' | 'audio' | 'worksheet';
export type ResourcePrice = 'free' | 'paid';

export interface Resource {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  type: ResourceType;
  price: ResourcePrice;
  priceAmount?: number; // For paid resources in USD
  currency?: string;
  coverImage?: string;
  fileUrl?: string;
  downloadCount?: number;
  category: 'grammar' | 'vocabulary' | 'reading' | 'exam-prep' | 'general';
  level?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  createdAt: string;
  stripeProductId?: string; // For Stripe integration
  paypalProductId?: string; // For PayPal integration
  libraryCategory?: 'free-guides' | 'workbooks' | 'grammar-cheat-sheets'; // For library grouping
}
