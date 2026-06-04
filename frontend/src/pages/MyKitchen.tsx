import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Search, ChefHat, AlertTriangle, Package, Check, ArrowLeft, X, Pencil, ArrowUpDown, ArrowUp, ArrowDown, Zap, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ingredients, addIngredient, removeIngredient, removeAllIngredients, updateIngredientAmount, masterIngredients, Ingredient, quickAddAll } from '../data/mockData';

// ============================================================
// Sort Types
// ============================================================
type SortField = 'alphabetical' | 'expiry' | 'category' | 'amount' | 'recent';
type SortDirection = 'asc' | 'desc';

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'expiry', label: 'Expiry Date' },
  { value: 'category', label: 'Category' },
  { value: 'amount', label: 'Amount' },
  { value: 'recent', label: 'Recently Added' },
];

function sortIngredients(list: Ingredient[], field: SortField, dir: SortDirection): Ingredient[] {
  const sorted = [...list];
  const mult = dir === 'asc' ? 1 : -1;

  switch (field) {
    case 'alphabetical':
      sorted.sort((a, b) => mult * a.name.localeCompare(b.name));
      break;
    case 'expiry':
      sorted.sort((a, b) => mult * (a.expiryDays - b.expiryDays));
      break;
    case 'category':
      sorted.sort((a, b) => mult * a.category.localeCompare(b.category));
      break;
    case 'amount':
      sorted.sort((a, b) => mult * (a.amount - b.amount));
      break;
    case 'recent':
      // ID format is u1, u2, ... so numeric sort works
      sorted.sort((a, b) => mult * (Number(a.id.replace('u', '')) - Number(b.id.replace('u', ''))));
      break;
  }
  return sorted;
}

