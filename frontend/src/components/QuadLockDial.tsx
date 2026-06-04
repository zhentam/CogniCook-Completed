import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Plus } from 'lucide-react';

interface QuadLockDialProps {
  segments: {
    id: string;
    label: string;
    icon: React.ReactNode;
    options: { label: string; value: string | number }[];
    type: 'single-select' | 'multi-select' | 'range';
    rangeMin?: number;
    rangeMax?: number;
  }[];
  selections: {
    ingredients?: string[];
    method?: string | null;
    time?: number;
    diners?: number | null;
    mealType?: 'daily' | 'social';
    [key: string]: string | number | string[] | null | undefined;
  };
  onSelectionChange: (segmentId: string, value: string | number | string[]) => void;
}

export default function QuadLockDial({ segments, selections, onSelectionChange }: QuadLockDialProps) {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const segmentBgColors = [
    'bg-green-500',
    'bg-blue-500',
    'bg-orange-500',
    'bg-purple-500',
  ];

  const segmentLightColors = [
    'bg-green-100 text-green-700',
    'bg-blue-100 text-blue-700',
    'bg-orange-100 text-orange-700',
    'bg-purple-100 text-purple-700',
  ];

  const getSelectionDisplay = (segment: typeof segments[0]) => {
    const value = selections[segment.id];
    if (segment.type === 'multi-select') {
      const arr = value as string[] | null;
      if (arr && arr.length > 0) {
        return `${arr.length} selected`;
      }
      return 'Not selected';
    } else if (segment.type === 'range') {
      const timeValue = value as number;
      return `${timeValue} min`;
    } else {
      if (value !== null && value !== undefined) {
        const option = segment.options.find(o => o.value === value);
        return option?.label || String(value);
      }
      return 'Not selected';
    }
  };

  const isSegmentSelected = (segment: typeof segments[0]) => {
    const value = selections[segment.id];
    if (segment.type === 'multi-select') {
      const arr = value as string[] | null;
      return arr && arr.length > 0;
    } else if (segment.type === 'range') {
      return true; // Range always has a value
    } else {
      return value !== null && value !== undefined;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Dial Container */}
      <div className="relative w-80 h-80">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl" />
        
        {/* Inner Circle */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-100 to-white shadow-inner flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800">QUAD</div>
            <div className="text-2xl font-semibold text-gray-600">LOCK</div>
          </div>
        </div>

        {/* Segments */}
        {segments.map((segment, index) => {
          const rotation = index * 90;
          const isSelected = isSegmentSelected(segment);
          
          return (
            <motion.button
              key={segment.id}
              className={`absolute w-32 h-32 rounded-2xl transition-all ${
                activeSegment === index 
                  ? `${segmentBgColors[index]} text-white shadow-xl z-10` 
                  : isSelected
                    ? `${segmentLightColors[index]} shadow-lg`
                    : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              }`}
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: 'center',
              }}
              initial={{
                x: '-50%',
                y: '-50%',
                rotate: rotation,
                translateY: -120,
                rotateZ: -rotation,
              }}
              animate={{
                x: '-50%',
                y: '-50%',
                rotate: rotation,
                translateY: activeSegment === index ? -130 : -120,
                rotateZ: -rotation,
                scale: activeSegment === index ? 1.1 : 1,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSegment(activeSegment === index ? null : index)}
            >
              <div className="flex flex-col items-center justify-center h-full p-2">
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-5 h-5" />
                  </div>
                )}
                <div className="text-2xl mb-1">{segment.icon}</div>
                <div className="text-xs font-semibold text-center leading-tight">
                  {segment.label}
                </div>
                {isSelected && (
                  <div className="text-xs mt-1 opacity-80 truncate max-w-full">
                    {getSelectionDisplay(segment)}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}

        {/* Rotating Indicator */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary-500 rounded-full shadow-lg"
          animate={{ rotate: activeSegment !== null ? activeSegment * 90 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </div>

      {/* Options Panel */}
      <AnimatePresence>
        {activeSegment !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            className="mt-8 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {segments[activeSegment].type === 'multi-select'
                    ? 'Select Ingredients'
                    : segments[activeSegment].type === 'range'
                      ? 'Set Time Range'
                      : `Select ${segments[activeSegment].label}`}
                </h3>
                <button
                  onClick={() => setActiveSegment(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {segments[activeSegment].type === 'range' ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-4xl font-bold text-gray-900">
                      {selections[segments[activeSegment].id] as number}
                    </span>
                    <span className="text-lg text-gray-500 ml-2">minutes</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        const current = selections[segments[activeSegment].id] as number;
                        const min = segments[activeSegment].rangeMin || 0;
                        if (current > min) {
                          onSelectionChange(segments[activeSegment].id, current - 5);
                        }
                      }}
                      className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="range"
                      min={segments[activeSegment].rangeMin || 0}
                      max={segments[activeSegment].rangeMax || 30}
                      value={selections[segments[activeSegment].id] as number}
                      onChange={(e) => onSelectionChange(segments[activeSegment].id, Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <button
                      onClick={() => {
                        const current = selections[segments[activeSegment].id] as number;
                        const max = segments[activeSegment].rangeMax || 30;
                        if (current < max) {
                          onSelectionChange(segments[activeSegment].id, current + 5);
                        }
                      }}
                      className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{segments[activeSegment].rangeMin || 0} min</span>
                    <span>{segments[activeSegment].rangeMax || 30} min</span>
                  </div>
                </div>
              ) : (
                <div className={`grid ${segments[activeSegment].type === 'multi-select' ? 'grid-cols-2 gap-2 max-h-60 overflow-y-auto' : 'grid-cols-2 gap-3'}`}>
                  {segments[activeSegment].type === 'multi-select' ? (
                    segments[activeSegment].options.map((option) => {
                      const selectedIngredients = (selections[segments[activeSegment].id] as string[]) || [];
                      const isSelected = selectedIngredients.includes(option.value as string);
                      return (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const current = (selections[segments[activeSegment].id] as string[]) || [];
                            if (isSelected) {
                              onSelectionChange(
                                segments[activeSegment].id,
                                current.filter(v => v !== option.value)
                              );
                            } else {
                              onSelectionChange(segments[activeSegment].id, [...current, option.value as string]);
                            }
                          }}
                          className={`p-3 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? `${segmentBgColors[activeSegment]} text-white border-transparent`
                              : 'border-gray-200 hover:border-primary-300 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isSelected && <Check className="w-4 h-4" />}
                            <span className="font-medium text-sm">{option.label}</span>
                          </div>
                        </motion.button>
                      );
                    })
                  ) : (
                    segments[activeSegment].options.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onSelectionChange(segments[activeSegment].id, option.value);
                          setActiveSegment(null);
                        }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selections[segments[activeSegment].id] === option.value
                            ? `${segmentBgColors[activeSegment]} text-white border-transparent`
                            : 'border-gray-200 hover:border-primary-300 text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{option.label}</div>
                      </motion.button>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}