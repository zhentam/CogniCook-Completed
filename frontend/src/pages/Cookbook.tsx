import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Search, Filter, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { recipes, cookingMethods } from '../data/mockData';

export default function Cookbook() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showSavedOnly, setShowSavedOnly] = useState(true);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMethod = !selectedMethod || recipe.method === selectedMethod;
    const matchesSaved = !showSavedOnly || recipe.isSaved;
    return matchesSearch && matchesMethod && matchesSaved;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-xl">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Cookbook</h1>
          </div>
          <p className="text-gray-600">Discover and save your favorite recipes</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Method Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedMethod || ''}
                onChange={(e) => setSelectedMethod(e.target.value || null)}
                className="pl-10 pr-8 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none appearance-none bg-white cursor-pointer"
              >
                <option value="">All Methods</option>
                {cookingMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            {/* Saved Toggle */}
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all ${
                showSavedOnly
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'border-gray-200 text-gray-700 hover:border-primary-300'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${showSavedOnly ? 'fill-current' : ''}`} />
              Saved Only
            </button>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index % 6) }}
            >
              <Link
                to={`/recipe/${recipe.id}`}
                className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-[1.02] group"
              >
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  {recipe.imageUrl && (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  {recipe.isSaved && (
                    <div className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md">
                      <Bookmark className="w-4 h-4 text-primary-600 fill-current" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {recipe.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.time} min</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                      {recipe.method}
                    </span>
                    {recipe.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          tag === 'social'
                            ? 'bg-pink-100 text-pink-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}