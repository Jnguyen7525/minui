import { useState } from "react";
import { ThemeSwitcher, ThemeProvider } from "../../components/theme";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";
import { Coffee } from "lucide-react";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
import ThemeProvider from "@your-org/ui-kit";

<ThemeProvider
  themes={{
    light: { background: "bg-white", text: "text-black" },
    dark: { background: "bg-black", text: "text-white" },
    blue: { background: "bg-blue-600", text: "text-white" },
    pink: { background: "bg-pink-200", text: "text-black" },
  }}
  defaultTheme="dark"
>
  {/* Your App Content Goes Here */}
</ThemeProvider>

// In Home.tsx in the Header or wherever you want to switch themes
import { ThemeSwitcher } from "@your-org/ui-kit";
import { Coffee } from "lucide-react";

<header className="py-2 px-7 flex items-center justify-between shadow-md border-b border-gray-600 shadow-white">
  <div className="text-xl font-semibold flex items-center justify-center relative hover:opacity-80">
    <Coffee size={50} strokeWidth={1} color="gray" />
    <span className="absolute bottom-1 text-sm font-semibold tracking-widest">
      coffeeui
    </span>
  </div>

  <div className="flex items-center justify-center space-x-5">


    <ThemeSwitcher
      triggerContent={<span>Choose Theme</span>}
      className="hover:cursor-pointer px-4 py-2 border rounded-md bg-gray-700 text-white hover:bg-gray-600"
    />
  </div>
</header>
`;

const usageExample = `
import ThemeProvider from "@your-org/ui-kit";

function App() {
  return (
    <ThemeProvider themes={...} defaultTheme="dark">
      {/* Your app routes/components */}
    </ThemeProvider>
  );
}
`;

export default function ThemeDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-6 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">ThemeProvider + ThemeSwitcher</h1>
      <p className="text-gray-600">
        A global theme wrapper that allows you to define and apply reusable
        styling themes across your app. Use <code>ThemeSwitcher</code> to swap
        active theme dynamically.
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

      {/* Preview Block */}
      <div className="border h-[400px] w-full border-stone-600 rounded-lg bg-black text-white p-5">
        {activeView === "preview" ? (
          <div className="flex h-full w-full rounded-lg overflow-hidden">
            <ThemeProvider
              themes={{
                light: { background: "bg-white", text: "text-black" },
                dark: { background: "bg-black", text: "text-white" },
                blue: { background: "bg-blue-600", text: "text-white" },
                pink: { background: "bg-pink-200", text: "text-black" },
              }}
              defaultTheme="dark"
            >
              <header className="py-2 px-7 w-full grow flex-1 flex items-center justify-between shadow-md border-b border-gray-600 shadow-white">
                <div className="text-xl font-semibold flex items-center justify-center relative hover:opacity-80">
                  <Coffee size={50} strokeWidth={1} color="gray" />
                  <span className="absolute bottom-1 text-sm font-semibold tracking-widest ">
                    coffeeui
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-5">
                  <ThemeSwitcher
                    triggerContent={<span>Choose Theme</span>}
                    className="hover:cursor-pointer px-4 py-2 border rounded-md bg-gray-700 text-white hover:bg-gray-600"
                  />
                </div>
              </header>
              <div className="p-5 font-mono">
                Current theme applied globally!
              </div>
            </ThemeProvider>
          </div>
        ) : (
          <div className="flex w-full h-full bg-stone-900 rounded-lg ">
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
        <div className="bg-stone-900 px-4 py-2 text-white text-sm rounded">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Section */}
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
