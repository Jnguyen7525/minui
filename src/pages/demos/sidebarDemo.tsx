import { useState } from "react";
import Sidebar from "../../components/sidebar";
import ScrollBox from "../../components/scrollbox";
import Placeholder from "../../components/placeholder";
import CodeSnippet from "../../components/codesnippet";
import {
  X,
  Inbox,
  Send,
  FileText,
  Pencil,
  Archive,
  Trash2,
} from "lucide-react";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
const [openSidebar, setOpenSidebar] = useState(true);
          <div className="w-full h-full grid grid-cols-[min-content_auto]  bg-black border">

            <Sidebar
              isOpen={openSidebar}
              onOpenChange={setOpenSidebar}
              minWidth={280}
              maxWidth={480}
              defaultWidth={350}
              // handleStyle=" border-stone-600 rounded-full border-2"
              resizable={true}
              className="w-full "
              trigger={
                <div className="flex h-full items-center justify-center w-full">
                  {openSidebar ? (
                    <button>
                      <X
                        size={28}
                        className="absolute flex w-fit right-5 top-3 cursor-pointer shadow text-stone-800 bg-stone-200 hover:cursor-pointer z-50 hover:bg-stone-400 hover:text-stone-600 rounded-full border p-1"
                      />
                    </button>
                  ) : (
                    <button className="flex flex-col items-center justify-center w-[130px] cursor-pointer shadow text-stone-800 bg-stone-200 hover:bg-stone-400 hover:text-stone-600 rounded-lg border py-1 px-2 ml-5 mt-5">
                      Toggle Sidebar
                    </button>
                  )}
                </div>
              }
            >
              <div className="w-full h-full flex flex-col border-r  overflow-hidden">
                <div className="w-[calc(100%-16px)] rounded m-2 mx-4 mb-0 mt-3 h-max">
                  <p className="font-sans antialiased text-base text-current font-semibold">
                    Sidebar
                  </p>
                </div>

                <div className="w-full h-max rounded p-3">
                  <ul className="flex flex-col gap-0.5 min-w-60">
                    <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                      <span className="grid place-items-center shrink-0 me-2.5">
                        <Inbox size={18} />
                      </span>
                      Inbox
                      <span className="grid place-items-center shrink-0 ps-2.5 ms-auto">
                        <div className="relative inline-flex items-center border font-sans font-medium rounded-md text-xs px-2 py-0.5 bg-stone-800/10 border-transparent text-stone-500 shadow-none">
                          14
                        </div>
                      </span>
                    </li>

                    <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                      <span className="grid place-items-center shrink-0 me-2.5">
                        <Send size={18} />
                      </span>
                      Sent
                    </li>

                    <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                      <span className="grid place-items-center shrink-0 me-2.5">
                        <FileText size={18} />
                      </span>
                      Drafts
                    </li>

                    <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                      <span className="grid place-items-center shrink-0 me-2.5">
                        <Pencil size={18} />
                      </span>
                      Pins
                    </li>

                    <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                      <span className="grid place-items-center shrink-0 me-2.5">
                        <Archive size={18} />
                      </span>
                      Archive
                    </li>

                    <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                      <span className="grid place-items-center shrink-0 me-2.5">
                        <Trash2 size={18} />
                      </span>
                      Trash
                    </li>
                  </ul>
                </div>
              </div>
            </Sidebar>

            <div className="p-5 ">
              <h1>Main Content</h1>
              <div className="flex flex-col space-y-4 w-full h-full mt-5">
                <Placeholder className="bg-stone-800 rounded-lg h-3/5 w-full" />

                <Placeholder className="bg-stone-800 rounded-lg h-1/5 w-full" />
              </div>
            </div>
          </div>
`;

const usageExample = `
import Sidebar from "@your-org/ui-kit";
import { Inbox } from "lucide-react";

