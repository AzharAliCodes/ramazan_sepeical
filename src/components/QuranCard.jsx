import React from 'react';
import { calculateQuranScore, TARGETS } from '../utils/scoring';

const QuranCard = ({ quran, onChange }) => {
  const score = calculateQuranScore(quran);

  const handlePagesChange = (value) => {
    onChange({ ...quran, pages: parseInt(value) || 0 });
  };

  const handleSurahChange = (value) => {
    onChange({ ...quran, surah: value });
  };

  const getProgressColor = () => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        📖 Quran Reading
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pages Read
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={quran.pages}
            onChange={(e) => handlePagesChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Surah Name
          </label>
          <input
            type="text"
            value={quran.surah}
            onChange={(e) => handleSurahChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Al-Baqarah"
          />
        </div>
      </div>

      {/* Target Display */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Daily Target:</span> {TARGETS.quranPages} pages
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Progress: {quran.pages} / {TARGETS.quranPages} pages
        </p>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Quran Completion</span>
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

export default QuranCard;
