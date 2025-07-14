import { useState } from "react";
import Slider from "../../components/slider";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<div className="rounded-lg text-center h-fit w-[500px] border shadow-lg flex flex-col justify-start items-center m-5 p-5">
  <h2 className="text-xl font-bold mb-5">Slider</h2>
  <div className="flex flex-col w-full space-y-6">
    <div>
      <label className="block mb-1 text-sm font-medium">Single: {single}</label>
      <Slider
        trackColor="gray"
        rangeColor="white"
        thumbColor="yellow"
        value={single}
        onChange={setSingle}
        min={0}
        max={100}
        step={1}
        height={10}
      />
    </div>
    <div>
      <label className="block mb-1 text-sm font-medium">
        Range: {range[0]} - {range[1]}
      </label>
      <Slider
        mode="range"
        trackColor="white"
        rangeColor="blue"
        thumbColor="blue"
        value={range}
        onChange={setRange}
        min={0}
        max={100}
        step={1}
        height={10}
      />
    </div>
  </div>
</div>
`;

const usageExample = `
import Slider from "@your-org/ui-kit";

function Example() {
  const [value, setValue] = useState(50);
  const [range, setRange] = useState([25, 75]);

  return (
    <div className="space-y-6">
      <Slider
        value={value}
        onChange={setValue}
        trackColor="gray"
        rangeColor="white"
        thumbColor="yellow"
        min={0}
        max={100}
        step={1}
        height={8}
      />
      <Slider
        mode="range"
        value={range}
        onChange={setRange}
        trackColor="white"
        rangeColor="blue"
        thumbColor="blue"
        min={0}
        max={100}
        step={1}
        height={8}
      />
    </div>
  );
}
`;

export default function SliderDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  const [single, setSingle] = useState(60);
  const [range, setRange] = useState<[number, number]>([20, 70]);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Slider</h1>
      <p className="text-gray-600">
        A customizable slider component supporting single value or range
        selection. Ideal for filters, volume controls, and value pickers.
      </p>

      {/* View Toggle */}
      <div className="flex space-x-4 font-semibold">
        {["preview", "code"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view as "preview" | "code")}
            className={`capitalize hover:cursor-pointer px-3 py-1 rounded ${
              activeView === view
                ? "bg-stone-600 text-white"
                : "text-gray-500 hover:text-stone-600"
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Demo Area */}
      <div className="flex w-full items-center justify-center p-6 border border-stone-600 bg-black text-white rounded-lg">
        {activeView === "preview" ? (
          <div className="rounded-lg text-center h-fit w-full p-10">
            <div className="flex flex-col w-full">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Single: {single}
                </label>
                <Slider
                  trackColor="white"
                  rangeColor="yellow"
                  thumbColor="black"
                  value={single}
                  onChange={setSingle}
                  min={0}
                  max={100}
                  step={1}
                  height={10}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Range: {range[0]} - {range[1]}
                </label>
                <Slider
                  trackColor="white"
                  rangeColor="blue"
                  thumbColor="blue"
                  mode="range"
                  value={range}
                  onChange={setRange}
                  min={0}
                  max={100}
                  step={1}
                  height={10}
                />
              </div>
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
      <div className="flex flex-col space-y-4">
        <span className="text-xl font-semibold">Installation</span>
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
        <div className="bg-stone-900 px-4 py-2 text-white text-sm rounded">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Section */}
      <div className="flex flex-col space-y-5">
        <span className="text-xl font-semibold">Usage</span>
        <div className="bg-stone-900 p-5 rounded-lg text-white">
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
