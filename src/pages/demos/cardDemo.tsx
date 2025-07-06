import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardAction,
} from "../../components/card";
import CodeSnippet from "../../components/codesnippet";
import { Heart, Play, ShoppingCart, SkipBack, SkipForward } from "lucide-react";
import cardImgOne from "../../assets/musical-notes-frame-with-text-space_1017-32857.avif";
import cardImgTwo from "../../assets/photo-1559181567-c3190ca9959b.jpeg";
import ScrollBox from "../../components/scrollbox";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<Card
    shadow="lg"
    radius="md"
    className="bg-gray-900 text-white flex flex-col space-y-3 items-center justify-center w-[300px] h-full border-[1px] p-4"
    >
    <CardHeader className="bg-gray-900 text-center flex w-full justify-start">
    <p>Login to your account</p>
    </CardHeader>
    <CardContent className="bg-gray-900 items-center justify-start flex w-full">
    <form className="flex flex-col space-y-2 w-full">
        <input
        type="email"
        placeholder="Email"
        className="p-2 text-white border-b border-gray-600"
        />
        <input
        type="password"
        placeholder="Password"
        className="p-2 text-white border-b border-gray-600"
        />
    </form>
    </CardContent>
    <CardFooter className="bg-gray-900 text-white text-xs flex w-full justify-start -my-2 py-2 hover:cursor-pointer hover:text-blue-500">
    Forgot password?
    </CardFooter>
    <CardAction className="bg-gray-900 p-2 w-full flex flex-col space-y-2 mt-2">
    <button className="bg-blue-700 text-white px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-blue-600">
        Login
    </button>
    <p className="bg-gray-900 text-white text-xs flex w-full justify-center -my-2 py-2 hover:cursor-pointer hover:text-blue-500">
        Create account
    </p>
    </CardAction>
</Card>
<Card
    shadow="md"
    radius="lg"
    className="relative w-[300px] h-[200px] p-4 text-white overflow-hidden bg-gray-900"
>
    <img
    src={cardImgOne}
    alt="Album Art"
    className="absolute inset-0 w-full h-full object-cover opacity-50"
    />
    <button className="absolute top-4 right-4 text-white hover:text-red-500 hover:cursor-pointer z-50">
    <Heart size={24} />
    </button>
    <div className="relative z-10 flex flex-col items-center p-4">
    <CardHeader className="flex items-center gap-3 w-full justify-center">
        <div className="text-center">
        <p className="font-bold text-lg">DailyMix</p>
        <p className="text-gray-300 text-sm">Radio</p>
        </div>
    </CardHeader>
    <CardAction className="flex items-center justify-between mt-4 w-full px-4">
        <button className="text-white text-xl hover:opacity-50 hover:cursor-pointer">
        <SkipBack size={24} />
        </button>
        <button className="text-white px-4 py-2 rounded-full hover:opacity-50 hover:cursor-pointer">
        <Play size={24} />
        </button>
        <button className="text-white text-xl hover:opacity-50 hover:cursor-pointer">
        <SkipForward size={24} />
        </button>
    </CardAction>
    </div>
</Card>
<Card
    shadow="lg"
    radius="md"
    className="bg-gray-900 p-4 w-[300px] h-[300px] flex flex-col"
    onClick={() => console.log("Cherry Card Pressed")}
>
    <CardContent className="flex flex-col items-center">
    <img
        src={cardImgTwo}
        alt="Nike Shoes"
        className="rounded-md w-[200px] h-[200px]"
    />
    <div className="flex w-full justify-between items-center mt-2">
        <p className="text-gray-300 font-semibold">Cherry</p>
        <p className="text-gray-600 font-bold">$9.99</p>
    </div>
    </CardContent>
    <CardAction className="w-full flex justify-center mt-1">
    <button className="text-white px-2 py-1 hover:text-blue-600 hover:cursor-pointer">
        <ShoppingCart size={20} />
    </button>
    </CardAction>
</Card>
`;

const usageExample = `
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardAction,
} from "@your-org/ui-kit";

