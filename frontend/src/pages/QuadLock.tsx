import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Sparkles, Utensils, Clock, Users, Check, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cookingMethods } from '../data/mockData';

// ============================================================
// Quad Lock Filter — The 4 Cooking Decisions
// ============================================================

interface QuadLockSelections {
  ingredients: string[];
  method: string[];
  time: number | null;  // null = not selected yet; 80+ means "at least 80 min"
  diners: number | null;
  mealType: 'daily' | 'social';
}

// Step metadata — the teaching framework
const STEPS = [
  { num: 1, title: 'Ingredients', subtitle: 'What do you have? Start with what\'s available', icon: Sparkles, color: 'green' },
  { num: 2, title: 'Method', subtitle: 'How will you cook it? Each technique changes the result', icon: Utensils, color: 'blue' },
  { num: 3, title: 'Diners', subtitle: 'Who are you cooking for? Portions and occasion shape the dish', icon: Users, color: 'purple' },
  { num: 4, title: 'Time', subtitle: 'How long do you have? Great meals fit your schedule', icon: Clock, color: 'orange' },
];

const COLOR_MAP: Record<string, { bg: string; bgLight: string; text: string; border: string; ring: string; solid: string }> = {
  green: { bg: 'bg-green-500', bgLight: 'bg-green-100', text: 'text-green-600', border: 'border-green-500', ring: 'ring-green-500', solid: 'bg-green-500 text-white' },
  blue: { bg: 'bg-blue-500', bgLight: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-500', ring: 'ring-blue-500', solid: 'bg-blue-500 text-white' },
  purple: { bg: 'bg-purple-500', bgLight: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-500', ring: 'ring-purple-500', solid: 'bg-purple-500 text-white' },
  orange: { bg: 'bg-orange-500', bgLight: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-500', ring: 'ring-orange-500', solid: 'bg-orange-500 text-white' },
};

// ============================================================
// Progress Bar Component
// ============================================================
function ProgressBar({ completedSteps }: { completedSteps: number[] }) {
  return (
    <div className="flex flex-col items-center gap-0">
      {STEPS.map((step, i) => {
        const isComplete = completedSteps.includes(step.num);
        const colors = COLOR_MAP[step.color];
        return (
          <div key={step.num} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              isComplete ? `${colors.solid} shadow-md` : 'bg-gray-200 text-gray-500'
            }`}>
              {isComplete ? <Check className="w-4 h-4" /> : step.num}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-0.5 h-8 my-1 transition-all ${
                completedSteps.includes(step.num) && completedSteps.includes(STEPS[i + 1].num)
                  ? 'bg-primary-400'
                  : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Section Wrapper — numbered step with teaching subtitle
// ============================================================
function StepSection({
  step,
  isComplete,
  children,
}: {
  step: typeof STEPS[number];
  isComplete: boolean;
  children: React.ReactNode;
}) {
  const colors = COLOR_MAP[step.color];
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: step.num * 0.1 }}
      className="relative"
    >
      {/* Connector line to next section */}
      {step.num < 4 && (
        <div className="absolute left-7 -bottom-3 w-0.5 h-6 bg-gray-200 z-0" />
      )}

      <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${isComplete ? colors.border : 'border-gray-200'} transition-all`}>
        {/* Step Header */}
        <div className="flex items-center gap-3 mb-1">
          <div className={`p-2 rounded-xl ${isComplete ? colors.bgLight : 'bg-gray-100'} transition-colors`}>
            <Icon className={`w-5 h-5 ${isComplete ? colors.text : 'text-gray-400'} transition-colors`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold ${colors.text} uppercase tracking-wider`}>Step {step.num}</span>
              {isComplete && (
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${colors.text}`}>
                  <Check className="w-3 h-3" /> Done
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{step.title}</h2>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4 ml-12 italic">{step.subtitle}</p>

        {children}
      </div>
    </motion.div>
  );
}

// ============================================================
// Main Quad Lock Page
// ============================================================
export default function QuadLock() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Support pre-filling from either kitchen selection or "Edit Filters" navigation
  const navState = location.state as {
    selectedIngredients?: string[];
    selections?: Partial<QuadLockSelections>;
  } | null;

  const savedSelections = navState?.selections;
  const selectedIngredientsFromNav = navState?.selectedIngredients || savedSelections?.ingredients || [];

  const [selections, setSelections] = useState<QuadLockSelections>({
    ingredients: selectedIngredientsFromNav,
    method: savedSelections?.method || [],
    time: savedSelections?.time ?? null,
    diners: savedSelections?.diners ?? null,
    mealType: savedSelections?.mealType || 'daily',
  });
  const [showError, setShowError] = useState(false);
  const [isCustomTime, setIsCustomTime] = useState(false);

  const handleMethodToggle = (method: string) => {
    setSelections(prev => {
      const currentMethods = prev.method;
      if (currentMethods.includes(method)) {
        return { ...prev, method: currentMethods.filter(m => m !== method) };
      } else if (currentMethods.length < 3) {
        return { ...prev, method: [...currentMethods, method] };
      }
      return prev;
    });
    setShowError(false);
  };

  const handleDinersSelect = (num: number) => {
    setSelections(prev => ({ ...prev, diners: num }));
    setShowError(false);
  };

  const handleTimeChange = (value: number) => {
    setSelections(prev => ({ ...prev, time: value }));
  };

  const handleOpenKitchen = () => {
    navigate('/kitchen', { state: { selectionMode: true, selectedIngredients: selections.ingredients, selections } });
  };

  // Track which steps are complete
  const completedSteps: number[] = [];
  if (selections.ingredients.length > 0) completedSteps.push(1);
  if (selections.method.length > 0) completedSteps.push(2);
  if (selections.diners !== null) completedSteps.push(3);
  if (selections.time !== null) completedSteps.push(4);

  const allSelected = selections.method.length > 0 && selections.diners !== null && selections.time !== null;

  const handleContinue = () => {
    if (!allSelected) {
      setShowError(true);
      return;
    }
    navigate('/recipes', { state: { selections } });
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pr-24">
      {/* Sticky Vertical Progress Bar — right side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3">
          <ProgressBar completedSteps={completedSteps} />
          <p className="text-center text-[10px] text-gray-400 mt-2 whitespace-nowrap">
            {completedSteps.length}/4 done
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">The Quad Lock Method</h1>
            <p className="text-gray-600 mt-1">
              Every recipe comes down to 4 decisions. Master these, and you can cook anything.
            </p>
          </div>
        </div>

        {/* Section 1: Ingredients */}
        <StepSection step={STEPS[0]} isComplete={selections.ingredients.length > 0}>
          <p className="text-sm text-gray-500 mb-4">
            {selections.ingredients.length > 0
              ? `${selections.ingredients.length} ingredients selected`
              : 'Select ingredients from your kitchen'}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenKitchen}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all"
          >
            {selections.ingredients.length > 0 ? 'Select from Kitchen' : 'Select Ingredients'}
          </motion.button>
          {selections.ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selections.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}
        </StepSection>

        {/* Section 2: Method (max 3) */}
        <div className="mt-6">
          <StepSection step={STEPS[1]} isComplete={selections.method.length > 0}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">Choose up to 3 cooking methods</p>
              <span className="text-sm text-gray-500 font-medium">
                {selections.method.length}/3
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cookingMethods.map((method) => {
                const isSelected = selections.method.includes(method);
                const isMaxReached = selections.method.length >= 3 && !isSelected;
                return (
                  <motion.button
                    key={method}
                    whileHover={{ scale: isMaxReached ? 1 : 1.02 }}
                    whileTap={{ scale: isMaxReached ? 1 : 0.98 }}
                    onClick={() => handleMethodToggle(method)}
                    disabled={isMaxReached}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'bg-blue-500 text-white border-blue-500'
                        : isMaxReached
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                          : 'border-gray-200 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isSelected && <Check className="w-4 h-4" />}
                      <span className="font-medium text-sm">{method}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </StepSection>
        </div>

        {/* Section 3: Diners */}
        <div className="mt-6">
          <StepSection step={STEPS[2]} isComplete={selections.diners !== null}>
            {/* Number Selection */}
            <div className="grid grid-cols-5 gap-3 mb-4">
              {[1, 2, 4, 6, 8].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDinersSelect(num)}
                  className={`p-3 rounded-xl border-2 transition-all text-center ${
                    selections.diners === num
                      ? 'bg-purple-500 text-white border-purple-500'
                      : 'border-gray-200 text-gray-700 hover:border-purple-300'
                  }`}
                >
                  <span className="font-semibold">{num}{num === 8 ? '+' : ''}</span>
                </motion.button>
              ))}
            </div>

            {/* Daily/Social Toggle */}
            <div className="flex items-center justify-center gap-2 p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => setSelections(prev => ({ ...prev, mealType: 'daily' }))}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  selections.mealType === 'daily'
                    ? 'bg-white text-purple-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setSelections(prev => ({ ...prev, mealType: 'social' }))}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  selections.mealType === 'social'
                    ? 'bg-white text-purple-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Social
              </button>
            </div>
          </StepSection>
        </div>

        {/* Section 4: Time */}
        <div className="mt-6">
          <StepSection step={STEPS[3]} isComplete={selections.time !== null}>
            {!isCustomTime ? (
              <>
                {/* Preset Buttons — 5 columns */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[20, 40, 60].map((mins) => (
                    <motion.button
                      key={mins}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTimeChange(mins)}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        selections.time === mins
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'border-gray-200 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <span className="font-semibold text-sm">≤ {mins}</span>
                      <span className="block text-xs opacity-75">min</span>
                    </motion.button>
                  ))}
                  {/* 80+ button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTimeChange(80)}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      selections.time === 80
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'border-gray-200 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    <span className="font-semibold text-sm">80+</span>
                    <span className="block text-xs opacity-75">min</span>
                  </motion.button>
                </div>

                {/* Show selected time summary */}
                {selections.time !== null && (
                  <p className="text-sm text-orange-600 font-medium text-center mb-3">
                    {selections.time >= 80
                      ? 'All recipes (no time limit)'
                      : `Recipes under ${selections.time} minutes`}
                  </p>
                )}
                
                {/* Custom Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCustomTime(true)}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-all"
                >
                  Custom Time ↓
                </motion.button>
              </>
            ) : (
              <>
                {/* Custom Input Mode */}
                <div className="flex items-center gap-4 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCustomTime(false)}
                    className="p-2 rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <div className="flex-1 text-center">
                    <input
                      type="number"
                      min={0}
                      max={180}
                      value={selections.time ?? 30}
                      onChange={(e) => handleTimeChange(Math.min(180, Math.max(0, Number(e.target.value))))}
                      className="w-24 text-center text-3xl font-bold bg-gray-100 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="text-lg text-gray-500 ml-2">minutes</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center">Enter any value from 0 to 180 minutes</p>
                {selections.time !== null && selections.time < 80 && (
                  <p className="text-sm text-orange-600 font-medium text-center mt-2">
                    Recipes under {selections.time} minutes
                  </p>
                )}
              </>
            )}
          </StepSection>
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg ${
              allSelected
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:shadow-xl'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Find Recipes
          </motion.button>
          
          {showError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-4"
            >
              Please select method, diners, and time to continue.
            </motion.p>
          )}
        </motion.div>

      </motion.div>
    </div>
  );
}