import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SalahCard from './components/SalahCard';
import QuranCard from './components/QuranCard';
import DhikrCard from './components/DhikrCard';
import DisciplineCard from './components/DisciplineCard';
import GratitudeCard from './components/GratitudeCard';
import GoodDeedsCard from './components/GoodDeedsCard';
import FinalSummary from './components/FinalSummary';
import Footer from './components/Footer';
import { loadData, getDayData, updateDayData } from './utils/storage';
import { updateQuranGlobalState } from './utils/quranState';
import { calculateFinalScore } from './utils/scoring';

function App() {
  const [allData, setAllData] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [dayData, setDayData] = useState(null);
  const [scores, setScores] = useState({
    salah: 0,
    quran: 0,
    dhikr: 0,
    discipline: 0,
    goodDeeds: 0,
    final: 0
  });

  // Initialize data on mount
  useEffect(() => {
    const data = loadData();
    setAllData(data);
    setCurrentDay(data.currentDay);
    const currentDayData = getDayData(data, data.currentDay);
    setDayData(currentDayData);
  }, []);

  // Recalculate scores whenever dayData changes
  useEffect(() => {
    if (dayData) {
      const newScores = calculateFinalScore(dayData);
      setScores(newScores);
    }
  }, [dayData]);

  // Handle day change
  const handleDayChange = (newDay) => {
    if (newDay < 1 || newDay > 30) return;
    
    const newDayData = getDayData(allData, newDay);
    setCurrentDay(newDay);
    setDayData(newDayData);
    
    // Update current day in storage
    const updatedAllData = { ...allData, currentDay: newDay };
    setAllData(updatedAllData);
  };

  // Generic update function
  const updateField = (field, value) => {
    const updatedDayData = { ...dayData, [field]: value };
    setDayData(updatedDayData);
    
    // Save to localStorage
    let updatedAllData = updateDayData(allData, currentDay, updatedDayData);
    
    // If updating Quran, sync global state across all days
    if (field === 'quran') {
      updatedAllData = updateQuranGlobalState(updatedAllData, currentDay, updatedDayData);
      // Re-fetch current day data with updated global state
      const refreshedDayData = updatedAllData.days[currentDay];
      setDayData(refreshedDayData);
    }
    
    setAllData(updatedAllData);
  };

  if (!dayData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-2xl font-bold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-screen bg-amber-50">
      {/* Sidebar */}
      <Sidebar
        currentDay={currentDay}
        scores={scores}
        onDayChange={handleDayChange}
      />

      {/* Main Content */}
      <div className="lg:col-span-9 space-y-6 md:space-y-8 p-4 md:p-6 lg:p-10">
        <SalahCard
          salah={dayData.salah}
          onChange={(value) => updateField('salah', value)}
        />

        <QuranCard
          quran={dayData.quran}
          onChange={(value) => updateField('quran', value)}
          currentDay={currentDay}
          allData={allData}
        />

        <DhikrCard
          dhikr={dayData.dhikr}
          onChange={(value) => updateField('dhikr', value)}
        />

        <DisciplineCard
          discipline={dayData.discipline}
          onChange={(value) => updateField('discipline', value)}
        />

        <GratitudeCard
          gratitude={dayData.gratitude}
          onChange={(value) => updateField('gratitude', value)}
        />

        <GoodDeedsCard
          goodDeeds={dayData.goodDeeds}
          onChange={(value) => updateField('goodDeeds', value)}
        />

        <FinalSummary scores={scores} />
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
