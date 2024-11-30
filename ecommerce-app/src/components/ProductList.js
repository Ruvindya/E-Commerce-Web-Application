import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import productData from '../data/products.json';
import { 
  Slider, 
  TextField, 
  Chip,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { Search, Filter} from 'lucide-react';

export const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productData.products);
  
  // Get unique categories
  const categories = [...new Set(productData.products.map(product => product.category))];
  
  // Get min and max prices
  const maxPrice = Math.max(...productData.products.map(product => product.price));
  const minPrice = Math.min(...productData.products.map(product => product.price));

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([minPrice, maxPrice]);
    setSelectedCategories([]);
  };

  // Filter products based on all criteria
  useEffect(() => {
    const filtered = productData.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      
      return matchesSearch && matchesPrice && matchesCategory;
    });
    
    setFilteredProducts(filtered);
  }, [searchTerm, priceRange, selectedCategories]);

  return (
    <div className="container mx-auto p-4 ">
       <h2 className="text-2xl font-bold">Our Products</h2>
      <div className='flex flew-row gap-10 pt-5'>
        <div className='w-1/4'>
          {/* Filters Section */}
            <Card className="mb-8 shadow-md">
              <CardContent>
                <div className="flex flex-col space-y-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <TextField
                      fullWidth
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: <div className="w-10" />,
                      }}
                      className="rounded-lg"
                    />
                  </div>

                  {/* Category Filters */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Filter  className="h-5 w-5" />
                      <span className="font-medium">Categories</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Chip
                          key={category}
                          label={category.charAt(0).toUpperCase() + category.slice(1)}
                          onClick={() => handleCategoryToggle(category)}
                          color={selectedCategories.includes(category) ? "primary" : "default"}
                          variant={selectedCategories.includes(category) ? "filled" : "outlined"}
                          className="cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price Range Slider */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">Price Range</span>
                      <span className="text-sm text-gray-500">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      value={priceRange}
                      onChange={(_, newValue) => setPriceRange(newValue)}
                      min={minPrice}
                      max={maxPrice}
                      valueLabelDisplay="auto"
                      className="mt-2"
                    />
                  </div>
                </div>
                  <Button 
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Clear Filter
                  </Button>
              </CardContent>
            </Card>

        </div>

        <div>
            {/* Results Count */}
            <div className="mb-4 text-gray-600">
              Showing {filteredProducts.length} of {productData.products.length} products
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </div>

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No products match your filters. Try adjusting your search criteria.
              </div>
            )}
        </div>

        

      </div>

      
      

      

      
    </div>
  );
};