import { useState } from "react";
import Rating from "../../components/rating";
import { Star } from "lucide-react";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
  const [rating, setRating] = useState(3);


  <div className="p-5 space-y-5">
    <h2 className="text-xl font-bold">Interactive Star Rating</h2>
    <Rating
      value={rating}
      maxRating={5}
      icon={<Star />}
      activeColor="yellow"
      inactiveColor="gray"
      onChange={setRating}
    />
    <p className="mt-4 text-gray-700">Current rating: {rating}</p>
  </div>

  <div className="p-5 space-y-5">
    <h2 className="text-xl font-bold">Read-Only Star Rating</h2>
    <Rating
      value={4}
      maxRating={5}
      icon={<Star />}
      activeColor="blue"
      inactiveColor="white"
      readOnly
    />
    <p className="mt-4 text-gray-700">This rating is set to 4 stars.</p>
  </div>

`;

const usageExample = `
import Rating from "@your-org/ui-kit";
import { Star } from "lucide-react";

function Example() {
  const [rating, setRating] = useState(3);

  return (
    <Rating
      value={rating}
      maxRating={5}
      icon={<Star />}
      activeColor="green"
      inactiveColor="gray"
      onChange={setRating}
    />
  );
}
`;

export default function RatingDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [rating, setRating] = useState(3);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Rating</h1>
      <p className="text-gray-600">
        A star-based rating component supporting controlled state, custom icons,
        color variants, and read-only mode. Ideal for product or review
        interfaces.
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

      {/* Demo Preview */}
      <div className="flex w-full items-center justify-center p-6 border border-stone-600 bg-black text-white rounded-lg">
        {activeView === "preview" ? (
          <div className="">
            <div className="p-5 space-y-5">
              <h2 className="text-xl font-bold">Interactive Star Rating</h2>
              <Rating
                value={rating}
                maxRating={5}
                icon={<Star />}
                activeColor="yellow"
                inactiveColor="gray"
                onChange={setRating}
              />
              <p className="mt-4 text-gray-300">Current rating: {rating}</p>
            </div>

            <div className="p-5 space-y-5">
              <h2 className="text-xl font-bold">Read-Only Star Rating</h2>
              <Rating
                value={4}
                maxRating={5}
                icon={<Star />}
                activeColor="blue"
                inactiveColor="white"
                readOnly
              />
              <p className="mt-4 text-gray-300">
                This rating is set to 4 stars.
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
                  ? "bg-stone-600 text-white"
                  : "text-gray-500 hover:text-stone-600"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
        <div className="bg-stone-900 px-4 py-2 text-white text-sm rounded-lg">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage */}
      <div className="flex flex-col space-y-5 font-semibold">
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
