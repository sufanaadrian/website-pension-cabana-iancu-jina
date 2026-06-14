import { Fragment } from "react";

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.+?\*\*|\*.+?\*|_.+?_)/g);
  return parts.map((part, i) => {
    if (/^\*\*.+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^\*.+\*$/.test(part)) return <em key={i}>{part.slice(1, -1)}</em>;
    if (/^_.+_$/.test(part)) return <em key={i}>{part.slice(1, -1)}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

// Removes bold/italic markdown markers — use for plain-text contexts (page
// titles, meta descriptions, alt text, aria-labels) where the raw ** / * / _
// characters would otherwise be visible to the user.
export function stripMarkdown(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/_(.+?)_/g, "$1");
}

// Renders a single line of text with bold/italic emphasis only — safe to use
// inside headings, labels, or any inline context where a wrapping <div>/<p>
// (as RichText produces) isn't valid.
export function RichInline({ text }: { text?: string }) {
  if (!text) return null;
  return <>{renderInline(text)}</>;
}

// Renders a small markdown-like subset: bold/italic emphasis, "- " bullet
// lists, "## " / "### " larger text, blank line = new paragraph, single
// newline = line break.
export function RichText({ text, className }: { text?: string; className?: string }) {
  if (!text) return null;

  const blocks = text.split(/\n{2,}/);

  return (
    <div className={className}>
      {blocks.map((block, bi) => {
        const lines = block.split("\n").filter((l) => l.trim() !== "");
        if (lines.length === 0) return null;

        if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
          return (
            <ul key={bi} className="list-disc pl-5 space-y-1 mb-3 last:mb-0">
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.replace(/^\s*[-*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }

        const headingMatch = lines.length === 1 ? lines[0].match(/^(#{2,3})\s+(.*)/) : null;
        if (headingMatch) {
          const sizeCls = headingMatch[1].length === 2 ? "text-lg font-semibold" : "text-base font-semibold";
          return (
            <p key={bi} className={`${sizeCls} mb-3 last:mb-0`}>
              {renderInline(headingMatch[2])}
            </p>
          );
        }

        return (
          <p key={bi} className="mb-3 last:mb-0">
            {lines.map((l, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {renderInline(l)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
