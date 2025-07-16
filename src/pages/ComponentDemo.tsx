import { useParams } from "react-router-dom";

const demos = import.meta.glob("./demos/*.tsx", { eager: true });

const ComponentDemo = () => {
  const { component } = useParams();
  const key = `${component?.replace(/\s+/g, "")}Demo`.toLowerCase();

  const matched = Object.entries(demos).find(([path]) => {
    const baseName = path.split("/").pop()?.replace(".tsx", "").toLowerCase();
    return baseName === key;
  });

  const DemoComponent = (matched?.[1] as { default: () => React.ReactNode })
    ?.default;

  return (
    <div className="flex w-full p-5 sm:p-10 items-center justify-center">
      {DemoComponent ? (
        <DemoComponent />
      ) : (
        <p className="text-gray-400 text-lg">
          Component demo not found: {component}
        </p>
      )}
    </div>
  );
};

export default ComponentDemo;
