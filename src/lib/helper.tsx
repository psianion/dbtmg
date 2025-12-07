// @ts-nocheck
import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const RichTextOrString = ({ value, options, className = "" }) => {
  if (!value) return null;

  // If Contentful rich text (JSON), use existing renderer
  if (typeof value !== "string") {
    return (
      <div className={className}>
        {documentToReactComponents(value, options)}
      </div>
    );
  }

  // Normalize line breaks
  const normalized = value.replace(/\r\n/g, "\n").replace(/\\n/g, "\n");

  // Split by blank lines (paragraphs or headings)
  const blocks = normalized.split(/\n\s*\n/);

  const isHeading = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return false;

    // heuristic:
    return (
      trimmed.length < 100 && // short enough
      /^[A-Z]/.test(trimmed) && // starts with capital letter
      !/[.!?]$/.test(trimmed) // does NOT end with a period
    );
  };

  return (
    <div className={className}>
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        if (isHeading(trimmed)) {
          return (
            <h2 key={i} className="text-2xl font-semibold mt-6 mb-3">
              {trimmed}
            </h2>
          );
        }

        return (
          <p key={i} className="mb-6 leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
};
