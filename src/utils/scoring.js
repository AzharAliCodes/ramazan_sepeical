// Scoring weights for final performance calculation
export const WEIGHTS = {
  salah: 0.40,      // 40%
  quran: 0.20,      // 20%
  dhikr: 0.15,      // 15%
  discipline: 0.15, // 15%
  goodDeeds: 0.10   // 10%
  // gratitude: no weight (reflection only)
};

// Daily targets
export const TARGETS = {
  quranPages: 20,
  dhikr: {
    subhanallah: 300,
    alhamdulillah: 300,
    allahuAkbar: 300
  },
  maxScreenTime: 5 // hours
};

// Good deed points
export const DEED_POINTS = {
  small: 5,
  medium: 10,
  big: 20
};

// Calculate Salah score (0-100% max)
export const calculateSalahScore = (salah) => {
  const fardCount = [
    salah.fajr,
    salah.dhuhr,
    salah.asr,
    salah.maghrib,
    salah.isha
  ].filter(Boolean).length;
  
  // Fard prayers = 50% total (10% each)
  const fardPercentage = (fardCount / 5) * 50;
  
  // Extra salah bonus (max 50%)
  let bonus = 0;
  if (salah.tahajjud) bonus += 15;
  if (salah.duha) bonus += 10;
  
  // Taraweeh bonus based on rakaat count (up to 15% for 20 rakaat)
  const taraweehBonus = Math.min((salah.taraweeh || 0) / 20 * 15, 15);
  bonus += taraweehBonus;
  
  if (salah.witr) bonus += 5;
  
  // Sunnah rakaat bonus (up to 5% for 26 rakaat)
  const sunnahBonus = Math.min((salah.sunnahRakaat || 0) / 26 * 5, 5);
  bonus += sunnahBonus;
  
  // Total = Fard (50%) + Bonuses (max 50%) = max 100%
  return fardPercentage + bonus;
};

// Calculate Quran score (0-100%)
export const calculateQuranScore = (quran) => {
  const pages = quran.pagesRead || 0;
  // Prevent negative scores (when backward reading)
  const positivePages = Math.max(pages, 0);
  return Math.min((positivePages / TARGETS.quranPages) * 100, 100);
};

// Calculate Dhikr score (0-100%)
export const calculateDhikrScore = (dhikr) => {
  const subhanallahPercent = Math.min((dhikr.subhanallah || 0) / TARGETS.dhikr.subhanallah, 1);
  const alhamdulillahPercent = Math.min((dhikr.alhamdulillah || 0) / TARGETS.dhikr.alhamdulillah, 1);
  const allahuAkbarPercent = Math.min((dhikr.allahuAkbar || 0) / TARGETS.dhikr.allahuAkbar, 1);
  
  return ((subhanallahPercent + alhamdulillahPercent + allahuAkbarPercent) / 3) * 100;
};

// Calculate Discipline score (0-100%)
export const calculateDisciplineScore = (screenTime) => {
  if (screenTime <= 1) return 100;
  if (screenTime <= 2) return 85;
  if (screenTime <= 3) return 70;
  if (screenTime <= 4) return 50;
  return 25;
};

// Calculate Good Deeds score (0-100%)
export const calculateGoodDeedsScore = (goodDeeds) => {
  const totalPoints = goodDeeds.reduce((sum, deed) => {
    // Each good deed with content = 20 points
    if (deed && deed.trim()) return sum + 20;
    return sum;
  }, 0);
  
  // Max possible: 5 deeds = 100 points
  return Math.min((totalPoints / 100) * 100, 100);
};

// Calculate final weighted score
export const calculateFinalScore = (dailyData) => {
  const salahScore = calculateSalahScore(dailyData.salah);
  const quranScore = calculateQuranScore(dailyData.quran);
  const dhikrScore = calculateDhikrScore(dailyData.dhikr);
  const disciplineScore = calculateDisciplineScore(dailyData.discipline.screenTime);
  const goodDeedsScore = calculateGoodDeedsScore(dailyData.goodDeeds);
  
  const finalScore = 
    salahScore * WEIGHTS.salah +
    quranScore * WEIGHTS.quran +
    dhikrScore * WEIGHTS.dhikr +
    disciplineScore * WEIGHTS.discipline +
    goodDeedsScore * WEIGHTS.goodDeeds;
  
  return {
    salah: Math.round(salahScore),
    quran: Math.round(quranScore),
    dhikr: Math.round(dhikrScore),
    discipline: Math.round(disciplineScore),
    goodDeeds: Math.round(goodDeedsScore),
    final: Math.round(finalScore)
  };
};
