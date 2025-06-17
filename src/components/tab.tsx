import React, { useState, type ReactNode } from "react";

type TabItem = {
  id: string;
  label: ReactNode; // ✅ Supports text, icons, or JSX
  content: ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  activeTab?: string; // ✅ Controlled state
  defaultTab?: string; // ✅ Uncontrolled state
  onTabChange?: (tabId: string) => void;
  variant?: "underlined" | "basic";
  className?: string;
};

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  defaultTab,
  onTabChange,
  variant = "underlined",
  className,
}) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab ?? tabs[0]?.id);

  const currentTab = activeTab ?? selectedTab; // ✅ Use activeTab if provided

  const handleTabClick = (tabId: string) => {
    if (!activeTab) setSelectedTab(tabId); // ✅ Update state only if uncontrolled
    onTabChange?.(tabId);
  };

  return (
    <div className="relative tab-group">
      {/* Tab Headers */}
      <div
        className={`flex ${
          variant === "underlined"
            ? "border-b border-stone-200"
            : "bg-stone-100 p-0.5 rounded-lg"
        } relative`}
        role="tablist"
      >
        <div
          className={`absolute ${
            variant === "underlined"
              ? "bottom-0 h-0.5 bg-stone-800"
              : "top-1 left-0.5 h-8 bg-white rounded-md shadow-sm"
          } transition-transform duration-300 transform scale-x-0 translate-x-0 tab-indicator`}
        ></div>

        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleTabClick(id)}
            className={`text-sm inline-block py-2 px-4 ${
              currentTab === id
                ? "text-blue-500 font-semibold"
                : "text-stone-500 hover:text-stone-800"
            } transition-colors duration-300`}
          >
            {label} {/* ✅ Accepts text or icons */}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 tab-content-container">
        {tabs.map(({ id, content }) => (
          <div
            key={id}
            className={`tab-content text-stone-500 text-sm ${
              currentTab === id ? "block" : "hidden"
            }`}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
