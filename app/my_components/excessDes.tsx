"use client";

import { useState } from "react";

export default function ExcessDes({
  description,
  maxLength,
}: {
  description: string;
  maxLength: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const displayText = expanded
    ? description
    : description.slice(0, maxLength) +
      (description.length > maxLength ? "..." : "");
  return (
    <>
      <p className="text-black/80 dark:text-white/80 leading-5 text-sm">
        {displayText + " "}
        {description.length > maxLength && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="hover:underline font-semibold text-black dark:text-white"
          >
            {expanded ? "Show less" : "View more"}
          </button>
        )}
      </p>
    </>
  );
}
