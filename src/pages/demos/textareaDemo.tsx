import { useState } from "react";
import Textarea from "../../components/textarea";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
 const [text, setText] = useState("");
     <div className="p-10">
  <div className="flex flex-col space-y-5 w-[350px]">
    <Textarea
      value={text}
      onChange={setText}
      rows={2}
      placeholder="Type your message..."
      className="flex w-full bg-gray-800 text-blue-500 border border-stone-200 text-sm py-2 px-2.5 rounded-lg"
    />
  </div>
</div>
`;

const usageExample = `
import Textarea from "@your-org/ui-kit";

function Example() {
  const [text, setText] = useState("");

  return (
    <Textarea
      value={text}
      onChange={setText}
      rows={4}
      placeholder="Your thoughts go here..."
      className="w-full p-3 border rounded-md bg-gray-100"
    />
  );
}
`;

export default function TextareaDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [text, setText] = useState("");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Textarea</h1>
      <p className="text-gray-600">
        A flexible multi-line text input supporting controlled value, styling,
        and auto-resizing. Perfect for message boxes or note fields.
      </p>

      {/* View Switcher */}
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
      <div className="border border-stone-600 rounded-lg bg-black text-white flex justify-center p-6">
        {activeView === "preview" ? (
          <div className="p-10">
            <div className="flex flex-col space-y-5 w-[350px]">
              <Textarea
                value={text}
                onChange={setText}
                rows={2}
                placeholder="Type your message..."
                className="flex w-full bg-gray-800 text-blue-500 border border-stone-200 text-sm py-2 px-2.5 rounded-lg"
              />
              <p className="text-sm mt-2 text-stone-300">
                Current text: {text}
              </p>
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

      {/* Usage Section */}
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
