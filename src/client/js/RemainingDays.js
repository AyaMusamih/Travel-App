const countDaysUntil = (date) => {
  const now = Date.now();
  const futureDate = new Date(date).getTime();
  
  const millisecondsInADay = 86400000; // 1000 * 60 * 60 * 24
  const remainingMilliseconds = futureDate - now;

  return Math.floor(remainingMilliseconds / millisecondsInADay);
};

export { countDaysUntil };
