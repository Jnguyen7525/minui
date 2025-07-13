import { useState } from "react";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const loremText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non diam eros.
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
Sed rutrum, turpis id sollicitudin accumsan, sapien odio interdum velit, ac finibus nunc nisi ut libero.
Mauris non eleifend nisl. Curabitur imperdiet turpis at enim sodales, eu finibus erat efficitur.

Praesent at arcu ut turpis vestibulum varius. In a dolor vel turpis fermentum bibendum a eget est.
Aliquam erat volutpat. Integer quis velit eget nulla vehicula tempus. 
Curabitur commodo nulla eget justo posuere, at accumsan nisi convallis. 
Phasellus dictum massa nec felis condimentum, in accumsan mi sollicitudin.

Fusce ac est sed dolor efficitur ultricies. Donec sit amet nisi in orci finibus vehicula.
Nunc ut felis at elit imperdiet vehicula sed sed purus.
Cras tincidunt elit vel gravida tincidunt. Duis blandit lectus vitae erat tincidunt, ac varius justo rutrum.
`;

const codeExample = `
<ScrollBox className="bg-yellow-500 rounded-md">
  <div className="space-y-5 p-5 text-sm leading-relaxed">
    <p>${loremText}</p>
    <p>${loremText}</p>
    <p>${loremText}</p>
  </div>
</ScrollBox>
`;

const usageExample = `
import ScrollBox from "@your-org/ui-kit";

function Example() {
  return (
    <ScrollBox className="bg-purple-400 rounded-lg">
      <div className="p-5">
        {/* Scrollable content here */}
      </div>
    </ScrollBox>
  );
}
`;

export default function ScrollBoxDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">ScrollBox</h1>
      <p className="text-gray-600">
        A custom scroll container with draggable thumb indicators for both
        vertical and horizontal axes. Useful for code blocks, long forms, or any
        scrollable surface.
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

      {/* Demo Section */}
      <div className="flex w-full items-center justify-center rounded-lg bg-black text-white h-[400px]">
        {activeView === "preview" ? (
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
            <div className="space-y-5 p-5 text-sm leading-relaxed">
              <p>{loremText}</p>
              <p>{loremText}</p>
              <p>{loremText}</p>
            </div>
          </ScrollBox>
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
        <div className="bg-stone-900 px-4 py-2 text-white text-sm rounded-lg">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Section */}
      <div className="flex flex-col space-y-5 font-semibold">
        <span className="text-xl">Usage</span>
        <div className="bg-stone-900 p-5 rounded-lg text-white">
          <CodeSnippet code={usageExample} className="p-5" />
        </div>
      </div>
    </div>
  );
}
