import { useState } from "react";
import Jumbotron from "../../components/jumbotron";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<div className="flex flex-col items-center p-5 rounded-lg w-[500px] h-[400px] m-5 border shadow-lg space-y-5">
  <div className="flex w-full h-full flex-1 rounded-lg overflow-hidden">
    <Jumbotron
      backgroundImage="https://tecdn.b-cdn.net/img/new/slides/041.webp"
      className="bg-gray-900 opacity-60"
    >
      <div className="relative flex flex-col items-center justify-center h-full w-full">
        <h2 className="mb-4 text-4xl font-semibold text-white">Heading</h2>
        <h4 className="mb-6 text-xl font-semibold text-white">Subheading</h4>
        <button className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition">
          Call to action
        </button>
      </div>
    </Jumbotron>
  </div>
</div>
`;

const usageExample = `
import Jumbotron from "@your-org/ui-kit";

function Example() {
  return (
    <Jumbotron
      backgroundImage="https://your-image-source.com/image.jpg"
      className="bg-gray-900 opacity-60"
    >
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h2 className="text-4xl font-semibold text-white mb-4">Welcome</h2>
        <h4 className="text-xl font-medium text-white mb-6">We're glad you're here</h4>
        <button className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition">
          Get Started
        </button>
      </div>
    </Jumbotron>
  );
}
`;

export default function JumbotronDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Jumbotron</h1>
      <p className="text-gray-600">
        A bold hero component with background imagery and layered content.
        Customizable layout, style, and call-to-action support make it ideal for
        splash sections.
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
          <div className="flex flex-col items-center p-5 rounded-lg w-[500px] h-[400px] m-5 border shadow-lg space-y-5">
            <h2 className="text-xl font-bold mb-5">Jumbotron</h2>
            <div className="flex w-full h-full flex-1 rounded-lg overflow-hidden">
              <Jumbotron
                backgroundImage="https://tecdn.b-cdn.net/img/new/slides/041.webp"
                className="bg-gray-900 opacity-60"
              >
                <div className="relative flex flex-col items-center justify-center h-full w-full">
                  <h2 className="mb-4 text-4xl font-semibold text-white">
                    Heading
                  </h2>
                  <h4 className="mb-6 text-xl font-semibold text-white">
                    Subheading
                  </h4>
                  <button className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition">
                    Call to action
                  </button>
                </div>
              </Jumbotron>
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

      {/* Usage */}
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
