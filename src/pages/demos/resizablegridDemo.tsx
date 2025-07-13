import { useState } from "react";
import {
  ResizableGridProvider,
  GridPanel,
} from "../../components/resizablegrid";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<div className="rounded-lg text-center h-[800px] w-full border shadow-lg flex flex-col justify-start items-center m-5 p-5">
  <div className="flex w-full h-full relative">
    <ResizableGridProvider rows={2} cols={2}>
      <GridPanel row={0} col={0}>Top Left</GridPanel>
      <GridPanel row={0} col={1}>Top Right</GridPanel>
      <GridPanel row={1} col={0}>Bottom Left</GridPanel>
      <GridPanel row={1} col={1}>Bottom Right</GridPanel>
    </ResizableGridProvider>
  </div>
</div>
`;

const usageExample = `
import { ResizableGridProvider, GridPanel } from "@your-org/ui-kit";

function Example() {
  return (
    <ResizableGridProvider rows={2} cols={2}>
      <GridPanel row={0} col={0}>Top Left</GridPanel>
      <GridPanel row={0} col={1}>Top Right</GridPanel>
      <GridPanel row={1} col={0}>Bottom Left</GridPanel>
      <GridPanel row={1} col={1}>Bottom Right</GridPanel>
    </ResizableGridProvider>
  );
}
`;

export default function ResizableGridDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Resizable Grid</h1>
      <p className="text-gray-600">
        A grid layout with draggable resizing across both rows and columns.
        Useful for dashboards, split editing interfaces, and design tools.
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

      {/* Demo Section */}
      <div className="">
        {activeView === "preview" ? (
          <div className="rounded-lg text-center h-[800px] w-full border shadow-lg flex">
            <div className="flex w-full h-full relative">
              <ResizableGridProvider rows={2} cols={2}>
                <GridPanel row={0} col={0}>
                  Top Left
                </GridPanel>
                <GridPanel row={0} col={1}>
                  Top Right
                </GridPanel>
                <GridPanel row={1} col={0}>
                  Bottom Left
                </GridPanel>
                <GridPanel row={1} col={1}>
                  Bottom Right
                </GridPanel>
              </ResizableGridProvider>
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
        <div className="bg-stone-900 px-4 py-2 text-white text-sm rounded-lg">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Section */}
      <div className="flex flex-col space-y-5 font-semibold">
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
