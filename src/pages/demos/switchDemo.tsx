import { useState } from "react";
import Switch from "../../components/switch";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
<div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
  <div className="flex flex-col space-y-5">
    <Switch
      id="terms-switch"
      checked={isChecked}
      onChange={setIsChecked}
      size="large"
      onLabel="I Agree to Terms and Conditions"
      offLabel="I Agree to Terms and Conditions"
      onColor="blue"
      offColor="yellow"
    />
    <Switch
      id="terms-switch"
      checked={isChecked}
      onChange={setIsChecked}
      size="medium"
      onLabel="I Agree to Terms and Conditions"
      offLabel="I Agree to Terms and Conditions"
      onColor="red"
      offColor="gray"
    />
    <Switch
      id="terms-switch"
      checked={isChecked}
      onChange={setIsChecked}
      size="small"
      onLabel="I Agree to Terms and Conditions"
      offLabel="I Agree to Terms and Conditions"
      onColor="green"
      offColor="blue"
    />
  </div>
</div>
`;

const usageExample = `
import Switch from "@your-org/ui-kit";

function Example() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Switch
      id="terms-switch"
      checked={agreed}
      onChange={setAgreed}
      size="medium"
      onLabel="Yes"
      offLabel="No"
      onColor="green"
      offColor="gray"
    />
  );
}
`;

export default function SwitchDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Switch</h1>
      <p className="text-gray-600">
        A toggle input that represents binary choices like Yes/No or On/Off.
        Supports custom labels, sizes, colors, and controlled state.
      </p>

      {/* View toggle */}
      <div className="flex space-x-4 font-semibold">
        {["preview", "code"].map((v) => (
          <button
            key={v}
            onClick={() => setActiveView(v as "preview" | "code")}
            className={`px-3 py-1 rounded ${
              activeView === v
                ? "bg-stone-600 text-white"
                : "text-gray-500 hover:text-stone-600"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Demo preview or code */}
      <div className="border border-stone-600 rounded-lg bg-black text-white flex justify-center p-6">
        {activeView === "preview" ? (
          <div className="p-10 flex flex-col justify-start items-center">
            <div className="flex flex-col space-y-5">
              <Switch
                id="terms-switch"
                checked={isSwitchChecked}
                onChange={setIsSwitchChecked}
                size="large"
                onLabel="I Agree to Terms and Conditions"
                offLabel="I Agree to Terms and Conditions"
                onColor="blue"
                offColor="yellow"
              />
              <Switch
                id="terms-switch"
                checked={isSwitchChecked}
                onChange={setIsSwitchChecked}
                size="medium"
                onLabel="I Agree to Terms and Conditions"
                offLabel="I Agree to Terms and Conditions"
                onColor="red"
                offColor="gray"
              />
              <Switch
                id="terms-switch"
                checked={isSwitchChecked}
                onChange={setIsSwitchChecked}
                size="small"
                onLabel="I Agree to Terms and Conditions"
                offLabel="I Agree to Terms and Conditions"
                onColor="green"
                offColor="blue"
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

      {/* Installation section */}
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

      {/* Usage section */}
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
