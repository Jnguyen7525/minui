import { useState } from "react";
import InputOTP from "../../components/inputotp";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
  <InputOTP
    className="flex gap-2 justify-center items-center h-14"
    maxLength={6}
    onComplete={(otp) => setOtp(otp)}
  />
  {otp && <p className="mt-3 text-green-500">Entered OTP: {otp}</p>}
</div>
`;

const usageExample = `
import InputOTP from "@your-org/ui-kit";

function Example() {
  const [otp, setOtp] = useState("");

  return (
    <>
      <InputOTP
        className="flex gap-2 justify-center items-center h-14"
        maxLength={6}
        onComplete={(otp) => setOtp(otp)}
      />
      {otp && <p className="mt-3 text-green-500">Entered OTP: {otp}</p>}
    </>
  );
}
`;

export default function InputOtpDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [otp, setOtp] = useState("");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Input OTP</h1>
      <p className="text-gray-600">
        A segmented input component for entering one-time passwords (OTP).
        Supports custom length, styling, and completion callbacks.
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
          <div className="p-5 rounded-lg text-center h-fit w-fit shadow-lg flex flex-col justify-start items-center m-5">
            <InputOTP
              className="flex gap-2 justify-center items-center h-14"
              maxLength={6}
              onComplete={(otp) => setOtp(otp)}
            />
            {otp && <p className="mt-3 text-green-500">Entered OTP: {otp}</p>}
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
