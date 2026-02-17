// Helper function to update global Quran progress
export const updateQuranGlobalState = (allData, dayNumber, updatedDayData) => {
  // Calculate cumulative pages read from all days
  let totalPagesRead = 0;
  let currentPage = 2;
  let khatamCount = 0;

  // Sort day keys to ensure chronological order
  const dayKeys = Object.keys(allData.days).map(Number).sort((a, b) => a - b);
  
  dayKeys.forEach((key) => {
    const day = key === dayNumber ? updatedDayData : allData.days[key];
    if (day.quran && day.quran.pagesRead > 0) {
      totalPagesRead += day.quran.pagesRead;
    }
  });

  // Calculate current page and khatam count
  currentPage = 2 + (totalPagesRead % 610);
  khatamCount = Math.floor(totalPagesRead / 610);

  // If we've reached exactly 612, we're at the start of next Khatam
  if (currentPage > 612) {
    currentPage = 2 + ((totalPagesRead - 610) % 610);
  }

  // Update all days with global state
  const updatedDays = { ...allData.days };
  Object.keys(updatedDays).forEach((key) => {
    if (updatedDays[key].quran) {
      updatedDays[key].quran.totalPagesRead = totalPagesRead;
      updatedDays[key].quran.currentPage = currentPage;
      updatedDays[key].quran.khatamCount = khatamCount;
    }
  });

  return {
    ...allData,
    days: updatedDays
  };
};
