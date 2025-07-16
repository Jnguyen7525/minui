import { useState, useEffect } from "react";
import ProgressBar from "../../components/progressbar";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
  const [progress, setProgress] = useState(40);
  const [autoProgress, setAutoProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 200);
    return () => clearInterval(interval);
  }, []);
  
<div className="flex flex-col space-y-5 items-center p-5 rounded-lg h-fit w-fit border shadow-lg m-5">
  <h2 className="text-xl font-bold">Progress Bar</h2>

  <ProgressBar
    startLabel={\`\${progress}%\`}
    endLabel="100%"
    progress={progress}
    className="bg-purple-500"
    barHeight={10}
    barWidth={300}
  />
  <div className="flex w-full justify-between text-sm">
    <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => setProgress((prev) => Math.max(prev - 10, 0))}>
      Decrease
    </button>
    <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={() => setProgress((prev) => Math.min(prev + 10, 100))}>
      Increase
    </button>
  </div>

  <ProgressBar
    startLabel={\`\${autoProgress}%\`}
    progress={autoProgress}
    className="bg-green-500"
    barHeight={10}
    barWidth={300}
  />

  <ProgressBar isIndeterminate startLabel="Loading..." barWidth={300} />
</div>
`;

const usageExample = `
import ProgressBar from "@your-org/ui-kit";

function Example() {
  const [progress, setProgress] = useState(30);

  return (
    <>
      <ProgressBar
        startLabel={\`\${progress}%\`}
        endLabel="100%"
        progress={progress}
        className="bg-purple-500"
        barHeight={8}
        barWidth={250}
      />
      <button onClick={() => setProgress(progress + 10)}>Increase</button>
    </>
  );
}
`;

export default function ProgressBarDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  const [progress, setProgress] = useState(40);
  const [autoProgress, setAutoProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Progress Bar</h1>
      <p className="text-gray-600">
        A horizontal indicator representing task completion or loading state.
        Supports static percentages, auto-progress, and indeterminate mode.
      </p>

      {/* View Switcher */}
      <div className="flex space-x-4 font-semibold">
        {["preview", "code"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view as "preview" | "code")}
            className={`capitalize px-3 py-1 rounded hover:cursor-pointer ${
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
      <div className="flex w-full justify-center items-center border-stone-600 rounded-lg bg-black text-white p-6">
        {activeView === "preview" ? (
          <div className="flex flex-col space-y-5 items-center p-5 rounded-lg h-fit w-fit shadow-lg m-5">
            <ProgressBar
              startLabel={`${progress}%`}
              endLabel="100%"
              progress={progress}
              className="bg-purple-500"
              barHeight={10}
              barWidth={300}
            />
            <div className="flex w-full justify-between text-sm">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => setProgress((prev) => Math.max(prev - 10, 0))}
              >
                Decrease
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
                onClick={() => setProgress((prev) => Math.min(prev + 10, 100))}
              >
                Increase
              </button>
            </div>

            <ProgressBar
              startLabel={`${autoProgress}%`}
              progress={autoProgress}
              className="bg-green-500"
              barHeight={10}
              barWidth={300}
            />

            <ProgressBar
              isIndeterminate
              startLabel="Loading..."
              barWidth={300}
            />
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
        <div className="bg-stone-900 px-4 py-2 rounded text-white text-sm">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage */}
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
