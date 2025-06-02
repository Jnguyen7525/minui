import { Accordion, AccordionItem } from "./components/accordion";
import { Alert, AlertDescription, AlertTitle } from "./components/alert";

import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  ShoppingBag,
} from "lucide-react";
import Button from "./components/button";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./components/alertDialog";
import Autocomplete from "./components/autocomplete";
import Avatar from "./components/avatar";

import firstAvatar from "./assets/scared-cartoon-people-scared-face-clip-art-black-and-white--m2i8H7b1d3d3A0Z5.jpg";
import secondAvatar from "./assets/batman_hero_avatar_comics-512.webp";
import thirdAvatar from "./assets/avatar-icon-512x512-nktgi1ew.png";
import Badge from "./components/badge";
import Breadcrumbs from "./components/breadcrumb";
import Calendar from "./components/calendar";

/* Header Component */
function Header() {
  return (
    <header className="bg-black p-4 flex items-center justify-between shadow-md border-b border-gray-600 mb-10 shadow-white">
      <h1 className="text-xl font-semibold">MyUI</h1>
    </header>
  );
}

/* Sidebar Component */
function Sidebar() {
  return (
    <aside className="w-60 bg-black p-4 flex flex-col space-y-1 items-start">
      <h2 className="font-semibold">Components</h2>
      {[
        "Accordion",
        "Alert",
        "Alert Dialog",
        "Autocomplete",
        "Avatar",
        "Button",
        "Badge",
        "Breadcrumb",
        "Calendar",
      ].map((component) => (
        <button
          key={component}
          className="p-2 text-gray-400 hover:opacity-80 hover:cursor-pointer"
        >
          {component}
        </button>
      ))}
    </aside>
  );
}

