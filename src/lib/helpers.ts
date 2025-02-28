export function getEnv(key: string) {
  return process.env[key];
}

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

export function validateDates(from: Date, to: Date): string {
  // Returns an empty string if valid
  const difference = to.getTime() - from.getTime();
  if (difference < 0) return "Start date cannot be after end date";
  if (to.getFullYear() - from.getFullYear() > 1)
    return "Date range must be less than 2 years";
  return "";
}
