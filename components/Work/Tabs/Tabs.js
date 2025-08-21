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

      {/* flowing gradient title when active, subtle hover otherwise */}
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

const TabsContent = ({ tabs, isHovering }) => {
  return (
    <div
      className="relative w-full min-h-[34rem] md:min-h-[30rem] z-20 pointer-events-auto"
      role="tabpanel"
      aria-labelledby={`tab-${tabs[0].value}`}
      id={`tabpanel-${tabs[0].value}`}
    >
      {tabs.map((tab, index) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - index * 0.1,
            top: isHovering ? index * -50 : 0,
            zIndex: -index,
            opacity: index < 3 ? 1 - index * 0.1 : 0,
            willChange: "transform, opacity",
            contain: "layout paint size",
          }}
          // one-time entrance instead of continuous bounce
          initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0 mt-24 md:mt-20"
        >
          {tab.content}
        </motion.div>
      ))}
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

      {/* Content stack */}
      <TabsContent
        key={activeTab.value}
        tabs={tabs}
        activeTab={activeTab}
        isHovering={isHovering}
      />
    </div>
  );
};

export default Tabs;