// ============================================================
// Add Ingredient Panel
// ============================================================
function AddIngredientPanel({
  onClose,
  onAdd,
  masterIngredients,
  existingNames,
}: {
  onClose: () => void;
  onAdd: (masterId: string, amount: number) => boolean;
  masterIngredients: Ingredient[];
  existingNames: string[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [configuringId, setConfiguringId] = useState<string | null>(null);
  const [configuringAmount, setConfiguringAmount] = useState('');
  const [addedName, setAddedName] = useState<string | null>(null);

  const availableIngredients = masterIngredients.filter(
    m => !existingNames.includes(m.name)
  );
  const categories = [...new Set(availableIngredients.map(m => m.category))];

  const filteredIngredients = availableIngredients.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartAdd = (masterId: string, defaultAmount: number) => {
    setConfiguringId(masterId);
    setConfiguringAmount(String(defaultAmount));
  };

  const handleConfirmAdd = () => {
    if (configuringId) {
      const masterItem = masterIngredients.find(m => m.id === configuringId);
      onAdd(configuringId, Number(configuringAmount) || masterItem?.amount || 0);
      if (masterItem) {
        setAddedName(masterItem.name);
        setTimeout(() => setAddedName(null), 2000);
      }
      setConfiguringId(null);
      setConfiguringAmount('');
    }
  };

  const handleCancelAdd = () => {
    setConfiguringId(null);
    setConfiguringAmount('');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all ${
            !selectedCategory
              ? 'bg-primary-500 text-white border-primary-500'
              : 'border-gray-200 text-gray-600 hover:border-primary-300'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all ${
              selectedCategory === category
                ? 'bg-primary-500 text-white border-primary-500'
                : 'border-gray-200 text-gray-600 hover:border-primary-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="max-h-[320px] overflow-y-auto pr-1 space-y-2">
        {filteredIngredients.length > 0 ? (
          filteredIngredients.map(m => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {configuringId === m.id ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-sm">{m.name}</p>
                    <span className="text-xs text-gray-500">{m.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={configuringAmount}
                      onChange={(e) => setConfiguringAmount(e.target.value)}
                      placeholder={String(m.amount)}
                      min="0"
                      autoFocus
                      className="w-20 px-3 py-1.5 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-sm"
                    />
                    <span className="text-sm text-gray-500">{m.unit}</span>
                    <button
                      onClick={handleConfirmAdd}
                      className="px-3 py-1.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                    >
                      ✓ Add
                    </button>
                    <button
                      onClick={handleCancelAdd}
                      className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.amount} {m.unit} · {m.expiryDays} days</p>
                  </div>
                  <button
                    onClick={() => handleStartAdd(m.id, m.amount)}
                    className="ml-3 flex-shrink-0 px-3 py-1.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                  >
                    + Add
                  </button>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              {availableIngredients.length === 0
                ? 'All ingredients have been added!'
                : 'No ingredients match your search'}
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {addedName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl"
          >
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              {addedName} added to kitchen!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-2">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Inline Amount Editor
// ============================================================
function InlineAmountEditor({
  ingredientId,
  currentAmount,
  unit,
  onSave,
  onCancel,
}: {
  ingredientId: string;
  currentAmount: number;
  unit: string;
  onSave: (id: string, amount: number) => void;
  onCancel: () => void;
}) {
  const [amount, setAmount] = useState(String(currentAmount));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSave(ingredientId, Number(amount) || currentAmount);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex items-center gap-1.5 mt-1">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        min="0"
        className="w-16 px-2 py-0.5 rounded-lg border-2 border-primary-300 focus:border-primary-500 focus:outline-none text-sm"
      />
      <span className="text-xs text-gray-500">{unit}</span>
      <button onClick={() => onSave(ingredientId, Number(amount) || currentAmount)} className="text-primary-600 hover:text-primary-800">
        <Check className="w-3.5 h-3.5" />
      </button>
      <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ============================================================
// Category Color Map
// ============================================================
const CATEGORY_COLORS: Record<string, string> = {
  'Protein': 'bg-red-50 text-red-700',
  'Seafood': 'bg-blue-50 text-blue-700',
  'Dairy': 'bg-yellow-50 text-yellow-700',
  'Vegetable': 'bg-green-50 text-green-700',
  'Fruit': 'bg-pink-50 text-pink-700',
  'Herb': 'bg-emerald-50 text-emerald-700',
  'Frozen': 'bg-cyan-50 text-cyan-700',
  'Pantry': 'bg-purple-50 text-purple-700',
};

// ============================================================
// My Kitchen Page
// ============================================================
interface MyKitchenLocationState {
  selectionMode?: boolean;
  selectedIngredients?: string[];
}

export default function MyKitchen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as MyKitchenLocationState | undefined;

  const isSelectionMode = state?.selectionMode || false;
  const initialSelected = state?.selectedIngredients || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(initialSelected);
  const [editingIngredientId, setEditingIngredientId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Sort state
  const [sortField, setSortField] = useState<SortField>('expiry');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [quickAdded, setQuickAdded] = useState(false);
  const [showRemoveAllConfirm, setShowRemoveAllConfirm] = useState(false);

  // ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showAddModal) {
        setShowAddModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showAddModal]);

  const categories = ingredients.length > 0
    ? [...new Set(ingredients.map(ing => ing.category))]
    : [...new Set(masterIngredients.map(ing => ing.category))];

  // Filter → Sort
  const filteredAndSorted = sortIngredients(
    ingredients.filter(ingredient => {
      void refreshKey;
      const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || ingredient.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }),
    sortField,
    sortDirection
  );

  const expiringCount = ingredients.filter(i => i.expiryDays <= 5).length;

  const toggleIngredient = (name: string) => {
    setSelectedIngredients(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleSelectAll = () => {
    const allFilteredNames = filteredAndSorted.map(i => i.name);
    const allSelected = allFilteredNames.every(name => selectedIngredients.includes(name));
    if (allSelected) {
      setSelectedIngredients(prev => prev.filter(n => !allFilteredNames.includes(n)));
    } else {
      setSelectedIngredients(prev => [...new Set([...prev, ...allFilteredNames])]);
    }
  };

  const handleConfirmSelection = () => {
    navigate('/quad-lock', { state: { selectedIngredients } });
  };

  const handleQuickAdd = () => {
    quickAddAll();
    setQuickAdded(true);
    setRefreshKey(k => k + 1);
  };

  const handleRemoveAll = () => {
    removeAllIngredients();
    setShowRemoveAllConfirm(false);
    setRefreshKey(k => k + 1);
  };

  const handleSaveAmount = (id: string, newAmount: number) => {
    updateIngredientAmount(id, newAmount);
    setEditingIngredientId(null);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${isSelectionMode ? 'pb-24' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {isSelectionMode && (
              <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div className="p-2 bg-green-100 rounded-xl">
              <ChefHat className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isSelectionMode ? 'Select Ingredients' : 'My Kitchen'}
              </h1>
              <p className="text-sm text-gray-500">
                {isSelectionMode
                  ? `${selectedIngredients.length} selected`
                  : `${ingredients.length} items${expiringCount > 0 ? ` · ${expiringCount} expiring soon` : ''}`}
              </p>
            </div>
          </div>
          {!isSelectionMode && (
            <div className="flex items-center gap-2">
              {ingredients.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRemoveAllConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2.5 border-2 border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 hover:border-red-300 transition-all text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove All
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Ingredient
              </motion.button>
            </div>
          )}
        </div>

        {/* Selection Mode Banner */}
        {isSelectionMode && (
          <div className="mb-6">
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-3 mb-3">
              <p className="text-sm font-medium text-primary-800">
                Tap ingredients to select
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Ingredient
            </motion.button>
          </div>
        )}

        {/* Toolbar: Search + Sort + Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          {/* Row 1: Search + Sort */}
          <div className="flex gap-3 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors text-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center gap-1">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-sm bg-white appearance-none pr-8 cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ArrowUpDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />

              {/* Direction Toggle */}
              <button
                onClick={() => setSortDirection(d => d === 'asc' ? 'desc' : 'asc')}
                className={`p-2 rounded-lg border-2 transition-all ${
                  sortDirection === 'asc'
                    ? 'border-primary-200 bg-primary-50 text-primary-600'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
                title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
              >
                {sortDirection === 'asc' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Row 2: Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all whitespace-nowrap ${
                !selectedCategory
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'border-gray-200 text-gray-600 hover:border-primary-300'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'border-gray-200 text-gray-600 hover:border-primary-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients Grid */}
        {filteredAndSorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAndSorted.map((ingredient, index) => {
              const isSelected = selectedIngredients.includes(ingredient.name);
              const isEditing = editingIngredientId === ingredient.id;
              return (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * (index % 8) }}
                  onClick={() => isSelectionMode && toggleIngredient(ingredient.name)}
                  className={`bg-white rounded-xl shadow-sm border transition-all ${
                    isSelectionMode
                      ? `cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-primary-500 border-primary-200 bg-primary-50/30'
                            : 'border-gray-100 hover:border-primary-200 hover:shadow-md'
                        }`
                      : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="p-4">
                    {/* Top: Name + Category Badge + Selection Check */}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{ingredient.name}</h3>
                      <div className="flex items-center gap-1.5">
                        {isSelectionMode && isSelected && (
                          <div className="p-0.5 bg-primary-500 rounded-full">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${CATEGORY_COLORS[ingredient.category] || 'bg-gray-50 text-gray-700'}`}>
                          {ingredient.category}
                        </span>
                      </div>
                    </div>

                    {/* Amount */}
                    {isEditing ? (
                      <InlineAmountEditor
                        ingredientId={ingredient.id}
                        currentAmount={ingredient.amount}
                        unit={ingredient.unit}
                        onSave={handleSaveAmount}
                        onCancel={() => setEditingIngredientId(null)}
                      />
                    ) : (
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-lg font-bold text-gray-800">{ingredient.amount}</span>
                        <span className="text-sm text-gray-500">{ingredient.unit}</span>
                        {!isSelectionMode && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingIngredientId(ingredient.id);
                            }}
                            className="ml-1 p-0.5 text-gray-300 hover:text-primary-500 transition-colors"
                            title="Edit amount"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}

                    {/* Bottom: Expiry + Remove */}
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-1 text-xs font-medium ${
                        ingredient.expiryDays <= 2
                          ? 'text-red-600'
                          : ingredient.expiryDays <= 5
                            ? 'text-amber-600'
                            : 'text-green-600'
                      }`}>
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{ingredient.expiryDays}d left</span>
                      </div>
                      {!isSelectionMode && !isEditing && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeIngredient(ingredient.id);
                            setRefreshKey(k => k + 1);
                          }}
                          className="text-xs text-gray-300 hover:text-red-500 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {ingredients.length === 0 ? 'Your kitchen is empty' : 'No ingredients found'}
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              {ingredients.length === 0
                ? 'Add ingredients from our catalog to get started!'
                : 'Try adjusting your search or filters'}
            </p>
            {ingredients.length === 0 && (
              <div className="flex flex-col items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Your First Ingredient
                </motion.button>

                {!quickAdded && (
                  <>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <div className="h-px w-8 bg-gray-200" />
                      or
                      <div className="h-px w-8 bg-gray-200" />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleQuickAdd}
                      className="flex items-center gap-2 px-5 py-3 bg-amber-50 text-amber-700 border-2 border-amber-200 rounded-xl font-semibold hover:bg-amber-100 hover:border-amber-300 transition-all text-sm"
                    >
                      <Zap className="w-4 h-4" />
                      Quick Add 35 Common Ingredients
                    </motion.button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Add New Ingredient</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <AddIngredientPanel
                  onClose={() => setShowAddModal(false)}
                  onAdd={isSelectionMode ? (masterId, amount) => {
                    const success = addIngredient(masterId, amount);
                    if (success) {
                      const masterItem = masterIngredients.find(m => m.id === masterId);
                      if (masterItem) {
                        setSelectedIngredients(prev =>
                          prev.includes(masterItem.name) ? prev : [...prev, masterItem.name]
                        );
                      }
                      setRefreshKey(k => k + 1);
                    }
                    return success;
                  } : addIngredient}
                  masterIngredients={masterIngredients}
                  existingNames={ingredients.map(i => i.name)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Remove All Confirmation Modal */}
        <AnimatePresence>
          {showRemoveAllConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowRemoveAllConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Remove All Ingredients?</h2>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  This will remove all <strong>{ingredients.length}</strong> ingredients from your kitchen. This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRemoveAllConfirm(false)}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRemoveAll}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                  >
                    Remove All
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fixed Bottom Confirm Bar — only in selection mode */}
        {isSelectionMode && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSelectAll}
                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${
                  filteredAndSorted.length > 0 && filteredAndSorted.every(i => selectedIngredients.includes(i.name))
                    ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    : 'border-2 border-primary-300 text-primary-600 hover:bg-primary-50'
                }`}
              >
                {filteredAndSorted.length > 0 && filteredAndSorted.every(i => selectedIngredients.includes(i.name))
                  ? 'Deselect All'
                  : 'Select All'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirmSelection}
                className="px-5 py-3 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors shadow-md"
              >
                {selectedIngredients.length} selected · Confirm Selection
              </motion.button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
