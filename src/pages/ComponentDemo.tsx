// import { useParams } from "react-router-dom";
// import { Alert, AlertTitle, AlertDescription } from "../components/alert";
// import Button from "../components/button";
// import { AlertTriangle } from "lucide-react";

// const componentMap: Record<string, () => React.ReactNode> = {
//   alert: () => (
//     <Alert
//       variant="warning"
//       icon={<AlertTriangle className="size-5 text-yellow-600" />}
//     >
//       <AlertTitle>Heads Up!</AlertTitle>
//       <AlertDescription>Something needs your attention.</AlertDescription>
//     </Alert>
//   ),
//   button: () => (
//     <Button
//       label="Default"
//       variant="default"
//       size="default"
//       className="border rounded-sm flex items-center hover:cursor-pointer"
//     />
//   ),
//   // 🧩 Add other components here: accordion, card, modal, etc.
// };

// const ComponentPageLayout = () => {
//   const { component } = useParams();
//   const key = component?.toLowerCase() ?? "";
//   const Demo = componentMap[key];

//   return (
//     <div className="flex flex-1 flex-wrap p-10 items-center justify-center min-h-screen">
//       {Demo ? (
//         <Demo />
//       ) : (
//         <p className="text-gray-500 text-lg">Component not found: {key}</p>
//       )}
//     </div>
//   );
// };

// export default ComponentPageLayout;

import { useParams } from "react-router-dom";

const demos = import.meta.glob("./demos/*.tsx", { eager: true });

const ComponentDemo = () => {
  const { component } = useParams();
  const key = `${component?.replace(/\s+/g, "")}Demo`.toLowerCase();

  const matched = Object.entries(demos).find(([path]) =>
    path.toLowerCase().includes(key)
  );

  const DemoComponent = (matched?.[1] as { default: () => React.ReactNode })
    ?.default;

  return (
    <div className="flex w-full  items-center justify-center">
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
