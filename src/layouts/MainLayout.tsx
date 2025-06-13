import React, { type ReactNode } from "react";
import { ThemeSwitcher } from "../components/theme";

/* Header Component */
function Header() {
  return (
    <header className=" p-4 flex items-center justify-between shadow-md border-b border-gray-600 mb-10 shadow-white">
      <h1 className="text-xl font-semibold ">MyUI</h1>
      <ThemeSwitcher />
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
