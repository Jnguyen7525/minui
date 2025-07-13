import { useState } from "react";
import RadioGroup from "../../components/radiogroup";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const radioOptions = [
  { id: "r1", value: "default", label: "Default" },
  { id: "r2", value: "comfortable", label: "Comfortable" },
  { id: "r3", value: "compact", label: "Compact" },
];

const codeExample = `
  const [radioSelected, setRadioSelected] = useState("default");

<RadioGroup
  name="preferences"
  checkedValue={radioSelected}
  onChange={setRadioSelected}
  options={[
    { id: "r1", value: "default", label: "Default" },
    { id: "r2", value: "comfortable", label: "Comfortable" },
    { id: "r3", value: "compact", label: "Compact" },
  ]}
  size="medium"
  onColor="blue"
  offColor="white"
/>
`;

const usageExample = `
import RadioGroup from "@your-org/ui-kit";

function Example() {
  const [selected, setSelected] = useState("default");

  return (
    <RadioGroup
      name="settings"
      checkedValue={selected}
      onChange={setSelected}
      options={[
        { id: "opt1", value: "light", label: "Light Mode" },
        { id: "opt2", value: "dark", label: "Dark Mode" },
      ]}
      size="large"
      onColor="green"
      offColor="gray"
    />
  );
}
`;

export default function RadioGroupDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [radioSelected, setRadioSelected] = useState("default");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Radio Group</h1>
      <p className="text-gray-600">
        A set of selectable options styled as radio buttons. Fully customizable
        with size and color props. Controlled and accessible by default.
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

      {/* Demo Area */}
      <div className="flex w-full justify-center items-center border border-stone-600 rounded-lg bg-black text-white p-6">
        {activeView === "preview" ? (
          <div className="flex flex-col items-center space-y-5 p-10 w-[250px]">
            <RadioGroup
              name="preferences"
              checkedValue={radioSelected}
              onChange={setRadioSelected}
              options={radioOptions}
              size="medium"
              onColor="blue"
              offColor="white"
            />
            <p className="text-sm mt-2 text-gray-600">
              Selected: {radioSelected}
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
          {Object.entries(installCommands).map(([tool]) => (
            <button
              key={tool}
              onClick={() =>
                setActiveTool(tool as keyof typeof installCommands)
              }
              className={`hover:cursor-pointer px-3 py-1 rounded ${
                activeTool === tool
                  ? "bg-stone-600 text-white"
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

      {/* Usage Block */}
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
