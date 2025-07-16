import { useState } from "react";
import Dialog from "../../components/dialog";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
    <Dialog
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      header={<h2 className="text-xl font-bold">Dialog Title</h2>}
      body={<p>This is a fully customizable dialog!</p>}
      footer={
        <div className="flex gap-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => setIsDialogOpen(false)}
          >
            Confirm
          </button>
        </div>
      }
      className="bg-white"
    />
`;

const usageExample = `
import Dialog from "@your-org/ui-kit";

function Example() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsDialogOpen(true)}
      >
        Open Dialog
      </button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        header={<h2 className="text-xl font-bold">Dialog Title</h2>}
        body={<p>This is a fully customizable dialog!</p>}
        footer={
          <div className="flex gap-3">
            <button className="bg-red-500 px-4 py-2 text-white rounded" onClick={() => setIsDialogOpen(false)}>Cancel</button>
            <button className="bg-green-500 px-4 py-2 text-white rounded" onClick={() => setIsDialogOpen(false)}>Confirm</button>
          </div>
        }
      />
    </>
  );
}
`;

export default function DialogDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Dialog</h1>
      <p className="text-gray-600">
        A customizable modal dialog component with slots for header, body, and
        footer. Controlled visibility and styling props allow you to tailor
        interactions freely.
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
          <div className="p-5 m-5 pb-10 rounded-lg text-center h-fit w-[500px]  shadow-lg flex flex-col justify-start items-center">
            <div className="p-5">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                Open Dialog
              </button>

              <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                header={<h2 className="text-xl font-bold">Dialog Title</h2>}
                body={<p>This is a fully customizable dialog!</p>}
                footer={
                  <div className="flex gap-3">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Confirm
                    </button>
                  </div>
                }
                className="bg-black border"
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
