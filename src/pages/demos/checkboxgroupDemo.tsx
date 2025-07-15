import { useState } from "react";

import CodeSnippet from "../../components/codesnippet";
import ScrollBox from "../../components/scrollbox";
import CheckboxGroup from "../../components/checkboxgroup";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
  <CheckboxGroup
    options={[
      { id: "news", label: "Subscribe to newsletter" },
      { id: "offers", label: "Receive special offers" },
      { id: "updates", label: "Get product updates" },
    ]}
    selectedValues={selectedCheckboxGroup}
    onChange={setCheckboxGroupSelected}
  />

  <p className="mt-4 text-sm">
    Selected: {selectedCheckboxGroup.join(", ") || "None"}
  </p>
`;

const usageExample = `
import { CheckboxGroup } from "@your-org/ui-kit";

function Example() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <CheckboxGroup
      options={[
        { id: "news", label: "Subscribe to newsletter" },
        { id: "offers", label: "Receive special offers" },
        { id: "updates", label: "Get product updates" },
      ]}
      selectedValues={selected}
      onChange={setSelected}
    />
  );
}
`;

export default function CheckboxGroupDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [selectedCheckboxGroup, setCheckboxGroupSelected] = useState<string[]>(
    []
  );

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Checkbox Group</h1>
      <p className="text-gray-600">
        CheckboxGroup allows users to select multiple related options. Ideal for
        preferences, filters, and multi-select input.
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
          <div className="p-5 rounded-lg h-fit w-[300px] border shadow-lg space-y-6">
            <h3 className="text-lg font-bold">Preferences</h3>
            <CheckboxGroup
              options={[
                { id: "news", label: "Subscribe to newsletter" },
                { id: "offers", label: "Receive special offers" },
                { id: "updates", label: "Get product updates" },
              ]}
              selectedValues={selectedCheckboxGroup}
              onChange={setCheckboxGroupSelected}
            />
            <p className="mt-4 text-sm">
              Selected: {selectedCheckboxGroup.join(", ") || "None"}
            </p>
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