function App() {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [currentBreadcrumb, setCurrentBreadcrumb] = useState("Shoes");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // make the alert that appear for alertDialog disappear after 3 secs.
  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 1000); // 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [showSuccessAlert]);

  return (
    <div className="min-h-screen bg-black text-white overflow-y-scroll scrollbar-hide">
      {/* // <div className="min-h-screen bg-black text-white flex items-center justify-center p-8 relative"> */}
      {/* Header */}
      <Header />

      <div className="flex justify-between">
        {/* Sidebar */}
        <Sidebar />

        {/* <div className="grid gap-10 grid-cols-1 md:grid-cols-2 pr-10"> */}
        <div
          className="flex flex-wrap p-10 items-center justify-center
        "
        >
          {/* Accordion Component */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white text-center h-fit w-fit border-t-[1px] m-5">
            <h2 className="text-xl font-bold mb-5">Accordion</h2>
            <Accordion bgColor="black" textColor="white">
              <AccordionItem
                title="Section 1"
                bgColor="black"
                // borderColor="border-blue-500"
                textColor="white"
              >
                This is the first section
              </AccordionItem>
              <AccordionItem
                title="Section 2"
                bgColor="black"
                // borderColor="border-red-500"
                textColor="white"
              >
                More content here
              </AccordionItem>
              <AccordionItem
                title="Section 3"
                bgColor="black"
                // borderColor="border-yellow-500"
                textColor="white"
              >
                Final section details
              </AccordionItem>
            </Accordion>
          </div>

          {/* Alert Component */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white text-center h-fit w-fit border-t-[1px] m-5">
            <h2 className="text-xl font-bold ">Alerts</h2>
            <div className="flex flex-col justify-center space-y-3 mt-5">
              <Alert
                variant="warning"
                icon={<AlertTriangle className="size-5 text-yellow-600" />}
              >
                <AlertTitle>Heads Up!</AlertTitle>
                <AlertDescription>
                  Something needs your attention.
                </AlertDescription>
              </Alert>

              <Alert
                variant="default"
                icon={<Info className="size-5 text-blue-600" />}
              >
                <AlertTitle>Info Alert</AlertTitle>
                <AlertDescription>
                  This is just an informational alert.
                </AlertDescription>
              </Alert>

              <Alert
                variant="destructive"
                icon={<XCircle className="size-5 text-red-600" />}
              >
                <AlertTitle>Danger!</AlertTitle>
                <AlertDescription>
                  This action cannot be undone.
                </AlertDescription>
              </Alert>

              <Alert
                variant="success"
                icon={<CheckCircle className="size-5 text-green-600" />}
              >
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Everything went smoothly.</AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Alert Dialog Component */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white text-center h-fit w-fit border-t-[1px] flex flex-col justify-start items-center m-5">
            <h2 className="text-xl font-bold mb-5">Alert Dialog</h2>
            <div className="flex w-full h-full justify-center items-center">
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
                bgColor="bg-black"
                overlayColor="bg-black/60"
              >
                <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to proceed?
                </AlertDialogDescription>
                <AlertDialogActions
                  onConfirm={() => {
                    setShowSuccessAlert(true); // Show success Alert instead of alert()
                    setOpenAlertDialog(false); // Close the Alert Dialog
                  }}
                  onCancel={() => setOpenAlertDialog(false)}
                  cancelColor="bg-red-500"
                  confirmColor="bg-blue-500"
                />
              </AlertDialog>

              {/* Success Alert (conditionally displayed) */}
              {showSuccessAlert && (
                <Alert
                  variant="success"
                  icon={<CheckCircle className="size-5 text-green-600" />}
                  className="absolute top-10 left-1/2 transform -translate-x-1/2  w-fit h-fit"
                >
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Action has been confirmed successfully.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          {/* AutoComplete */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white text-center h-fit w-fit border-t-[1px] flex flex-col justify-start items-center m-5">
            <h2 className="text-xl font-bold mb-5">AutoComplete</h2>
            <div className="flex flex-col space-y-5 w-full h-full justify-center items-center">
              <Autocomplete
                items={[
                  { label: "Apple", key: "apple" },
                  { label: "Banana", key: "banana" },
                  { label: "Cherry", key: "cherry" },
                  { label: "Date", key: "date" },
                  { label: "Grapes", key: "grapes" },
                ]}
                placeholder="Pick a fruit..."
                bgColor="bg-black"
                borderColor="border-blue-500"
                textColor="text-white"
                variant="flat"
              />

              <Autocomplete
                items={[
                  { label: "Apple", key: "apple" },
                  { label: "Banana", key: "banana" },
                  { label: "Cherry", key: "cherry" },
                  { label: "Date", key: "date" },
                  { label: "Grapes", key: "grapes" },
                ]}
                placeholder="Pick a fruit..."
                bgColor="bg-black"
                borderColor="border-blue-500"
                textColor="text-white"
                variant="bordered"
              />

              <Autocomplete
                items={[
                  { label: "Apple", key: "apple" },
                  { label: "Banana", key: "banana" },
                  { label: "Cherry", key: "cherry" },
                  { label: "Date", key: "date" },
                  { label: "Grapes", key: "grapes" },
                ]}
                placeholder="Pick a fruit..."
                bgColor="bg-black"
                borderColor="border-blue-500"
                textColor="text-white"
                variant="underlined"
              />

              <Autocomplete
                items={[
                  { label: "Apple", key: "apple" },
                  { label: "Banana", key: "banana" },
                  { label: "Cherry", key: "cherry" },
                  { label: "Date", key: "date" },
                  { label: "Grapes", key: "grapes" },
                ]}
                placeholder="Pick a fruit..."
                bgColor="bg-blue-500"
                borderColor="border-blue-500"
                textColor="text-white"
                variant="faded"
              />
            </div>
          </div>

          {/* avatar */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white text-center h-fit w-fit border-t-[1px] flex flex-col justify-start items-center m-5">
            <h2 className="text-xl font-bold mb-5">Avatar</h2>
            <div className="flex h-full w-full space-x-5 items-center ">
              <Avatar
                src={firstAvatar}
                size="xl"
                bgColor="bg-black"
                borderColor="border-black"
                className="border-2"
              />
              <Avatar
                src={secondAvatar}
                size="lg"
                bgColor="bg-gray-100"
                borderColor="border-blue-500"
                textColor="text-red-500"
                className="border-2"
              />
              <Avatar
                src={thirdAvatar}
                size="md"
                bgColor="bg-black"
                borderColor="border-blue-500"
                textColor="text-red-500"
                className="border-2"
              />
              <Avatar
                name="John"
                size="sm"
                bgColor="bg-blue-300"
                borderColor="border-red-300"
                textColor="text-red-300"
                className="border-2"
              />
            </div>
          </div>

          {/* Button Component */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white text-center h-fit w-fit border-t-[1px] m-5">
            <h2 className="text-xl font-bold ">Button</h2>

            <div className="flex flex-wrap justify-center space-x-5 mt-5">
              <Button
                label="Default"
                variant="default"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
              <Button
                label="Destructive"
                variant="destructive"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
              <Button
                label="Outline"
                variant="outline"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
              <Button
                label="Secondary"
                variant="secondary"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
              <Button
                label="Ghost"
                variant="ghost"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
              <Button
                label="Link"
                variant="link"
                size="default"
                className="border rounded-sm flex items-center hover:cursor-pointer"
              />
            </div>
          </div>

          {/* Button Component */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white text-center h-fit w-fit border-t-[1px] m-5">
            <h2 className="text-xl font-bold mb-5">Badge</h2>
            <div className="flex h-full w-full space-x-5 items-center ">
              <Badge
                content="1"
                placement="top-right"
                size="lg"
                bgColor="bg-black"
                textColor="text-white"
                onClick={() => alert("hi")}
              >
                <Avatar
                  src={firstAvatar}
                  size="xl"
                  bgColor="bg-black"
                  borderColor="border-black"
                  className="border-2"
                />
              </Badge>

              <Badge
                placement="bottom-right"
                size="lg"
                bgColor="bg-red-500"
                textColor="text-white"
                onClick={() => alert("i'm batman")}
              >
                <Avatar
                  src={secondAvatar}
                  size="lg"
                  bgColor="bg-gray-100"
                  borderColor="border-blue-500"
                  textColor="text-red-500"
                  className="border-2"
                />
              </Badge>

              <Badge content="" placement="bottom-right" bgColor="bg-green-500">
                <Avatar
                  src={thirdAvatar}
                  size="md"
                  bgColor="bg-black"
                  borderColor="border-blue-500"
                  textColor="text-red-500"
                  className="border-2"
                />
              </Badge>

              <Badge
                content={<span>🔥</span>}
                placement="top-left"
                bgColor="bg-transparent"
              >
                <Avatar
                  name="John"
                  size="sm"
                  bgColor="bg-blue-300"
                  borderColor="border-red-300"
                  textColor="text-red-300"
                  className="border-2"
                />
              </Badge>

              <Badge
                content={"2"}
                placement="top-right"
                bgColor="bg-blue-500"
                borderColor="border-red-600"
                textColor="text-white"
                offsetX="translate-x-[6px]"
                offsetY="-translate-y-[6px]"
              >
                <ShoppingBag className="size-8 text-white" />
              </Badge>
            </div>
          </div>

          {/* breadcrumb */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white text-center h-fit w-fit border-t-[1px] m-5">
            <h2 className="text-xl font-bold mb-5">Breadcrumb</h2>
            <div className="flex flex-col h-full w-full space-y-5 items-center justify-center ">
              <Breadcrumbs
                items={[
                  {
                    label: "Home",
                    href: "/",
                    onClick: () => setCurrentBreadcrumb("Home"),
                    isCurrent: currentBreadcrumb === "Home",
                  },
                  {
                    label: "Products",
                    href: "/products",
                    onClick: () => setCurrentBreadcrumb("Products"),
                  },
                  {
                    label: "Shoes",
                    href: "/products/shoes",
                    onClick: () => setCurrentBreadcrumb("Shoes"),
                  },
                  {
                    label: "Accessories",
                    href: "/products/shoes/accessories",
                    onClick: () => setCurrentBreadcrumb("Accessories"),
                  },
                  {
                    label: "Clothes",
                    href: "/products/clothes",
                    onClick: () => setCurrentBreadcrumb("Clothes"),
                  },
                  {
                    label: "Misc",
                    href: "/products/misc",
                    onClick: () => setCurrentBreadcrumb("Misc"),
                  },
                ]}
                itemStyle="underline hover:text-blue-300 hover:cursor-pointer"
                itemsBeforeCollapse={2}
                itemsAfterCollapse={2}
                separatorStyle="text-gray-500 text-lg"
                className="bg-gradient-to-l from-blue-800 to-purple-600 text-white p-2 rounded-md"
                currentItemStyle="text-blue-600 font-bold"
                dropDownMenuStyle="bg-gradient-to-l from-blue-800 to-purple-600 text-white flex flex-col space-y-2 p-5 border rounded-md"
                onAction={(item) => setCurrentBreadcrumb(item)}
              />
            </div>
          </div>

          {/* calendar */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white text-center h-fit w-[300px] border-t-[1px] m-5 underline-offset-2">
            <h2 className="text-xl font-bold mb-5">Calendar</h2>
            <div className="flex flex-col h-full w-full space-y-5 items-center justify-center ">
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                classNames={{
                  container:
                    "bg-black p-3 rounded-lg  shadow-md shadow-gray-700",
                  header: "bg-black p-3 -m-3 mb-[0.5px] rounded-lg bg-gray-900",
                  title: "text-gray-500 font-bold",
                  button:
                    " text-gray-500  hover:bg-gray-600 hover:rounded-full hover:cursor-pointer ",
                  daysOfWeek: "text-gray-500",
                  day: "text-white hover:bg-gray-600 hover:rounded-full hover:cursor-pointer",
                  daySelected: "bg-blue-500 text-white font-bold rounded-full",
                  dayToday: "font-extrabold underline underline-offset-4",
                  dayDisabled: "opacity-30 cursor-not-allowed",
                }}
              />

              {selectedDate && (
                <p className="text-gray-500 ">
                  Selected Date: {selectedDate.toDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
