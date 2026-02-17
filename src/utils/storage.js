// localStorage key
const STORAGE_KEY = 'ramadan_tracker_2026';

// Get empty day structure
export const getEmptyDayData = () => ({
  date: new Date().toISOString().split('T')[0],
  salah: {
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
    tahajjud: false,
    duha: false,
    taraweeh: false,
    witr: false,
    sunnahRakaat: 0
  },
  quran: {
    pages: 0,
    surah: ''
  },
  dhikr: {
    subhanallah: 0,
    alhamdulillah: 0,
    allahuAkbar: 0
  },
  discipline: {
    screenTime: 0
  },
  gratitude: ['', '', ''],
  goodDeeds: [
    { description: '', size: 'small' },
    { description: '', size: 'small' },
    { description: '', size: 'small' },
    { description: '', size: 'small' },
    { description: '', size: 'small' }
  ]
});

// Initialize storage structure
const initializeStorage = () => {
  const data = {
    ramadanYear: 2026,
    currentDay: 1,
    days: {
      '1': getEmptyDayData()
    }
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
};

// Load all data from localStorage
export const loadData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return initializeStorage();
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading data:', error);
    return initializeStorage();
  }
};

// Save all data to localStorage
export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Get data for a specific day
export const getDayData = (allData, dayNumber) => {
  if (!allData.days[dayNumber]) {
    allData.days[dayNumber] = getEmptyDayData();
  }
  return allData.days[dayNumber];
};

// Update data for a specific day
export const updateDayData = (allData, dayNumber, updatedDayData) => {
  const newData = {
    ...allData,
    days: {
      ...allData.days,
      [dayNumber]: updatedDayData
    }
  };
  saveData(newData);
  return newData;
};
