import { useState } from "react";
import NumberInput from "../../components/numberinput";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
  <div className="max-w-sm space-y-10">
    <NumberInput
      label={<span className="text-sm text-gray-600 absolute -bottom-6 w-full">Amount</span>}
      value={amount}
      onChange={(val) => setAmount(val)}
      placeholder="0.00"
      allowDecimals
      min={0}
      max={9999}
      variant="bordered"
    />
    <NumberInput
      label={<span className="text-sm text-gray-600 absolute -bottom-6 w-full">Amount</span>}
      value={amount}
      onChange={(val) => setAmount(val)}
      placeholder="0.00"
      allowDecimals
      min={0}
      max={9999}
      variant="faded"
    />
    <NumberInput
      label={<span className="text-sm text-gray-600 absolute -bottom-6 w-full">Amount</span>}
      value={amount}
      onChange={(val) => setAmount(val)}
      placeholder="0.00"
      allowDecimals
      min={0}
      max={9999}
      variant="flat"
    />
    <NumberInput
      label={<span className="text-sm text-gray-600 absolute -bottom-6 w-full">Amount</span>}
      value={amount}
      onChange={(val) => setAmount(val)}
      placeholder="0.00"
      allowDecimals
      min={0}
      max={9999}
      variant="underlined"
    />
    <p className="text-sm text-gray-600">Typed value: {amount}</p>
  </div>
`;

const usageExample = `
import NumberInput from "@your-org/ui-kit";

function Example() {
  const [amount, setAmount] = useState("");

  return (
    <NumberInput
      label={<span className="text-sm text-gray-600 absolute -bottom-6 w-full">Amount</span>}
      value={amount}
      onChange={(val) => setAmount(val)}
      placeholder="0.00"
      allowDecimals
      min={0}
      max={9999}
      variant="bordered"
    />
  );
}
`;

export default function NumberInputDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Number Input</h1>
      <p className="text-gray-600">
        A numeric input field supporting decimal precision, limits, and styling
        variants. Fully controlled and responsive to validation and formatting
        needs.
      </p>

      {/* View Toggle */}
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

      {/* Demo Panel */}
      <div className="flex w-full items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="rounded-lg text-center h-fit w-fit shadow-lg flex flex-col justify-start items-center m-5 p-5">
            <div className="max-w-sm space-y-10">
              <NumberInput
                label={
                  <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                    <span>Amount</span>
                  </span>
                }
                value={amount}
                onChange={(val) => setAmount(val)}
                placeholder="0.00"
                allowDecimals
                min={0}
                max={9999}
                variant="bordered"
              />
              <NumberInput
                label={
                  <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                    <span>Amount</span>
                  </span>
                }
                value={amount}
                onChange={(val) => setAmount(val)}
                placeholder="0.00"
                allowDecimals
                min={0}
                max={9999}
                variant="faded"
              />
              <NumberInput
                label={
                  <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                    <span>Amount</span>
                  </span>
                }
                value={amount}
                onChange={(val) => setAmount(val)}
                placeholder="0.00"
                allowDecimals
                min={0}
                max={9999}
                variant="flat"
              />
              <NumberInput
                label={
                  <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                    <span>Amount</span>
                  </span>
                }
                value={amount}
                onChange={(val) => setAmount(val)}
                placeholder="0.00"
                allowDecimals
                min={0}
                max={9999}
                variant="underlined"
              />
              <p className="text-sm text-gray-600">Typed value: {amount}</p>
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

      {/* Installation Block */}
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
        <div className="bg-stone-900 rounded-lg px-4 py-2 text-white text-sm">
          <CodeSnippet
            code={installCommands[activeTool] as keyof typeof installCommands}
          />
        </div>
      </div>

      {/* Usage Block */}
      <div className="flex flex-col space-y-5 font-semibold">
        <span className="text-xl">Usage</span>
        <div className="bg-stone-900 rounded-lg p-5 text-white">
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
