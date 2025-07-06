// import React, { useState, useEffect } from "react";

// type BreadcrumbItem = {
//   label: string;
//   href?: string;
//   onClick?: () => void;
//   className?: string;
//   isCurrent?: boolean;
// };

// type BreadcrumbsProps = {
//   items: BreadcrumbItem[];
//   itemStyle?: string;
//   separator?: React.ReactNode;
//   separatorStyle?: string;
//   itemsBeforeCollapse?: number;
//   itemsAfterCollapse?: number;
//   className?: string;
//   currentItemStyle?: string;
//   dropDownMenuStyle?: string;
//   onAction?: (selectedItem: string) => void;
// };

// const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
//   items,
//   itemStyle = "",
//   separator = ">",
//   separatorStyle = "",
//   itemsBeforeCollapse = 2,
//   itemsAfterCollapse = 3,
//   className = "",
//   currentItemStyle = "",
//   dropDownMenuStyle = "",
//   onAction,
// }) => {
//   const [activeIndex, setActiveIndex] = useState(
//     items.findIndex((item) => item.isCurrent) !== -1
//       ? items.findIndex((item) => item.isCurrent)
//       : 0
//   );
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [itemsBefore, setItemsBefore] = useState(itemsBeforeCollapse);
//   const [itemsAfter, setItemsAfter] = useState(itemsAfterCollapse);

//   useEffect(() => {
//     console.log(`Active Index:`, activeIndex);

//     // Dynamically determine visible and hidden items based on current state
//     const visibleItems = items.filter(
//       (_, index) => index < itemsBefore || index >= items.length - itemsAfter
//     );
//     const hiddenItems = items.filter(
//       (_, index) => index >= itemsBefore && index < items.length - itemsAfter
//     );

//     console.log(
//       `Visible Items:`,
//       visibleItems.map((item) => item.label)
//     );
//     console.log(
//       `Hidden Items:`,
//       hiddenItems.map((item) => item.label)
//     );
//   }, [activeIndex, itemsBefore, itemsAfter]);

//   const handleHiddenItemClick = (hiddenItemLabel: string) => {
//     const itemIndex = items.findIndex((item) => item.label === hiddenItemLabel);
//     console.log(`item clicked: `, itemIndex);
//     if (itemIndex === -1) return;

//     const wasHidden = items
//       .slice(itemsBefore, items.length - itemsAfter)
//       .some((item) => item.label === hiddenItemLabel);
//     if (!wasHidden) return;

//     // ✅ Check movement direction
//     const moveLeft = itemIndex < activeIndex;
//     const moveRight = itemIndex > activeIndex;

//     let newItemsBefore = itemsBefore;
//     let newItemsAfter = itemsAfter;

//     // ✅ Adjust `itemsBefore` and `itemsAfter` based on movement
//     if (moveLeft) {
//       newItemsBefore = Math.min(itemsBefore + 1, items.length - itemsAfter - 1);
//       newItemsAfter = Math.max(itemsAfter - 1, 1);
//     } else if (moveRight) {
//       newItemsBefore = Math.max(itemsBefore - 1, 1);
//       newItemsAfter = Math.min(itemsAfter + 1, items.length - itemsBefore - 1);
//     }

//     setItemsBefore(newItemsBefore);
//     setItemsAfter(newItemsAfter);
//     setActiveIndex(itemIndex);
//     setDropdownOpen((prev) => !prev);
//   };

//   return (
//     <nav className={`flex items-center space-x-2 relative ${className}`}>
//       {items.map((item, index) => {
//         if (index === itemsBefore && items.length > itemsBefore + itemsAfter) {
//           return (
//             <React.Fragment key="ellipsis">
//               <span className={`${separatorStyle}`}>{separator}</span>
//               <button
//                 onClick={() => setDropdownOpen((prev) => !prev)} // ✅ Properly toggles dropdown
//                 className="text-gray-400 font-bold cursor-pointer hover:text-gray-600"
//               >
//                 ...
//               </button>

//               {/* ✅ Ensure dropdown is attached and visible */}
//               {dropdownOpen && (
//                 <div
//                   className={`absolute left-1/2 top-full -translate-x-1/2 mt-2 z-50 w-max bg-white shadow-md p-2 rounded-md ${dropDownMenuStyle}`}
//                 >
//                   {items
//                     .filter(
//                       (_, i) =>
//                         i >= itemsBefore && i < items.length - itemsAfter
//                     )
//                     .map((hiddenItem, hiddenIndex) => (
//                       <button
//                         key={hiddenIndex}
//                         onClick={() => handleHiddenItemClick(hiddenItem.label)}
//                         className={`${
//                           activeIndex ===
//                           items.findIndex((i) => i.label === hiddenItem.label)
//                             ? currentItemStyle
//                             : itemStyle
//                         } px-2 py-1 w-full text-left`}
//                       >
//                         {hiddenItem.label}
//                       </button>
//                     ))}
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         }

//         if (index < itemsBefore || index >= items.length - itemsAfter) {
//           return (
//             <React.Fragment key={index}>
//               {index > 0 && (
//                 <span className={`${separatorStyle}`}>{separator}</span>
//               )}
//               <div className={item.label === "..." ? "relative" : ""}>
//                 <button
//                   onClick={() => {
//                     setActiveIndex(index);
//                     item.onClick?.();
//                     onAction?.(item.label);
//                   }}
//                   className={`${
//                     activeIndex === index ? currentItemStyle : itemStyle
//                   } hover:scale-105`}
//                 >
//                   {item.label}
//                 </button>
//               </div>
//             </React.Fragment>
//           );
//         }

//         return null;
//       })}
//     </nav>
//   );
// };

// export default Breadcrumbs;

import React, { useState } from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  itemStyle?: string;
  currentItemStyle?: string;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = ">",
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0); // Track current item internally

  return (
    <nav className={`flex items-center ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="flex items-center justify-center w-full h-full">
              {separator}
            </span>
          )}
          <button
            onClick={() => {
              setActiveIndex(index);
              item.onClick?.();
            }}
            className={
              index === activeIndex
                ? "cursor-pointer opacity-60 underline-offset-2 hover:opacity-60 underline"
                : "cursor-pointer hover:opacity-60 "
            }
          >
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
