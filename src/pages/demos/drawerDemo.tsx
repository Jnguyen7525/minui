import { useState } from "react";
import { XCircle } from "lucide-react";
import Drawer from "../../components/drawer";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
  <div className="flex space-x-3">
    <button onClick={() => setIsLeftDrawerOpen(true)} className="bg-blue-500 text-white px-3 py-2 rounded">Open Left Drawer</button>
    <Drawer isOpen={isLeftDrawerOpen} placement="left" onClose={() => setIsLeftDrawerOpen(false)} className="bg-gray-800 p-5 rounded-lg border-r border-gray-400">
      <h2 className="text-xl font-semibold">Drawer Content</h2>
      <p>This is a fully functional, customizable drawer component!</p>
      <button onClick={() => setIsLeftDrawerOpen(false)} className="absolute top-0 right-0 text-white"><XCircle /></button>
    </Drawer>

    <button onClick={() => setIsRightDrawerOpen(true)} className="bg-blue-500 text-white px-3 py-2 rounded">Open Right Drawer</button>
    <Drawer isOpen={isRightDrawerOpen} placement="right" onClose={() => setIsRightDrawerOpen(false)} className="bg-gray-800 p-5 rounded-lg border-l border-gray-400">
      <h2 className="text-xl font-semibold">Drawer Content</h2>
      <p>This is a fully functional, customizable drawer component!</p>
      <button onClick={() => setIsRightDrawerOpen(false)} className="absolute top-0 right-0 text-white"><XCircle /></button>
    </Drawer>

    <button onClick={() => setIsTopDrawerOpen(true)} className="bg-blue-500 text-white px-3 py-2 rounded">Open Top Drawer</button>
    <Drawer isOpen={isTopDrawerOpen} placement="top" onClose={() => setIsTopDrawerOpen(false)} className="bg-gray-800 p-5 rounded-lg border-b border-gray-400">
      <h2 className="text-xl font-semibold">Drawer Content</h2>
      <p>This is a fully functional, customizable drawer component!</p>
      <button onClick={() => setIsTopDrawerOpen(false)} className="absolute top-0 right-0 text-white"><XCircle /></button>
    </Drawer>

    <button onClick={() => setIsBottomDrawerOpen(true)} className="bg-blue-500 text-white px-3 py-2 rounded">Open Bottom Drawer</button>
    <Drawer isOpen={isBottomDrawerOpen} placement="bottom" onClose={() => setIsBottomDrawerOpen(false)} className="bg-gray-800 p-5 rounded-lg border-t border-gray-400">
      <h2 className="text-xl font-semibold">Drawer Content</h2>
      <p>This is a fully functional, customizable drawer component!</p>
      <button onClick={() => setIsBottomDrawerOpen(false)} className="absolute top-0 right-0 text-white"><XCircle /></button>
    </Drawer>
  </div>
`;

const usageExample = `
import Drawer from "@your-org/ui-kit";

function Example() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsDrawerOpen(true)} className="bg-blue-500 text-white px-3 py-2 rounded">Open Drawer</button>
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={() => setIsDrawerOpen(false)}
        className="bg-gray-800 p-5 rounded-lg border-r border-gray-400"
      >
        <h2 className="text-xl font-semibold">Drawer Content</h2>
        <p>This is a fully functional, customizable drawer component!</p>
      </Drawer>
    </>
  );
}
`;

export default function DrawerDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isTopDrawerOpen, setIsTopDrawerOpen] = useState(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Drawer</h1>
      <p className="text-gray-600">
        A flexible sliding panel that can appear from any edge of the screen.
        Supports left, right, top, and bottom placements with full
        customization.
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
          <div className="p-5 m-5 pb-10 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setIsLeftDrawerOpen(true)}
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                Open Left
              </button>
              <button
                onClick={() => setIsRightDrawerOpen(true)}
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                Open Right
              </button>
              <button
                onClick={() => setIsTopDrawerOpen(true)}
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                Open Top
              </button>
              <button
                onClick={() => setIsBottomDrawerOpen(true)}
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                Open Bottom
              </button>
            </div>

            <Drawer
              isOpen={isLeftDrawerOpen}
              placement="left"
              onClose={() => setIsLeftDrawerOpen(false)}
              className="bg-gray-800 p-5 rounded-lg border-r border-gray-400"
            >
              <h2 className="text-xl font-semibold">Drawer Content</h2>
              <p>This is a fully functional, customizable drawer component!</p>
              <button
                onClick={() => setIsLeftDrawerOpen(false)}
                className="absolute top-0 right-0 text-white"
              >
                <XCircle />
              </button>
            </Drawer>

            <Drawer
              isOpen={isRightDrawerOpen}
              placement="right"
              onClose={() => setIsRightDrawerOpen(false)}
              className="bg-gray-800 p-5 rounded-lg border-l border-gray-400"
            >
              <h2 className="text-xl font-semibold">Drawer Content</h2>
              <p>This is a fully functional, customizable drawer component!</p>
              <button
                onClick={() => setIsRightDrawerOpen(false)}
                className="absolute top-0 right-0 text-white"
              >
                <XCircle />
              </button>
            </Drawer>

            <Drawer
              isOpen={isTopDrawerOpen}
              placement="top"
              onClose={() => setIsTopDrawerOpen(false)}
              className="bg-gray-800 p-5 rounded-lg border-b border-gray-400"
            >
              <h2 className="text-xl font-semibold">Drawer Content</h2>
              <p>This is a fully functional, customizable drawer component!</p>
              <button
                onClick={() => setIsTopDrawerOpen(false)}
                className="absolute top-0 right-0 text-white"
              >
                <XCircle />
              </button>
            </Drawer>

            <Drawer
              isOpen={isBottomDrawerOpen}
              placement="bottom"
              onClose={() => setIsBottomDrawerOpen(false)}
              className="bg-gray-800 p-5 rounded-lg border-t border-gray-400"
            >
              <h2 className="text-xl font-semibold">Drawer Content</h2>
              <p>This is a fully functional, customizable drawer component!</p>
              <button
                onClick={() => setIsBottomDrawerOpen(false)}
                className="absolute top-0 right-0 text-white"
              >
                <XCircle />
              </button>
            </Drawer>
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
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
