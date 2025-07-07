import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogActions,
} from "../../components/alertDialog";
import { CheckCircle } from "lucide-react";
import Button from "../../components/button"; // assuming you have a reusable Button component
import CodeSnippet from "../../components/codesnippet";
import { Alert, AlertDescription, AlertTitle } from "../../components/alert";
import ScrollBox from "../../components/scrollbox";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
<Button
  label="Open Alert"
  variant="outline"
  size="default"
  className="border rounded-sm flex items-center hover:cursor-pointer"
  onClick={() => setOpenAlertDialog(true)}
/>

<AlertDialog
  isOpen={openAlertDialog}
  onClose={() => setOpenAlertDialog(false)}
  className="bg-black"
>
  <AlertDialogTitle className="text-lg font-semibold">
    Confirm Action
  </AlertDialogTitle>
  <AlertDialogDescription className="text-sm">
    Are you sure you want to proceed?
  </AlertDialogDescription>

  <AlertDialogActions
    onConfirm={() => {
      setShowSuccessAlert(true);
      setOpenAlertDialog(false);
    }}
    onCancel={() => setOpenAlertDialog(false)}
    cancelButton={
      <button className="px-4 py-2 rounded bg-red-500 text-white hover:cursor-pointer">
        Cancel
      </button>
    }
    confirmButton={
      <button className="px-4 py-2 rounded bg-blue-500 text-white hover:cursor-pointer">
        Confirm
      </button>
    }
  />
</AlertDialog>

{showSuccessAlert && (
  <Alert
    variant="success"
    icon={<CheckCircle className="size-5 text-green-600" />}
    className="absolute top-10 left-1/2 transform -translate-x-1/2 w-fit h-fit"
  >
    <AlertTitle>Success!</AlertTitle>
    <AlertDescription>Action has been confirmed successfully.</AlertDescription>
  </Alert>
)}
`;

const usageExample = `import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogActions,
} from "@your-org/ui-kit";

function Example() {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  return (
    <>
      <button onClick={() => setOpenAlertDialog(true)}>Open Alert</button>

      <AlertDialog isOpen={openAlertDialog} onClose={() => setOpenAlertDialog(false)}>
        <AlertDialogTitle>Confirm Action</AlertDialogTitle>
        <AlertDialogDescription>Are you sure you want to proceed?</AlertDialogDescription>

        <AlertDialogActions
          onConfirm={() => setOpenAlertDialog(false)}
          onCancel={() => setOpenAlertDialog(false)}
          cancelButton={<button>Cancel</button>}
          confirmButton={<button>Confirm</button>}
        />
      </AlertDialog>
    </>
  );
}
`;

export default function AlertDialogDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Alert Dialog</h1>
      <p className="text-gray-600">
        Alert dialogs are modal prompts that ask users to confirm a critical
        action. They're customizable and responsive, with support for success
        feedback and accessibility.
      </p>

      {/* View Switcher */}
      <div className="flex space-x-4 font-semibold">
        {["preview", "code"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view as "preview" | "code")}
            className={`capitalize hover:cursor-pointer ${
              activeView === view
                ? "text-white bg-stone-600 px-3 py-1 rounded"
                : "text-gray-500 hover:text-stone-600"
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Demo Area */}
      <div className="flex w-full h-full min-h-[300px] overflow-y-scroll scrollbar-hide  items-center justify-center p-6 border border-stone-600 rounded-lg bg-black text-white">
        {activeView === "preview" ? (
          <div className="flex flex-col items-start">
            <Button
              label="Open Alert"
              variant="outline"
              size="default"
              className="border rounded-sm flex items-center hover:cursor-pointer"
              onClick={() => setOpenAlertDialog(true)}
            />

            <AlertDialog
              isOpen={openAlertDialog}
              onClose={() => setOpenAlertDialog(false)}
              className="bg-black"
            >
              <AlertDialogTitle className="text-lg font-semibold">
                Confirm Action
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm">
                Are you sure you want to proceed?
              </AlertDialogDescription>
              <AlertDialogActions
                onConfirm={() => {
                  setShowSuccessAlert(true);
                  setOpenAlertDialog(false);

                  setTimeout(() => {
                    setShowSuccessAlert(false);
                  }, 3000); // 3 seconds
                }}
                onCancel={() => setOpenAlertDialog(false)}
                cancelButton={
                  <button className="px-4 py-2 rounded bg-red-500 text-white hover:cursor-pointer">
                    Cancel
                  </button>
                }
                confirmButton={
                  <button className="px-4 py-2 rounded bg-blue-500 text-white hover:cursor-pointer">
                    Confirm
                  </button>
                }
              />
            </AlertDialog>

            {showSuccessAlert && (
              <Alert
                variant="success"
                icon={<CheckCircle className="size-5 text-green-600" />}
                className="absolute top-10 left-1/2 transform -translate-x-1/2 w-fit h-fit"
              >
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Action has been confirmed successfully.
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="flex w-full h-[300px] bg-stone-900 rounded-lg">
            <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
              <CodeSnippet code={codeExample} className="p-5" />
            </ScrollBox>
          </div>
        )}
      </div>

      {/* Installation Section */}
      <div className="flex flex-col space-y-4 font-semibold">
        <span className="text-xl">Installation</span>
        <div className="flex space-x-4">
          {Object.keys(installCommands).map((tool) => (
            <button
              key={tool}
              onClick={() =>
                setActiveTool(tool as keyof typeof installCommands)
              }
              className={`hover:cursor-pointer px-3 py-1 rounded ${
                activeTool === tool
                  ? "text-white bg-stone-600"
                  : "text-gray-500 hover:text-stone-600"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
        <div className="flex w-full bg-stone-900 rounded-lg px-4 py-2 text-white text-sm">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Section */}
      <div className="flex flex-col space-y-5 font-semibold">
        <span className="text-xl">Usage</span>
        <div className="flex w-full bg-stone-900 rounded-lg p-5 text-white">
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
