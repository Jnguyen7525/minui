import { useState } from "react";
import Calendar from "../../components/calendar";
import CodeSnippet from "../../components/codesnippet";
import ScrollBox from "../../components/scrollbox";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
    <Calendar
      selectedDates={selectedCalendarDate}
      onDateSelect={setSelectedCalendarDate}
      selectionType="range"
      className="p-3 rounded-lg bg-gray-900"
    />
    {selectedCalendarDate && selectedCalendarDate.length > 0 && (
      <p className="text-gray-500">
        {selectedCalendarDate.length === 1
          ? \`Selected Date: \${selectedCalendarDate[0].toDateString()}\`
          : \`Selected Dates: \${selectedCalendarDate[0].toDateString()} – \${selectedCalendarDate[1].toDateString()}\`}
      </p>
    )}
`;

const usageExample = `
import { Calendar } from "@your-org/ui-kit";

function Example() {
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>();

  return (
    <Calendar
      selectedDates={selectedDates}
      onDateSelect={setSelectedDates}
      selectionType="range"
      className="p-4 bg-gray-800 rounded-lg"
    />
  );
}
`;

export default function CalendarDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<
    Date[] | undefined
  >();

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Calendar</h1>
      <p className="text-gray-600">
        Calendar allows users to select dates interactively. It supports both
        single and range selection, with dynamic styling and preview feedback
        while adjusting ranges.
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
      <div className="flex w-full min-h-[250px] items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="p-5 rounded-lg text-center h-fit w-[300px] border shadow-lg m-5 underline-offset-2">
            <h2 className="text-xl font-bold mb-5">Calendar</h2>
            <div className="flex flex-col h-full w-full space-y-5 items-center justify-center">
              <Calendar
                selectedDates={selectedCalendarDate}
                onDateSelect={setSelectedCalendarDate}
                selectionType="range"
                className="p-3 rounded-lg bg-gray-900"
              />
              {selectedCalendarDate && selectedCalendarDate.length > 0 && (
                <p className="text-gray-500">
                  {selectedCalendarDate.length === 1
                    ? `Selected Date: ${selectedCalendarDate[0].toDateString()}`
                    : `Selected Dates: ${selectedCalendarDate[0].toDateString()} – ${selectedCalendarDate[1].toDateString()}`}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex w-full  bg-stone-900 rounded-lg">
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
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
