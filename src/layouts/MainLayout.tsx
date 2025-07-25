import React, { useContext, useState, type ReactNode } from "react";
import { ThemeContext, ThemeSwitcher } from "../components/theme";
import { ChevronDown, ChevronUp, Menu, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import Drawer from "../components/drawer";

const components = [
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
  "Code Snippet",
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
  "Radio Group",
  "Rating",
  "Resizable",
  "Resizable Grid",
  "Scrollbox",
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
];

type SidebarMenuProps = {
  linkStyle?: string;
  containerStyle?: string;
};

function SidebarMenu({
  linkStyle = "p-2 text-gray-400 hover:opacity-80 hover:cursor-pointer w-full flex",
  containerStyle = "flex flex-col flex-1 h-full overflow-y-auto scrollbar-hide  space-y-1 mt-10",
}: SidebarMenuProps) {
  const [showComponents, setShowComponents] = useState(true);
  return (
    <aside className={containerStyle}>
      <div className={"flex items-center justify-start w-full  "}>
        {showComponents ? (
          <button
            className="flex items-center justify-center w-[130px] cursor-pointer text-gray-400 hover:text-stone-600 rounded-lg font-semibold  space-x-1 "
            onClick={() => setShowComponents(false)}
          >
            <span>Components</span>
            <ChevronUp />
          </button>
        ) : (
          <button
            className="flex items-center justify-center w-[130px] cursor-pointer text-gray-400 hover:text-stone-600 rounded-lg font-semibold   space-x-1"
            onClick={() => setShowComponents(true)}
          >
            <span>Components</span>
            <ChevronDown />
          </button>
        )}
      </div>
      <div className={`${showComponents ? "" : "hidden"}`}>
        {components.map((component) => (
          <Link
            key={component}
            to={`/component/${component.toLowerCase().replace(/\s+/g, " ")}`}
            className={linkStyle}
          >
            {component}
          </Link>
        ))}
      </div>
    </aside>
  );
}

/* Header Component */
type HeaderProps = {
  onMobileMenuClick?: () => void;
};

function Header({ onMobileMenuClick }: HeaderProps) {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("Header must be used within a ThemeProvider");
  }

  const { theme } = themeContext;

  const triggerContent =
    theme === "light" ? (
      <div className="flex items-center gap-1 rounded-lg  transition hover:cursor-pointer">
        <Sun size={18} />
        Light mode
      </div>
    ) : theme === "dark" ? (
      <div className="flex items-center gap-1 rounded-lg  transition hover:cursor-pointer">
        <Moon size={18} />
        Dark mode
      </div>
    ) : (
      theme.charAt(0).toUpperCase() + theme.slice(1) + " " + "mode" // Other themes just display their names
    );

  return (
    <header className="py-1 px-5 sm:px-10 flex items-center justify-between shadow-md border-b border-gray-600  shadow-white">
      <Link
        to={"/"}
        className="text-xl font-semibold flex items-center justify-center relative hover:opacity-80"
      >
        <span className="font-semibold tracking-wide ">minui</span>
      </Link>
      <div className="flex items-center justify-center space-x-5 sm:items-end sm:justify-end sm:space-x-0">
        {/* 👇 Mobile menu button */}
        <button
          onClick={onMobileMenuClick}
          className="sm:hidden hover:cursor-pointer hover:opacity-60"
        >
          <Menu size={20} />
        </button>

        <ThemeSwitcher
          triggerContent={triggerContent}
          className="hover:cursor-pointer px-2 py-2 z-50 bg-stone-900 rounded-md text-white  "
        />
      </div>
    </header>
  );
}

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden scrollbar-hide flex flex-col relative">
      <Header onMobileMenuClick={() => setMobileDrawerOpen(true)} />
      {/* 🪟 Mobile Sidebar Drawer */}
      <Drawer
        isOpen={mobileDrawerOpen}
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        size={{ width: "250px" }}
        className="bg-gray-900 z-50 overflow-y-auto p-4 scrollbar-hide"
      >
        <SidebarMenu />
      </Drawer>
      <div className="flex h-full w-screen">
        <div className="hidden w-fit px-10 sm:flex flex-col space-y-1 items-start border-r overflow-y-auto pb-20">
          <SidebarMenu />
        </div>
        <main className={`overflow-y-auto py-10 w-full`}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
