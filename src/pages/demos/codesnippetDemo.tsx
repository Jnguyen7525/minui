import { useState } from "react";
import CodeSnippet from "../../components/codesnippet";
import ScrollBox from "../../components/scrollbox";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<CodeSnippet
  code={\`
    import { useState } from "react";

    function Counter() {
      const [count, setCount] = useState(0);

      return (
        <div className="p-4 rounded bg-gray-900 text-white">
          <p>Count: {count}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="mt-2 px-4 py-1 bg-blue-600 rounded"
          >
            Increment
          </button>
        </div>
      );
    }
  \`}
  className="p-5"
/>
`;

const usageExample = `
import { CodeSnippet } from "@your-org/ui-kit";

function Example() {
  const code = \`
    const greet = (name) => \\\`Hello, \\\${name}!\\\`;
    console.log(greet("coffeeui"));
  \`;

  return (
    <div className="bg-stone-900 p-4 rounded-lg">
      <CodeSnippet code={code} />
    </div>
  );
}
`;

export default function CodeSnippetDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Code Snippet</h1>
      <p className="text-gray-600">
        CodeSnippet displays styled code blocks with syntax highlighting.
        Supports multiline formatting, inline color cues, and scrollable
        containers to accommodate long code.
      </p>

      {/* View Switcher */}
      <div className="flex space-x-4 font-semibold">
        {["preview", "code"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view as "preview" | "code")}
            className={`capitalize hover:cursor-pointer ${
              activeView === view
                ? "text-white bg-stone-600 px-3 py-1 rounded"
                : "text-gray-500 hover:text-stone-600"
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Demo Area */}
      <div className="flex w-full items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <ScrollBox height="300px" className="bg-stone-900 rounded-lg w-full">
            <CodeSnippet code={codeExample} className="p-5" />
          </ScrollBox>
        ) : (
          <div className="flex w-full h-[400px] bg-stone-900 rounded-lg ">
            <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
              <CodeSnippet code={codeExample} className="p-5" />
            </ScrollBox>
          </div>
        )}
      </div>

      {/* Installation Section */}
      <div className="flex flex-col space-y-4 font-semibold">
        <span className="text-xl">Installation</span>
        <div className="flex space-x-4">
          {Object.keys(installCommands).map((tool) => (
            <button
              key={tool}
              onClick={() =>
                setActiveTool(tool as keyof typeof installCommands)
              }
              className={`hover:cursor-pointer px-3 py-1 rounded ${
                activeTool === tool
                  ? "text-white bg-stone-600"
                  : "text-gray-500 hover:text-stone-600"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
        <div className="flex w-full bg-stone-900 rounded-lg px-4 py-2 text-white text-sm">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Section */}
      <div className="flex flex-col space-y-5 font-semibold">
        <span className="text-xl">Usage</span>
        <div className="flex w-full bg-stone-900 rounded-lg p-5 text-white">
          <ScrollBox className="w-full">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
