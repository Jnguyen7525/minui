import { useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../../components/resizable";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<div className="rounded-lg text-center h-96 w-full">
  <ResizablePanelGroup direction="vertical" className="w-full border rounded-md" storageKey="my-layout">
    <ResizablePanel index={0}>
      <div className="flex justify-center items-center h-full p-6">Header</div>
    </ResizablePanel>
    <ResizableHandle index={0} />

    <ResizablePanel index={1}>
      <ResizablePanelGroup direction="horizontal" storageKey="nested-layout">
        <ResizablePanel index={0}>
          <div className="flex justify-center items-center w-full h-full p-6">Sidebar</div>
        </ResizablePanel>
        <ResizableHandle index={0} />
        <ResizablePanel index={1}>
          <div className="flex justify-center items-center w-full h-full p-6">Main Content</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
    <ResizableHandle index={1} />

    <ResizablePanel index={2}>
      <div className="flex justify-center items-center h-full p-6">Footer</div>
    </ResizablePanel>
  </ResizablePanelGroup>
</div>
`;

const usageExample = `
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@your-org/ui-kit";

function Example() {
  return (
    <ResizablePanelGroup direction="vertical" storageKey="my-layout">
      <ResizablePanel index={0}>Header</ResizablePanel>
      <ResizableHandle index={0} />
      <ResizablePanel index={1}>
        <ResizablePanelGroup direction="horizontal" storageKey="nested-layout">
          <ResizablePanel index={0}>Sidebar</ResizablePanel>
          <ResizableHandle index={0} />
          <ResizablePanel index={1}>Main</ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle index={1} />
      <ResizablePanel index={2}>Footer</ResizablePanel>
    </ResizablePanelGroup>
  );
}
`;

export default function ResizableDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Resizable Panels</h1>
      <p className="text-gray-600">
        A layout container that supports split panels with draggable resizing.
        Fully customizable for vertical, horizontal, and nested configurations.
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

      {/* Preview */}
      <div className="flex w-full justify-center border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="rounded-lg text-center h-96 w-full ">
            <ResizablePanelGroup
              direction="vertical"
              className="w-full border rounded-md"
              storageKey="my-layout"
            >
              <ResizablePanel index={0}>
                <div className="flex justify-center items-center h-full p-6">
                  Header
                </div>
              </ResizablePanel>
              <ResizableHandle index={0} />
              <ResizablePanel index={1}>
                <ResizablePanelGroup
                  direction="horizontal"
                  storageKey="nested-layout"
                >
                  <ResizablePanel index={0}>
                    <div className="flex justify-center items-center w-full h-full p-6">
                      Sidebar
                    </div>
                  </ResizablePanel>
                  <ResizableHandle index={0} />
                  <ResizablePanel index={1}>
                    <div className="flex justify-center items-center w-full h-full p-6">
                      Main Content
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle index={1} />
              <ResizablePanel index={2}>
                <div className="flex justify-center items-center h-full p-6">
                  Footer
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
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
        <div className="bg-stone-900 px-4 py-2 text-white text-sm rounded-lg">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage */}
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
