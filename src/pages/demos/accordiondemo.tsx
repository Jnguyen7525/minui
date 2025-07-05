import { Accordion, AccordionItem } from "../../components/accordion";
import { useState } from "react";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
import { Accordion, AccordionItem } from "../../components/accordion";

<Accordion className="bg-black text-white">
  <AccordionItem title="What is this UI kit?" >
    This UI kit is a set of reusable components built with Tailwind CSS and React,
    designed to be fully customizable and accessible.
  </AccordionItem>
  <AccordionItem title="Is it mobile-friendly?" >
    Absolutely. All components are responsive by default and support
    mobile-first interaction patterns.
  </AccordionItem>
  <AccordionItem title="Can I use it in production?" >
    Yes, these components are built for real-world apps. Customize
    colors, animations, and behaviors easily.
  </AccordionItem>
</Accordion>
  `;

const usageExample = `import { Accordion, AccordionItem } from "@your-org/ui-kit";

function Example() {
  return (
    <Accordion>
      <AccordionItem title="First item">
        This is the first item's content.
      </AccordionItem>
      <AccordionItem title="Second item">
        This is the second item's content.
      </AccordionItem>
    </Accordion>
  );
}`;

export default function AccordionDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="flex flex-col w-full space-y-5">
      <h1 className="text-2xl font-semibold">Accordion</h1>
      <p className="text-gray-600">
        Accordions allow users to toggle the visibility of content sections.
        Useful for FAQs, nested options, or progressive disclosure.
      </p>

      {/* View Switcher */}
      <div className="flex space-x-4 font-semibold">
        {["preview", "code"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view as "preview" | "code")}
            className={`capitalize hover:cursor-pointer  ${
              activeView === view
                ? "text-white bg-stone-600 px-3 py-1 rounded"
                : "text-gray-500 hover:text-stone-600"
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Display Area */}
      <div className="flex w-full h-fit min-h-[350px] items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <Accordion className="bg-black text-white">
            <AccordionItem title="What is this UI kit?">
              This UI kit is a set of reusable components built with Tailwind
              CSS and React, designed to be fully customizable and accessible.
            </AccordionItem>
            <AccordionItem title="Is it mobile-friendly?">
              Absolutely. All components are responsive by default and support
              mobile-first interaction patterns.
            </AccordionItem>
            <AccordionItem title="Can I use it in production?">
              Yes, these components are built for real-world apps. Customize
              colors, animations, and behaviors easily.
            </AccordionItem>
          </Accordion>
        ) : (
          <CodeSnippet code={codeExample} />
        )}
      </div>

      <div className="flex flex-col space-y-4 font-semibold">
        <span className="text-xl">Installation</span>
        <div className="flex space-x-4">
          {Object.keys(installCommands).map((tool) => (
            <button
              key={tool}
              onClick={() =>
                setActiveTool(tool as keyof typeof installCommands)
              }
              className={`hover:cursor-pointer  px-3 py-1 rounded ${
                activeTool === tool
                  ? "text-white bg-stone-600"
                  : "text-gray-500 hover:text-stone-600"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>

        <div className="flex w-full bg-stone-900 rounded-lg px-4 text-white text-sm">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      <div className="flex flex-col space-y-5 font-semibold">
        <span className="text-xl">Usage</span>

        <div className="flex w-full h-fit bg-stone-900 rounded-lg p-5">
          <CodeSnippet code={usageExample} />
        </div>
      </div>
    </div>
  );
}
