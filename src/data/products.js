// src/data/products.js
export const PRODUCTS = [
  {
    id: 'prod-laptop',
    name: 'Laptop',
    category: 'Computers',
    price: 650,
    badge: 'Popular',
    variant: 'Pro Series 15"',
    color: 'Space Gray',
    stock: 14,
    description:
      'High-performance laptop for work, coding, and everyday multitasking.',
  },
  {
    id: 'prod-mouse',
    name: 'Mouse',
    category: 'Accessories',
    price: 15,
    badge: 'Best Value',
    variant: 'Wireless Ergonomic',
    color: 'Matte Black',
    stock: 42,
    description:
      'Precision wireless mouse with comfortable grip and smooth tracking.',
  },
  {
    id: 'prod-keyboard',
    name: 'Keyboard',
    category: 'Accessories',
    price: 25,
    badge: 'Tactile',
    variant: 'Compact Mechanical',
    color: 'Slate Gray',
    stock: 28,
    description:
      'Responsive keyboard designed for fast typing and clean desk setups.',
  },
  {
    id: 'prod-monitor',
    name: 'Monitor',
    category: 'Displays',
    price: 120,
    badge: 'Crisp FHD',
    variant: '24" IPS Display',
    color: 'Obsidian',
    stock: 19,
    description:
      'Sharp widescreen monitor with accurate colors and slim bezels.',
  },
];

export const SHIPPING_METHODS = [
  {
    id: 'free',
    label: 'Free Shipping',
    eta: '7-20 Days',
    cost: 0,
  },
  {
    id: 'express',
    label: 'Express Shipping',
    eta: '1-3 Days',
    cost: 9,
  },
];