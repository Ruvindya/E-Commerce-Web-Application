import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import productData from '../data/products.json';
import { 
  Slider, 
  TextField, 
  Chip,
  Card,
  CardContent,
  Button,
  Drawer
} from '@mui/material';
import { Search, Filter, Menu } from 'lucide-react';

export const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productData.products);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  const categories = [...new Set(productData.products.map(product => product.category))];
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

  const FilterContent = () => (
    <div className="flex flex-col space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-5 text-gray-400" />
        <TextField
          fullWidth
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <div className="w-10" />,
          }}
          className="rounded-lg h-12"
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Filter className="h-5 w-5" />
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

      <div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2 text-sm">
            <TextField
              label="Min Price"
              type="number"
              size="small"
              value={priceRange[0]}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= priceRange[1]) {
                  setPriceRange([value, priceRange[1]]);
                }
              }}
              inputProps={{
                min: minPrice,
                max: priceRange[1],
              }}
              className="w-24 text-sm"
            />
          </div>
          <span className="text-gray-500">-</span>
          <div className="flex items-center gap-2">
            <TextField
              label="Max Price"
              type="number"
              size="small"
              value={priceRange[1]}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= priceRange[0]) {
                  setPriceRange([priceRange[0], value]);
                }
              }}
              inputProps={{
                min: priceRange[0],
                max: maxPrice,
              }}
              className="w-24"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 mb-2">
          <span className="font-medium">Price Range</span>
          <span className="text-sm text-gray-500">
            LKR{priceRange[0]} - LKR{priceRange[1]}
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
      <Button 
        onClick={clearFilters}
        className="text-blue-600 hover:text-blue-800 text-sm"
      >
        Clear Filter
      </Button>
    </div>
  );
  
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
    <div className="container mx-auto p-4 py-10">
      <h2 className="text-2xl font-bold">Our Products</h2>
      
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4 pt-5">
        <Button 
          variant="outlined" 
          onClick={() => setIsFilterDrawerOpen(true)}
          className="flex items-center gap-2"
        >
          <Menu className="h-5 w-5 " />
          Filters
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 pt-2">
        {/* Desktop Filters */}
        <div className="hidden lg:block w-1/4 mt-2">
          <Card className="mb-8 shadow-md">
            <CardContent>
              <FilterContent />
            </CardContent>
          </Card>
        </div>

        {/* Mobile Filters Drawer */}
        <Drawer
          anchor="left"
          open={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
        >
          <div className="p-4 w-80">
            <FilterContent />
          </div>
        </Drawer>

        {/* Products Grid */}
        <div className="flex-1 pb-20 mb-10">
          <div className="mb-4 text-gray-600">
            Showing {filteredProducts.length} of {productData.products.length} products
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
          
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