import { useState } from "react";
import Popover from "../../components/popover";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
  const [isTopPopoverOpen, setIsTopPopoverOpen] = useState(false);
  const [isRightPopoverOpen, setIsRightPopoverOpen] = useState(false);
  const [isLeftPopoverOpen, setIsLeftPopoverOpen] = useState(false);
  const [isBottomPopoverOpen, setIsBottomPopoverOpen] = useState(false);

  <div className="flex space-x-5 justify-between">
    <Popover
      placement="top"
      content="Top popover"
      isOpen={isTopPopoverOpen}
      onToggle={setIsTopPopoverOpen}
      className="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
      trigger={<button className="bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">Top</button>}
    />
    <Popover
      placement="right"
      content="Right popover"
      isOpen={isRightPopoverOpen}
      onToggle={setIsRightPopoverOpen}
      className="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
      trigger={<button className="bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">Right</button>}
    />
    <Popover
      placement="bottom"
      content="Bottom popover"
      isOpen={isBottomPopoverOpen}
      onToggle={setIsBottomPopoverOpen}
      className="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
      trigger={<button className="bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">Bottom</button>}
    />
    <Popover
      placement="left"
      content="Left popover"
      isOpen={isLeftPopoverOpen}
      onToggle={setIsLeftPopoverOpen}
      className="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
      trigger={<button className="bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">Left</button>}
    />
  </div>

`;

const usageExample = `
import Popover from "@your-org/ui-kit";
import { useState } from "react";

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      placement="top"
      content="Popover content"
      isOpen={isOpen}
      onToggle={setIsOpen}
      className="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
      trigger={<button className="bg-gray-800 text-white border px-4 py-2 rounded">Open</button>}
    />
  );
}
`;

export default function PopoverDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  const [isTopPopoverOpen, setIsTopPopoverOpen] = useState(false);
  const [isRightPopoverOpen, setIsRightPopoverOpen] = useState(false);
  const [isBottomPopoverOpen, setIsBottomPopoverOpen] = useState(false);
  const [isLeftPopoverOpen, setIsLeftPopoverOpen] = useState(false);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Popover</h1>
      <p className="text-gray-600">
        A floating content panel anchored to a trigger element. Supports dynamic
        placement and custom styling, ideal for tooltips, menus, or rich
        overlays.
      </p>

      {/* View toggle */}
      <div className="flex space-x-4 font-semibold">
        {["preview", "code"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view as "preview" | "code")}
            className={`capitalize px-3 py-1 rounded hover:cursor-pointer ${
              activeView === view
                ? "bg-stone-600 text-white"
                : "text-gray-500 hover:text-stone-600"
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Demo Panel */}
      <div className="flex w-full justify-center items-center border border-stone-600 rounded-lg bg-black text-white p-6">
        {activeView === "preview" ? (
          <div className="flex space-x-5  p-10">
            <Popover
              placement="top"
              content="Top popover"
              isOpen={isTopPopoverOpen}
              onToggle={setIsTopPopoverOpen}
              className="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
              trigger={
                <button className="hover:cursor-pointer bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">
                  Top
                </button>
              }
            />
            <Popover
              placement="right"
              content="Right popover"
              isOpen={isRightPopoverOpen}
              onToggle={setIsRightPopoverOpen}
              className="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
              trigger={
                <button className="hover:cursor-pointer bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">
                  Right
                </button>
              }
            />
            <Popover
              placement="bottom"
              content="Bottom popover"
              isOpen={isBottomPopoverOpen}
              onToggle={setIsBottomPopoverOpen}
              className="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
              trigger={
                <button className="hover:cursor-pointer bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">
                  Bottom
                </button>
              }
            />
            <Popover
              placement="left"
              content="Left popover"
              isOpen={isLeftPopoverOpen}
              onToggle={setIsLeftPopoverOpen}
              className="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
              trigger={
                <button className="hover:cursor-pointer bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">
                  Left
                </button>
              }
            />
          </div>
        ) : (
          <div className="flex w-full h-[400px] bg-stone-900 rounded-lg ">
            <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
              <CodeSnippet code={codeExample} className="p-5" />
            </ScrollBox>
          </div>
        )}
      </div>

      {/* Install Section */}
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
