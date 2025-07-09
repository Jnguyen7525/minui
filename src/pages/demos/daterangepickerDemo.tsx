import { useState } from "react";
import DateRangePicker from "../../components/daterangepicker";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `

    <DateRangePicker
    label={<span className="text-sm text-gray-600 absolute -bottom-6 w-full">Uncontrolled Date</span>}
    variant="flat"
    className="text-white text-md bg-gray-700"
/>
<DateRangePicker
    label={<span className="text-sm text-gray-600 absolute -bottom-6 w-full">Controlled Date</span>}
    variant="bordered"
    className="text-white bg-gray-700 border-gray-400 text-md rounded-lg"
/>
<DateRangePicker
    label={<span className="text-sm text-gray-600 absolute -bottom-6 w-full">Underlined Date</span>}
    variant="underlined"
    className="text-md"
/>
<DateRangePicker
    label={<span className="text-sm text-gray-600 absolute -bottom-6 w-full">Faded Date</span>}
    variant="faded"
    className="text-black text-md rounded-sm bg-white"
/>

`;

const usageExample = `
import DateRangePicker from "@your-org/ui-kit";

function Example() {
  return (
    <DateRangePicker
      label={<span className="text-sm text-gray-600 absolute -bottom-6 w-full">Select a Date Range</span>}
      variant="flat"
      className="text-white text-md bg-gray-700"
    />
  );
}
`;

export default function DateRangePickerDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Date Range Picker</h1>
      <p className="text-gray-600">
        A multi-select calendar input for selecting date ranges. Supports
        customizable styling variants and optional label components for visual
        clarity.
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
          <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5 pb-10">
            <div className="flex flex-col space-y-10 w-[300px] h-full justify-center items-center">
              {/* Uncontrolled Date Range Picker  */}
              <DateRangePicker
                label={
                  <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                    <span>Uncontrolled Date</span>
                  </span>
                }
                variant="flat"
                className="text-white text-md bg-gray-700 "
              />

              {/* Controlled Date Range Picker  */}
              <DateRangePicker
                label={
                  <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                    <span>Controlled Date</span>
                  </span>
                }
                variant="bordered"
                className="text-white bg-gray-700 border-gray-400 text-md rounded-lg"
              />

              {/* Underlined Date Range Picker  */}
              <DateRangePicker
                label={
                  <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                    <span>Underlined Date</span>
                  </span>
                }
                variant="underlined"
                className=" text-md "
              />

              {/* Faded Variant Date Range Picker  */}
              <DateRangePicker
                label={
                  <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                    <span>Faded Date</span>
                  </span>
                }
                variant="faded"
                className="text-black text-md rounded-sm bg-white  "
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
          <ScrollBox className="w-full">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
