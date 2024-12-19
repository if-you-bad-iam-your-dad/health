export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

export const isToday = (date: string | Date): boolean => {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

export const getDaysDifference = (date: string | Date): number => {
  const d = new Date(date);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - d.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};