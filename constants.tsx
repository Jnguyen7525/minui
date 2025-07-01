import {
  Banknote,
  Bell,
  Box,
  Code,
  CreditCard,
  FireExtinguisher,
  HomeIcon,
  List,
  Pen,
  ShoppingCart,
} from "lucide-react";
import type { TableColumn } from "./src/components/table";

interface FormStepperProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  cardNumber: string;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
}

export const FormStepper: React.FC<FormStepperProps> = ({
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
            className={`px-4 py-2 bg-blue-600 text-white rounded ${
              !isStepValid() ? "opacity-50 cursor-not-allowed" : ""
            }`} // ✅ Disable if invalid
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

export const myTabs = [
  {
    id: "html",
    label: (
      <div className="flex items-center justify-center space-x-1 hover:cursor-pointer">
        <span>HTML</span> <Code size={16} />
      </div>
    ),
    content: <p>HTML Content</p>,
  },
  {
    id: "react",
    label: (
      <div className="flex items-center justify-center space-x-1 hover:cursor-pointer">
        <span>React</span> <FireExtinguisher size={16} />
      </div>
    ),
    content: <p>React Content</p>,
  },
];

export const navbarItems = [
  { label: "Home", href: "/", icon: <HomeIcon size={20} /> },
  {
    label: "Categories",
    icon: <List size={20} />,
    submenu: [
      { label: "Technology", href: "/category/technology" },
      { label: "Science", href: "/category/science" },
    ],
  },
  { label: "Products", href: "/products", icon: <Box size={20} /> },
];

export const events = [
  {
    id: 1,
    title: "First Step",
    description: "Start your journey with this initial step.",
    timestamp: "2025-06-01 08:00 AM",
    icon: <Bell className="w-4 h-4" />,
  },
  {
    id: 2,
    title: "Second Step",
    description: "Building upon the foundation with more advanced ideas.",
    timestamp: "2025-06-05 01:30 PM",
    icon: <ShoppingCart className="w-4 h-4" />,
  },
  {
    id: 3,
    title: "Final Step",
    description: "Culmination of your journey.",
    timestamp: "2025-06-10 06:00 PM",
    icon: <CreditCard className="w-4 h-4" />,
  },
];

type Invoice = {
  invoice: string;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
  issuedOn: string;
};

export const invoices: Invoice[] = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    issuedOn: "2024-12-01",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    issuedOn: "2025-01-15",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
    issuedOn: "2024-11-08",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
    issuedOn: "2025-03-20",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    issuedOn: "2025-04-02",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
    issuedOn: "2025-01-01",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
    issuedOn: "2024-10-25",
  },
];

export const columns: TableColumn<(typeof invoices)[0]>[] = [
  {
    key: "invoice",
    label: "Invoice",
    className: "font-semibold",
    sortable: true,
  },
  { key: "paymentStatus", label: "Status", sortable: true },
  {
    key: "paymentMethod",
    label: "Method",
    sortable: true,
    render: (method: string) => {
      const iconMap: Record<string, React.ReactNode> = {
        "Credit Card": <CreditCard className="w-4 h-4 text-stone-500" />,
        "Bank Transfer": <Banknote className="w-4 h-4 text-stone-500" />,
        PayPal: (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-stone-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.5 21h2.2l.4-2.5h1.9c2.6 0 4.7-1.7 5.3-4.2.2-.9.1-1.8-.3-2.6-.4-.8-1-1.4-1.8-1.8.5-.6.8-1.3.9-2.1.2-1.2-.1-2.3-.8-3.2C13.6 3.2 12.3 2.5 11 2.5H6.8c-.4 0-.7.3-.8.6L4 18.5c-.1.5.3.9.8.9H6.5zm3.1-6.5l.5-3.2h1.7c.6 0 1.1.3 1.4.7.3.5.4 1.1.3 1.6-.3 1.2-1.4 2-2.6 2H9.6zm.9-5.2l.5-3.1h1.5c.5 0 1 .2 1.3.6.3.4.4.9.3 1.4-.2.9-1 1.6-1.9 1.6h-1.7z" />
          </svg>
        ),
      };

      return (
        <div className="flex items-center gap-2">
          {iconMap[method] ?? null}
          <span>{method}</span>
        </div>
      );
    },
  },

  {
    key: "totalAmount",
    label: "Amount",
    align: "right",
    sortable: true,
  },
  {
    key: "issuedOn",
    label: "Issued",
    sortable: true,
    render: (val) => new Date(val as string).toLocaleDateString(),
  },
];

type Member = {
  id: number;
  name: string;
  role: string;
  startDate: string;
};

export const members: Member[] = [
  { id: 1, name: "John Michael", role: "Manager", startDate: "2018-04-23" },
  { id: 2, name: "Alexa Liras", role: "Developer", startDate: "2018-04-23" },
  {
    id: 3,
    name: "Laurent Perrier",
    role: "Executive",
    startDate: "2017-09-19",
  },
  { id: 4, name: "Michael Levi", role: "Developer", startDate: "2008-12-24" },
  { id: 5, name: "Richard Gran", role: "Manager", startDate: "2021-10-04" },
];

export const memberColumns: TableColumn<Member>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "role", label: "Role", sortable: true },
  {
    key: "startDate",
    label: "Employed",
    sortable: true,
  },
  {
    key: "name",
    label: "",
    render: (_, row) => (
      <a
        onClick={(e) => {
          e.stopPropagation();
          alert(`Editing ${row.name}`);
        }}
        className="text-blue-600 cursor-pointer hover:underline flex items-center justify-center space-x-1"
      >
        <Pen size={16} />
        <span>Edit</span>
      </a>
    ),
  },
];
