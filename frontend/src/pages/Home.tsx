import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Refrigerator, ChefHat, BookOpen, AlertTriangle, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ingredients, recipes } from '../data/mockData';
import { useAuth } from '../utils/auth';

export default function Home() {
  const { userName } = useAuth();
  const expiringSoon = ingredients
    .filter(ing => ing.expiryDays <= 5)
    .sort((a, b) => a.expiryDays - b.expiryDays);

  const savedRecipes = recipes.filter(r => r.isSaved).length;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      setShowScrollHint(!atEnd);
    }
  };

  // Check on mount if content overflows
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth <= el.clientWidth) {
      setShowScrollHint(false);
    }
  }, [expiringSoon.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Section */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userName || 'Chef'}!
          </h1>
          <p className="text-gray-600 mt-1">What would you like to cook today?</p>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 bg-gray-50 rounded-xl border-l-4 border-primary-400 px-5 py-4"
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-800">Build a cooking routine that lasts.</span>{' '}
            CogniCook helps you organise your kitchen, discover recipes you can actually make, and turn cooking from a daily chore into something you enjoy — one meal at a time.
          </p>
        </motion.div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* My Kitchen */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/kitchen"
              className="block bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md hover:border-primary-200 transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 bg-green-50 rounded-lg">
                  <Refrigerator className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Kitchen</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{ingredients.length}</p>
              <p className="text-xs text-gray-400">ingredients</p>
            </Link>
          </motion.div>

          {/* Cookbook */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Link
              to="/cookbook"
              className="block bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md hover:border-primary-200 transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 bg-purple-50 rounded-lg">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Cookbook</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{savedRecipes}</p>
              <p className="text-xs text-gray-400">saved</p>
            </Link>
          </motion.div>

          {/* Expiring Soon */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/kitchen"
              className="block bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md hover:border-amber-200 transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 bg-amber-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Expiring</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{expiringSoon.length}</p>
              <p className="text-xs text-gray-400">items soon</p>
            </Link>
          </motion.div>

        </div>

        {/* Hero CTA — Start Cooking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Link
            to="/quad-lock"
            className="block bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-xl p-8 text-white hover:from-primary-600 hover:to-primary-700 transition-all transform hover:scale-[1.01] group"
          >
            <div className="flex items-center gap-6 mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Zap className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Start Cooking Now</h3>
                <p className="text-primary-100">Use Quad Lock to find recipes</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary-100 group-hover:text-white transition-colors">
              <span>Get started</span>
              <ChefHat className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>

        {/* Expiring Items Detail */}
        {expiringSoon.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Use it before you lose it
            </h2>
            <div className="relative">
              <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
              >
                {expiringSoon.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${
                      ingredient.expiryDays <= 2
                        ? 'bg-red-50 border-red-200 text-red-700'
                        : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}
                  >
                    <span className="font-medium">{ingredient.name}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                      ingredient.expiryDays <= 2
                        ? 'bg-red-200 text-red-800'
                        : 'bg-amber-200 text-amber-800'
                    }`}>
                      {ingredient.expiryDays}d
                    </span>
                  </div>
                ))}
              </div>

              {/* Right fade gradient + scroll arrow */}
              {showScrollHint && (
                <>
                  <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full shadow-sm border border-gray-200 pointer-events-none"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}