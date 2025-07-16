import { useState } from "react";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";
import Tabs from "../../components/tab";
import { Code, FireExtinguisher } from "lucide-react";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

export const myTabs = [
  {
    id: "html",
    label: (
      <div className="flex items-center justify-center space-x-1 hover:cursor-pointer">
        <span>HTML</span> <Code size={16} />
      </div>
    ),
    content: <p>HTML Content</p>,
  },
  {
    id: "react",
    label: (
      <div className="flex items-center justify-center space-x-1 hover:cursor-pointer">
        <span>React</span> <FireExtinguisher size={16} />
      </div>
    ),
    content: <p>React Content</p>,
  },
];

const codeExample = `
export const myTabs = [
  {
    id: "html",
    label: (
      <div className="flex items-center justify-center space-x-1 hover:cursor-pointer">
        <span>HTML</span> <Code size={16} />
      </div>
    ),
    content: <p>HTML Content</p>,
  },
  {
    id: "react",
    label: (
      <div className="flex items-center justify-center space-x-1 hover:cursor-pointer">
        <span>React</span> <FireExtinguisher size={16} />
      </div>
    ),
    content: <p>React Content</p>,
  },
];

 const [selectedTab, setSelectedTab] = useState("html");

<div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col items-center m-5">
  <h2 className="text-xl font-bold mb-5">Tab</h2>
  <div className="flex flex-col space-y-5 w-[350px]">
    <Tabs
      tabs={myTabs}
      variant="underlined"
      activeTab={selectedTab}
      onTabChange={setSelectedTab}
      className="bg-blue-500"
    />
    <Tabs
      tabs={myTabs}
      variant="solid"
      activeTab={selectedTab}
      onTabChange={setSelectedTab}
      className="bg-blue-500"
    />
    <Tabs
      tabs={myTabs}
      variant="solid"
      activeTab={selectedTab}
      onTabChange={setSelectedTab}
      className="flex border rounded-lg p-2 bg-blue-500"
    />
  </div>
</div>
`;

const usageExample = `
import Tabs from "@your-org/ui-kit";

function Example() {
  const [selectedTab, setSelectedTab] = useState("Overview");

  return (
    <Tabs
      tabs={["Overview", "Features", "Pricing"]}
      variant="underlined"
      activeTab={selectedTab}
      onTabChange={setSelectedTab}
      className="bg-gray-200"
    />
  );
}
`;

export default function TabsDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [selectedTab, setSelectedTab] = useState("html");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Tabs</h1>
      <p className="text-gray-600">
        A customizable tab navigation component with support for underlined and
        filled styles. Easily switch between views with state-controlled
        interaction.
      </p>

      {/* View toggle */}
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

      {/* Demo */}
      <div className="flex w-full justify-center items-center border border-stone-600 rounded-lg bg-black text-white p-6">
        {activeView === "preview" ? (
          <div className="p-5 rounded-lg text-center h-fit w-full flex flex-col justify-start items-center">
            <div className="flex flex-col space-y-5 w-[200px]">
              <Tabs
                tabs={myTabs}
                variant="underlined"
                activeTab={selectedTab}
                onTabChange={setSelectedTab}
                className="bg-blue-500"
              />
              <Tabs
                tabs={myTabs}
                variant="solid"
                activeTab={selectedTab}
                onTabChange={setSelectedTab}
                className="bg-blue-500"
              />
              <Tabs
                tabs={myTabs}
                variant="solid"
                activeTab={selectedTab}
                onTabChange={setSelectedTab}
                className="flex border rounded-lg p-2 bg-blue-500"
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
        <div className="bg-stone-900 text-white px-4 py-2 rounded text-sm">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage */}
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
