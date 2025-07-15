import { useState } from "react";
import TimeInput from "../../components/timeinput";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<div className="rounded-lg text-center h-fit w-[300px] border shadow-lg flex flex-col justify-start items-center m-5 p-5">
  <h2 className="text-xl font-bold mb-5">Time Input</h2>
  <div className="flex w-full flex-col space-y-4">
    <TimeInput
      label="Start Time"
      value={time}
      onChange={setTime}
      hourFormat={12}
      variant="bordered"
      className="bg-white text-black"
    />
    <TimeInput
      label="Start Time"
      value={time}
      onChange={setTime}
      hourFormat={12}
      variant="flat"
    />
    <TimeInput
      label="Start Time"
      value={time}
      onChange={setTime}
      hourFormat={12}
      variant="underlined"
    />
    <p className="text-sm text-gray-600">Time: {time || "--:--"}</p>
  </div>
</div>
`;

const usageExample = `
import TimeInput from "@your-org/ui-kit";

function Example() {
  const [time, setTime] = useState("");

  return (
    <TimeInput
      label="Start Time"
      value={time}
      onChange={setTime}
      hourFormat={12}
      variant="bordered"
      className="bg-gray-100 text-black p-2 rounded"
    />
  );
}
`;

export default function TimeInputDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [time, setTime] = useState("");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Time Input</h1>
      <p className="text-gray-600">
        A flexible time selection component with support for 12-hour or 24-hour
        formats, customizable styling, and state control.
      </p>

      {/* View toggle */}
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

      {/* Demo preview */}
      <div className="border border-stone-600 rounded-lg bg-black text-white p-6 flex justify-center">
        {activeView === "preview" ? (
          <div className=" p-10 w-[250px]">
            <div className="flex w-full flex-col space-y-4">
              <TimeInput
                label="Start Time"
                value={time}
                onChange={setTime}
                hourFormat={12}
                variant="bordered"
                className="bg-white text-black"
              />
              <TimeInput
                label="Start Time"
                value={time}
                onChange={setTime}
                hourFormat={12}
                variant="flat"
              />
              <TimeInput
                label="Start Time"
                value={time}
                onChange={setTime}
                hourFormat={12}
                variant="underlined"
              />
              <p className="text-sm text-gray-300">Time: {time || "--:--"}</p>
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
        <div className="bg-stone-900 text-white text-sm px-4 py-2 rounded">
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
