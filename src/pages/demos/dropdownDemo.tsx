import { useState } from "react";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";
import Dropdown, {
  DropdownMenu,
  DropdownTrigger,
} from "../../components/dropdown";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<Dropdown placement="bottom">
  <DropdownTrigger className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer">
    Open Menu
  </DropdownTrigger>
  <DropdownMenu
    options={[
      { key: "profile", label: "Profile", action: () => console.log("Profile") },
      { key: "logout", label: "Logout", action: () => console.log("Logout") },
    ]}
    className="bg-black border w-full rounded p-3 flex flex-col space-y-2 items-start"
  />
</Dropdown>
`;

const usageExample = `
import Dropdown, {
  DropdownMenu,
  DropdownTrigger,
} from "@your-org/ui-kit";

function Example() {
  return (
    <Dropdown placement="bottom">
      <DropdownTrigger className="px-4 py-2 bg-blue-500 text-white rounded">
        Open Menu
      </DropdownTrigger>
      <DropdownMenu
        options={[
          { key: "profile", label: "Profile", action: () => console.log("Profile") },
          { key: "logout", label: "Logout", action: () => console.log("Logout") },
        ]}
        className="bg-black border w-full rounded p-3 flex flex-col space-y-2 items-start"
      />
    </Dropdown>
  );
}
`;

export default function DropdownDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Dropdown</h1>
      <p className="text-gray-600">
        A modular dropdown component with customizable trigger and menu.
        Supports dynamic placement and flexible styling for both trigger and
        items.
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
          <div className="p-5 rounded-lg text-center h-fit w-fit  shadow-lg flex flex-col justify-start items-center pb-10">
            <div className="p-5">
              <Dropdown placement="bottom">
                <DropdownTrigger className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer">
                  Open Menu
                </DropdownTrigger>
                <DropdownMenu
                  options={[
                    {
                      key: "profile",
                      label: "Profile",
                      action: () => console.log("Profile"),
                    },
                    {
                      key: "logout",
                      label: "Logout",
                      action: () => console.log("Logout"),
                    },
                  ]}
                  className="bg-black border w-full rounded p-3 flex flex-col space-y-2 items-start"
                />
              </Dropdown>
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
