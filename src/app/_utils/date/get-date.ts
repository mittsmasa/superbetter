export const getTodaysEnd = (now: Date) => {
  const deadline = new Date(now);
  deadline.setHours(23, 59, 59);
  return deadline;
};
export const getTodaysStart = (now: Date) => {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return today;
};
export const getTomorrowsStart = (now: Date) => {
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};
