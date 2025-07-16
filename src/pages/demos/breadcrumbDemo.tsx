import { useState } from "react";

import CodeSnippet from "../../components/codesnippet";
import { ChevronRight } from "lucide-react";
import Breadcrumbs from "../../components/breadcrumb";
import ScrollBox from "../../components/scrollbox";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
  <Breadcrumbs
            items={[
              {
                label: "Home",
                href: "/",
                onClick: () => setCurrentBreadcrumb("Home"),
              },
              {
                label: "Products",
                href: "/products",
                onClick: () => setCurrentBreadcrumb("Products"),
              },
              {
                label: "Shoes",
                href: "/products/shoes",
                onClick: () => setCurrentBreadcrumb("Shoes"),
              },
              {
                label: "Accessories",
                href: "/products/shoes/accessories",
                onClick: () => setCurrentBreadcrumb("Accessories"),
              },
              {
                label: "Clothes",
                href: "/products/clothes",
                onClick: () => setCurrentBreadcrumb("Clothes"),
              },
              {
                label: "Misc",
                href: "/products/misc",
                onClick: () => setCurrentBreadcrumb("Misc"),
              },
            ]}
            separator={<ChevronRight className="w-4 h-4 text-gray-400" />}
            className="bg-gradient-to-l from-blue-800 to-purple-600 text-white p-2 rounded-md flex w-full"
          />
`;

const usageExample = `
import { Breadcrumbs } from "@your-org/ui-kit";
import { ChevronRight } from "lucide-react";

function Example() {
  const [currentBreadcrumb, setCurrentBreadcrumb] = useState("Home");

  return (
  <Breadcrumbs
            items={[
              {
                label: "Home",
                href: "/",
                onClick: () => setCurrentBreadcrumb("Home"),
              },
              {
                label: "Products",
                href: "/products",
                onClick: () => setCurrentBreadcrumb("Products"),
              },
              {
                label: "Shoes",
                href: "/products/shoes",
                onClick: () => setCurrentBreadcrumb("Shoes"),
              },
              {
                label: "Accessories",
                href: "/products/shoes/accessories",
                onClick: () => setCurrentBreadcrumb("Accessories"),
              },
              {
                label: "Clothes",
                href: "/products/clothes",
                onClick: () => setCurrentBreadcrumb("Clothes"),
              },
              {
                label: "Misc",
                href: "/products/misc",
                onClick: () => setCurrentBreadcrumb("Misc"),
              },
            ]}
            separator={<ChevronRight className="w-4 h-4 text-gray-400" />}
            className="bg-gradient-to-l from-blue-800 to-purple-600 text-white p-2 rounded-md flex w-full"
          />
  );
}
`;

export default function BreadcrumbsDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [currentBreadcrumb, setCurrentBreadcrumb] = useState("Home");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Breadcrumbs</h1>
      <p className="text-gray-600">
        Breadcrumbs help users navigate hierarchical structures. Use icons,
        separators, and styles to adapt them to your design system.
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
      <div className="flex w-full min-h-[100px] items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="p-5 rounded-lg text-center h-fit w-[500px] shadow-lg m-5">
            <div className="flex flex-col text-xs sm:text-base h-full w-full space-y-5 items-center justify-center">
              <Breadcrumbs
                items={[
                  {
                    label: "Home",
                    onClick: () => setCurrentBreadcrumb("Home"),
                  },

                  {
                    label: "Shoes",
                    onClick: () => setCurrentBreadcrumb("Shoes"),
                  },
                  {
                    label: "Accessories",
                    onClick: () => setCurrentBreadcrumb("Accessories"),
                  },
                  {
                    label: "Clothes",
                    onClick: () => setCurrentBreadcrumb("Clothes"),
                  },
                ]}
                separator={<ChevronRight className="w-4 h-4 text-gray-400" />}
                className="bg-gradient-to-l from-blue-800 to-purple-600 text-white p-2 rounded-md flex w-full"
                itemStyle="underline hover:text-blue-300 hover:cursor-pointer"
                currentItemStyle="text-blue-600 font-bold"
              />
              <span className="text-sm text-gray-300">
                Current:{" "}
                <span className="font-semibold text-white">
                  {currentBreadcrumb}
                </span>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex w-full h-[400px] bg-stone-900 rounded-lg">
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
        <div className="flex w-full h-[400px] bg-stone-900 rounded-lg p-5 text-white">
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
