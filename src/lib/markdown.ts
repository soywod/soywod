function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function inline(source: string): string {
  return escapeHtml(source.replace(/\s*\n\s*/g, " "))
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

export function markdown(source: string): string {
  return source
    .trim()
    .split(/\n\s*\n/)
    .map(paragraph => `<p>${inline(paragraph)}</p>`)
    .join("");
}

export function rich(source: string): { __html: string } {
  return { __html: inline(source) };
}
