export function cleanRecipeSummary(summary: string): string {
  const textOnly = summary.replace(/<[^>]*>/g, "");

  return textOnly;
}
