import { useState } from "react";
import Lightbox from "../../components/lightbox";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const sampleImages = [
  "https://tecdn.b-cdn.net/img/new/slides/041.webp",
  "https://tecdn.b-cdn.net/img/new/slides/042.webp",
  "https://tecdn.b-cdn.net/img/new/slides/043.webp",
  "https://tecdn.b-cdn.net/img/new/slides/044.webp",
  "https://tecdn.b-cdn.net/img/new/slides/045.webp",
];

const codeExample = `
<div className="p-5 m-5 pb-10 rounded-lg text-center h-fit w-[500px] border shadow-lg flex flex-col justify-start items-center">
  <Lightbox
    images={sampleImages}
    className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
  />
</div>
`;

const usageExample = `
import Lightbox from "@your-org/ui-kit";

const images = [
  "https://your-cdn.com/img1.jpg",
  "https://your-cdn.com/img2.jpg",
  "https://your-cdn.com/img3.jpg",
];

function Example() {
  return (
    <Lightbox
      images={images}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
    />
  );
}
`;

export default function LightboxDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Lightbox</h1>
      <p className="text-gray-600">
        A responsive gallery component that displays images in a grid and opens
        full-screen previews on click. Optimized for mobile and desktop
        interactions.
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

      {/* Demo Area */}
      <div className="flex w-full justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="p-5 m-5 pb-10 rounded-lg text-center h-fit w-[500px] border shadow-lg flex flex-col justify-start items-center">
            <h2 className="text-xl font-bold mb-5">Lightbox</h2>
            <Lightbox
              images={sampleImages}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
            />
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
        <div className="bg-stone-900 rounded-lg px-4 py-2 text-white text-sm">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Section */}
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
