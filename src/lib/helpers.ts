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
