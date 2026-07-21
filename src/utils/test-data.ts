export function uniqueGroupName(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}
