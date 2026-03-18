export function toSnakeCase(str: string): string {
  return str.trim().toLowerCase().replaceAll(/\s+/g, '_');
}
