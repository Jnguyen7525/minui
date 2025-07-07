import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "../../components/alert";
import { AlertTriangle, Info, XCircle, CheckCircle } from "lucide-react";
import CodeSnippet from "../../components/codesnippet";
import ScrollBox from "../../components/scrollbox";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
  <Alert variant="warning" icon={<AlertTriangle className="size-5 text-yellow-600" />}>
    <AlertTitle>Heads Up!</AlertTitle>
    <AlertDescription>Something needs your attention.</AlertDescription>
  </Alert>

  <Alert variant="default" icon={<Info className="size-5 text-blue-600" />}>
    <AlertTitle>Info Alert</AlertTitle>
    <AlertDescription>This is just an informational alert.</AlertDescription>
  </Alert>

  <Alert variant="destructive" icon={<XCircle className="size-5 text-red-600" />}>
    <AlertTitle>Danger!</AlertTitle>
    <AlertDescription>This action cannot be undone.</AlertDescription>
  </Alert>

  <Alert variant="success" icon={<CheckCircle className="size-5 text-green-600" />}>
    <AlertTitle>Success!</AlertTitle>
    <AlertDescription>Everything went smoothly.</AlertDescription>
  </Alert>
`;

const usageExample = `import { Alert, AlertTitle, AlertDescription } from "@your-org/ui-kit";
import { AlertTriangle } from "lucide-react";

function Example() {
  return (
    <Alert variant="warning" icon={<AlertTriangle className="size-5 text-yellow-600" />}>
      <AlertTitle>Heads Up!</AlertTitle>
      <AlertDescription>Something needs your attention.</AlertDescription>
    </Alert>
  );
}
`;

export default function AlertDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Alert</h1>
      <p className="text-gray-600">
        Alerts are used to convey important feedback messages to users, such as
        warnings, successes, or critical failures.
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

      {/* Display Area */}
      <div className="flex w-full h-fit min-h-[350px] items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="space-y-3 w-full">
            <Alert
              variant="warning"
              icon={<AlertTriangle className="size-5 text-yellow-600" />}
            >
              <AlertTitle>Heads Up!</AlertTitle>
              <AlertDescription>
                Something needs your attention.
              </AlertDescription>
            </Alert>

            <Alert
              variant="default"
              icon={<Info className="size-5 text-blue-600" />}
            >
              <AlertTitle>Info Alert</AlertTitle>
              <AlertDescription>
                This is just an informational alert.
              </AlertDescription>
            </Alert>

            <Alert
              variant="destructive"
              icon={<XCircle className="size-5 text-red-600" />}
            >
              <AlertTitle>Danger!</AlertTitle>
              <AlertDescription>This action cannot be undone.</AlertDescription>
            </Alert>

            <Alert
              variant="success"
              icon={<CheckCircle className="size-5 text-green-600" />}
            >
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>Everything went smoothly.</AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="flex w-full bg-stone-900 rounded-lg ">
            <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
              <CodeSnippet code={codeExample} className="p-5" />
            </ScrollBox>
          </div>
        )}
      </div>

      {/* Install Section */}
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
