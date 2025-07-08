import type { JSX } from "react";

type CodeSnippetProps = {
  code: string;
  className?: string;
};

export default function CodeSnippet({ code, className }: CodeSnippetProps) {
  const lines = code.trim().split("\n");

  return (
    <div className={`${className} text-sm font-mono`}>
      <pre className="whitespace-pre leading-relaxed ">
        {lines.map((line, i) => (
          <code key={i} className="block">
            {highlightLine(line)}
          </code>
        ))}
      </pre>
    </div>
  );
}

function highlightLine(line: string): JSX.Element {
  const segments = line.split(/(\s+|<\/|<|>|\/|=|,|\[|\]|\(|\)|".*?"|'.*?')/g);

  return (
    <>
      {segments.map((seg, i) => {
        let color = "";

        if (seg === "<" || seg === ">" || seg === "</")
          color = "text-purple-400";
        else if (seg === "/" || seg === "=" || seg === ":")
          color = "text-gray-400";
        else if (/^["'].*["']$/.test(seg)) color = "text-yellow-300";
        else if (
          /^(import|from|function|return|const|let|var|export|type)$/.test(seg)
        )
          color = "text-green-400";
        else if (/^[a-zA-Z0-9_-]+:$/.test(seg)) color = "text-pink-400";
        else if (
          /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(seg) &&
          (segments[i - 1] === "<" || segments[i - 1] === "</")
        )
          color = "text-blue-300";
        else if (
          segments[i + 1] === "=" &&
          /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(seg)
        )
          color = "text-purple-300";

        // Variable name after declaration keyword
        const declarationIndex = segments.findIndex((seg) =>
          /^(const|let|var)$/.test(seg)
        );
        const assignmentIndex = segments.findIndex(
          (seg, j) => j > declarationIndex && seg === "="
        );
        if (
          /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(seg) &&
          declarationIndex !== -1 &&
          assignmentIndex !== -1 &&
          i > declarationIndex &&
          i < assignmentIndex
        )
          color = "text-cyan-400";

        return (
          <span key={i} className={`${color}`}>
            {seg}
          </span>
        );
      })}
    </>
  );
}
