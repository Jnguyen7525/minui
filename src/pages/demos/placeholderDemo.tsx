import { useState } from "react";
import Placeholder from "../../components/placeholder";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<div className="p-5 m-5 pb-10 rounded-lg text-center h-fit w-[500px] border shadow-lg flex flex-col justify-start items-center">
  <h2 className="text-xl font-bold mb-5">Placeholder</h2>
  <div className="flex flex-col space-y-4 w-full">
    <Placeholder className="bg-purple-300 rounded-lg w-full h-10" />
    <div className="flex flex-col space-y-2 w-full">
      <Placeholder className="rounded-lg bg-neutral-300 h-4 w-[75%]" />
      <Placeholder className="rounded-lg bg-neutral-300 h-4 w-[75%]" />
    </div>
    <div className="flex w-full justify-center">
      <Placeholder className="rounded-lg bg-blue-300 h-2 w-full" />
    </div>
  </div>
</div>
`;

const usageExample = `
import Placeholder from "@your-org/ui-kit";

function Example() {
  return (
    <div className="space-y-3">
      <Placeholder className="bg-purple-300 rounded h-10 w-full" />
      <Placeholder className="bg-neutral-300 rounded h-4 w-[75%]" />
    </div>
  );
}
`;

export default function PlaceholderDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Placeholder</h1>
      <p className="text-gray-600">
        A lightweight component for displaying placeholder shapes while content
        loads or initializes. Use it for layout scaffolding and loading
        indicators across UI surfaces.
      </p>

      {/* View Toggle */}
      <div className="flex space-x-4 font-semibold">
        {["preview", "code"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view as typeof activeView)}
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

      {/* Demo Section */}
      <div className="flex w-full items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="p-5 m-5 pb-10 rounded-lg text-center h-fit w-[500px] shadow-lg flex flex-col justify-start items-center">
            <div className="flex flex-col space-y-4 w-full">
              <Placeholder className="bg-purple-300 rounded-lg w-full h-10" />
              <div className="flex flex-col space-y-2 w-full">
                <Placeholder className="rounded-lg bg-neutral-300 h-4 w-[75%]" />
                <Placeholder className="rounded-lg bg-neutral-300 h-4 w-[75%]" />
              </div>
              <div className="flex w-full justify-center">
                <Placeholder className="rounded-lg bg-blue-300 h-2 w-full" />
              </div>
            </div>
          </div>
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
          {Object.entries(installCommands).map(([tool]) => (
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
        <div className="bg-stone-900 px-4 py-2 rounded text-white text-sm">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Section */}
      <div className="flex flex-col space-y-5 font-semibold">
        <span className="text-xl">Usage</span>
        <div className="bg-stone-900 p-5 rounded text-white">
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
