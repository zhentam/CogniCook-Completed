import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Bookmark, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { filterRecipes } from '../data/mockData';

export default function RecipeList() {
  const location = useLocation();
  const navigate = useNavigate();
  const selections = location.state?.selections || {};

  const filteredRecipes = filterRecipes(
    selections.ingredients || [],
    selections.method || [],
    selections.time ?? 30,
    selections.mealType || 'daily'
  ).sort((a, b) => b.time - a.time); // Sort by cooking time descending

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Recipe Results</h1>
              <p className="text-gray-600 mt-1">
                Found {filteredRecipes.length} recipes matching your preferences
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/quad-lock', { state: { selections } })}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-primary-300 hover:shadow-md transition-all text-gray-700 font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Edit Filters</span>
          </motion.button>
        </div>

        {/* Selection Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Filters</h2>
          <div className="flex flex-wrap gap-3">
            {selections.ingredients && selections.ingredients.length > 0 && (
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {selections.ingredients.length} ingredient{selections.ingredients.length > 1 ? 's' : ''}
              </span>
            )}
            {selections.method && selections.method.length > 0 && (
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {selections.method.join(', ')}
              </span>
            )}
            {selections.time && (
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {selections.time >= 80
                  ? '80+ min'
                  : `under ${selections.time} min`}
              </span>
            )}
            {selections.diners && (
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {selections.diners} serving{selections.diners > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
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
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters to find more recipes
            </p>
            <button
              onClick={() => navigate('/quad-lock', { state: { selections } })}
              className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              Modify Filters
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}