import { useState } from "react";

import { CreditCard, Banknote, Pen } from "lucide-react";
import ScrollBox from "../../components/scrollbox";
import CodeSnippet from "../../components/codesnippet";
import { Table, type TableColumn } from "../../components/table";

const installCommands = {
  cli: "npx create-ui-app",
  pnpm: "pnpm add @your-org/ui-kit",
  npm: "npm install @your-org/ui-kit",
  yarn: "yarn add @your-org/ui-kit",
};

const codeExample = `// ✅ Invoice data and config
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
          alert('Editing \${row.name}');
        }}
        className="text-blue-600 cursor-pointer hover:underline flex items-center justify-center space-x-1"
      >
        <Pen size={16} />
        <span>Edit</span>
      </a>
    ),
  },
];
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const selectedMembers = members.filter((m) => selectedIds.includes(m.id));
  <div className="rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5 p-5">
          <h2 className="text-xl font-bold mb-5">table</h2>
          <div className="flex space-x-5">
            <div className="flex h-fit w-fit">
              <Table
                data={invoices}
                columns={columns}
                caption="A list of your recent invoices."
                footer="Total billed: $1,200.00"
                striping="column"
                className="text-stone-200"
                strippedColor="blue"
              />
            </div>
  
            <div className="flex flex-col h-fit w-fit">
              <Table
                data={members}
                columns={memberColumns}
                caption="Team members and their roles."
                sortable
                striping="row"
                selectionMode="multiple"
                className="bg-white text-black"
                strippedColor="blue"
                rowId={(row) => row.id}
                selectedRowIds={selectedIds}
                onSelectionChange={(ids) => setSelectedIds(ids as number[])}
                renderSelectionAction={(selected) => (
                  <div className="flex justify-between items-center p-4 border-t bg-stone-50">
                    <span className="text-sm text-stone-600">
                      Selected: {selected.length}
                    </span>
                    <button
                      onClick={() =>
                        alert(
                          'Messaging: \${selected.map((m) => m.name).join(", ")}'
                        )
                      }
                      className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                    >
                      Message Selected Members
                    </button>
                  </div>
                )}
              />
              <div className="flex space-x-1 text-sm text-stone-700 mt-2">
                {selectedMembers ? (
                  selectedMembers.map((member) => <span>{member.name}</span>)
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
  `;

const usageExample = `import Table from "@your-org/ui-kit";

function Example() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const selectedMembers = members.filter((m) => selectedIds.includes(m.id));

  return (
    <Table
      data={members}
      columns={memberColumns}
      selectionMode="multiple"
      rowId={(row) => row.id}
      selectedRowIds={selectedIds}
      onSelectionChange={(ids) => setSelectedIds(ids as number[])}
      renderSelectionAction={(selected) => (
        <div className="flex justify-between items-center p-4 border-t bg-gray-50">
          <span>Selected: {selected.length}</span>
          <button onClick={() => alert(\`Messaging: \${selected.map(m => m.name).join(", ")}\`)}>
            Message Selected
          </button>
        </div>
      )}
    />
  );
}`;

// ✅ Invoice data and config
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

export default function TableDemo() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [activeTool, setActiveTool] =
    useState<keyof typeof installCommands>("cli");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const selectedMembers = members.filter((m) => selectedIds.includes(m.id));

  return (
    <div className="space-y-5 flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Table</h1>
      <p className="text-gray-600">
        A flexible table component with support for striping, selection actions,
        sorting, custom cells, and footers.
      </p>

      {/* Toggle */}
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

      {/* Demo Block */}
      <div className="flex w-full items-center justify-center border border-stone-600 rounded-lg bg-black text-white p-6">
        {activeView === "preview" ? (
          <div className="flex items-center space-x-5">
            <div className="flex h-fit w-fit">
              <Table
                data={invoices}
                columns={columns}
                caption="A list of your recent invoices."
                footer="Total billed: $1,200.00"
                striping="column"
                className="text-stone-200"
                strippedColor="blue"
              />
            </div>

            <div className="flex flex-col h-fit w-fit">
              <Table
                data={members}
                columns={memberColumns}
                caption="Team members and their roles."
                sortable
                striping="row"
                selectionMode="multiple"
                className="bg-white text-black"
                strippedColor="blue"
                rowId={(row) => row.id}
                selectedRowIds={selectedIds}
                onSelectionChange={(ids) => setSelectedIds(ids as number[])}
                renderSelectionAction={(selected) => (
                  <div className="flex justify-between items-center p-4 border-t bg-stone-50">
                    <span className="text-sm text-stone-600">
                      Selected: {selected.length}
                    </span>
                    <button
                      onClick={() =>
                        alert(
                          `Messaging: ${selected.map((m) => m.name).join(", ")}`
                        )
                      }
                      className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                    >
                      Message Selected Members
                    </button>
                  </div>
                )}
              />
              <div className="flex space-x-1 text-sm text-stone-700 mt-2">
                {selectedMembers ? (
                  selectedMembers.map((member) => <span>{member.name}</span>)
                ) : (
                  <></>
                )}
              </div>
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
        <div className="bg-stone-900 px-4 py-2 text-white text-sm rounded">
          <CodeSnippet code={installCommands[activeTool]} />
        </div>
      </div>

      {/* Usage */}
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
