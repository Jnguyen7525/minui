import { useState } from "react";
import Carousel from "../../components/carousel";
import CodeSnippet from "../../components/codesnippet";
import ScrollBox from "../../components/scrollbox";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
  <Carousel
    images={[
      "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
      "https://mdbcdn.b-cdn.net/img/new/slides/042.webp",
      "https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
    ]}
    transition="slide"
    autoPlay={true}
    autoPlayInterval={4000}
    prevButton={<ChevronLeft size={50} className="hover:cursor-pointer" />}
    nextButton={<ChevronRight size={50} className="hover:cursor-pointer" />}
    indicatorItem={(index, isActive) => (
      <Circle
        key={index}
        size={16}
        className={\`hover:cursor-pointer \${isActive ? "bg-blue-500" : "bg-white"} rounded-full\`}
      />
    )}
  />
`;

const usageExample = `
import { Carousel } from "@your-org/ui-kit";

function Example() {
  return (
    <Carousel
      images={[
        "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
        "https://mdbcdn.b-cdn.net/img/new/slides/042.webp",
        "https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
      ]}
      transition="fade"
      autoPlay
      autoPlayInterval={4000}
      prevButton={<ChevronLeft size={50} />}
      nextButton={<ChevronRight size={50} />}
      indicatorItem={(i, active) => (
        <Circle
          key={i}
          size={16}
          className={\`\${active ? "bg-blue-500" : "bg-white"} rounded-full\`}
        />
      )}
    />
  );
}
`;

export default function CarouselDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Carousel</h1>
      <p className="text-gray-600">
        Carousel displays a sequence of images with optional auto play, sliding
        or fading transitions, and custom indicators and controls.
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
          <div className="flex flex-col items-center space-y-8 p-5 w-full h-[650px]">
            {/* Slide Transition */}
            <Carousel
              images={[
                "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
                "https://mdbcdn.b-cdn.net/img/new/slides/042.webp",
                "https://mdbcdn.b-cdn.net/img/new/slides/043.webp",
              ]}
              transition="slide"
              autoPlay={true}
              autoPlayInterval={4000}
              prevButton={
                <ChevronLeft size={50} className="hover:cursor-pointer" />
              }
              nextButton={
                <ChevronRight size={50} className="hover:cursor-pointer" />
              }
              indicatorItem={(index, isActive) => (
                <Circle
                  key={index}
                  size={16}
                  className={`hover:cursor-pointer ${
                    isActive ? "bg-blue-500" : "bg-white"
                  } rounded-full`}
                />
              )}
            />

            {/* Fade Transition */}
            <Carousel
              images={[
                "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
                "https://mdbcdn.b-cdn.net/img/new/slides/042.webp",
                "https://mdbcdn.b-cdn.net/img/new/slides/043.webp",
              ]}
              transition="fade"
              autoPlay={true}
              autoPlayInterval={4000}
              prevButton={
                <ChevronLeft size={50} className="hover:cursor-pointer" />
              }
              nextButton={
                <ChevronRight size={50} className="hover:cursor-pointer" />
              }
              indicatorItem={(index, isActive) => (
                <Circle
                  key={index}
                  size={16}
                  className={`hover:cursor-pointer ${
                    isActive ? "bg-blue-500" : "bg-white"
                  } rounded-full`}
                />
              )}
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
