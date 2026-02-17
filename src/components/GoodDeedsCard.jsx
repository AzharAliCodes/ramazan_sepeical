import React from 'react';
import { calculateGoodDeedsScore, DEED_POINTS } from '../utils/scoring';

const GoodDeedsCard = ({ goodDeeds, onChange }) => {
  const score = calculateGoodDeedsScore(goodDeeds);

  const handleDeedChange = (index, field, value) => {
    const newDeeds = [...goodDeeds];
    newDeeds[index] = { ...newDeeds[index], [field]: value };
    onChange(newDeeds);
  };

  const calculatePoints = (deed) => {
    if (!deed.description) return 0;
    return DEED_POINTS[deed.size] || 0;
  };

  const getProgressColor = () => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        ❤️ Today's Good Deeds
      </h2>

      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
        {goodDeeds.map((deed, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={deed.description}
              onChange={(e) => handleDeedChange(index, 'description', e.target.value)}
              className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
              placeholder={`Good deed #${index + 1}`}
            />
            
            <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
              <select
                value={deed.size}
                onChange={(e) => handleDeedChange(index, 'size', e.target.value)}
                className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white cursor-pointer text-sm md:text-base"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="big">Big</option>
              </select>
              
              <div className="min-w-[60px] text-right">
                <span className="text-sm font-bold text-emerald-600">
                  +{calculatePoints(deed)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Points Guide */}
      <div className="mb-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-gray-700">
          <span className="font-semibold">Points:</span> Small = 5, Medium = 10, Big = 20
        </p>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Good Deeds Score</span>
          <span className="text-sm font-bold text-emerald-600">
            {score}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${Math.min(score, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GoodDeedsCard;
