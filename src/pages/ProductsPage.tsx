import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { Product } from '../types';

// Import mock data
import { mockProducts } from '../data/mockProducts';

type ContextType = {
  enterLink: (text?: string) => void;
  leaveLink: () => void;
};

const ProductsPage: React.FC = () => {
  const { enterLink, leaveLink } = useOutletContext<ContextType>();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    categories: string[];
    prices: string[];
    sizes: string[];
  }>({
    categories: categoryParam ? [categoryParam] : [],
    prices: [],
    sizes: []
  });
  
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(mockProducts);
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    // Filter by category
    if (activeFilters.categories.length > 0) {
      result = result.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }
    
    // Filter by price range
    if (activeFilters.prices.length > 0) {
      result = result.filter(product => {
        if (activeFilters.prices.includes('under-50') && product.price < 50) return true;
        if (activeFilters.prices.includes('50-100') && product.price >= 50 && product.price <= 100) return true;
        if (activeFilters.prices.includes('100-150') && product.price > 100 && product.price <= 150) return true;
        if (activeFilters.prices.includes('over-150') && product.price > 150) return true;
        return false;
      });
    }
    
    // Filter by size
    if (activeFilters.sizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => activeFilters.sizes.includes(size))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      default:
        // No sorting
        break;
    }
    
    setFilteredProducts(result);
  }, [products, activeFilters, sortBy]);
  
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  
  const handleCategoryFilter = (category: string) => {
    setActiveFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return {
        ...prev,
        categories
      };
    });
  };
  
  const handlePriceFilter = (price: string) => {
    setActiveFilters(prev => {
      const prices = prev.prices.includes(price)
        ? prev.prices.filter(p => p !== price)
        : [...prev.prices, price];
      
      return {
        ...prev,
        prices
      };
    });
  };
  
  const handleSizeFilter = (size: string) => {
    setActiveFilters(prev => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      
      return {
        ...prev,
        sizes
      };
    });
  };
  
  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      prices: [],
      sizes: []
    });
  };
  
  const getCategoryName = (slug: string): string => {
    switch (slug) {
      case 't-shirts':
        return 'T-Shirts';
      case 'hoodies':
        return 'Hoodies';
      case 'pants':
        return 'Pants';
      case 'accessories':
        return 'Accessories';
      case 'new-arrivals':
        return 'New Arrivals';
      case 'best-sellers':
        return 'Best Sellers';
      case 'limited-drops':
        return 'Limited Drops';
      default:
        return slug.charAt(0).toUpperCase() + slug.slice(1);
    }
  };
  
  // Count total active filters
  const totalActiveFilters = 
    activeFilters.categories.length + 
    activeFilters.prices.length + 
    activeFilters.sizes.length;

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {categoryParam ? getCategoryName(categoryParam) : 'All Products'}
          </h1>
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
            
            {/* Sort options */}
            <div className="flex items-center space-x-4">
              <span className="text-sm hidden md:inline">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pr-8 py-1 focus:outline-none text-sm cursor-pointer"
                  onMouseEnter={() => enterLink()}
                  onMouseLeave={leaveLink}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown size={16} className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className="w-full lg:w-64 hidden lg:block">
            <div className="sticky top-24">
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {['t-shirts', 'hoodies', 'pants', 'accessories'].map(category => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeFilters.categories.includes(category)}
                        onChange={() => handleCategoryFilter(category)}
                        className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                      />
                      <span className="ml-2">{getCategoryName(category)}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Price</h3>
                <div className="space-y-2">
                  {[
                    { id: 'under-50', label: 'Under $50' },
                    { id: '50-100', label: '$50 - $100' },
                    { id: '100-150', label: '$100 - $150' },
                    { id: 'over-150', label: 'Over $150' }
                  ].map(price => (
                    <label key={price.id} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeFilters.prices.includes(price.id)}
                        onChange={() => handlePriceFilter(price.id)}
                        className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                      />
                      <span className="ml-2">{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Size</h3>
                <div className="space-y-2">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <label key={size} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeFilters.sizes.includes(size)}
                        onChange={() => handleSizeFilter(size)}
                        className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                      />
                      <span className="ml-2">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {totalActiveFilters > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-yellow-500 hover:text-yellow-600 transition-colors flex items-center"
                  onMouseEnter={() => enterLink()}
                  onMouseLeave={leaveLink}
                >
                  <X size={14} className="mr-1" />
                  Clear all filters
                </button>
              )}
            </div>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="lg:hidden sticky top-20 z-30 bg-white py-3 border-b border-gray-200 mb-8">
            <button
              onClick={toggleFilter}
              className="flex items-center space-x-2 text-sm font-medium"
              onMouseEnter={() => enterLink()}
              onMouseLeave={leaveLink}
            >
              <Filter size={16} />
              <span>Filter{totalActiveFilters > 0 ? ` (${totalActiveFilters})` : ''}</span>
            </button>
          </div>
          
          {/* Mobile Filter Drawer */}
          {filterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={toggleFilter}></div>
              <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl">Filters</h3>
                    <button 
                      onClick={toggleFilter} 
                      onMouseEnter={() => enterLink()}
                      onMouseLeave={leaveLink}
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4">Categories</h3>
                    <div className="space-y-2">
                      {['t-shirts', 'hoodies', 'pants', 'accessories'].map(category => (
                        <label key={category} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={activeFilters.categories.includes(category)}
                            onChange={() => handleCategoryFilter(category)}
                            className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="ml-2">{getCategoryName(category)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4">Price</h3>
                    <div className="space-y-2">
                      {[
                        { id: 'under-50', label: 'Under $50' },
                        { id: '50-100', label: '$50 - $100' },
                        { id: '100-150', label: '$100 - $150' },
                        { id: 'over-150', label: 'Over $150' }
                      ].map(price => (
                        <label key={price.id} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={activeFilters.prices.includes(price.id)}
                            onChange={() => handlePriceFilter(price.id)}
                            className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="ml-2">{price.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4">Size</h3>
                    <div className="space-y-2">
                      {['S', 'M', 'L', 'XL'].map(size => (
                        <label key={size} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={activeFilters.sizes.includes(size)}
                            onChange={() => handleSizeFilter(size)}
                            className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="ml-2">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    {totalActiveFilters > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="px-4 py-2 border border-gray-300 text-sm"
                        onMouseEnter={() => enterLink()}
                        onMouseLeave={leaveLink}
                      >
                        Clear all
                      </button>
                    )}
                    <button
                      onClick={toggleFilter}
                      className="px-4 py-2 bg-black text-white text-sm flex-grow"
                      onMouseEnter={() => enterLink()}
                      onMouseLeave={leaveLink}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProductCard 
                      product={product} 
                      onEnterLink={enterLink}
                      onLeaveLink={leaveLink}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors"
                  onMouseEnter={() => enterLink()}
                  onMouseLeave={leaveLink}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;