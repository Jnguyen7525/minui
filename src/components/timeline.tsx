type TimelineItem = {
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

  dotClassName?: string;
  lineClassName?: string;
  itemSpacing?: string;
  className?: string;
};

export function Timeline({
  items,
  withLine = true,
  renderIcon,
  renderContent,
  dotClassName = "h-4 w-4 bg-stone-200",
  lineClassName = "bg-stone-200",
  itemSpacing = "mb-10",
  className,
}: TimelineProps) {
  return (
    <div className="flex w-full flex-col">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.id}
            className={`${className}  ${!isLast ? itemSpacing : ""}`}
          >
            <div className="relative flex-none">
              {withLine && !isLast && (
                <div
                  className={`absolute left-1/2 top-10 h-full w-0.5 -translate-x-1/2 ${lineClassName}`}
                />
              )}
              <span
                className={`grid place-items-center rounded-full ${dotClassName}`}
              >
                {renderIcon ? renderIcon(item, index) : item.icon}
              </span>
            </div>

            <div className="flex-1 text-left">
              {renderContent ? (
                renderContent(item, index)
              ) : (
                <>
                  <p className="">{item.title}</p>
                  {item.timestamp && (
                    <small className="">{item.timestamp}</small>
                  )}
                  {item.description && <p className="">{item.description}</p>}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
