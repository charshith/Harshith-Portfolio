// components/Work/Tabs/Tabs.js
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "utils/cn";

const BRAND = "#EB7431";

const Tab = ({ index, tab, activeTab, handleOnClick, setIsHovering }) => {
  const isActive = activeTab.value === tab.value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${tab.value}`}
      id={`tab-${tab.value}`}
      onClick={() => handleOnClick(index)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "relative px-4 py-1 rounded-full select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "focus-visible:ring-[rgba(235,116,49,0.6)]"
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isActive && (
        <motion.div
          layoutId="clickedbutton"
          transition={{ type: "spring", bounce: 0.3, duration: 0.7 }}
          className="absolute inset-0 rounded-full bg-black/40 ring-1 ring-white/10"
          style={{
            boxShadow: `0 0 18px ${BRAND}40, inset 0 0 0 1px #ffffff12`,
          }}
        />
      )}
      <motion.span
        className={cn(
          "relative top-[3px] font-medium",
          isActive
            ? "text-transparent bg-clip-text"
            : "text-gray-200 hover:text-gray-300"
        )}
        style={
          isActive
            ? {
                backgroundImage: `linear-gradient(90deg, ${BRAND}, #ffffff, ${BRAND})`,
                backgroundSize: "200% 100%",
                backgroundPosition: "0% 50%",
              }
            : undefined
        }
        whileHover={isActive ? { backgroundPosition: "100% 50%" } : {}}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      >
        {tab.title}
      </motion.span>
    </button>
  );
};

// ✅ Render only the active tab in normal flow (no absolute, no min-height cap)
const TabsContent = ({ tabs }) => {
  const active = tabs[0]; // we always move the clicked tab to the front
  if (!active) return null;

  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${active.value}`}
      id={`tabpanel-${active.value}`}
      className="w-full mt-24 md:mt-20"
    >
      {active.content}
    </div>
  );
};

const Tabs = ({ tabItems }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [tabs, setTabs] = useState(tabItems);
  const [activeTab, setActiveTab] = useState(tabItems[0]);

  const handleOnClick = (index) => {
    const updated = [...tabItems];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    setTabs(updated);
    setActiveTab(updated[0]);
  };

  return (
    <div className="staggered-reveal">
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Work companies"
        className="pt-12 flex flex-row justify-center items-center [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full z-30 pointer-events-auto gap-1"
      >
        {tabItems.map((tab, index) => (
          <Tab
            key={tab.title}
            index={index}
            tab={tab}
            activeTab={activeTab}
            handleOnClick={handleOnClick}
            setIsHovering={setIsHovering}
          />
        ))}
      </div>

      {/* Content (only active tab) */}
      <TabsContent tabs={tabs} isHovering={isHovering} />
    </div>
  );
};

export default Tabs;
