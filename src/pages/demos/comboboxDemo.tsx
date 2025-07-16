import { useState } from "react";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxDropdown,
} from "../../components/combobox";
import CodeSnippet from "../../components/codesnippet";
import ScrollBox from "../../components/scrollbox";
import { ChevronsUpDown } from "lucide-react";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<Combobox
  options={[
    { key: "next.js", label: "Next.js" },
    { key: "sveltekit", label: "SvelteKit" },
    { key: "nuxt.js", label: "Nuxt.js" },
    { key: "remix", label: "Remix" },
    { key: "astro", label: "Astro" },
  ]}
  onSelect={(key, label) => {
    alert(\`You selected: \${label} (\${key})\`);
  }}
  className="w-64"
>
  <ComboboxTrigger className="flex items-center justify-between w-full p-2 border rounded-md bg-gray-800 text-white">
    <ChevronsUpDown className="opacity-50 inline-block ml-2 hover:cursor-pointer" />
  </ComboboxTrigger>
  <ComboboxDropdown className="w-full mt-2 z-50 rounded-md shadow-lg bg-black" />
</Combobox>
`;

const usageExample = `
import {
  Combobox,
  ComboboxTrigger,
  ComboboxDropdown,
} from "@your-org/ui-kit";

function Example() {
  return (
    <Combobox
      options={[
        { key: "next.js", label: "Next.js" },
        { key: "sveltekit", label: "SvelteKit" },
        { key: "nuxt.js", label: "Nuxt.js" },
        { key: "remix", label: "Remix" },
        { key: "astro", label: "Astro" },
      ]}
      onSelect={(key, label) => {
        console.log(\`Selected: \${label} (\${key})\`);
      }}
      className="w-64"
    >
      <ComboboxTrigger className="flex items-center justify-between w-full p-2 border rounded-md bg-gray-800 text-white">
        <ChevronsUpDown className="opacity-50 inline-block ml-2 hover:cursor-pointer" />
      </ComboboxTrigger>
      <ComboboxDropdown className="w-full mt-2 z-50 rounded-md shadow-lg bg-black" />
    </Combobox>
  );
}
`;

export default function ComboboxDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Combobox</h1>
      <p className="text-gray-600">
        Combobox lets users select from a searchable dropdown of options. Built
        with modular components for styling and behavior, including an
        integrated search input, trigger, and selectable list.
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
      <div className="flex w-full items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white min-h-[250px]">
        {activeView === "preview" ? (
          <div className="p-5 rounded-lg text-center h-fit w-fit shadow-lg flex flex-col justify-start items-center pb-10">
            <h1 className="text-lg font-bold mb-4">Select a Framework</h1>
            <Combobox
              options={[
                { key: "next.js", label: "Next.js" },
                { key: "sveltekit", label: "SvelteKit" },
                { key: "nuxt.js", label: "Nuxt.js" },
                { key: "remix", label: "Remix" },
                { key: "astro", label: "Astro" },
              ]}
              onSelect={(key, label) => {
                alert(`You selected: ${label} (${key})`);
              }}
              className="w-64"
            >
              <ComboboxTrigger className="flex items-center justify-between w-full p-2 border rounded-md bg-gray-800 text-white">
                <ChevronsUpDown className="opacity-50 inline-block ml-2 hover:cursor-pointer" />
              </ComboboxTrigger>
              <ComboboxDropdown className="w-full mt-2 z-20 rounded-md shadow-lg bg-black" />
            </Combobox>
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
