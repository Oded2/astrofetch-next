import { invalidDates, minDate } from "./constants";

export function addParams(
  link: string,
  params: Record<string, string>
): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  return `${link}?${searchParams.toString()}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateISO(date: Date): string {
  return `${date.getFullYear().toString()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function createSafeDate(value?: number | string | Date): Date {
  const date = value ? new Date(value) : new Date();
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset() - 60);
  return date;
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function validateDates(from: Date, to: Date): string {
  // Returns an empty string if valid
  if (from < minDate) return "Start date is too early";
  if (to > new Date()) return "End date cannot be in the future";
  if (from > to) return "Start date cannot be after end date";
  if (invalidDates.some((date) => isSameDay(from, date)))
    return "Start date is invalid";
  if (!isSameDay(from, to) && invalidDates.some((date) => isSameDay(to, date)))
    return "End date is invalid";
  if (to.getFullYear() - from.getFullYear() > 1)
    return "Date range must be less than 2 years";
  if (to > createSafeDate()) return "Today's APOD isn't available yet";
  return "";
}
