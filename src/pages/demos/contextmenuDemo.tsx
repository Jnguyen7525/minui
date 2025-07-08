import { useState } from "react";
import { ContextMenu, ContextMenuPanel } from "../../components/contextmenu";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<ContextMenu
  menuItems={[
    { label: "Back", action: () => console.log("Back clicked!") },
    { label: "Forward", action: () => console.log("Forward clicked!") },
    { label: "Reload", action: () => console.log("Reload clicked!") },
    { label: "Delete", action: () => console.log("Delete clicked!") },
  ]}
>
  <div className="w-64 h-32 border flex items-center justify-center text-gray-600 rounded-md">
    Right-click here to see menu
  </div>

  <ContextMenuPanel className="bg-gray-900 text-white p-2 flex flex-col space-y-2 items-center justify-center w-[150px] h-fit rounded-md border border-gray-800" />
</ContextMenu>
`;

const usageExample = `
import {
  ContextMenu,
  ContextMenuPanel
} from "@your-org/ui-kit";

function Example() {
  return (
    <ContextMenu
      menuItems={[
        { label: "Back", action: () => console.log("Back") },
        { label: "Forward", action: () => console.log("Forward") },
        { label: "Reload", action: () => console.log("Reload") },
        { label: "Delete", action: () => console.log("Delete") },
      ]}
    >
      <div className="w-64 h-32 border flex items-center justify-center text-gray-600 rounded-md">
        Right-click here to see menu
      </div>

      <ContextMenuPanel className="bg-gray-900 text-white p-2 flex flex-col space-y-2 items-center justify-center w-[150px] h-fit rounded-md border border-gray-800" />
    </ContextMenu>
  );
}
`;

export default function ContextMenuDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Context Menu</h1>
      <p className="text-gray-600">
        A modular right-click menu that displays a customizable list of actions.
        Built with separated components for styling and interaction, including
        dynamic positioning and automatic outside-click dismissal.
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
      <div className="flex w-full items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white min-h-[250px]">
        {activeView === "preview" ? (
          <div className="p-5 m-5 pb-10 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center">
            <h2 className="text-xl font-bold mb-5">Context Menu</h2>
            <div className="p-5">
              <h1 className="text-lg font-bold mb-4">
                Right-click on the box below
              </h1>
              <ContextMenu
                menuItems={[
                  { label: "Back", action: () => console.log("Back clicked!") },
                  {
                    label: "Forward",
                    action: () => console.log("Forward clicked!"),
                  },
                  {
                    label: "Reload",
                    action: () => console.log("Reload clicked!"),
                  },
                  {
                    label: "Delete",
                    action: () => console.log("Delete clicked!"),
                  },
                ]}
                className="w-64 h-32 border rounded-md border-stone-700"
              >
                <div className="w-64 h-32  flex items-center justify-center text-gray-600 rounded-md ">
                  Right-click here to see menu
                </div>
                <ContextMenuPanel className="bg-gray-900 text-white p-2 flex flex-col space-y-2 items-center justify-center w-[150px] h-fit rounded-md border border-gray-800" />
              </ContextMenu>
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
