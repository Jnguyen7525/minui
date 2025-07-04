import type { JSX } from "react";

// src/components/CodeSnippet.tsx
type CodeSnippetProps = {
  code: string;
};

export default function CodeSnippet({ code }: CodeSnippetProps) {
  const lines = code.trim().split("\n");

  return (
    <div className="bg-stone-900 rounded-lg p-6 text-sm font-mono text-white overflow-auto">
      <pre>
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {highlightLine(line)}
          </div>
        ))}
      </pre>
    </div>
  );
}

// 🧠 Basic JSX-aware syntax highlighting
function highlightLine(line: string): JSX.Element {
  // const segments = line.split(/(\s+|<|>|\/|=|".*?"|'.*?')/g);
  // const segments = line.split(/(\s+|<\/|<|>|\/|=|".*?"|'.*?')/g);
  const segments = line.split(/(\s+|<\/|<|>|\/|=|,|\[|\]|\(|\)|".*?"|'.*?')/g);

  return (
    <>
      {segments.map((seg, i) => {
        let color = "";

        if (seg === "<" || seg === ">" || seg === "</") {
          color = "text-purple-400";
        } else if (seg === "/" || seg === "=") {
          color = "text-gray-400";
        } else if (/^["'].*["']$/.test(seg)) {
          color = "text-yellow-300";
        }

        // else if (
        //   /^Accordion.*|AccordionItem.*|Button.*|Alert.*|Toast.*$/.test(seg)
        // ) {
        //   color = "text-blue-300";

        // }

        // Highlight JSX tag names between < and > or </ and >
        if (
          /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(seg) &&
          (segments[i - 1] === "<" || segments[i - 1] === "</")
        ) {
          color = "text-blue-300";
        } else if (/^(import|from|function|return|const)$/.test(seg)) {
          color = "text-green-400";
        }

        // Keywords and declarations
        else if (/^(const|let|var|export|type)$/.test(seg)) {
          color = "text-green-400";
        }
        // Object keys (we assume camelCase or kebab-case)
        else if (/^[a-zA-Z0-9_-]+:$/.test(seg)) {
          color = "text-pink-400";
        }
        // Assignment operator
        else if (seg === "=" || seg === ":") {
          color = "text-gray-400";
        }
        // Strings
        else if (/^["'][^"']*["']$/.test(seg)) {
          color = "text-yellow-300";
        }

        // Find index of declaration keyword in current line
        const declarationIndex = segments.findIndex((seg) =>
          /^(const|let|var)$/.test(seg)
        );

        // Find index of first "=" after the declaration
        const assignmentIndex = segments.findIndex(
          (seg, i) => i > declarationIndex && seg === "="
        );

        // Highlight all identifiers between declaration and assignment
        if (
          /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(seg) &&
          declarationIndex !== -1 &&
          assignmentIndex !== -1 &&
          i > declarationIndex &&
          i < assignmentIndex
        ) {
          color = "text-cyan-400";
        }

        // Highlight attribute names (if followed by "=")
        if (segments[i + 1] === "=" && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(seg)) {
          color = "text-purple-300"; // or any color you prefer
        }

        return (
          <span key={i} className={`${color}`}>
            {seg}
          </span>
        );
      })}
    </>
  );
}
