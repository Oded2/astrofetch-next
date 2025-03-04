import { invalidDates, minDate } from "./constants";

const safeDate = new Date();
safeDate.setMinutes(safeDate.getMinutes() + safeDate.getTimezoneOffset() - 60);

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

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function validateDates(from: Date, to: Date): [number, string] {
  const tempFrom = new Date(from);
  const tempTo = new Date(to);
  [tempFrom, tempTo].forEach((date) => date.setHours(0, 0, 0, 0));
  // Returns 200 and an empty string if valid
  if (tempFrom < minDate) return [400, "Start date is too early"];
  if (tempTo > new Date()) return [400, "End date cannot be in the future"];
  if (tempFrom > tempTo) return [400, "Start date cannot be after end date"];
  if (invalidDates.some((date) => isSameDay(tempFrom, date)))
    return [422, "Start date is invalid"];
  if (
    !isSameDay(tempFrom, tempTo) &&
    invalidDates.some((date) => isSameDay(tempTo, date))
  )
    return [422, "End date is invalid"];
  if (tempTo > safeDate) return [425, "Today's APOD isn't available yet"];
  return [200, ""]; // OK
}
