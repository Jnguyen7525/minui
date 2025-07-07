import { useState } from "react";
import Badge from "../../components/badge";
import Avatar from "../../components/avatar";
import CodeSnippet from "../../components/codesnippet";
import { ShoppingBag } from "lucide-react";
import firstAvatar from "../../assets/scared-cartoon-people-scared-face-clip-art-black-and-white--m2i8H7b1d3d3A0Z5.jpg";
import secondAvatar from "../../assets/batman_hero_avatar_comics-512.webp";
import thirdAvatar from "../../assets/avatar-icon-512x512-nktgi1ew.png";
import ScrollBox from "../../components/scrollbox";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<Badge content="1" placement="top-right" size="lg" className="bg-blue-500" onClick={() => alert("hi")}>
  <Avatar src={firstAvatar} size="xl" className="border-2" />
</Badge>

<Badge placement="bottom-right" size="lg" className="bg-red-500" onClick={() => alert("i'm batman")}>
  <Avatar src={secondAvatar} size="lg" className="border-2" />
</Badge>

<Badge content="" placement="bottom-right" className="bg-green-500">
  <Avatar src={thirdAvatar} size="md" className="border-2" />
</Badge>

<Badge content={<span>🔥</span>} placement="top-left" className="bg-transparent" offsetY={6}>
  <Avatar name="John" size="sm" className="border-2" />
</Badge>

<Badge content={"2"} placement="top-right" className="bg-blue-500" offsetX={6} offsetY={6}>
  <ShoppingBag className="size-8 text-white" />
</Badge>
`;

const usageExample = `import { Badge, Avatar } from "@your-org/ui-kit";
import { ShoppingBag } from "lucide-react";

function Example() {
  return (
    <div className="flex space-x-4">
      <Badge content="3">
        <Avatar src="/avatars/avatar1.png" size="lg" />
      </Badge>

      <Badge content={<span>🔥</span>} placement="top-left">
        <Avatar name="Ava" size="sm" />
      </Badge>

      <Badge content="9+" placement="bottom-right">
        <ShoppingBag className="size-8" />
      </Badge>
    </div>
  );
}
`;

export default function BadgeDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Badge</h1>
      <p className="text-gray-600">
        Badges are small markers used to show alerts, counts, or status
        indicators. Wrap avatars, icons, or buttons to draw extra attention.
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
      <div className="flex w-full h-fit min-h-[250px] items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="flex h-full w-full space-x-5 items-center justify-center">
            <Badge
              content="1"
              placement="top-right"
              size="lg"
              className="bg-blue-500"
              onClick={() => alert("hi")}
            >
              <Avatar src={firstAvatar} size="xl" className="border-2" />
            </Badge>

            <Badge
              placement="bottom-right"
              size="lg"
              className="bg-red-500"
              onClick={() => alert("i'm batman")}
            >
              <Avatar src={secondAvatar} size="lg" className="border-2" />
            </Badge>

            <Badge content="" placement="bottom-right" className="bg-green-500">
              <Avatar src={thirdAvatar} size="md" className="border-2" />
            </Badge>

            <Badge
              content={<span>🔥</span>}
              placement="top-left"
              className="bg-transparent"
              offsetY={6}
            >
              <Avatar name="John" size="sm" className="border-2" />
            </Badge>

            <Badge
              content={"2"}
              placement="top-right"
              className="bg-blue-500"
              offsetX={6}
              offsetY={6}
            >
              <ShoppingBag className="size-8 text-white" />
            </Badge>
          </div>
        ) : (
          <div className="flex w-full h-full bg-stone-900 rounded-lg">
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
