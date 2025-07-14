import { useState } from "react";
import SocialIcons from "../../components/socialicons";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col space-y-10 justify-center items-center m-5">

  {/* Default social icons */}
  <div className="bg-gray-800 p-5 rounded-md">
    <SocialIcons className="hover:text-blue-700 transition duration-200 hover:cursor-pointer" />
  </div>

  {/* Filtered platforms */}
  <div className="bg-gray-800 p-5 rounded-md">
    <SocialIcons
      className="hover:text-blue-700 text-blue-500 transition duration-200 hover:cursor-pointer"
      platforms={["instagram", "discord", "facebook", "google"]}
    />
  </div>
</div>
`;

const usageExample = `
import SocialIcons from "@your-org/ui-kit";

function Example() {
  return (
    <div className="flex space-x-4">
      <SocialIcons className="text-pink-500 hover:text-pink-700" />
    </div>
  );
}
`;

export default function SocialIconsDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Social Icons</h1>
      <p className="text-gray-600">
        A flexible set of social media icons supporting customizable styles and
        platform filters. Ideal for profile cards, footers, or login panels.
      </p>

      {/* Toggle */}
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

      {/* Demo Block */}
      <div className="flex h-fit w-full items-center justify-center p-6 border border-stone-600 bg-black text-white rounded-lg">
        {activeView === "preview" ? (
          <div className="p-10  flex flex-col space-y-10 justify-center items-center">
            <div className="bg-gray-800 p-5 rounded-md">
              <SocialIcons
                className="hover:text-blue-700 transition duration-200 hover:cursor-pointer"
                size={30}
                spacing={10}
              />
            </div>

            <div className="bg-gray-800 p-5 rounded-md">
              <SocialIcons
                className="hover:text-blue-700 text-blue-500 transition duration-200 hover:cursor-pointer"
                platforms={["instagram", "discord", "facebook", "google"]}
                size={30}
                spacing={20}
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

      {/* Install Block */}
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
        <div className="bg-stone-900 px-4 py-2 rounded text-white text-sm">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Block */}
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
