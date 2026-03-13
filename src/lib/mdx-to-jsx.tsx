import React from "react";
import Link from "next/link";

/**
 * Converts MDX/Markdown content string into React elements.
 * Handles headings, paragraphs, bold, italic, links, lists, hr.
 * No dangerouslySetInnerHTML used.
 */

function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Patterns: **bold**, *italic*, [text](href)
  const inlineRe = /(\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] !== undefined) {
      // **bold**
      nodes.push(<strong key={`${keyPrefix}-b-${match.index}`}>{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      // *italic*
      nodes.push(<em key={`${keyPrefix}-i-${match.index}`}>{match[3]}</em>);
    } else if (match[4] !== undefined && match[5] !== undefined) {
      // [text](href)
      const href = match[5];
      const isInternal = href.startsWith("/");
      nodes.push(
        isInternal ? (
          <Link
            key={`${keyPrefix}-a-${match.index}`}
            href={href}
            className="text-blue-700 hover:text-blue-900 underline underline-offset-2 transition"
          >
            {match[4]}
          </Link>
        ) : (
          <a
            key={`${keyPrefix}-a-${match.index}`}
            href={href}
            className="text-blue-700 hover:text-blue-900 underline underline-offset-2 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[4]}
          </a>
        )
      );
    }

    lastIndex = inlineRe.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // HR
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={`hr-${i}`} className="my-8 border-t border-gray-200" />);
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      const text = line.slice(3);
      elements.push(
        <h2 key={`h2-${i}`} className="text-2xl font-bold font-display text-gray-900 mt-10 mb-4">
          {parseInline(text, `h2-${i}`)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      const text = line.slice(4);
      elements.push(
        <h3 key={`h3-${i}`} className="text-xl font-bold font-display text-gray-900 mt-8 mb-3">
          {parseInline(text, `h3-${i}`)}
        </h3>
      );
      i++;
      continue;
    }

    // H4
    if (line.startsWith("#### ")) {
      const text = line.slice(5);
      elements.push(
        <h4 key={`h4-${i}`} className="text-lg font-semibold text-gray-900 mt-6 mb-2">
          {parseInline(text, `h4-${i}`)}
        </h4>
      );
      i++;
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(
          <li key={`li-${i}`} className="mb-1">
            {parseInline(lines[i].slice(2), `li-${i}`)}
          </li>
        );
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-outside ml-5 my-4 space-y-1 text-gray-700">
          {items}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        const text = lines[i].replace(/^\d+\.\s/, "");
        items.push(
          <li key={`oli-${i}`} className="mb-1">
            {parseInline(text, `oli-${i}`)}
          </li>
        );
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-outside ml-5 my-4 space-y-1 text-gray-700">
          {items}
        </ol>
      );
      continue;
    }

    // Regular paragraph — collect continuation lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("## ") &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("#### ") &&
      !lines[i].startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      const text = paraLines.join(" ");
      elements.push(
        <p key={`p-${i}`} className="text-gray-700 leading-relaxed mb-5">
          {parseInline(text, `p-${i}`)}
        </p>
      );
    }
  }

  return elements;
}
