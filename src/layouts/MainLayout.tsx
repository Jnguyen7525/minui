import React, { useContext, useState, type ReactNode } from "react";
import { ThemeContext, ThemeSwitcher } from "../components/theme";
import { ChevronDown, ChevronUp, Moon, Sun } from "lucide-react";
import Sidebar from "../components/sidebar";

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

/* Sidebar Component */
// function Sidebar() {
//   return (
//     <aside className="w-fit  p-4 flex flex-col space-y-1 items-start">
//       <h2 className="font-semibold">Components</h2>
//       {[
//         "Accordion",
//         "Alert",
//         "Alert Dialog",
//         "Autocomplete",
//         "Avatar",
//         "Button",
//         "Badge",
//         "Breadcrumb",
//         "Calendar",
//         "Card",
//         "Chart*",
//         "Form *",
//         "Checkbox",
//         "Checkbox Group",
//         "Collapsible",
//         "Circular Progress",
//         "Progress Bar",
//         "Carousel",
//         "Jumbotron",
//         "Date Input",
//         "Date Range Picker",
//         "Dropdown",
//         "Combobox",
//         "Context Menu",
//         "Drawer",
//         "Lightbox",
//         "Dialog",
//         "Placeholder",
//         "Input",
//         "Input OTP",
//         "Rating",
//         "Back to Top",
//         "Social Icons",
//         "Popover",
//         "Toast",
//         "Theme",
//         "Tooltip",
//         "Stepper",
//         "Testimonial",
//         "Switch",
//         "Radio",
//         "Textarea",
//         "Tab",
//         "Navbar",
//         "Sidebar",
//       ].map((component) => (
//         <button
//           key={component}
//           className="p-2 text-gray-400 hover:opacity-80 hover:cursor-pointer w-full flex"
//         >
//           {component}
//         </button>
//       ))}
//     </aside>
//   );
// }

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openMainSidebar, setOpenMainSidebar] = useState(true);
  return (
    // <div className="min-h-screen bg-black text-white overflow-y-scroll scrollbar-hide flex flex-col relative">
    <div className="min-h-screen overflow-y-scroll scrollbar-hide flex flex-col relative">
      <Header />
      <div className="flex h-full">
        {/* <Sidebar /> */}
        <div className="w-[200px] h-auto px-4 flex flex-col space-y-1 items-start">
          <Sidebar
            isOpen={openMainSidebar}
            onOpenChange={setOpenMainSidebar}
            minWidth={200}
            maxWidth={200}
            defaultWidth={200}
            handleStyle=" border-stone-600 rounded-full "
            resizable={false}
            className="border-r h-full flex flex-col pt-10"
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
            <aside className="w-full px-4 flex flex-col space-y-1 items-start mt-8">
              {/* <h2 className="font-semibold">Components</h2> */}
              {[
                "Accordion",
                "Alert",
                "Alert Dialog",
                "Autocomplete",
                "Avatar",
                "Button",
                "Badge",
                "Breadcrumb",
                "Calendar",
                "Card",
                "Chart*",
                "Form *",
                "Checkbox",
                "Checkbox Group",
                "Collapsible",
                "Circular Progress",
                "Progress Bar",
                "Carousel",
                "Jumbotron",
                "Date Input",
                "Date Range Picker",
                "Dropdown",
                "Combobox",
                "Context Menu",
                "Drawer",
                "Lightbox",
                "Dialog",
                "Placeholder",
                "Input",
                "Input OTP",
                "Rating",
                "Back to Top",
                "Social Icons",
                "Popover",
                "Toast",
                "Theme",
                "Tooltip",
                "Stepper",
                "Testimonial",
                "Switch",
                "Radio",
                "Textarea",
                "Tab",
                "Navbar",
                "Sidebar",
              ].map((component) => (
                <button
                  key={component}
                  className="p-2 text-gray-400 hover:opacity-80 hover:cursor-pointer w-full flex"
                >
                  {component}
                </button>
              ))}
            </aside>
          </Sidebar>
        </div>
        <main className={``}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
