import { useState } from "react";
import Button from "../../components/button";
import CodeSnippet from "../../components/codesnippet";
import ScrollBox from "../../components/scrollbox";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
    <Button label="Default" variant="default" size="default" className="border rounded-sm flex items-center hover:cursor-pointer" />
<Button label="Destructive" variant="destructive" size="default" className="border rounded-sm flex items-center hover:cursor-pointer" />
<Button label="Outline" variant="outline" size="default" className="border rounded-sm flex items-center hover:cursor-pointer" />
<Button label="Secondary" variant="secondary" size="default" className="border rounded-sm flex items-center hover:cursor-pointer" />
<Button label="Ghost" variant="ghost" size="default" className="border rounded-sm flex items-center hover:cursor-pointer" />
<Button label="Link" variant="link" size="default" className="border rounded-sm flex items-center hover:cursor-pointer" />
`;

const usageExample = `
import { Button } from "@your-org/ui-kit";

function Example() {
  return (
    <div className="space-y-4">
      <Button label="Click me" variant="default" size="default" />
      <Button label="Delete" variant="destructive" size="sm" />
    </div>
  );
}
`;

export default function ButtonDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="flex flex-col w-full space-y-5">
      <h1 className="text-2xl font-semibold">Button</h1>
      <p className="text-gray-600">
        Buttons let users perform actions with a click. Use variants to convey
        purpose and size options to fit your layout.
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
      <div className="flex w-full h-fit min-h-[250px] items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg m-5">
            <h2 className="text-xl font-bold">Button</h2>
            <div className="flex flex-wrap justify-center space-x-5 mt-5">
              <Button
                label="Default"
                variant="default"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
              <Button
                label="Destructive"
                variant="destructive"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
              <Button
                label="Outline"
                variant="outline"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
              <Button
                label="Secondary"
                variant="secondary"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
              <Button
                label="Ghost"
                variant="ghost"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
              <Button
                label="Link"
                variant="link"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full h-[200px] bg-stone-900 rounded-lg">
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
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