function Example() {
  return (
    <Card className="w-[300px] p-4 bg-gray-900 text-white">
      <CardHeader>Title</CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter>Footer</CardFooter>
      <CardAction>
        <button>Click Me</button>
      </CardAction>
    </Card>
  );
}
`;

export default function CardDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Card</h1>
      <p className="text-gray-600">
        Cards organize content into structured panels. Use headers, footers,
        actions, and media to showcase interactive sections or grouped
        information.
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
      <div className="flex w-full  items-center justify-center border rounded-lg p-5 overflow-auto">
        {activeView === "preview" ? (
          <div className="flex flex-wrap gap-5 items-center justify-center">
            {/* Login Card */}
            <Card
              shadow="lg"
              radius="md"
              className="bg-gray-900 text-white flex flex-col space-y-3 items-center justify-center w-[300px] h-full border-[1px] p-4"
            >
              <CardHeader className="bg-gray-900 text-center flex w-full justify-start">
                <p>Login to your account</p>
              </CardHeader>
              <CardContent className="bg-gray-900 items-center justify-start flex w-full">
                <form className="flex flex-col space-y-2 w-full">
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-2 text-white border-b border-gray-600"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="p-2 text-white border-b border-gray-600"
                  />
                </form>
              </CardContent>
              <CardFooter className="bg-gray-900 text-white text-xs flex w-full justify-start -my-2 py-2 hover:cursor-pointer hover:text-blue-500">
                Forgot password?
              </CardFooter>
              <CardAction className="bg-gray-900 p-2 w-full flex flex-col space-y-2 mt-2">
                <button className="bg-blue-700 text-white px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-blue-600">
                  Login
                </button>
                <p className="bg-gray-900 text-white text-xs flex w-full justify-center -my-2 py-2 hover:cursor-pointer hover:text-blue-500">
                  Create account
                </p>
              </CardAction>
            </Card>

            {/* Spotify Card */}
            <Card
              shadow="md"
              radius="lg"
              className="relative w-[300px] h-[200px] p-4 text-white overflow-hidden bg-gray-900"
            >
              <img
                src={cardImgOne}
                alt="Album Art"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <button className="absolute top-4 right-4 text-white hover:text-red-500 hover:cursor-pointer z-50">
                <Heart size={24} />
              </button>
              <div className="relative z-10 flex flex-col items-center p-4">
                <CardHeader className="flex items-center gap-3 w-full justify-center">
                  <div className="text-center">
                    <p className="font-bold text-lg">DailyMix</p>
                    <p className="text-gray-300 text-sm">Radio</p>
                  </div>
                </CardHeader>
                <CardAction className="flex items-center justify-between mt-4 w-full px-4">
                  <button className="text-white text-xl hover:opacity-50 hover:cursor-pointer">
                    <SkipBack size={24} />
                  </button>
                  <button className="text-white px-4 py-2 rounded-full hover:opacity-50 hover:cursor-pointer">
                    <Play size={24} />
                  </button>
                  <button className="text-white text-xl hover:opacity-50 hover:cursor-pointer">
                    <SkipForward size={24} />
                  </button>
                </CardAction>
              </div>
            </Card>

            {/* E-commerce Card */}
            <Card
              shadow="lg"
              radius="md"
              className="bg-gray-900 p-4 w-[300px] h-[300px] flex flex-col"
              onClick={() => console.log("Cherry Card Pressed")}
            >
              <CardContent className="flex flex-col items-center">
                <img
                  src={cardImgTwo}
                  alt="Nike Shoes"
                  className="rounded-md w-[200px] h-[200px]"
                />
                <div className="flex w-full justify-between items-center mt-2">
                  <p className="text-gray-300 font-semibold">Cherry</p>
                  <p className="text-gray-600 font-bold">$9.99</p>
                </div>
              </CardContent>
              <CardAction className="w-full flex justify-center mt-1">
                <button className="text-white px-2 py-1 hover:text-blue-600 hover:cursor-pointer">
                  <ShoppingCart size={20} />
                </button>
              </CardAction>
            </Card>
          </div>
        ) : (
          <div className="flex w-full bg-stone-900 rounded-lg ">
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
        <div className="flex w-full bg-stone-900 rounded-lg px-4 text-white text-sm">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Section */}
      <div className="flex flex-col space-y-5 font-semibold">
        <span className="text-xl">Usage</span>
        <div className="flex w-full bg-stone-900 rounded-lg p-5 text-white">
          {/* <CodeSnippet code={usageExample.trim()} /> */}
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
            <CodeSnippet code={usageExample.trim()} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
