export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Use import.meta.env.BASE_URL which Vite provides
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
