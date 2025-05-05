import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Urban Element Tee',
    price: 89.99,
    description: 'Premium cotton t-shirt with urban-inspired graphic design.',
    imageUrl: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg',
      'https://images.pexels.com/photos/5868743/pexels-photo-5868743.jpeg',
      'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg'
    ],
    category: 't-shirts',
    tags: ['new', 'tee', 'cotton'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' }
    ],
    inStock: true,
    isNew: true,
    isLimited: false
  },
  {
    id: '2',
    name: 'Street Culture Hoodie',
    price: 129.99,
    description: 'Heavyweight cotton hoodie with embroidered details.',
    imageUrl: 'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg',
      'https://images.pexels.com/photos/7764555/pexels-photo-7764555.jpeg',
      'https://images.pexels.com/photos/7525056/pexels-photo-7525056.jpeg'
    ],
    category: 'hoodies',
    tags: ['featured', 'hoodie', 'winter'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Gray', value: '#808080' }
    ],
    inStock: true,
    isNew: false,
    isLimited: false
  },
  {
    id: '3',
    name: 'Concrete Jungle Cap',
    price: 59.99,
    description: 'Adjustable cap with embroidered logo.',
    imageUrl: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg',
      'https://images.pexels.com/photos/844867/pexels-photo-844867.jpeg',
      'https://images.pexels.com/photos/6347546/pexels-photo-6347546.jpeg'
    ],
    category: 'accessories',
    tags: ['cap', 'accessories', 'unisex'],
    sizes: ['One Size'],
    colors: [
      { name: 'Black', value: '#000000' }
    ],
    inStock: true,
    isNew: true,
    isLimited: false
  },
  {
    id: '4',
    name: 'Urban Cargo Pants',
    price: 149.99,
    description: 'Functional cargo pants with multiple pockets.',
    imageUrl: 'https://images.pexels.com/photos/9558577/pexels-photo-9558577.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/9558577/pexels-photo-9558577.jpeg',
      'https://images.pexels.com/photos/12094488/pexels-photo-12094488.jpeg',
      'https://images.pexels.com/photos/6347576/pexels-photo-6347576.jpeg'
    ],
    category: 'pants',
    tags: ['cargo', 'pants', 'streetwear'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Khaki', value: '#c3b091' }
    ],
    inStock: true,
    isNew: false,
    isLimited: true
  },
  {
    id: '5',
    name: 'Graffiti Print Tee',
    price: 79.99,
    description: 'Bold graffiti-inspired graphic tee on premium cotton.',
    imageUrl: 'https://images.pexels.com/photos/5868743/pexels-photo-5868743.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/5868743/pexels-photo-5868743.jpeg',
      'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg',
      'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg'
    ],
    category: 't-shirts',
    tags: ['graphic', 'tee', 'art'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' }
    ],
    inStock: true,
    isNew: true,
    isLimited: false
  },
  {
    id: '6',
    name: 'Urban Crossbody Bag',
    price: 89.99,
    description: 'Functional crossbody bag with multiple compartments.',
    imageUrl: 'https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg',
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 
      'https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg'
    ],
    category: 'accessories',
    tags: ['bag', 'accessories', 'unisex'],
    sizes: ['One Size'],
    colors: [
      { name: 'Black', value: '#000000' }
    ],
    inStock: true,
    isNew: false,
    isLimited: false
  },
  {
    id: '7',
    name: 'Technical Zip Hoodie',
    price: 159.99,
    description: 'Technical hoodie with water-resistant finish and premium hardware.',
    imageUrl: 'https://images.pexels.com/photos/7525056/pexels-photo-7525056.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/7525056/pexels-photo-7525056.jpeg',
      'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg',
      'https://images.pexels.com/photos/7764555/pexels-photo-7764555.jpeg' 
    ],
    category: 'hoodies',
    tags: ['technical', 'hoodie', 'premium'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#000080' }
    ],
    inStock: true,
    isNew: true,
    isLimited: true,
    releaseDate: '2025-08-15T00:00:00'
  },
  {
    id: '8',
    name: 'Oversized Graphic Tee',
    price: 84.99,
    description: 'Oversized fit t-shirt with artistic graphic print.',
    imageUrl: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg',
      'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg',
      'https://images.pexels.com/photos/5868743/pexels-photo-5868743.jpeg'
    ],
    category: 't-shirts',
    tags: ['oversized', 'graphic', 'tee'],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' }
    ],
    inStock: true,
    isNew: false,
    isLimited: false
  }
];