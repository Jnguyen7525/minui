import React, { useContext, useState, type ReactNode } from "react";
import { ThemeContext, ThemeSwitcher } from "../components/theme";
import { ChevronDown, ChevronUp, Moon, Sun } from "lucide-react";
import Sidebar from "../components/sidebar";
import { Link } from "react-router-dom";

/* Header Component */
function Header() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("Header must be used within a ThemeProvider");
  }

  const { theme } = themeContext;

  const triggerContent =
    theme === "light" ? (
      <div className="flex items-center gap-2 rounded-lg  text-white  transition hover:cursor-pointer">
        <Sun size={18} />
        Light mode
      </div>
    ) : theme === "dark" ? (
      <div className="flex items-center gap-2 rounded-lg  text-white  transition hover:cursor-pointer">
        <Moon size={18} />
        Dark mode
      </div>
    ) : (
      theme.charAt(0).toUpperCase() + theme.slice(1) + " " + "mode" // Other themes just display their names
    );

  return (
    <header className="py-2 px-7 flex items-center justify-between shadow-md border-b border-gray-600  shadow-white">
      <h1 className="text-xl font-semibold ">MyUI</h1>
      <ThemeSwitcher
        triggerStyle="hover:cursor-pointer px-4 py-2 border rounded-md bg-gray-700 text-white hover:bg-gray-600 "
        triggerContent={triggerContent}
        menuItemStyle="w-full border-b border-gray-600 px-4 py-2 text-left text-white hover:bg-gray-600 hover:cursor-pointer hover:rounded-md"
        menuStyle="w-fit bg-gray-800 border border-gray-600 rounded-md shadow-lg flex flex-col "
      />
    </header>
  );
}

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openMainSidebar, setOpenMainSidebar] = useState(true);
  return (
    <div className="h-screen overflow-hidden scrollbar-hide flex flex-col relative">
      <Header />
      <div className="flex h-full">
        <div className="w-fit px-4 flex flex-col space-y-1 items-start">
          <Sidebar
            isOpen={openMainSidebar}
            onOpenChange={setOpenMainSidebar}
            minWidth={200}
            maxWidth={200}
            defaultWidth={200}
            handleStyle=" border-stone-600 rounded-full "
            resizable={false}
            className="border-r overflow-y-auto flex flex-col h-[calc(100vh-56px)] overflow-x-hidden  py-10"
            trigger={
              <div className={"flex  items-center justify-start w-full  "}>
                {openMainSidebar ? (
                  <button className="flex items-center justify-center w-[130px] cursor-pointer shadow   hover:text-stone-600 rounded-lg font-semibold  space-x-1 ">
                    <span>Components</span>
                    <ChevronUp />
                  </button>
                ) : (
                  <button className="flex items-center justify-center w-[130px] cursor-pointer shadow   hover:text-stone-600 rounded-lg font-semibold   space-x-1">
                    <span>Components</span>
                    <ChevronDown />
                  </button>
                )}
              </div>
            }
          >
            <aside className="flex flex-col flex-1 h-auto overflow-y-auto scrollbar-hide px-4 space-y-1 mt-6">
              {[
                "Accordion",
                "Alert",
                "Alert Dialog",
                "Autocomplete",
                "Avatar",
                "Back to Top",
                "Badge",
                "Breadcrumb",
                "Button",
                "Calendar",
                "Card",
                "Carousel",
                "Checkbox",
                "Checkbox Group",
                "Circular Progress",
                "Collapsible",
                "Combobox",
                "Context Menu",
                "Date Input",
                "Date Range Picker",
                "Dialog",
                "Drawer",
                "Dropdown",
                "Input",
                "Input OTP",
                "Jumbotron",
                "Lightbox",
                "Navbar",
                "Number Input",
                "Pagination",
                "Placeholder",
                "Popover",
                "Progress Bar",
                "Radio",
                "Rating",
                "Resizable",
                "Resizable Grid",
                "Sidebar",
                "Slider",
                "Social Icons",
                "Stepper",
                "Switch",
                "Tab",
                "Table",
                "Testimonial",
                "Textarea",
                "Theme",
                "Timeline",
                "Time Input",
                "Toast",
                "Tooltip",
              ].map((component) => (
                // <button
                //   key={component}
                //   className="p-2 text-gray-400 hover:opacity-80 hover:cursor-pointer w-full flex"
                // >
                //   {component}
                // </button>
                <Link
                  key={component}
                  to={`/component/${component
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="p-2 text-gray-400 hover:opacity-80 hover:cursor-pointer w-full flex"
                >
                  {component}
                </Link>
              ))}
            </aside>
          </Sidebar>
        </div>
        <main className={`overflow-y-auto py-10 w-full`}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
