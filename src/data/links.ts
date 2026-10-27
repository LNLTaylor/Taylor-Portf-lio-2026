export const baseUrl = import.meta.env.BASE_URL;

export function localUrl(path: string): string {
  const cleanPath = path.replace(/^\/+/, "");
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}${cleanPath}`;
}

export function mediaUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (/^(https?:)?\/\//.test(path)) return path;
  return localUrl(path);
}
