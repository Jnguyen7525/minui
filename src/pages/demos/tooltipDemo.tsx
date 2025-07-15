import { useState } from "react";
import Tooltip from "../../components/tooltip";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
  <div className="flex space-x-5 relative w-full">
    <Tooltip
      content="Tooltip on top"
      placement="top"
      offset={15}
      triggerContent={
        <span className="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer">
          Top
        </span>
      }
      className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
    />
    <Tooltip
      content="Tooltip on bottom"
      placement="bottom"
      offset={15}
      triggerContent={
        <span className="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer">
          Bottom
        </span>
      }
      className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
    />
    <Tooltip
      content="Tooltip on right"
      placement="right"
      offset={15}
      triggerContent={
        <span className="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer">
          Right
        </span>
      }
      className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
    />
    <Tooltip
      content="Tooltip on left"
      placement="left"
      offset={15}
      triggerContent={
        <span className="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer">
          Left
        </span>
      }
      className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
    />
  </div>
</div>
`;

const usageExample = `
import Tooltip from "@your-org/ui-kit";

function Example() {
  return (
    <Tooltip
      content="Click to submit"
      placement="top"
      triggerContent={
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      }
      className="bg-black text-white px-2 py-1 rounded shadow-lg"
    />
  );
}
`;

export default function TooltipDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-6 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Tooltip</h1>
      <p className="text-gray-600">
        A lightweight contextual UI element that displays info when hovering
        over or interacting with a trigger. Supports directional placement and
        custom styling.
      </p>

      {/* Toggle */}
      <div className="flex space-x-4 font-semibold">
        {["preview", "code"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view as "preview" | "code")}
            className={`capitalize px-3 py-1 rounded ${
              activeView === view
                ? "bg-stone-600 text-white"
                : "text-gray-500 hover:text-stone-600"
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Preview/Code Section */}
      <div className="border border-stone-600 rounded-lg bg-black text-white p-6 flex justify-center">
        {activeView === "preview" ? (
          <div className="p-10 ">
            <div className="flex space-x-5 relative w-full">
              <Tooltip
                content="Tooltip on top"
                placement="top"
                offset={15}
                triggerContent={
                  <span className="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer">
                    Top
                  </span>
                }
                className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
              />
              <Tooltip
                content="Tooltip on bottom"
                placement="bottom"
                offset={15}
                triggerContent={
                  <span className="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer">
                    Bottom
                  </span>
                }
                className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
              />
              <Tooltip
                content="Tooltip on right"
                placement="right"
                offset={15}
                triggerContent={
                  <span className="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer">
                    Right
                  </span>
                }
                className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
              />
              <Tooltip
                content="Tooltip on left"
                placement="left"
                offset={15}
                triggerContent={
                  <span className="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer">
                    Left
                  </span>
                }
                className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
              />
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

      {/* Installation */}
      <div className="flex flex-col space-y-4 font-semibold">
        <span className="text-xl">Installation</span>
        <div className="flex space-x-4">
          {Object.entries(installCommands).map(([tool]) => (
            <button
              key={tool}
              onClick={() =>
                setActiveTool(tool as keyof typeof installCommands)
              }
              className={`px-3 py-1 rounded ${
                activeTool === tool
                  ? "bg-stone-600 text-white"
                  : "text-gray-500 hover:text-stone-600"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
        <div className="bg-stone-900 text-white text-sm px-4 py-2 rounded">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Section */}
      <div className="flex flex-col space-y-6 font-semibold">
        <span className="text-xl">Usage</span>
        <div className="bg-stone-900 p-5 rounded-lg text-white">
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
