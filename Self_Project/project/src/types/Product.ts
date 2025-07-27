export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  weight: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating?: number;
  customizable?: boolean;
};