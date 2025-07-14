import { useState } from "react";
import { User, Truck, CreditCard, CheckCircle } from "lucide-react";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";
import Stepper from "../../components/stepper";
import { FormStepper } from "../../../constants";

const steps = ["Customer Info", "Shipping Info", "Payment", "Review"];

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `
// State
const [currentStep, setCurrentStep] = useState(0);
const [name, setName] = useState("");
const [address, setAddress] = useState("");
const [cardNumber, setCardNumber] = useState("");

const FormStepper: React.FC<FormStepperProps> = ({
  currentStep,
  setCurrentStep,
  name,
  setName,
  address,
  setAddress,
  cardNumber,
  setCardNumber,
}) => {
  const isStepValid = () => {
    if (currentStep === 0) return name.trim() !== ""; // Name required
    if (currentStep === 1) return address.trim() !== ""; // Address required
    if (currentStep === 2) return cardNumber.trim() !== ""; // Card required
    return true;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* ✅ Form Sections with Persistent State */}
      {currentStep === 0 && (
        <div className="mt-4">
          <h2>Customer Info</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border p-2"
          />
        </div>
      )}

      {currentStep === 1 && (
        <div className="mt-4">
          <h2>Shipping Info</h2>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="border p-2"
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className="mt-4">
          <h2>Payment</h2>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Card Number"
            className="border p-2"
          />
        </div>
      )}

      {currentStep === 3 && (
        <div className="mt-4">
          <h2>Review & Confirm</h2>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Card Number:</strong> {cardNumber}
          </p>
          <p>Make sure all information is correct!</p>
        </div>
      )}

      {/* ✅ Navigation Buttons */}
      <div className="mt-4 flex space-x-4">
        {currentStep > 0 && (
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            Previous
          </button>
        )}
        {currentStep < 3 && (
          <button
            className={'px-4 py-2 bg-blue-600 text-white rounded \${
              !isStepValid() ? "opacity-50 cursor-not-allowed" : ""
            }'} // ✅ Disable if invalid
            disabled={!isStepValid()} // ✅ Prevents clicking when fields are empty
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

        <div className="p-5 rounded-lg text-center border shadow-lg flex flex-col justify-start items-center w-fit space-y-5">

            {/* Basic Stepper */}
            <Stepper
              steps={[
                <span>Step 1</span>,
                <span>Step 2</span>,
                <span>Step 3</span>,
                <span>Step 4</span>,
              ]}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              nextButton={
                <span className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                  Next
                </span>
              }
              prevButton={
                <span className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                  Previous
                </span>
              }
              className="flex items-center gap-5"
            />

            {/* Circle Style */}
            <Stepper
              steps={Array(4)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-gray-500" />
                ))}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              className="flex items-center justify-center w-full space-x-10"
            />

            {/* Icons Stepper */}
            <Stepper
              steps={[
                <User size={20} />,
                <Truck size={20} />,
                <CreditCard size={20} />,
                <CheckCircle size={20} />,
              ]}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              className="flex items-center gap-5"
            />

            {/* Form Stepper */}
            <div className="w-full flex flex-col items-center space-y-5">
              <Stepper
                steps={steps.map((s) => (
                  <span key={s}>{s}</span>
                ))}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                className="flex items-center gap-5"
              />
              <FormStepper
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
              />
            </div>
          </div>
`;

const usageExample = `
import Stepper from "@your-org/ui-kit";

function Example() {
  const [step, setStep] = useState(0);

  return (
    <Stepper
      steps={["Start", "Details", "Confirm"]}
      currentStep={step}
      setCurrentStep={setStep}
    />
  );
}
`;

export default function StepperDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Stepper</h1>
      <p className="text-gray-600">
        A guided step navigation component supporting visual variants and
        synchronized form state. Excellent for checkout flows or onboarding
        processes.
      </p>

      {/* View toggle */}
      <div className="flex space-x-4 font-semibold">
        {["preview", "code"].map((v) => (
          <button
            key={v}
            onClick={() => setActiveView(v as "preview" | "code")}
            className={`px-3 py-1 rounded ${
              activeView === v
                ? "bg-stone-600 text-white"
                : "text-gray-500 hover:text-stone-600"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Preview/Code Section */}
      <div className="border border-stone-600 p-6 rounded-lg bg-black text-white flex justify-center">
        {activeView === "preview" ? (
          <div className="p-10 flex flex-col justify-start items-center  space-y-5">
            {/* Basic Stepper */}
            <Stepper
              steps={[
                <span>Step 1</span>,
                <span>Step 2</span>,
                <span>Step 3</span>,
                <span>Step 4</span>,
              ]}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              nextButton={
                <span className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                  Next
                </span>
              }
              prevButton={
                <span className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                  Previous
                </span>
              }
              className="flex items-center gap-5"
            />

            {/* Circle Style */}
            <Stepper
              steps={Array(4)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-gray-500" />
                ))}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              className="flex items-center justify-center w-full space-x-10"
            />

            {/* Icons Stepper */}
            <Stepper
              steps={[
                <User size={20} />,
                <Truck size={20} />,
                <CreditCard size={20} />,
                <CheckCircle size={20} />,
              ]}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              className="flex items-center gap-5"
            />

            {/* Form Stepper */}
            <div className="w-full flex flex-col items-center space-y-5">
              <Stepper
                steps={steps.map((s) => (
                  <span key={s}>{s}</span>
                ))}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                className="flex items-center gap-5"
              />
              <FormStepper
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full h-[400px] bg-stone-900 rounded-lg ">
            <ScrollBox className="w-2 rounded-full bg-stone-700 h-2 ">
              <CodeSnippet code={codeExample} className="p-5" />
            </ScrollBox>
          </div>
        )}
      </div>

      {/* Installation */}
      <div className="flex flex-col space-y-4 font-semibold">
        <span className="text-xl">Installation</span>
        <div className="flex space-x-4">
          {Object.entries(installCommands).map(([tool]) => (
            <button
              key={tool}
              onClick={() =>
                setActiveTool(tool as keyof typeof installCommands)
              }
              className={`px-3 py-1 rounded ${
                activeTool === tool
                  ? "bg-stone-600 text-white"
                  : "text-gray-500 hover:text-stone-600"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
        <div className="bg-stone-900 text-white text-sm px-4 py-2 rounded">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage Example */}
      <div className="flex flex-col space-y-5 font-semibold">
        <span className="text-xl">Usage</span>
        <div className="bg-stone-900 p-5 rounded-lg text-white">
          <ScrollBox className="w-2 rounded-full bg-stone-700 h-2">
            <CodeSnippet code={usageExample} className="p-5" />
          </ScrollBox>
        </div>
      </div>
    </div>
  );
}
