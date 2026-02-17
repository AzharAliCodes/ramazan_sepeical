import React from 'react';
import { calculateSalahScore } from '../utils/scoring';

const SalahCard = ({ salah, onChange }) => {
  const totalScore = calculateSalahScore(salah);
  
  // Calculate Fard completion separately (0-100%)
  const fardCount = [
    salah.fajr,
    salah.dhuhr,
    salah.asr,
    salah.maghrib,
    salah.isha
  ].filter(Boolean).length;
  const fardScore = (fardCount / 5) * 100;

  const handleCheckboxChange = (name, value) => {
    onChange({ ...salah, [name]: value });
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
          {/* Sunnah Rakaat Toggle - Before Fajr */}
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={salah.sunnahFajr === 2}
                onChange={(e) => onChange({ ...salah, sunnahFajr: e.target.checked ? 2 : 0 })}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
              />
              <span className="ml-2 text-sm font-medium text-purple-800">Sunnah fajr (2 Rakaat)</span>
            </label>
          </div>

          {/* Fard Prayers with Sunnah toggles */}
          
          {/* Fajr */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <label className="flex items-center cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={salah.fajr}
                onChange={(e) => handleCheckboxChange('fajr', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
              />
              <span className="ml-3 text-base font-medium text-gray-800">Fajr</span>
            </label>
            <span className="text-sm font-semibold text-gray-600">
              {salah.fajr ? '20%' : '0%'}
            </span>
          </div>

          {/* Sunnah Before Dhuhr */}
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={salah.sunnahBeforeDhuhr > 0}
                  onChange={(e) => onChange({ ...salah, sunnahBeforeDhuhr: e.target.checked ? 4 : 0 })}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
                <span className="ml-2 text-sm font-medium text-purple-800">Sunnah Before Zuhar</span>
              </label>
            </div>
            {salah.sunnahBeforeDhuhr > 0 && (
              <div className="flex gap-3 ml-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={salah.sunnahBeforeDhuhr === 2}
                    onChange={() => onChange({ ...salah, sunnahBeforeDhuhr: 2 })}
                    className="w-3 h-3 text-purple-600 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-1 text-xs text-purple-700">2 Rakaat</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={salah.sunnahBeforeDhuhr === 4}
                    onChange={() => onChange({ ...salah, sunnahBeforeDhuhr: 4 })}
                    className="w-3 h-3 text-purple-600 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-1 text-xs text-purple-700">4 Rakaat</span>
                </label>
              </div>
            )}
          </div>

          {/* Dhuhr */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <label className="flex items-center cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={salah.dhuhr}
                onChange={(e) => handleCheckboxChange('dhuhr', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
              />
              <span className="ml-3 text-base font-medium text-gray-800">Zuhar
              </span>
            </label>
            <span className="text-sm font-semibold text-gray-600">
              {salah.dhuhr ? '20%' : '0%'}
            </span>
          </div>

          {/* Sunnah After Dhuhr */}
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={salah.sunnahAfterDhuhr > 0}
                  onChange={(e) => onChange({ ...salah, sunnahAfterDhuhr: e.target.checked ? 4 : 0 })}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
                <span className="ml-2 text-sm font-medium text-purple-800">Sunnah After Zuhar</span>
              </label>
            </div>
            {salah.sunnahAfterDhuhr > 0 && (
              <div className="flex gap-3 ml-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={salah.sunnahAfterDhuhr === 2}
                    onChange={() => onChange({ ...salah, sunnahAfterDhuhr: 2 })}
                    className="w-3 h-3 text-purple-600 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-1 text-xs text-purple-700">2 Rakaat</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={salah.sunnahAfterDhuhr === 4}
                    onChange={() => onChange({ ...salah, sunnahAfterDhuhr: 4 })}
                    className="w-3 h-3 text-purple-600 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-1 text-xs text-purple-700">4 Rakaat</span>
                </label>
              </div>
            )}
          </div>

          {/* Sunnah Before Asr */}
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={salah.sunnahBeforeAsr > 0}
                  onChange={(e) => onChange({ ...salah, sunnahBeforeAsr: e.target.checked ? 4 : 0 })}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
                <span className="ml-2 text-sm font-medium text-purple-800">Sunnah Before Asr</span>
              </label>
            </div>
            {salah.sunnahBeforeAsr > 0 && (
              <div className="flex gap-3 ml-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={salah.sunnahBeforeAsr === 2}
                    onChange={() => onChange({ ...salah, sunnahBeforeAsr: 2 })}
                    className="w-3 h-3 text-purple-600 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-1 text-xs text-purple-700">2 Rakaat</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={salah.sunnahBeforeAsr === 4}
                    onChange={() => onChange({ ...salah, sunnahBeforeAsr: 4 })}
                    className="w-3 h-3 text-purple-600 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-1 text-xs text-purple-700">4 Rakaat</span>
                </label>
              </div>
            )}
          </div>

          {/* Asr */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <label className="flex items-center cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={salah.asr}
                onChange={(e) => handleCheckboxChange('asr', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
              />
              <span className="ml-3 text-base font-medium text-gray-800">Asr</span>
            </label>
            <span className="text-sm font-semibold text-gray-600">
              {salah.asr ? '20%' : '0%'}
            </span>
          </div>

          {/* Maghrib */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <label className="flex items-center cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={salah.maghrib}
                onChange={(e) => handleCheckboxChange('maghrib', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
              />
              <span className="ml-3 text-base font-medium text-gray-800">Maghrib</span>
            </label>
            <span className="text-sm font-semibold text-gray-600">
              {salah.maghrib ? '20%' : '0%'}
            </span>
          </div>

          {/* Sunnah After Maghrib */}
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={salah.sunnahAfterMaghrib === 2}
                onChange={(e) => onChange({ ...salah, sunnahAfterMaghrib: e.target.checked ? 2 : 0 })}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
              />
              <span className="ml-2 text-sm font-medium text-purple-800">Sunnah After Maghrib (2 Rakaat)</span>
            </label>
          </div>

          {/* Sunnah Before Isha */}
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={salah.sunnahBeforeIsha === 2}
                onChange={(e) => onChange({ ...salah, sunnahBeforeIsha: e.target.checked ? 2 : 0 })}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
              />
              <span className="ml-2 text-sm font-medium text-purple-800">Sunnah Before Isha (2 Rakaat)</span>
            </label>
          </div>

          {/* Isha */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <label className="flex items-center cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={salah.isha}
                onChange={(e) => handleCheckboxChange('isha', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
              />
              <span className="ml-3 text-base font-medium text-gray-800">Isha</span>
            </label>
            <span className="text-sm font-semibold text-gray-600">
              {salah.isha ? '20%' : '0%'}
            </span>
          </div>

          {/* Sunnah After Isha */}
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={salah.sunnahAfterIsha === 2}
                onChange={(e) => onChange({ ...salah, sunnahAfterIsha: e.target.checked ? 2 : 0 })}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
              />
              <span className="ml-2 text-sm font-medium text-purple-800">Sunnah After Isha (2 Rakaat)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Progress Bar for Fard */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Fard Completion</span>
          <span className="text-sm font-bold text-green-600">
            {Math.round(fardScore)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${fardScore}%` }}
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
            { name: 'duha', label: 'Ishraq' },
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

        {/* Taraweeh Rakaat Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taraweeh Rakaat Count
          </label>
          <input
            type="number"
            min="0"
            max="20"
            value={salah.taraweeh > 0 ? salah.taraweeh : ''}
            onChange={(e) => {
              const value = e.target.value;
              // Limit to 2 digits max
              if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 20 && value.length <= 2)) {
                onChange({ ...salah, taraweeh: value === '' ? 0 : parseInt(value) });
              }
            }}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
            {Math.round(totalScore)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalahCard;
