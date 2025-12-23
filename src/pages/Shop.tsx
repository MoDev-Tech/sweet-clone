import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Search } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/data/products';

export default function Shop() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <main className="pt-20">
      <PageHeader
        title="Shop"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
        ]}
      />

      <section className="py-16">
        <div className="container-custom">
          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input-ice pl-12"
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Results Count */}
              <span className="text-muted-foreground">
                Showing 1–{filteredProducts.length} of {products.length} results
              </span>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-input-ice w-auto"
              >
                <option value="default">Default Sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-card p-6 rounded-2xl shadow-soft sticky top-28">
                <h3 className="font-display text-xl font-semibold mb-6">Categories</h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                        !selectedCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      }`}
                    >
                      All Products ({products.length})
                    </button>
                  </li>
                  {categories.map((category) => {
                    const count = products.filter(p => p.category === category).length;
                    return (
                      <li key={category}>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                            selectedCategory === category ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                          }`}
                        >
                          {category} ({count})
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                </div>
              ) : (
                <motion.div
                  layout
                  className={
                    viewMode === 'grid'
                      ? 'grid sm:grid-cols-2 xl:grid-cols-3 gap-8'
                      : 'space-y-6'
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
