// type TimelineItem = {
//   id: string | number;
//   title: string;
//   description?: string;
//   timestamp?: string;
//   icon?: React.ReactNode;
// };

// type TimelineProps = {
//   items: TimelineItem[];
//   withLine?: boolean;

//   renderIcon?: (item: TimelineItem, index: number) => React.ReactNode;
//   renderContent?: (item: TimelineItem, index: number) => React.ReactNode;

//   dotClassName?: string;
//   lineClassName?: string;
//   itemSpacing?: string;
//   className?: string;
// };

// export function Timeline({
//   items,
//   withLine = true,
//   renderIcon,
//   renderContent,
//   dotClassName = "h-4 w-4 bg-stone-200",
//   lineClassName = "bg-stone-200",
//   itemSpacing = "mb-10",
//   className,
// }: TimelineProps) {
//   return (
//     <div className="flex w-full flex-col">
//       {items.map((item, index) => {
//         const isLast = index === items.length - 1;

//         return (
//           <div
//             key={item.id}
//             className={`${className}  ${!isLast ? itemSpacing : ""}`}
//           >
//             <div className="relative flex-none">
//               {withLine && !isLast && (
//                 <div
//                   className={`absolute left-1/2 top-10 h-full w-0.5 -translate-x-1/2 ${lineClassName}`}
//                 />
//               )}
//               <span
//                 className={`grid place-items-center rounded-full ${dotClassName}`}
//               >
//                 {renderIcon ? renderIcon(item, index) : item.icon}
//               </span>
//             </div>

//             <div className="flex-1 text-left">
//               {renderContent ? (
//                 renderContent(item, index)
//               ) : (
//                 <>
//                   <p className="">{item.title}</p>
//                   {item.timestamp && (
//                     <small className="">{item.timestamp}</small>
//                   )}
//                   {item.description && <p className="">{item.description}</p>}
//                 </>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// type TimelineItem = {
//   id: string | number;
//   title: string;
//   description?: string;
//   timestamp?: string;
//   icon?: React.ReactNode;
// };

// type TimelineProps = {
//   items: TimelineItem[];
// };

// export function TimelineNoAbsolute({ items }: TimelineProps) {
//   return (
//     <div className="flex flex-col w-full border-l-2 border-stone-300 pl-6">
//       {items.map((item, index) => {
//         const isLast = index === items.length - 1;

//         return (
//           <div key={item.id} className="flex gap-4 mb-8 last:mb-0">
//             {/* Dot container */}
//             <div className="flex flex-col items-center">
//               <div className="w-4 h-4 rounded-full bg-stone-800 border-2 border-white" />

//               {!isLast && <div className="flex-1 w-px bg-stone-300 mt-1" />}
//             </div>

//             {/* Content */}
//             <div className="text-left">
//               <p className="font-bold text-stone-800 dark:text-white">
//                 {item.title}
//               </p>
//               {item.timestamp && (
//                 <small className="text-sm text-stone-500">
//                   {item.timestamp}
//                 </small>
//               )}
//               {item.description && (
//                 <p className="mt-1 text-sm text-stone-600">
//                   {item.description}
//                 </p>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

export type TimelineItem = {
  id: string | number;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
  withLine?: boolean;

  renderIcon?: (item: TimelineItem, index: number) => React.ReactNode;
  renderContent?: (item: TimelineItem, index: number) => React.ReactNode;

  className?: string;
  dotClassName?: string;
  lineClassName?: string;
  itemSpacing?: string;
};

export function Timeline({
  items,
  withLine = true,
  renderIcon,
  renderContent,
  dotClassName = "h-4 w-4 rounded-full bg-stone-800 border-2 border-white",
  lineClassName = "bg-stone-300",
  itemSpacing = "mb-8",
  className = "flex flex-col w-full border-l-2 border-stone-300 pl-6",
}: TimelineProps) {
  return (
    <div className={className}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.id}
            className={`flex gap-4 ${!isLast ? itemSpacing : ""}`}
          >
            {/* Dot + Line Column */}
            <div className="flex flex-col items-center">
              <div className={dotClassName}>
                {renderIcon ? renderIcon(item, index) : item.icon}
              </div>

              {withLine && !isLast && (
                <div className={`flex-1 w-px  -mb-8 ${lineClassName}`} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 text-left">
              {renderContent ? (
                renderContent(item, index)
              ) : (
                <>
                  <p className="font-bold text-stone-800">{item.title}</p>
                  {item.timestamp && (
                    <small className="text-sm text-stone-500">
                      {item.timestamp}
                    </small>
                  )}
                  {item.description && (
                    <p className=" text-sm text-stone-600">
                      {item.description}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
