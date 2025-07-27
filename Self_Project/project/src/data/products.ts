import { Product } from '../types/Product';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium BBQ Charcoal (5kg)",
    description: "High-quality BBQ charcoal made from selected hardwoods. Burns longer with consistent heat and minimal smoke. Perfect for home use and small gatherings.",
    price: 180,
    category: "BBQ",
    imageUrl: "https://raw.githubusercontent.com/stackblitz/stackblitz-codeflow/main/charcoal.jpg",
    weight: "5 kg",
    stockStatus: "In Stock",
    rating: 4.8
  },
  {
    id: 2,
    name: "Premium BBQ Charcoal (10kg)",
    description: "High-quality BBQ charcoal in larger quantity. Ideal for restaurants and regular users. Better value for money with more quantity.",
    price: 350,
    category: "BBQ",
    imageUrl: "https://raw.githubusercontent.com/stackblitz/stackblitz-codeflow/main/charcoal.jpg",
    weight: "10 kg",
    stockStatus: "In Stock",
    rating: 4.8
  },
  {
    id: 3,
    name: "Bulk Charcoal (Custom)",
    description: "For orders above 10kg, we offer customized packaging and special bulk pricing. Contact us for personalized quotes and specific requirements.",
    price: 0,
    category: "Bulk",
    imageUrl: "https://raw.githubusercontent.com/stackblitz/stackblitz-codeflow/main/charcoal.jpg",
    weight: "10+ kg",
    stockStatus: "In Stock",
    rating: 4.9,
    customizable: true
  }
];