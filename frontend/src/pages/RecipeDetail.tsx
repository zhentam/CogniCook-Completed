import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Bookmark, BookmarkCheck, ChefHat, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getRecipeById, toggleRecipeSaved, ingredients as kitchenIngredients } from '../data/mockData';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = getRecipeById(id || '');
  const [isSaved, setIsSaved] = useState(recipe?.isSaved || false);
  const [selectedDiners, setSelectedDiners] = useState(2);

  // Check if a recipe ingredient exists in the kitchen
  const isIngredientOwned = (recipeIng: string): boolean => {
    const lower = recipeIng.toLowerCase();
    return kitchenIngredients.some(ki =>
      lower.includes(ki.name.toLowerCase()) || ki.name.toLowerCase().includes(lower)
    );
  };

  // Count owned ingredients
  const ownedCount = useMemo(() => {
    if (!recipe) return 0;
    return recipe.ingredients.filter(ing => isIngredientOwned(ing)).length;
  }, [recipe]);

  // Scale ingredients based on selected diners (base serving is 2)
  const scaledIngredients = useMemo(() => {
    if (!recipe) return [];
    const scaleFactor = selectedDiners / 2;
    return recipe.ingredients.map(ingredient => {
      // Match numbers in the ingredient string (e.g., "500g", "2 cups", "1/2 tsp")
      const match = ingredient.match(/^(\d+(?:\.\d+)?(?:\/\d+)?)\s*(.*)/);
      if (match) {
        const amount = match[1];
        const rest = match[2];
        // Handle fractions like "1/2"
        let numericAmount: number;
        if (amount.includes('/')) {
          const [numerator, denominator] = amount.split('/').map(Number);
          numericAmount = numerator / denominator;
        } else {
          numericAmount = parseFloat(amount);
        }
        const scaledAmount = Math.round(numericAmount * scaleFactor * 100) / 100;
        return `${scaledAmount}${rest ? ' ' + rest : ''}`;
      }
      return ingredient;
    });
  }, [recipe, selectedDiners]);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Recipe not found</h3>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSaved(toggleRecipeSaved(recipe.id))}
              className={`p-2 rounded-xl transition-colors ${
                isSaved 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {isSaved ? (
                <BookmarkCheck className="w-6 h-6 fill-current" />
              ) : (
                <Bookmark className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-8">
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ChefHat className="w-24 h-24 text-gray-300" />
            </div>
          )}
        </div>

        {/* Title & Meta */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{recipe.description}</p>
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{recipe.time} minutes</span>
            </div>
          </div>
        </div>

        {/* Diners Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Number of Servings</h2>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 4, 6, 8].map((num) => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDiners(num)}
                className={`px-6 py-3 rounded-xl border-2 transition-all font-semibold ${
                  selectedDiners === num
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'border-gray-200 text-gray-700 hover:border-primary-300'
                }`}
              >
                {num} {num === 1 ? 'person' : 'people'}
              </motion.button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">Ingredients will be scaled for {selectedDiners} servings</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-4 py-2 bg-primary-100 text-primary-700 font-medium rounded-full">
            {recipe.method}
          </span>
          {recipe.tags.map(tag => (
            <span
              key={tag}
              className={`px-4 py-2 font-medium rounded-full ${
                tag === 'social'
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Ingredients (for {selectedDiners} {selectedDiners === 1 ? 'person' : 'people'})</h2>
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              ownedCount === recipe.ingredients.length
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}>
              {ownedCount} of {recipe.ingredients.length} in kitchen
            </span>
          </div>
          <ul className="space-y-3">
            {scaledIngredients.map((ingredient, index) => {
              const owned = isIngredientOwned(recipe.ingredients[index]);
              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    owned ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${owned ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={`capitalize ${owned ? 'text-green-800' : 'text-red-800 font-medium'}`}>
                    {ingredient}
                  </span>
                  {!owned && (
                    <span className="ml-auto text-xs text-red-500 font-medium">not owned</span>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {[
              'Gather all ingredients and prepare your workspace.',
              `Prepare the ${recipe.ingredients[0]} according to the recipe.`,
              `Use the ${recipe.method} method to cook the dish.`,
              'Season and adjust flavors to taste.',
              'Serve hot and enjoy your meal!'
            ].map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1">{step}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Save/Remove Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSaved(toggleRecipeSaved(recipe.id))}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg ${
              isSaved
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
            }`}
          >
            {isSaved ? (
              <span className="flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 fill-current" />
                Remove from Cookbook
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Bookmark className="w-5 h-5" />
                Save to Cookbook
              </span>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}