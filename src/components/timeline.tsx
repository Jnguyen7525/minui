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
  spacing?: number;
  lineColor?: Color;
  dotClassName?: string;
};

type Color =
  | "gray"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "orange"
  | "black"
  | "white"
  | "pink";

const lineColorMap = {
  gray: "bg-gray-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  black: "bg-black",
  white: "bg-white border border-gray-300", // helps visibility on white bg
  pink: "bg-pink-500",
};

export function Timeline({
  items,
  withLine = true,
  renderIcon,
  renderContent,
  spacing = 8,
  lineColor,
  className = "flex flex-col w-full ",
}: TimelineProps) {
  return (
    <div className={className}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.id}
            className={`flex gap-4 ${!isLast ? "" : ""}`}
            style={{ marginBottom: spacing }}
          >
            {/* Dot + Line Column */}
            <div className="flex flex-col items-center">
              <div
                className={`${
                  withLine
                    ? "w-6 h-6 flex items-center justify-center rounded-full border"
                    : ""
                }`}
              >
                {renderIcon ? renderIcon(item, index) : item.icon}
              </div>

              {withLine && !isLast && (
                <div
                  className={`flex-1 w-px  ${lineColorMap[lineColor as Color]}`}
                  style={{ marginBottom: -spacing }}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 text-left">
              {renderContent ? (
                renderContent(item, index)
              ) : (
                <>
                  <p className="font-bold ">{item.title}</p>
                  {item.timestamp && (
                    <small className="text-sm ">{item.timestamp}</small>
                  )}
                  {item.description && (
                    <p className=" text-sm ">{item.description}</p>
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
