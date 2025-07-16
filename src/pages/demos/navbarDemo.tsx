import { useState } from "react";
import { Box, HomeIcon, List, Menu } from "lucide-react";
import Navbar from "../../components/navbar";
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
  <div className="flex flex-col space-y-5 w-fit">
    <Navbar
      items={[
        { label: "Home", href: "/", icon: <HomeIcon size={20} /> },
        {
            label: "Categories",
            icon: <List size={20} />,
            submenu: [
            { label: "Technology", href: "/category/technology" },
            { label: "Science", href: "/category/science" },
            ],
        },
        { label: "Products", href: "/products", icon: <Box size={20} /> },
        ]}
      logo={<Menu size={24} />}
      className="bg-black border p-4 gap-5 rounded-md"
    />
  </div>
</div>
`;

const usageExample = `
import Navbar from "@your-org/ui-kit";
import { Menu } from "lucide-react";

const navbarItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

function Example() {
  return (
    <Navbar
      items={navbarItems}
      logo={<Menu size={24} />}
      className="bg-black border p-4 gap-5 rounded-md"
    />
  );
}
`;

const navbarItems = [
  { label: "Home", href: "/", icon: <HomeIcon size={20} /> },
  {
    label: "Categories",
    icon: <List size={20} />,
    submenu: [
      { label: "Technology", href: "/category/technology" },
      { label: "Science", href: "/category/science" },
    ],
  },
  { label: "Products", href: "/products", icon: <Box size={20} /> },
];

export default function NavbarDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Navbar</h1>
      <p className="text-gray-600">
        A responsive navigation bar component with customizable logo, links, and
        styling. Easily integrate into layouts and add dynamic routing or
        actions.
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

      {/* Demo */}
      <div className="flex w-full items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="p-10 rounded-lg text-center h-fit w-fit  flex flex-col items-center">
            <div className="flex flex-col space-y-5 w-fit">
              <Navbar
                items={navbarItems}
                logo={<Menu size={24} />}
                className="bg-black  p-4 gap-3 rounded-md"
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
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage */}
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
