import { useState } from "react";
import Autocomplete from "../../components/autocomplete";
import CodeSnippet from "../../components/codesnippet";
import ScrollBox from "../../components/scrollbox";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<Autocomplete
  items={[
    { label: "Apple", key: "apple" },
    { label: "Banana", key: "banana" },
    { label: "Cherry", key: "cherry" },
    { label: "Date", key: "date" },
    { label: "Grapes", key: "grapes" },
  ]}
  placeholder="Pick a fruit..."
  className="border-blue-500 bg-black border-b rounded-none"
/>
`;

const usageExample = `import Autocomplete from "@your-org/ui-kit";

function Example() {
  const items = [
    { label: "Apple", key: "apple" },
    { label: "Banana", key: "banana" },
    { label: "Cherry", key: "cherry" },
    { label: "Date", key: "date" },
    { label: "Grapes", key: "grapes" },
  ];

  return <Autocomplete items={items} placeholder="Pick a fruit..." />;
}
`;

export default function AutocompleteDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Autocomplete</h1>
      <p className="text-gray-600">
        Autocomplete provides real-time suggestions based on user input. Great
        for search bars, dropdowns, and dynamic form fields.
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
      <div className="flex w-full h-fit min-h-[300px] items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="flex flex-col space-y-5 w-full max-w-md border-b">
            <Autocomplete
              items={[
                { label: "Apple", key: "apple" },
                { label: "Banana", key: "banana" },
                { label: "Cherry", key: "cherry" },
                { label: "Date", key: "date" },
                { label: "Grapes", key: "grapes" },
              ]}
              placeholder="Pick a fruit..."
              className="border-stone-500 bg-black  rounded-md"
            />
          </div>
        ) : (
          <div className="flex w-full h-fit bg-stone-900 rounded-lg">
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
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
