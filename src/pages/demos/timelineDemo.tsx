import { useState } from "react";

import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";
import { Bell, ShoppingCart, CreditCard } from "lucide-react";
import { Timeline } from "../../components/timeline";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

export const events = [
  {
    id: 1,
    title: "First Step",
    description: "Start your journey with this initial step.",
    timestamp: "2025-06-01 08:00 AM",
    icon: <Bell className="w-4 h-4" />,
  },
  {
    id: 2,
    title: "Second Step",
    description: "Building upon the foundation with more advanced ideas.",
    timestamp: "2025-06-05 01:30 PM",
    icon: <ShoppingCart className="w-4 h-4" />,
  },
  {
    id: 3,
    title: "Final Step",
    description: "Culmination of your journey.",
    timestamp: "2025-06-10 06:00 PM",
    icon: <CreditCard className="w-4 h-4" />,
  },
];

const codeExample = `
 const events = [
  {
    id: 1,
    title: "First Step",
    description: "Start your journey with this initial step.",
    timestamp: "2025-06-01 08:00 AM",
    icon: <Bell className="w-4 h-4" />,
  },
  {
    id: 2,
    title: "Second Step",
    description: "Building upon the foundation with more advanced ideas.",
    timestamp: "2025-06-05 01:30 PM",
    icon: <ShoppingCart className="w-4 h-4" />,
  },
  {
    id: 3,
    title: "Final Step",
    description: "Culmination of your journey.",
    timestamp: "2025-06-10 06:00 PM",
    icon: <CreditCard className="w-4 h-4" />,
  },
];

<div className="rounded-lg text-center border shadow-lg p-5">
  <div className="flex justify-between items-start gap-10">
    {/* 🗓️ Vertical Timeline */}
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-6">🗓️ Vertical Timeline</h2>
      <Timeline
        items={events}
        withLine
        lineColor="white"
        spacing={20}
        renderIcon={(item) => (
          <span className="flex items-center justify-center w-full h-full">{item.icon}</span>
        )}
        renderContent={(item) => (
          <>
            <p className="font-semibold text-stone-700">{item.title}</p>
            <small className="text-sm">{item.timestamp}</small>
            <p className="mt-1 text-sm">{item.description}</p>
          </>
        )}
      />
    </div>

    {/* 📦 Card Timeline */}
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-6">📦 Card Timeline</h2>
      <Timeline
        items={events}
        withLine={false}
        spacing={8}
        lineColor="white"
        renderIcon={() => <span className="hidden" />}
        renderContent={(item) => (
          <div className="bg-stone-100 rounded-lg p-3 border text-left shadow-sm w-[300px]">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-700 text-white">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-stone-800">{item.title}</p>
                <small className="text-sm text-stone-500">{item.timestamp}</small>
              </div>
            </div>
            {item.description && <p className="text-sm text-stone-600">{item.description}</p>}
          </div>
        )}
      />
    </div>
  </div>
</div>
`;

const usageExample = `
import Timeline from "@your-org/ui-kit";

function Example() {
  return (
    <Timeline
      items={[
        {
          icon: <CalendarDays />,
          title: "Start",
          timestamp: "July 1",
          description: "Timeline begins",
        },
        // More events...
      ]}
      withLine
      renderIcon={(item) => <span>{item.icon}</span>}
      renderContent={(item) => (
        <div>
          <strong>{item.title}</strong>
          <p>{item.timestamp}</p>
          <p>{item.description}</p>
        </div>
      )}
    />
  );
}
`;

export default function TimelineDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-6 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Timeline</h1>
      <p className="text-gray-600">
        A flexible visual component for displaying chronological events.
        Supports vertical layouts, card styles, custom icons, and timestamp
        formatting.
      </p>

      {/* View Toggle */}
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

      {/* Demo Block */}
      <div className="border border-stone-600 rounded-lg bg-black text-white p-6">
        {activeView === "preview" ? (
          <div className="">
            <div className="flex sm:flex-row flex-col justify-evenly gap-8 items-center">
              {/* Vertical Timeline */}
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-6">🗓️ Vertical Timeline</h2>
                <Timeline
                  items={events}
                  withLine
                  lineColor="white"
                  spacing={20}
                  renderIcon={(item) => (
                    <span className="flex items-center justify-center w-full h-full">
                      {item.icon}
                    </span>
                  )}
                  renderContent={(item) => (
                    <>
                      <p className="font-semibold text-stone-700">
                        {item.title}
                      </p>
                      <small className="text-sm">{item.timestamp}</small>
                      <p className="mt-1 text-sm">{item.description}</p>
                    </>
                  )}
                />
              </div>

              {/* Card Timeline */}
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-6">📦 Card Timeline</h2>
                <Timeline
                  items={events}
                  withLine={false}
                  spacing={8}
                  lineColor="white"
                  renderIcon={() => <span className="hidden" />}
                  renderContent={(item) => (
                    <div className="bg-stone-100 rounded-lg p-3 border text-left shadow-sm w-[300px]">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-700 text-white">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-stone-800">
                            {item.title}
                          </p>
                          <small className="text-sm text-stone-500">
                            {item.timestamp}
                          </small>
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-sm text-stone-600">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
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
        <div className="bg-stone-900 text-white text-sm px-4 py-2 rounded">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage */}
      <div className="flex flex-col space-y-6 font-semibold">
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
