import React, { useContext, type ReactNode } from "react";
import { ThemeContext, ThemeSwitcher } from "../components/theme";
import { Moon, Sun } from "lucide-react";

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
    <header className="py-2 px-7 flex items-center justify-between shadow-md border-b border-gray-600 mb-10 shadow-white">
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
function Sidebar() {
  return (
    <aside className="w-fit  p-4 flex flex-col space-y-1 items-start">
      <h2 className="font-semibold">Components</h2>
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
      ].map((component) => (
        <button
          key={component}
          className="p-2 text-gray-400 hover:opacity-80 hover:cursor-pointer w-full flex"
        >
          {component}
        </button>
      ))}
    </aside>
  );
}

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    // <div className="min-h-screen bg-black text-white overflow-y-scroll scrollbar-hide flex flex-col relative">
    <div className="min-h-screen overflow-y-scroll scrollbar-hide flex flex-col relative">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
