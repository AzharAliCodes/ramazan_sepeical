import React from 'react';
import { calculateSalahScore } from '../utils/scoring';

const SalahCard = ({ salah, onChange }) => {
  const score = calculateSalahScore(salah);

  const handleCheckboxChange = (name, value) => {
    onChange({ ...salah, [name]: value });
  };

  const handleSunnahChange = (value) => {
    onChange({ ...salah, sunnahRakaat: parseInt(value) || 0 });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        🕌 Daily Salah Tracking
      </h2>

      {/* Fard Salah Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Fard Prayers</h3>
        <div className="space-y-3">
          {[
            { name: 'fajr', label: 'Fajr' },
            { name: 'dhuhr', label: 'Dhuhr' },
            { name: 'asr', label: 'Asr' },
            { name: 'maghrib', label: 'Maghrib' },
            { name: 'isha', label: 'Isha' }
          ].map(({ name, label }) => (
            <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <label className="flex items-center cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={salah[name]}
                  onChange={(e) => handleCheckboxChange(name, e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
                />
                <span className="ml-3 text-base font-medium text-gray-800">{label}</span>
              </label>
              <span className="text-sm font-semibold text-gray-600">
                {salah[name] ? '20%' : '0%'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar for Fard */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Fard Completion</span>
          <span className="text-sm font-bold text-green-600">
            {Math.min(score, 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(score, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Extra Salah Section */}
      <div className="border-t border-gray-200 pt-4 md:pt-6">
        <h3 className="text-sm md:text-base font-semibold text-gray-700 mb-4">
          Extra Prayers (Bonus)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'tahajjud', label: 'Tahajjud' },
            { name: 'duha', label: 'Duha' },
            { name: 'taraweeh', label: 'Taraweeh' },
            { name: 'witr', label: 'Witr' }
          ].map(({ name, label }) => (
            <label key={name} className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <input
                type="checkbox"
                checked={salah[name]}
                onChange={(e) => handleCheckboxChange(name, e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sunnah Rakaat Count
          </label>
          <input
            type="number"
            min="0"
            max="50"
            value={salah.sunnahRakaat}
            onChange={(e) => handleSunnahChange(e.target.value)}
            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Total Salah Score */}
      <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-800">
            Total Salah Score
          </span>
          <span className="text-2xl font-bold text-emerald-600">
            {score}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalahCard;
