import { useState } from "react";
import Checkbox from "../../components/checkbox";
import CodeSnippet from "../../components/codesnippet";
import ScrollBox from "../../components/scrollbox";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
  <div className="flex flex-col gap-6">
    <div className="flex items-center gap-3">
      <Checkbox id="terms" defaultChecked />
      <label htmlFor="terms" className="text-sm">
        Accept terms and conditions
      </label>
    </div>

    <div className="flex items-start gap-3">
      <Checkbox
        id="terms-2"
        checked={isChecked}
        onChange={setIsChecked}
      />
      <div className="grid gap-2">
        <label htmlFor="terms-2" className="text-sm">
          Accept terms and conditions
        </label>
        <p className="text-muted-foreground text-sm">
          By clicking this checkbox, you agree to the terms and conditions.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <Checkbox id="toggle" disabled />
      <label htmlFor="toggle" className="text-sm">
        Enable notifications
      </label>
    </div>

    <label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
      <Checkbox
        id="toggle-2"
        defaultChecked
        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">
          Enable notifications
        </p>
        <p className="text-muted-foreground text-sm">
          You can enable or disable notifications at any time.
        </p>
      </div>
    </label>
  </div>
`;

const usageExample = `
import { Checkbox } from "@your-org/ui-kit";

function Example() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="space-y-4">
      <Checkbox
        id="terms"
        checked={isChecked}
        onChange={setIsChecked}
      />
      <label htmlFor="terms">Accept Terms</label>
    </div>
  );
}
`;

export default function CheckboxDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [isChecked, setIsChecked] = useState(true);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Checkbox</h1>
      <p className="text-gray-600">
        Checkbox allows users to select one or more options. Supports
        controlled, uncontrolled, and disabled states with fully styled and
        accessible labels.
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
          <div className="p-5 rounded-lg h-fit w-[300px] border shadow-lg space-y-6">
            <div className="flex flex-col gap-6">
              {/* Uncontrolled */}
              <div className="flex items-center gap-3">
                <Checkbox id="terms" defaultChecked />
                <label htmlFor="terms" className="text-sm">
                  Accept terms and conditions
                </label>
              </div>

              {/* Controlled */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms-2"
                  checked={isChecked}
                  onChange={setIsChecked}
                />
                <div className="grid gap-2">
                  <label htmlFor="terms-2" className="text-sm">
                    Accept terms and conditions
                  </label>
                  <p className="text-muted-foreground text-sm">
                    By clicking this checkbox, you agree to the terms and
                    conditions.
                  </p>
                </div>
              </div>

              {/* Disabled */}
              <div className="flex items-start gap-3">
                <Checkbox id="toggle" disabled />
                <label htmlFor="toggle" className="text-sm">
                  Enable notifications
                </label>
              </div>

              {/* Styled Label */}
              <label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                  id="toggle-2"
                  defaultChecked
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm font-medium">Enable notifications</p>
                  <p className="text-muted-foreground text-sm">
                    You can enable or disable notifications at any time.
                  </p>
                </div>
              </label>
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
