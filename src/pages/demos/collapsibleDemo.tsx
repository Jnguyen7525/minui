import { useState } from "react";
import {
  Collapsible,
  CollapsibleHeader,
  CollapsibleTrigger,
  CollapsibleItem,
  CollapsibleContent,
} from "../../components/collapsible";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";
import { ChevronsUpDown } from "lucide-react";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<Collapsible
  defaultOpen={false}
  selectedItem={selectedCollapsedItem}
  onSelectItem={setSelectedCollapsedItem}
  className="w-[300px]"
>
  <CollapsibleHeader className="flex w-full justify-between text-gray-500 font-semibold">
    <div>Foods</div>
    <CollapsibleTrigger className="text-gray-500 hover:opacity-80">
      <ChevronsUpDown />
    </CollapsibleTrigger>
  </CollapsibleHeader>

  <CollapsibleItem
    item={selectedCollapsedItem}
    className="border rounded-sm py-1 px-3 border-gray-500 hover:bg-gray-900"
  />

  <CollapsibleContent>
    {["Fruits", "Veggies", "Meats", "Dairy"]
      .filter((item) => item !== selectedCollapsedItem)
      .map((item) => (
        <CollapsibleItem
          key={item}
          item={item}
          className="border rounded-sm py-1 px-3 border-gray-500 hover:bg-gray-900"
        />
      ))}
  </CollapsibleContent>
</Collapsible>
`;

const usageExample = `
import {
  Collapsible,
  CollapsibleHeader,
  CollapsibleTrigger,
  CollapsibleItem,
  CollapsibleContent,
} from "@your-org/ui-kit";

function Example() {
  const [selected, setSelected] = useState("Fruits");

  return (
    <Collapsible
      defaultOpen={false}
      selectedItem={selected}
      onSelectItem={setSelected}
    >
      <CollapsibleHeader>
        <div>Foods</div>
        <CollapsibleTrigger>
          <ChevronsUpDown />
        </CollapsibleTrigger>
      </CollapsibleHeader>
      <CollapsibleItem item={selected} />
      <CollapsibleContent>
        {["Fruits", "Veggies", "Meats", "Dairy"]
          .filter((item) => item !== selected)
          .map((item) => (
            <CollapsibleItem key={item} item={item} />
          ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
`;

export default function CollapsibleDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [selectedCollapsedItem, setSelectedCollapsedItem] = useState("Fruits");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Collapsible</h1>
      <p className="text-gray-600">
        Collapsible allows sections to expand or collapse. This variant promotes
        item selection from an expandable list, placing the selected item above
        while hiding the rest until toggled.
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
          <div className="p-5 rounded-lg h-fit w-[500px] border shadow-lg">
            <h2 className="text-xl font-bold mb-5 text-center">Collapsible</h2>
            <div className="flex flex-col items-center w-full">
              <Collapsible
                defaultOpen={false}
                selectedItem={selectedCollapsedItem}
                onSelectItem={setSelectedCollapsedItem}
                className="w-[300px]"
              >
                <CollapsibleHeader className="flex w-full justify-between text-gray-500 font-semibold">
                  <div>Foods</div>
                  <CollapsibleTrigger className="text-gray-500 hover:opacity-80">
                    <ChevronsUpDown />
                  </CollapsibleTrigger>
                </CollapsibleHeader>

                <CollapsibleItem
                  item={selectedCollapsedItem}
                  className="border rounded-sm py-1 px-3 border-gray-500 hover:cursor-pointer hover:bg-gray-900"
                />

                <CollapsibleContent>
                  {["Fruits", "Veggies", "Meats", "Dairy"]
                    .filter((item) => item !== selectedCollapsedItem)
                    .map((item) => (
                      <CollapsibleItem
                        key={item}
                        item={item}
                        className="border rounded-sm py-1 px-3 border-gray-500 hover:cursor-pointer hover:bg-gray-900"
                      />
                    ))}
                </CollapsibleContent>
              </Collapsible>

              <p className="mt-4 text-gray-500">
                Selected Item: {selectedCollapsedItem}
              </p>
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
