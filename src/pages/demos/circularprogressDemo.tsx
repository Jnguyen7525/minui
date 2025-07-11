import { useEffect, useState } from "react";
import CircularProgress from "../../components/circularprogress";
import CodeSnippet from "../../components/codesnippet";
import ScrollBox from "../../components/scrollbox";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `

const [progress, setProgress] = useState(30);
const [circularprogress, setCircularProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircularProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  {/* Default Spinner */}
  <CircularProgress size={30} borderWidth={2} className="border-blue-500" />

  {/* Custom Colors */}
  <CircularProgress size={40} speed="1s" borderWidth={4} className="border-red-500" />
  <CircularProgress size={50} speed="2s" borderWidth={6} className="border-green-500" />
  <CircularProgress size={60} speed="3s" borderWidth={8} className="border-yellow-500" />
  <CircularProgress size={70} speed="4s" borderWidth={10} className="border-purple-500" />

{/* Indeterminate Progress */}
<CircularProgress label="Loading..." className="border-blue-600" />

{/* Progress Tracking */}
<CircularProgress showValueLabel progress={circularprogress} label="Downloading..." size={80}
 className="stroke-blue-600" borderWidth={10} />

<div className="flex flex-col space-y-2">
    {/* Circular Progress Bar */}
    <CircularProgress showValueLabel progress={progress} label="Downloading..." className="stroke-blue-600" />

{/* Update Progress buttons */}
    <div className="flex w-full justify-between text-sm">
    <button
        className="bg-red-500 text-white px-2 py-1 rounded-md"
        onClick={() => setProgress((prev) => Math.max(prev - 10, 0))}
    >
        Decrease
    </button>
    <button
        className="bg-blue-500 text-white px-2 py-1 rounded-md"
        onClick={() =>
        setProgress((prev) => Math.min(prev + 10, 100))
        }
    >
        Increase
    </button>
    </div>
`;

const usageExample = `
import { CircularProgress } from "@your-org/ui-kit";
import { useState } from "react";

function Example() {
  const [progress, setProgress] = useState(65);

  return (
    <div>
      <CircularProgress
        progress={progress}
        showValueLabel
        label="Downloading..."
        className="stroke-blue-600"
      />
      <button onClick={() => setProgress(prev => Math.max(prev - 10, 0))}>-</button>
      <button onClick={() => setProgress(prev => Math.min(prev + 10, 100))}>+</button>
    </div>
  );
}
`;

export default function CircularProgressDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [progress, setProgress] = useState(65);
  const [circularprogress, setCircularProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircularProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Circular Progress</h1>
      <p className="text-gray-600">
        CircularProgress indicates loading or completion percentage using a
        circular spinner. Supports customizable size, stroke width, colors,
        labels, and both indeterminate and determinate modes.
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
          <div className="flex flex-col space-y-8 items-center p-5 w-fit">
            {/* Row of Spinners */}
            <div className="flex space-x-5">
              <CircularProgress
                size={30}
                borderWidth={2}
                className="border-blue-500"
              />
              <CircularProgress
                size={40}
                speed="1s"
                borderWidth={4}
                className="border-red-500"
              />
              <CircularProgress
                size={50}
                speed="2s"
                borderWidth={6}
                className="border-green-500"
              />
              <CircularProgress
                size={60}
                speed="3s"
                borderWidth={8}
                className="border-yellow-500"
              />
              <CircularProgress
                size={70}
                speed="4s"
                borderWidth={10}
                className="border-purple-500"
              />
            </div>

            {/* Indeterminate & Determinate */}
            <div className="flex space-x-5 items-center justify-center">
              <CircularProgress
                label="Loading..."
                className="border-blue-600"
              />

              <CircularProgress
                showValueLabel
                progress={circularprogress}
                label="Downloading..."
                size={80}
                className="stroke-blue-600"
                borderWidth={10}
              />

              {/* Progress Controller */}
              <div className="flex flex-col items-center space-y-2">
                <CircularProgress
                  progress={progress}
                  showValueLabel
                  label="Downloading..."
                  className="stroke-blue-600"
                />
                <div className="flex w-full justify-between text-sm space-x-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() =>
                      setProgress((prev) => Math.max(prev - 10, 0))
                    }
                  >
                    Decrease
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                    onClick={() =>
                      setProgress((prev) => Math.min(prev + 10, 100))
                    }
                  >
                    Increase
                  </button>
                </div>
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
