export function getEnv(key: string) {
  return process.env[key];
}

export function addParams(
  link: string,
  params: Record<string, string>,
  origin: string = ""
): string {
  // Adds URL parameters to a URL
  // If an origin is proved, then the url will be modified to include the origin
  const url: URL = new URL(origin.length > 0 ? origin + link : link);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}
