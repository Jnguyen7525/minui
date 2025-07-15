import { useState } from "react";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";
import { useToast } from "../../components/toast";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<ToastProvider
  placement="bottom-right"
  toastStyles={{
    success: "bg-green-600 text-white border border-white border-2 px-6 py-4 rounded-md",
    error: "bg-red-600 text-white border-white border-2 px-6 py-4 rounded-md",
    info: "bg-yellow-500 text-white border-white border-2 px-6 py-4 rounded-md",
  }}
>
  {/* Your app content */}
</ToastProvider>


{/*Home.tsx*/}
const { showToast } = useToast();

<div className="p-5 rounded-lg border shadow-lg text-center space-y-4">
  <button
    onClick={() => showToast("Success! Your action was completed.", "success")}
    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
  >
    Show Success Toast
  </button>

  <button
    onClick={() => showToast("Error! Something went wrong.", "error")}
    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
  >
    Show Error Toast
  </button>

  <button
    onClick={() => showToast("Info! Display some info.", "info")}
    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
  >
    Show Info Toast
  </button>
</div>
`;

const usageExample = `
import { ToastProvider } from "@your-org/ui-kit";

function App() {
  return (
    <ToastProvider placement="bottom-right" toastStyles={{ success: "...", error: "...", info: "..." }}>
      {/* Your routes or layout */}
    </ToastProvider>
  );
}
`;

export default function ToastDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const { showToast } = useToast();

  return (
    <div className="space-y-6 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">ToastProvider</h1>
      <p className="text-gray-600">
        A global wrapper that enables notifications anywhere in your app. Use{" "}
        <code>useToast</code> to trigger toasts with custom styling and
        placement.
      </p>

      {/* View Toggle */}
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

      {/* Demo preview or code */}
      <div className="border border-stone-600 rounded-lg bg-black text-white p-6 flex justify-center">
        {activeView === "preview" ? (
          <div className="p-5 flex space-x-5">
            <button
              onClick={() =>
                showToast("Success! Your action was completed.", "success")
              }
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Show Success Toast
            </button>

            <button
              onClick={() => showToast("Error! Something went wrong.", "error")}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Show Error Toast
            </button>

            <button
              onClick={() => showToast("Info! Display some info.", "info")}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Show Info Toast
            </button>
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
        <div className="bg-stone-900 px-4 py-2 text-white text-sm rounded">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage */}
      <div className="flex flex-col space-y-6 font-semibold">
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
