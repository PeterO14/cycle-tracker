import { Period } from '../types/cycle';

const dayInMilliseconds = 24 * 60 * 60 * 1000;

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function fromDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function daysBetween(from: string, to: string) {
  const fromDate = fromDateKey(from);
  const toDate = fromDateKey(to);
  return Math.round((toDate.getTime() - fromDate.getTime()) / dayInMilliseconds);
}

export function formatDate(dateKey: string) {
  return fromDateKey(dateKey).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatMonth(date: Date) {
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

export function orderedPeriods(periods: Period[]) {
  return [...periods].sort((first, second) => second.startDate.localeCompare(first.startDate));
}

export function latestPeriod(periods: Period[]) {
  return orderedPeriods(periods)[0];
}

export function averageCycleLength(periods: Period[], preferredLength?: number) {
  if (preferredLength) return preferredLength;

  const starts = orderedPeriods(periods).map((period) => period.startDate);
  if (starts.length < 2) return undefined;

  const lengths = starts.slice(0, -1).map((start, index) => daysBetween(starts[index + 1], start));
  return Math.round(lengths.reduce((total, length) => total + length, 0) / lengths.length);
}

export function addDays(dateKey: string, days: number) {
  const date = fromDateKey(dateKey);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

export function isDateInPeriod(period: Period, dateKey: string, todayKey: string) {
  const endDate = period.endDate ?? todayKey;
  return dateKey >= period.startDate && dateKey <= endDate;
}
