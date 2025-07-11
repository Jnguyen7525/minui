import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";
import { Pagination } from "../../components/pagination";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const allItems = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
const ITEMS_PER_PAGE = 5;

const codeExample = `
 // Basic pagination
  const [currentPage, setCurrentPage] = useState(7);
  const totalPages = 12;

  // Link-enabled pagination
  const [params, setParams] = useSearchParams();
  const pageParam = parseInt(params.get("page") || "1", 10);
  const [currentPageWithLink, setCurrentPageWithLink] = useState(pageParam);
  const totalPagesWithLink = Math.ceil(allItems.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPageWithLink(pageParam);
  }, [pageParam]);

  const updatePage = (page: number) => {
    params.set("page", String(page));
    setParams(params);
  };

  const start = (currentPageWithLink - 1) * ITEMS_PER_PAGE;
  const currentItems = allItems.slice(start, start + ITEMS_PER_PAGE);
  
<Pagination
  current={currentPage}
  total={totalPages}
  onPageChange={setCurrentPage}
  visiblePages={2}
  className="bg-blue-500 !rounded-full"
  renderPrev={() => <span><ChevronLeft /> Prev</span>}
  renderNext={() => <span>Next <ChevronRight /></span>}
  renderFirst={() => <ChevronLeft /> <ChevronLeft />}
  renderLast={() => <ChevronRight /> <ChevronRight />}
  renderPage={(page) => <span>{page}</span>}
/>

<Pagination
  current={currentPageWithLink}
  total={totalPagesWithLink}
  onPageChange={updatePage}
  visiblePages={2}
  pageClassName="text-white hover:text-stone-800 hover:cursor-pointer"
  activePageClassName="text-white border"
  disabledPageClassName="opacity-20 pointer-events-none"
  baseButtonClasses="inline-grid place-items-center text-sm min-w-[38px] min-h-[38px] rounded-md px-3 py-2 font-medium transition-all duration-100 ease-in select-none"
  renderPage={(page) => (
    <a
      href={\`?page=\${page}\`}
      onClick={(e) => {
        e.preventDefault();
        updatePage(page);
      }}
    >{page}</a>
  )}
  renderPrev={(disabled) => (
    <a
      href={\`?page=\${currentPageWithLink - 1}\`}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) updatePage(currentPageWithLink - 1);
      }}
    >
      <ChevronLeft /> Prev
    </a>
  )}
  renderNext={(disabled) => (
    <a
      href={\`?page=\${currentPageWithLink + 1}\`}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) updatePage(currentPageWithLink + 1);
      }}
    >
      Next <ChevronRight />
    </a>
  )}
/>
`;

const usageExample = `
import Pagination from "@your-org/ui-kit";

function Example() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
      visiblePages={2}
      className="bg-gray-900 text-white p-2 rounded"
    />
  );
}
`;

export default function PaginationDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");

  // Basic pagination
  const [currentPage, setCurrentPage] = useState(7);
  const totalPages = 12;

  // Link-enabled pagination
  const [params, setParams] = useSearchParams();
  const pageParam = parseInt(params.get("page") || "1", 10);
  const [currentPageWithLink, setCurrentPageWithLink] = useState(pageParam);
  const totalPagesWithLink = Math.ceil(allItems.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPageWithLink(pageParam);
  }, [pageParam]);

  const updatePage = (page: number) => {
    params.set("page", String(page));
    setParams(params);
  };

  const start = (currentPageWithLink - 1) * ITEMS_PER_PAGE;
  const currentItems = allItems.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Pagination</h1>
      <p className="text-gray-600">
        A flexible pagination component with support for custom rendering, link
        handling, and navigation styling. Fully controlled and URL-sync capable.
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

      {/* Demo Panel */}
      <div className="flex w-full items-center justify-center border border-stone-600 rounded-lg bg-black text-white p-6">
        {activeView === "preview" ? (
          <div className="rounded-lg text-center h-fit w-full shadow-lg flex flex-col justify-start items-center m-5 p-5 space-y-10">
            {/* Basic Demo */}
            <div className="text-white p-6 rounded-md">
              <p>
                📄 You are currently viewing content for{" "}
                <strong>Page {currentPage}</strong>.
              </p>
            </div>
            <div className="mx-auto py-10 px-4 border-b">
              <Pagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
                className="bg-blue-500 !rounded-full"
                visiblePages={2}
                renderPrev={() => (
                  <span className="flex items-center gap-1">
                    <ChevronLeft /> Prev
                  </span>
                )}
                renderNext={() => (
                  <span className="flex items-center gap-1">
                    Next <ChevronRight />
                  </span>
                )}
                renderFirst={() => (
                  <div className="flex items-center justify-center -space-x-4">
                    <ChevronLeft />
                    <ChevronLeft />
                  </div>
                )}
                renderLast={() => (
                  <div className="flex items-center justify-center -space-x-4">
                    <ChevronRight />
                    <ChevronRight />
                  </div>
                )}
                renderPage={(page) => <span>{page}</span>}
              />
            </div>

            {/* URL-based Demo */}
            <div className="w-full max-w-xl mx-auto p-6 shadow rounded-md flex flex-col items-center justify-center">
              <h2 className="font-semibold mb-4">
                📄 Page {currentPageWithLink}
              </h2>
              <ul className="space-y-2 mb-6 flex flex-col w-full">
                {currentItems.map((item) => (
                  <li
                    key={item}
                    className="bg-stone-800 text-white p-1 rounded flex justify-center"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Pagination
                current={currentPageWithLink}
                total={totalPagesWithLink}
                onPageChange={updatePage}
                visiblePages={2}
                renderPage={(page) => (
                  <a
                    href={`?page=${page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      updatePage(page);
                    }}
                  >
                    {page}
                  </a>
                )}
                renderPrev={(disabled) => (
                  <a
                    href={`?page=${currentPageWithLink - 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!disabled) updatePage(currentPageWithLink - 1);
                    }}
                  >
                    <ChevronLeft /> Prev
                  </a>
                )}
                renderNext={(disabled) => (
                  <a
                    href={`?page=${currentPageWithLink + 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!disabled) updatePage(currentPageWithLink + 1);
                    }}
                  >
                    Next <ChevronRight />
                  </a>
                )}
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
