import { useState } from "react";
import Testimonial from "../../components/testimonial";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
       <div className=" rounded-lg w-full p-5 flex justify-center items-center ">
  <div className="grid gap-12 text-center md:grid-cols-2">
    <Testimonial
      name="Anna Morian"
      review="Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing elit sed ut perspiciatis unde omnis."
      avatar="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(22).jpg"
      className="p-6 shadow-md rounded-lg bg-white dark:bg-gray-800 w-[300px]"
      rating={4}
    />
    <Testimonial
      name="Teresa May"
      review="Neque cupiditate assumenda in maiores repudiandae mollitia architecto elit sed adipiscing elit."
      avatar="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(19).jpg"
      className="p-6 shadow-md rounded-lg bg-white dark:bg-gray-800 w-[300px]"
      rating={5}
    />
  </div>
</div>
`;

const usageExample = `
import Testimonial from "@your-org/ui-kit";

function Example() {
  return (
    <Testimonial
      name="Jane Doe"
      avatar="https://example.com/avatar.jpg"
      rating={5}
      review="This product exceeded my expectations. Highly recommended!"
      className="bg-white p-6 rounded-lg shadow-lg"
    />
  );
}
`;

export default function TestimonialDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Testimonial</h1>
      <p className="text-gray-600">
        A customer feedback component with name, avatar, review text, and visual
        star rating. Great for landing pages or review sections.
      </p>

      {/* View toggle */}
      <div className="flex space-x-4 font-semibold">
        {["preview", "code"].map((v) => (
          <button
            key={v}
            onClick={() => setActiveView(v as "preview" | "code")}
            className={`capitalize px-3 py-1 rounded ${
              activeView === v
                ? "bg-stone-600 text-white"
                : "text-gray-500 hover:text-stone-600"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Demo preview or code */}
      <div className="border border-stone-600 rounded-lg bg-black text-white p-6">
        {activeView === "preview" ? (
          <div className=" rounded-lg w-full p-5 flex justify-center items-center ">
            <div className="grid gap-12 text-center md:grid-cols-2">
              <Testimonial
                name="Anna Morian"
                review="Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing elit sed ut perspiciatis unde omnis."
                avatar="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(22).jpg"
                className="p-6 shadow-md rounded-lg bg-white dark:bg-gray-800 w-[300px]"
                rating={4}
              />
              <Testimonial
                name="Teresa May"
                review="Neque cupiditate assumenda in maiores repudiandae mollitia architecto elit sed adipiscing elit."
                avatar="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(19).jpg"
                className="p-6 shadow-md rounded-lg bg-white dark:bg-gray-800 w-[300px]"
                rating={5}
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

      {/* Installation section */}
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

      {/* Usage section */}
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
