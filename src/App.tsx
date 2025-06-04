import { Accordion, AccordionItem } from "./components/accordion";
import { Alert, AlertDescription, AlertTitle } from "./components/alert";

import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  ShoppingBag,
  Heart,
  SkipBack,
  SkipForward,
  Play,
  ShoppingCart,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Circle,
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

import cardImgOne from "./assets/musical-notes-frame-with-text-space_1017-32857.avif";
import cardImgTwo from "./assets/photo-1559181567-c3190ca9959b.jpeg";

import Badge from "./components/badge";
import Breadcrumbs from "./components/breadcrumb";
import Calendar from "./components/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/card";
import Checkbox from "./components/checkbox";
import { CheckboxGroup } from "./components/checkboxgroup";
import Collapsible from "./components/collapsible";
import CircularProgress from "./components/circularprogress";
import ProgressBar from "./components/progressbar";
import Carousel from "./components/carousel";
import Jumbotron from "./components/jumbotron";
import DateInput from "./components/dateinput";

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
    <aside className="w-fit  p-4 flex flex-col space-y-1 items-start">
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
        "Card",
        "Chart*",
        "Checkbox",
        "Checkbox Group",
        "Collapsible",
        "Circular Progress",
        "Progress Bar",
        "Carousel",
        "Jumbotron",
        "Date Input",
      ].map((component) => (
        <button
          key={component}
          className="p-2 text-gray-400 hover:opacity-80 hover:cursor-pointer w-full flex"
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
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<
    Date | undefined
  >(undefined);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCheckboxGroup, setCheckboxGroupSelected] = useState<string[]>(
    []
  );
  const [selectedCollapsedItem, setSelectedCollapsedItem] = useState("");
  const [progress, setProgress] = useState(30);
  const [autoProgress, setAutoProgress] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const [circularprogress, setCircularProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircularProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen bg-black text-white overflow-y-scroll scrollbar-hide flex flex-col ">
      {/* Header */}
      <Header />

      <div className="flex justify-between w-full ">
        {/* Sidebar */}
        <div className="flex w-full">
          <Sidebar />
        </div>

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
                textColor="white"
              >
                This is the first section
              </AccordionItem>
              <AccordionItem
                title="Section 2"
                bgColor="black"
                textColor="white"
              >
                More content here
              </AccordionItem>
              <AccordionItem
                title="Section 3"
                bgColor="black"
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
                selectedDate={selectedCalendarDate}
                onDateSelect={setSelectedCalendarDate}
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

              {selectedCalendarDate && (
                <p className="text-gray-500 ">
                  Selected Date: {selectedCalendarDate.toDateString()}
                </p>
              )}
            </div>
          </div>

          {/* card */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white text-center h-fit w-fit border-t-[1px]">
            <h2 className="text-xl font-bold mb-5">Card</h2>
            <div className="flex h-full w-full items-center justify-center space-x-4">
              {/* Login Card */}
              <Card
                shadow="lg"
                radius="md"
                className="bg-gray-900 text-white flex flex-col space-y-3 items-center justify-center w-[300px] h-full border-[1px] p-4"
              >
                <CardHeader className="bg-gray-900 text-center flex w-full justify-start">
                  <p>Login to your account</p>
                </CardHeader>
                <CardContent className="bg-gray-900 items-center justify-start flex w-full">
                  <form className="flex flex-col space-y-2 w-full">
                    <input
                      type="email"
                      placeholder="Email"
                      className="p-2 text-white border-b border-gray-600"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="p-2 text-white border-b border-gray-600"
                    />
                  </form>
                </CardContent>
                <CardFooter className="bg-gray-900 text-white text-xs flex w-full justify-start -my-2 py-2 hover:cursor-pointer hover:text-blue-500">
                  Forgot password?
                </CardFooter>
                <CardAction className="bg-gray-900 p-2 w-full flex flex-col space-y-2 mt-2">
                  <button className="bg-blue-700 text-white px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-blue-600">
                    Login
                  </button>
                  <p className="bg-gray-900 text-white text-xs flex w-full justify-center -my-2 py-2 hover:cursor-pointer hover:text-blue-500">
                    Create account
                  </p>
                </CardAction>
              </Card>

              {/* Spotify Card */}
              <Card
                shadow="md"
                radius="lg"
                className="relative [300px] h-[200px] p-4 text-white overflow-hidden bg-gray-900"
              >
                <img
                  src={cardImgOne}
                  alt="Album Art"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <button className="absolute top-4 right-4 text-white hover:text-red-500 hover:cursor-pointer z-50">
                  <Heart size={24} />
                </button>
                <div className="relative z-10 flex flex-col items-center p-4">
                  <CardHeader className="flex items-center gap-3 w-full justify-center">
                    <div className="text-center">
                      <p className="font-bold text-lg">DailyMix</p>
                      <p className="text-gray-300 text-sm">Radio</p>
                    </div>
                  </CardHeader>
                  <CardAction className="flex items-center justify-between mt-4 w-full px-4">
                    <button className="text-white text-xl hover:opacity-50 hover:cursor-pointer">
                      <SkipBack size={24} />
                    </button>
                    <button className="text-white px-4 py-2 rounded-full hover:opacity-50 hover:cursor-pointer">
                      <Play size={24} />
                    </button>
                    <button className="text-white text-xl hover:opacity-50 hover:cursor-pointer">
                      <SkipForward size={24} />
                    </button>
                  </CardAction>
                </div>
              </Card>

              {/* E-commerce Card */}
              <Card
                shadow="lg"
                radius="md"
                className="bg-gray-900 p-4 w-[300px] h-[300px] flex flex-col"
                onClick={() => console.log("Cherry Card Pressed")}
              >
                <CardContent className="flex flex-col items-center">
                  <img
                    src={cardImgTwo}
                    alt="Nike Shoes"
                    className="rounded-md w-[200px] h-[200px]"
                  />
                  <div className="flex w-full justify-between items-center mt-2">
                    <p className="text-gray-300 font-semibold">Cherry</p>
                    <p className="text-gray-600 font-bold">$9.99</p>
                  </div>
                </CardContent>
                <CardAction className="w-full flex justify-center mt-1">
                  <button className="text-white px-2 py-1 hover:text-blue-600 hover:cursor-pointer">
                    <ShoppingCart size={20} />
                  </button>
                </CardAction>
              </Card>
            </div>
          </div>

          {/* checkbox */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white h-fit w-[300px] border-t-[1px] m-5">
            <h2 className="text-xl font-bold mb-5 text-center">Checkbox</h2>

            <div className="flex flex-col gap-6">
              {/* Uncontrolled Checkbox (Internally Managed) */}
              <div className="flex items-center gap-3">
                <Checkbox id="terms" defaultChecked />
                <label htmlFor="terms" className="text-sm">
                  Accept terms and conditions
                </label>
              </div>

              {/* Controlled Checkbox (State Managed Externally) */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms-2"
                  checked={isChecked}
                  onChange={setIsChecked}
                />
                <div className="grid gap-2">
                  <label htmlFor="terms-2" className="text-sm">
                    Accept terms and conditions
                  </label>
                  <p className="text-muted-foreground text-sm">
                    By clicking this checkbox, you agree to the terms and
                    conditions.
                  </p>
                </div>
              </div>

              {/* Disabled Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox id="toggle" disabled />
                <label htmlFor="toggle" className="text-sm">
                  Enable notifications
                </label>
              </div>

              {/* Checkbox inside a styled Label */}
              <label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                  id="toggle-2"
                  defaultChecked
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm leading-none font-medium">
                    Enable notifications
                  </p>
                  <p className="text-muted-foreground text-sm">
                    You can enable or disable notifications at any time.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* checkbox group */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white h-fit w-[300px] border-t-[1px] m-5">
            <h2 className="text-xl font-bold mb-5 text-center">
              Checkbox Group
            </h2>
            <div>
              <h3 className="text-lg font-bold mb-4">Preferences</h3>
              <CheckboxGroup
                options={[
                  { id: "news", label: "Subscribe to newsletter" },
                  { id: "offers", label: "Receive special offers" },
                  { id: "updates", label: "Get product updates" },
                ]}
                selectedValues={selectedCheckboxGroup}
                onChange={setCheckboxGroupSelected}
              />
              <p className="mt-4 text-sm">
                Selected: {selectedCheckboxGroup.join(", ") || "None"}
              </p>
            </div>
          </div>

          {/* collapsible */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white h-fit w-[500px] border-t-[1px] m-5">
            <h2 className="text-xl font-bold mb-5 text-center">Collapsible</h2>
            <div className="flex flex-col items-center justify-center w-full  ">
              <Collapsible
                items={["Fruits", "Veggies", "Meats", "Dairy"]}
                trigger={<ChevronsUpDown />}
                selectedItem={selectedCollapsedItem}
                onSelectItem={setSelectedCollapsedItem}
                className="flex flex-col w-1/2 space-y-2"
                headerStyle="flex w-full justify-between text-gray-500 font-semibold"
                triggerStyle="text-gray-500 hover:opacity-80"
                collapsedContentStyle="border rounded-sm py-1 px-3 border-gray-500 hover:cursor-pointer hover:bg-gray-900"
              />

              {/* Display Selected Item Outside Collapsible */}
              <p
                className={`${
                  selectedCollapsedItem ? "mt-4  text-gray-500 flex" : "hidden"
                }`}
              >
                Selected Item: {selectedCollapsedItem || "None"}
              </p>
            </div>
          </div>

          {/* Circular Progress */}
          <div className="flex flex-col items-center bg-black p-5 rounded-lg shadow-md shadow-white h-fit w-fit border-t-[1px] m-5">
            <h2 className="text-xl font-bold mb-5">Circular Progress</h2>

            <div className="flex flex-col space-y-5 items-center justify-center">
              <div
                className="flex space-x-5 items-center justify-center
              "
              >
                {/* Default Spinner */}
                <CircularProgress
                  size={30}
                  borderWidth={2}
                  borderColor="border-blue-500"
                />

                {/* Custom Colors */}
                <CircularProgress
                  size={40}
                  speed="1s"
                  borderWidth={4}
                  borderColor="border-red-500"
                />
                <CircularProgress
                  size={50}
                  speed="2s"
                  borderWidth={6}
                  borderColor="border-green-500"
                />
                <CircularProgress
                  size={60}
                  speed="3s"
                  borderWidth={8}
                  borderColor="border-yellow-500"
                />
                <CircularProgress
                  size={70}
                  speed="4s"
                  borderWidth={10}
                  borderColor="border-purple-500"
                />
              </div>
              <div
                className="flex space-x-5 items-center justify-center
              "
              >
                {/* Indeterminate Progress */}
                <CircularProgress
                  borderColor="border-blue-500"
                  label="Loading..."
                />

                {/* Progress Tracking */}
                <CircularProgress
                  showValueLabel
                  progress={circularprogress}
                  label="Downloading..."
                  size={80}
                  valueTopPosition={"top-10"}
                  borderColor="stroke-blue-600"
                  borderWidth={10}
                />

                <div className="flex flex-col space-y-2">
                  {/* Circular Progress Bar */}
                  <CircularProgress
                    showValueLabel
                    progress={progress}
                    label="Downloading..."
                  />

                  {/* Update Progress buttons */}
                  <div className="flex w-full justify-between text-sm">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                      onClick={() =>
                        setProgress((prev) => Math.max(prev - 10, 0))
                      }
                    >
                      Decrease
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md"
                      onClick={() =>
                        setProgress((prev) => Math.min(prev + 10, 100))
                      }
                    >
                      Increase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progressbar */}
          <div className="flex flex-col space-y-5 items-center bg-black p-5 rounded-lg shadow-md shadow-white h-fit w-fit border-t-[1px] m-5">
            <h2 className="text-xl font-bold">Progress Bar</h2>

            {/* progress bar with buttons */}
            <ProgressBar
              startLabel={`${progress}%`}
              // endLabel="End"
              progress={progress}
              className=""
              labelStyles="flex w-full justify-between mb-2"
              barColor="bg-purple-500"
              bgColor="bg-gray-700"
              barHeight={10}
              barWidth={300}
            />
            {/* Update Progress buttons */}
            <div className="flex w-full justify-between text-sm">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => setProgress((prev) => Math.max(prev - 10, 0))}
              >
                Decrease
              </button>{" "}
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
                onClick={() => setProgress((prev) => Math.min(prev + 10, 100))}
              >
                Increase
              </button>
            </div>

            {/* autoprogress */}
            <ProgressBar
              startLabel={`${autoProgress}%`}
              // endLabel="End"
              progress={autoProgress}
              className=""
              labelStyles="flex w-full justify-between mb-2"
              barColor="bg-green-500"
              bgColor="bg-gray-700"
              barHeight={10}
              barWidth={300}
            />

            {/* Indeterminate Progress Bar (Unknown Duration) */}
            <ProgressBar
              isIndeterminate
              startLabel="Loading..."
              barWidth={300}
              bgColor="bg-gray-800"
            />
          </div>

          {/* carousel */}
          <div className="flex flex-col items-center bg-black p-5 rounded-lg shadow-md shadow-white w-[700px] h-[650px] m-5 border-t-[1px] space-y-5">
            <h2 className="text-xl font-bold text-white mb-5">Carousel</h2>
            {/* sliding transition */}
            <Carousel
              images={[
                "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
                "https://mdbcdn.b-cdn.net/img/new/slides/042.webp",
                "https://mdbcdn.b-cdn.net/img/new/slides/043.webp",
              ]}
              transition="slide"
              autoPlay={true}
              autoPlayInterval={4000}
              prevButton={
                <ChevronLeft size={50} className="hover:cursor-pointer" />
              }
              nextButton={
                <ChevronRight size={50} className="hover:cursor-pointer" />
              }
              indicatorItem={(index, isActive) => (
                <Circle
                  key={index}
                  size={16}
                  className={`hover:cursor-pointer
                    ${
                      isActive
                        ? "bg-blue-500 rounded-full"
                        : "bg-white rounded-full"
                    }`}
                />
              )}
            />
            {/* fading transition */}
            <Carousel
              images={[
                "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
                "https://mdbcdn.b-cdn.net/img/new/slides/042.webp",
                "https://mdbcdn.b-cdn.net/img/new/slides/043.webp",
              ]}
              transition="fade"
              autoPlay={true}
              autoPlayInterval={4000}
              prevButton={
                <ChevronLeft size={50} className="hover:cursor-pointer" />
              }
              nextButton={
                <ChevronRight size={50} className="hover:cursor-pointer" />
              }
              indicatorItem={(index, isActive) => (
                <Circle
                  key={index}
                  size={16}
                  // color={isActive ? "blue" : "white"}
                  className={`hover:cursor-pointer
                    ${
                      isActive
                        ? "bg-blue-500 rounded-full"
                        : "bg-white rounded-full"
                    }`}
                />
              )}
            />
          </div>

          {/* jumbotron */}
          <div className="flex flex-col items-center bg-black p-5 rounded-lg shadow-md shadow-white w-[500px] h-[400px] m-5 border-t-[1px] space-y-5">
            <h2 className="text-xl font-bold text-white mb-5">Jumbotron</h2>
            <Jumbotron
              backgroundImage="https://tecdn.b-cdn.net/img/new/slides/041.webp"
              className="h-[400px] rounded-lg p-12"
              overlayColor="bg-gray-900" // ✅ Customize overlay darkness
              overlayOpacity="opacity-60"
            >
              <div className="relative flex flex-col items-center justify-center h-full w-full">
                <h2 className="mb-4 text-4xl font-semibold text-white">
                  Heading
                </h2>
                <h4 className="mb-6 text-xl font-semibold text-white">
                  Subheading
                </h4>
                <button className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition">
                  Call to action
                </button>
              </div>
            </Jumbotron>
          </div>

          {/* Date Input */}

          {/* Date Input */}
          <div className="bg-black p-5 rounded-lg shadow-md shadow-white text-center h-fit w-fit border-t-[1px] flex flex-col justify-start items-center m-5 pb-10">
            <h2 className="text-xl font-bold mb-5 text-white">Date Input</h2>
            <div className="flex flex-col space-y-10 w-[250px] h-full justify-center items-center">
              {/* Uncontrolled DateInput */}
              <DateInput
                label="Uncontrolled Date"
                labelStyle="text-sm text-gray-600 flex w-full absolute -bottom-6"
                placeholder="Select a date..."
                variant="flat"
                className="text-white text-md bg-gray-700 "
                calendarStyles={{
                  container:
                    "bg-black p-3 rounded-lg shadow-md shadow-gray-700",
                  header: "bg-black p-3 rounded-lg bg-gray-900",
                  title: "text-gray-500 font-bold",
                  button:
                    "text-gray-500 hover:bg-gray-600 hover:rounded-full hover:cursor-pointer",
                  daysOfWeek: "text-gray-500",
                  day: "text-white hover:bg-gray-600 hover:rounded-full hover:cursor-pointer",
                  daySelected: "bg-blue-500 text-white font-bold rounded-full",
                  dayToday: "font-extrabold underline underline-offset-4",
                  dayDisabled: "opacity-30 cursor-not-allowed",
                }}
              />

              {/* Controlled DateInput */}
              <DateInput
                label="Controlled Date"
                labelStyle="text-sm text-gray-600 flex w-full absolute -bottom-6"
                value="2025-06-04"
                onChange={(newDate) => console.log("Selected Date:", newDate)}
                variant="bordered"
                className="text-white bg-gray-700 border-gray-400 text-md rounded-lg"
                calendarStyles={{
                  container:
                    "bg-black p-3 rounded-lg shadow-md shadow-gray-700",
                  header: "bg-black p-3 rounded-lg bg-gray-900",
                  title: "text-gray-500 font-bold",
                  button:
                    "text-gray-500 hover:bg-gray-600 hover:rounded-full hover:cursor-pointer",
                  daysOfWeek: "text-gray-500",
                  day: "text-white hover:bg-gray-600 hover:rounded-full hover:cursor-pointer",
                  daySelected: "bg-blue-500 text-white font-bold rounded-full",
                  dayToday: "font-extrabold underline underline-offset-4",
                  dayDisabled: "opacity-30 cursor-not-allowed",
                }}
              />

              {/* Underlined Variant */}
              <DateInput
                label="Underlined Date"
                labelStyle="text-sm text-gray-600 flex w-full absolute -bottom-6"
                placeholder="Pick a date..."
                variant="underlined"
                className="text-white text-md "
                calendarStyles={{
                  container:
                    "bg-black p-3 rounded-lg shadow-md shadow-gray-700",
                  header: "bg-black p-3 rounded-lg bg-gray-900",
                  title: "text-gray-500 font-bold",
                  button:
                    "text-gray-500 hover:bg-gray-600 hover:rounded-full hover:cursor-pointer",
                  daysOfWeek: "text-gray-500",
                  day: "text-white hover:bg-gray-600 hover:rounded-full hover:cursor-pointer",
                  daySelected: "bg-blue-500 text-white font-bold rounded-full",
                  dayToday: "font-extrabold underline underline-offset-4",
                  dayDisabled: "opacity-30 cursor-not-allowed",
                }}
              />

              {/* Faded Variant */}
              <DateInput
                label="Faded Date"
                labelStyle="text-sm text-gray-600 flex w-full absolute -bottom-6"
                placeholder="YYYY-MM-DD"
                variant="faded"
                className="text-black text-md rounded-sm"
                calendarStyles={{
                  container:
                    "bg-black p-3 rounded-lg shadow-md shadow-gray-700",
                  header: "bg-black p-3 rounded-lg bg-gray-900",
                  title: "text-gray-500 font-bold",
                  button:
                    "text-gray-500 hover:bg-gray-600 hover:rounded-full hover:cursor-pointer",
                  daysOfWeek: "text-gray-500",
                  day: "text-white hover:bg-gray-600 hover:rounded-full hover:cursor-pointer",
                  daySelected: "bg-blue-500 text-white font-bold rounded-full",
                  dayToday: "font-extrabold underline underline-offset-4",
                  dayDisabled: "opacity-30 cursor-not-allowed",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
