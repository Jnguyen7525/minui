import React, { useEffect, useRef, useState, type ReactNode } from "react";

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
  variant?: "underlined" | "solid";
  className?: string;
};

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  defaultTab,
  onTabChange,
  variant = "solid",
  className,
}) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab ?? tabs[0]?.id);

  const currentTab = activeTab ?? selectedTab; // ✅ Use activeTab if provided

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]); // ✅ Store tab button refs
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = (tabId: string) => {
    if (!activeTab) setSelectedTab(tabId); // ✅ Update state only if uncontrolled
    onTabChange?.(tabId);
  };

  useEffect(() => {
    const activeTabIndex = tabs.findIndex((tab) => tab.id === currentTab);
    const activeTabElement = tabRefs.current[activeTabIndex];

    if (activeTabElement && indicatorRef.current) {
      const { offsetLeft, offsetWidth, offsetHeight } = activeTabElement;

      indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
      indicatorRef.current.style.width = `${offsetWidth}px`; // ✅ Matches active tab width
      indicatorRef.current.style.height = `${offsetHeight}px`;
    }
  }, [currentTab, tabs]);

  return (
    <div className="relative tab-group">
      {/* Tab Headers */}
      <div className={`flex  relative`} role="tablist">
        {/* ✅ Animated Tab Indicator */}
        {variant === "underlined" ? (
          <div
            ref={indicatorRef}
            className={`absolute bottom-0 !h-[2px] transition-all duration-300 ${className}`}
          />
        ) : (
          <div
            ref={indicatorRef}
            className={`absolute bottom-0 h-full transition-all duration-300 z-10 ${className}`}
          />
        )}

        {tabs.map(({ id, label }, index) => (
          <button
            key={id}
            ref={(el) => {
              tabRefs.current[index] = el; // ✅ Assign without returning anything
            }}
            onClick={() => handleTabClick(id)}
            className={`text-sm inline-block py-2 px-4 z-20 transition-colors duration-300`}
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
            className={`tab-content  ${currentTab === id ? "block" : "hidden"}`}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
