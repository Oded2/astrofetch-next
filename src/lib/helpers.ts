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

export function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}