function Example() {
  const [open, setOpen] = useState(true);

  return (
    <Sidebar
      isOpen={open}
      onOpenChange={setOpen}
      defaultWidth={300}
      trigger={<button onClick={() => setOpen(!open)}>Toggle</button>}
    >
      <div className="p-4">
        <Inbox /> Inbox
      </div>
    </Sidebar>
  );
}
`;

export default function SidebarDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Sidebar</h1>
      <p className="text-gray-600">
        A collapsible sidebar component with configurable width, custom trigger,
        and optional resizing. Great for navigation menus or drawer-based
        panels.
      </p>

      {/* View switcher */}
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

      {/* Demo panel */}
      <div className="flex w-full items-center justify-center rounded-lg bg-black text-white h-[400px]">
        {activeView === "preview" ? (
          <div className="rounded-lg text-center h-96 w-full border shadow-lg flex flex-col justify-start items-center">
            <div className="w-full h-full grid grid-cols-[min-content_auto]  bg-black border">
              <Sidebar
                isOpen={openSidebar}
                onOpenChange={setOpenSidebar}
                minWidth={280}
                maxWidth={480}
                defaultWidth={350}
                // handleStyle=" border-stone-600 rounded-full border-2"
                resizable={true}
                className="w-full "
                trigger={
                  <div className="flex h-full items-center justify-center w-full">
                    {openSidebar ? (
                      <button>
                        <X
                          size={28}
                          className="absolute flex w-fit right-5 top-3 cursor-pointer shadow text-stone-800 bg-stone-200 hover:cursor-pointer z-50 hover:bg-stone-400 hover:text-stone-600 rounded-full border p-1"
                        />
                      </button>
                    ) : (
                      <button className="flex flex-col items-center justify-center w-[130px] cursor-pointer shadow text-stone-800 bg-stone-200 hover:bg-stone-400 hover:text-stone-600 rounded-lg border py-1 px-2 ml-5 mt-5">
                        Toggle Sidebar
                      </button>
                    )}
                  </div>
                }
              >
                <div className="w-full h-full flex flex-col border-r  overflow-hidden">
                  <div className="w-[calc(100%-16px)] rounded m-2 mx-4 mb-0 mt-3 h-max">
                    <p className="font-sans antialiased text-base text-current font-semibold">
                      Sidebar
                    </p>
                  </div>

                  <div className="w-full h-max rounded p-3">
                    <ul className="flex flex-col gap-0.5 min-w-60">
                      <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                        <span className="grid place-items-center shrink-0 me-2.5">
                          <Inbox size={18} />
                        </span>
                        Inbox
                        <span className="grid place-items-center shrink-0 ps-2.5 ms-auto">
                          <div className="relative inline-flex items-center border font-sans font-medium rounded-md text-xs px-2 py-0.5 bg-stone-800/10 border-transparent text-stone-500 shadow-none">
                            14
                          </div>
                        </span>
                      </li>

                      <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                        <span className="grid place-items-center shrink-0 me-2.5">
                          <Send size={18} />
                        </span>
                        Sent
                      </li>

                      <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                        <span className="grid place-items-center shrink-0 me-2.5">
                          <FileText size={18} />
                        </span>
                        Drafts
                      </li>

                      <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                        <span className="grid place-items-center shrink-0 me-2.5">
                          <Pencil size={18} />
                        </span>
                        Pins
                      </li>

                      <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                        <span className="grid place-items-center shrink-0 me-2.5">
                          <Archive size={18} />
                        </span>
                        Archive
                      </li>

                      <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                        <span className="grid place-items-center shrink-0 me-2.5">
                          <Trash2 size={18} />
                        </span>
                        Trash
                      </li>
                    </ul>
                  </div>
                </div>
              </Sidebar>

              <div className="p-5 ">
                <h1>Main Content</h1>
                <div className="flex flex-col space-y-4 w-full h-full mt-5">
                  <Placeholder className="bg-stone-800 rounded-lg h-3/5 w-full" />

                  <Placeholder className="bg-stone-800 rounded-lg h-1/5 w-full" />
                </div>
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
      <div className="flex flex-col space-y-4">
        <span className="text-xl font-semibold">Installation</span>
        <div className="flex space-x-4">
          {Object.keys(installCommands).map((tool) => (
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

      {/* Usage */}
      <div className="flex flex-col space-y-5">
        <span className="text-xl font-semibold">Usage</span>
        <div className="bg-stone-900 p-5 rounded-lg text-white">
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
