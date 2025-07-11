import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "../components/accordion";
import { Alert, AlertDescription, AlertTitle } from "../components/alert";
import {
  AlertTriangle,
  Archive,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Circle,
  CreditCard,
  FileText,
  Heart,
  Inbox,
  Info,
  Menu,
  Pencil,
  Play,
  Send,
  ShoppingBag,
  ShoppingCart,
  SkipBack,
  SkipForward,
  Star,
  Trash2,
  Truck,
  User,
  X,
  XCircle,
} from "lucide-react";
import Button from "../components/button";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../components/alertDialog";
import Autocomplete from "../components/autocomplete";
import Avatar from "../components/avatar";
import Breadcrumbs from "../components/breadcrumb";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/card";
import Checkbox from "../components/checkbox";
import { CheckboxGroup } from "../components/checkboxgroup";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleHeader,
  CollapsibleItem,
  CollapsibleTrigger,
} from "../components/collapsible";
import CircularProgress from "../components/circularprogress";
import ProgressBar from "../components/progressbar";
import Carousel from "../components/carousel";
import Jumbotron from "../components/jumbotron";
import DateInput from "../components/dateinput";
import DateRangePicker from "../components/daterangepicker";

import Drawer from "../components/drawer";
import Lightbox from "../components/lightbox";
import Dialog from "../components/dialog";
import Placeholder from "../components/placeholder";
import Input from "../components/input";
import InputOTP from "../components/inputotp";
import Rating from "../components/rating";
import BackToTop from "../components/backtotop";
import SocialIcons from "../components/socialicons";
import Popover from "../components/popover";
import Badge from "../components/badge";
import Calendar from "../components/calendar";

import firstAvatar from "../assets/scared-cartoon-people-scared-face-clip-art-black-and-white--m2i8H7b1d3d3A0Z5.jpg";
import secondAvatar from "../assets/batman_hero_avatar_comics-512.webp";
import thirdAvatar from "../assets/avatar-icon-512x512-nktgi1ew.png";

import cardImgOne from "../assets/musical-notes-frame-with-text-space_1017-32857.avif";
import cardImgTwo from "../assets/photo-1559181567-c3190ca9959b.jpeg";

import lightboxone from "../assets/lightboxone.webp";
import lightboxtwo from "../assets/lightboxtwo.webp";
import lightboxthree from "../assets/lightboxthree.webp";
import { useToast } from "../components/toast";
import Tooltip from "../components/tooltip";
import Stepper from "../components/stepper";
import Testimonial from "../components/testimonial";
import Switch from "../components/switch";
import RadioGroup from "../components/radiogroup";
import Textarea from "../components/textarea";
import Tabs from "../components/tab";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/resizable";
import { GridPanel, ResizableGridProvider } from "../components/resizablegrid";
import { Pagination } from "../components/pagination";
import { useSearchParams } from "react-router-dom";
import { Timeline } from "../components/timeline";
import { Table } from "../components/table";

import {
  columns,
  events,
  FormStepper,
  invoices,
  memberColumns,
  members,
  myTabs,
  navbarItems,
} from "../../constants";
import NumberInput from "../components/numberinput";
import TimeInput from "../components/timeinput";
import Slider from "../components/slider";
import {
  Combobox,
  ComboboxDropdown,
  ComboboxTrigger,
} from "../components/combobox";
import { ContextMenu, ContextMenuPanel } from "../components/contextmenu";
import Dropdown, {
  DropdownMenu,
  DropdownTrigger,
} from "../components/dropdown";

const images = [lightboxone, lightboxtwo, lightboxthree];

const Home = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  // @ts-ignore
  const [currentBreadcrumb, setCurrentBreadcrumb] = useState("Shoes");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<
    Date[] | undefined
  >(undefined);
  const [dateInput, setDateInput] = useState<string | undefined>("2024-04-04");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCheckboxGroup, setCheckboxGroupSelected] = useState<string[]>(
    []
  );
  const [selectedCollapsedItem, setSelectedCollapsedItem] = useState("");
  const [progress, setProgress] = useState(30);
  const [autoProgress, setAutoProgress] = useState(30);

  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isTopDrawerOpen, setIsTopDrawerOpen] = useState(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState("");
  const [rating, setRating] = useState(0);
  const [isTopPopoverOpen, setIsTopPopoverOpen] = useState(false);
  const [isRightPopoverOpen, setIsRightPopoverOpen] = useState(false);
  const [isLeftPopoverOpen, setIsLeftPopoverOpen] = useState(false);
  const [isBottomPopoverOpen, setIsBottomPopoverOpen] = useState(false);

  const { showToast } = useToast(); // ✅ Access toast context

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

  const steps = ["Customer Info", "Shipping Info", "Payment", "Review"];
  const [currentStep, setCurrentStep] = useState(0);
  // ✅ Maintain form input state
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [radioSelected, setRadioSelected] = useState("comfortable");
  const [text, setText] = useState("");
  const [selectedTab, setSelectedTab] = useState("html");

  const [openSidebar, setOpenSidebar] = useState(true);

  const [currentPage, setCurrentPage] = useState(7);
  const totalPages = 12; // Set this based on your data

  const allItems = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
  const ITEMS_PER_PAGE = 5;

  const [params, setParams] = useSearchParams();
  const pageParam = parseInt(params.get("page") || "1", 10);
  const [currentPageWithLink, setCurrentPageWithLink] = useState(pageParam);
  const totalPagesWithLink = Math.ceil(allItems.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPageWithLink(pageParam);
  }, [pageParam]);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = allItems.slice(start, start + ITEMS_PER_PAGE);

  // Updates URL with new ?page= value
  const updatePage = (page: number) => {
    params.set("page", String(page));
    setParams(params);
  };

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const selectedMembers = members.filter((m) => selectedIds.includes(m.id));

  const [amount, setAmount] = useState("0");
  const [time, setTime] = useState("");

  const [single, setSingle] = useState(40);
  const [range, setRange] = useState<[number, number]>([20, 70]);

  return (
    <div
      className="flex flex-1 flex-wrap p-10 items-center justify-center
  "
    >
      {/* Accordion Component */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg m-5">
        <h2 className="text-xl font-bold mb-5">Accordion</h2>
        <Accordion className="bg-black text-white">
          <AccordionItem title="Section 1" className="text-sm">
            This is the first section
          </AccordionItem>
          <AccordionItem title="Section 2" className="text-sm">
            More content here
          </AccordionItem>
          <AccordionItem title="Section 3" className="text-sm">
            Final section details
          </AccordionItem>
        </Accordion>
      </div>

      {/* Alert Component */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg m-5">
        <h2 className="text-xl font-bold ">Alerts</h2>
        <div className="flex flex-col justify-center space-y-3 mt-5">
          <Alert
            variant="warning"
            icon={<AlertTriangle className="size-5 text-yellow-600" />}
          >
            <AlertTitle>Heads Up!</AlertTitle>
            <AlertDescription>Something needs your attention.</AlertDescription>
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
            <AlertDescription>This action cannot be undone.</AlertDescription>
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
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
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
            className="bg-black"
          >
            <AlertDialogTitle className="text-lg font-semibold ">
              Confirm Action
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm ">
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
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
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
            className="border-blue-500 bg-black border-b rounded-none"
          />
        </div>
      </div>

      {/* avatar */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Avatar</h2>
        <div className="flex h-full w-full space-x-5 items-center ">
          <Avatar
            src={firstAvatar}
            size="xl"
            className="border-2 border-blue-600"
          />
          <Avatar
            src={secondAvatar}
            size="lg"
            className="border-2 border-red-600"
          />
          <Avatar
            src={thirdAvatar}
            size="md"
            className="border-2 bg-red-500 border-blue-500"
          />
          <Avatar
            name="John"
            size="sm"
            className="border-2 text-yellow-500 bg-gray-600"
          />
        </div>
      </div>

      {/* back to top */}

      <div className="w-[300px] relative  border rounded-lg shadow-lg p-6 bg-stone-950 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Back To Top Demo
        </h2>
        <p className="text-sm text-gray-300 mb-8 text-center">
          Scroll down to see the BackToTop button appear at the bottom right.
        </p>

        {/* Scroll-triggering filler content */}
        <div className="text-sm text-gray-400 leading-relaxed h-[300px] overflow-y-auto scrollbar-hide">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
            Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos.
            Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
            Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem
            at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut
            ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel,
            suscipit quis, luctus non, massa. Fusce ac turpis quis ligula
            lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel,
            tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non
            tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante
            quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc
            feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin
            quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.
            Sed lectus. Integer euismod lacus luctus magna. Quisque cursus,
            metus vitae pharetra auctor, sem massa mattis sem, at interdum magna
            augue eget diam. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae.
          </p>
          {/* BackToTop positioned within scrollable ancestor */}
          <BackToTop className="bg-blue-500 text-white" />
        </div>
      </div>

      <BackToTop className="bg-blue-500 text-white hover:cursor-pointer hover:bg-red-700" />

      {/* Badge Component */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg m-5">
        <h2 className="text-xl font-bold mb-5">Badge</h2>
        <div className="flex h-full w-full space-x-5 items-center ">
          <Badge
            content="1"
            placement="top-right"
            size="lg"
            className="bg-blue-500 "
            onClick={() => alert("hi")}
          >
            <Avatar src={firstAvatar} size="xl" className="border-2" />
          </Badge>

          <Badge
            placement="bottom-right"
            size="lg"
            className="bg-red-500"
            onClick={() => alert("i'm batman")}
          >
            <Avatar src={secondAvatar} size="lg" className="border-2" />
          </Badge>

          <Badge content="" placement="bottom-right" className="bg-green-500">
            <Avatar src={thirdAvatar} size="md" className="border-2" />
          </Badge>

          <Badge
            content={<span>🔥</span>}
            placement="top-left"
            className="bg-transparent"
            offsetY={6}
          >
            <Avatar name="John" size="sm" className="border-2" />
          </Badge>

          <Badge
            content={"2"}
            placement="top-right"
            className="bg-blue-500"
            offsetX={6}
            offsetY={6}
          >
            <ShoppingBag className="size-8 text-white" />
          </Badge>
        </div>
      </div>

      {/* breadcrumb */}
      <div className=" p-5 rounded-lg  text-center h-fit w-[500px] border shadow-lg m-5">
        <h2 className="text-xl font-bold mb-5">Breadcrumb</h2>
        <div className="flex flex-col h-full w-full space-y-5 items-center justify-center ">
          <Breadcrumbs
            items={[
              {
                label: "Home",
                href: "/",
                onClick: () => setCurrentBreadcrumb("Home"),
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
            separator={<ChevronRight className="w-4 h-4 text-gray-400" />}
            className="bg-gradient-to-l from-blue-800 to-purple-600 text-white p-2 rounded-md flex w-full"
          />
        </div>
      </div>

      {/* Button Component */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg m-5">
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

      {/* calendar */}
      <div className=" p-5 rounded-lg  text-center h-fit w-[300px] border shadow-lg m-5 underline-offset-2">
        <h2 className="text-xl font-bold mb-5">Calendar</h2>
        <div className="flex flex-col h-full w-full space-y-5 items-center justify-center ">
          <Calendar
            selectedDates={selectedCalendarDate}
            onDateSelect={setSelectedCalendarDate}
            selectionType="range"
            className="p-3 rounded-lg bg-gray-900"
          />

          {selectedCalendarDate && selectedCalendarDate.length > 0 && (
            <p className="text-gray-500">
              {selectedCalendarDate.length === 1
                ? `Selected Date: ${selectedCalendarDate[0].toDateString()}`
                : `Selected Dates: ${selectedCalendarDate[0].toDateString()} – ${selectedCalendarDate[1].toDateString()}`}
            </p>
          )}
        </div>
      </div>

      {/* card */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg">
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

      {/* carousel */}
      <div className="flex flex-col items-center  p-5 rounded-lg  w-[700px] h-[650px] m-5 border shadow-lg space-y-5">
        <h2 className="text-xl font-bold  mb-5">Carousel</h2>
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
                isActive ? "bg-blue-500 rounded-full" : "bg-white rounded-full"
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
                isActive ? "bg-blue-500 rounded-full" : "bg-white rounded-full"
              }`}
            />
          )}
        />
      </div>

      {/* checkbox */}
      <div className=" p-5 rounded-lg  h-fit w-[300px] border shadow-lg m-5">
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
      <div className=" p-5 rounded-lg  h-fit w-[300px] border shadow-lg m-5">
        <h2 className="text-xl font-bold mb-5 text-center">Checkbox Group</h2>

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

      {/* Circular Progress */}
      <div className="flex flex-col items-center  p-5 rounded-lg  h-fit w-fit border shadow-lg m-5">
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
              className="border-blue-500"
            />

            {/* Custom Colors */}
            <CircularProgress
              size={40}
              speed="1s"
              borderWidth={4}
              className="border-red-500"
            />
            <CircularProgress
              size={50}
              speed="2s"
              borderWidth={6}
              className="border-green-500"
            />
            <CircularProgress
              size={60}
              speed="3s"
              borderWidth={8}
              className="border-yellow-500"
            />
            <CircularProgress
              size={70}
              speed="4s"
              borderWidth={10}
              className="border-purple-500"
            />
          </div>
          <div
            className="flex space-x-5 items-center justify-center
        "
          >
            {/* Indeterminate Progress */}
            <CircularProgress label="Loading..." className="border-blue-600" />

            {/* Progress Tracking */}
            <CircularProgress
              showValueLabel
              progress={circularprogress}
              label="Downloading..."
              size={80}
              className="stroke-blue-600"
              borderWidth={10}
            />

            <div className="flex flex-col space-y-2">
              {/* Circular Progress Bar */}
              <CircularProgress
                showValueLabel
                progress={progress}
                label="Downloading..."
                className="stroke-blue-600"
              />

              {/* Update Progress buttons */}
              <div className="flex w-full justify-between text-sm">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => setProgress((prev) => Math.max(prev - 10, 0))}
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

      {/* collapsible */}
      <div className="p-5 rounded-lg h-fit w-[500px] border shadow-lg m-5">
        <h2 className="text-xl font-bold mb-5 text-center">Collapsible</h2>

        <div className="flex flex-col items-center justify-center w-full">
          <Collapsible
            defaultOpen={false}
            selectedItem={selectedCollapsedItem}
            onSelectItem={setSelectedCollapsedItem}
            className="w-[300px]"
          >
            {/* Header with trigger */}
            <CollapsibleHeader className="flex w-full justify-between text-gray-500 font-semibold">
              <div>Foods</div>
              <CollapsibleTrigger className="text-gray-500 hover:opacity-80">
                <ChevronsUpDown />
              </CollapsibleTrigger>
            </CollapsibleHeader>

            {/* Selected item always visible */}
            <CollapsibleItem
              item={selectedCollapsedItem}
              className="border rounded-sm py-1 px-3 border-gray-500 hover:cursor-pointer hover:bg-gray-900 "
            />

            {/* Remaining items rendered below */}
            <CollapsibleContent>
              {["Fruits", "Veggies", "Meats", "Dairy"]
                .filter((item) => item !== selectedCollapsedItem)
                .map((item) => (
                  <CollapsibleItem
                    key={item}
                    item={item}
                    className="border rounded-sm py-1 px-3 border-gray-500 hover:cursor-pointer hover:bg-gray-900 "
                  />
                ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Display Selected Item */}
          {selectedCollapsedItem && (
            <p className="mt-4 text-gray-500 flex">
              Selected Item: {selectedCollapsedItem}
            </p>
          )}
        </div>
      </div>

      {/* Combobox */}
      <div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5 pb-10">
        <h2 className="text-xl font-bold mb-5">Combobox</h2>

        <h1 className="text-lg font-bold mb-4">Select a Framework</h1>

        <Combobox
          options={[
            { key: "next.js", label: "Next.js" },
            { key: "sveltekit", label: "SvelteKit" },
            { key: "nuxt.js", label: "Nuxt.js" },
            { key: "remix", label: "Remix" },
            { key: "astro", label: "Astro" },
          ]}
          onSelect={(key, label) => {
            alert(`You selected: ${label} (${key})`);
          }}
          className="w-64"
        >
          {/* Trigger */}
          <ComboboxTrigger className="flex items-center justify-between w-full p-2 border rounded-md bg-gray-800 text-white">
            <ChevronsUpDown className="opacity-50 inline-block ml-2 hover:cursor-pointer" />
          </ComboboxTrigger>

          {/* Dropdown Panel */}
          <ComboboxDropdown className="w-full mt-2 z-50 rounded-md shadow-lg bg-black" />
        </Combobox>
      </div>

      {/* context menu */}
      <div className=" p-5 m-5 pb-10 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center ">
        <h2 className="text-xl font-bold mb-5 ">context menu</h2>

        <div className="p-5">
          <h1 className="text-lg font-bold mb-4">
            Right-click on the box below
          </h1>
          <ContextMenu
            menuItems={[
              { label: "Back", action: () => console.log("Back clicked!") },
              {
                label: "Forward",
                action: () => console.log("Forward clicked!"),
              },
              { label: "Reload", action: () => console.log("Reload clicked!") },
              { label: "Delete", action: () => console.log("Delete clicked!") },
            ]}
          >
            <div className="w-64 h-32 border flex items-center justify-center text-gray-600 rounded-md">
              Right-click here to see menu
            </div>
            <ContextMenuPanel className="bg-gray-900 text-white p-2 flex flex-col space-y-2 items-center justify-center w-[150px] h-fit rounded-md border border-gray-800" />
          </ContextMenu>
        </div>
      </div>

      {/* Date Input */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5 pb-10">
        <h2 className="text-xl font-bold mb-5 ">Date Input</h2>
        <div className="flex flex-col space-y-10 w-[250px] h-full justify-center items-center">
          {/* Uncontrolled DateInput */}
          <DateInput
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Uncontrolled Date</span>
              </span>
            }
            placeholder="Select a date..."
            variant="flat"
            className="text-white text-md bg-gray-700 "
          />

          {/* Controlled DateInput */}
          <DateInput
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Controlled Date</span>
              </span>
            }
            value={dateInput}
            onChange={(e) => setDateInput(e)}
            variant="bordered"
            className="text-white bg-gray-700 border-gray-400 text-md rounded-lg"
          />

          {/* Underlined Variant */}
          <DateInput
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Underlined Date</span>
              </span>
            }
            placeholder="Pick a date..."
            variant="underlined"
            className="text-md"
          />

          {/* Faded Variant */}
          <DateInput
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Faded Date</span>
              </span>
            }
            placeholder="YYYY-MM-DD"
            variant="faded"
            className="text-black text-md rounded-sm bg-white  "
          />
        </div>
      </div>

      {/* Date Range Picker */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5 pb-10">
        <h2 className="text-xl font-bold mb-5 ">Date Range Picker</h2>
        <div className="flex flex-col space-y-10 w-[300px] h-full justify-center items-center">
          {/* Uncontrolled Date Range Picker  */}
          <DateRangePicker
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Uncontrolled Date</span>
              </span>
            }
            variant="flat"
            className="text-white text-md bg-gray-700 "
          />

          {/* Controlled Date Range Picker  */}
          <DateRangePicker
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Controlled Date</span>
              </span>
            }
            variant="bordered"
            className="text-white bg-gray-700 border-gray-400 text-md rounded-lg"
          />

          {/* Underlined Date Range Picker  */}
          <DateRangePicker
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Underlined Date</span>
              </span>
            }
            variant="underlined"
            className=" text-md "
          />

          {/* Faded Variant Date Range Picker  */}
          <DateRangePicker
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Faded Date</span>
              </span>
            }
            variant="faded"
            className="text-black text-md rounded-sm bg-white  "
          />
        </div>
      </div>

      {/* dialog */}
      <div className=" p-5 m-5 pb-10 rounded-lg  text-center h-fit w-[500px] border shadow-lg flex flex-col justify-start items-center ">
        <h2 className="text-xl font-bold mb-5 ">Dialog</h2>

        <div className="p-5">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            Open Dialog
          </button>

          <Dialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            header={<h2 className="text-xl font-bold">Dialog Title</h2>}
            body={<p>This is a fully customizable dialog!</p>}
            footer={
              <div className="flex gap-3">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Confirm
                </button>
              </div>
            }
            className="bg-white"
          />
        </div>
      </div>

      {/* Drawer */}
      <div className=" p-5 m-5 pb-10 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center">
        <h1 className="text-lg font-bold mb-4">Drawer Component</h1>
        <div className="flex space-x-3">
          {/* left drawer */}
          {/* Buttons to open drawer */}
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded hover:cursor-pointer"
            onClick={() => setIsLeftDrawerOpen(true)}
          >
            Open Left Drawer
          </button>
          {/* Drawer Component */}
          <Drawer
            isOpen={isLeftDrawerOpen}
            placement="left"
            onClose={() => setIsLeftDrawerOpen(false)}
            className="rounded-lg bg-gray-800 border-r border-gray-400 p-5 flex flex-col space-y-5 "
          >
            <h2 className="text-xl font-semibold ">Drawer Content</h2>
            <p>This is a fully functional, customizable drawer component!</p>
            <button
              className="mt-3 hover:cursor-pointer hover:text-gray-500 text-white px-3 py-2 rounded absolute top-0 right-0 text-sm"
              onClick={() => setIsLeftDrawerOpen(false)}
            >
              <XCircle />
            </button>
          </Drawer>

          {/* right drawer */}
          {/* Buttons to open drawer */}
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded hover:cursor-pointer"
            onClick={() => setIsRightDrawerOpen(true)}
          >
            Open Right Drawer
          </button>
          {/* Drawer Component */}
          <Drawer
            isOpen={isRightDrawerOpen}
            placement="right"
            onClose={() => setIsRightDrawerOpen(false)}
            className="rounded-lg bg-gray-800 border-l border-gray-400 p-5 flex flex-col space-y-5 "
          >
            <h2 className="text-xl font-semibold ">Drawer Content</h2>
            <p>This is a fully functional, customizable drawer component!</p>
            <button
              className="mt-3 hover:cursor-pointer hover:text-gray-500 text-white px-3 py-2 rounded absolute top-0 right-0 text-sm"
              onClick={() => setIsRightDrawerOpen(false)}
            >
              <XCircle />
            </button>
          </Drawer>

          {/* top drawer */}
          {/* Buttons to open drawer */}
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded hover:cursor-pointer"
            onClick={() => setIsTopDrawerOpen(true)}
          >
            Open Top Drawer
          </button>
          {/* Drawer Component */}
          <Drawer
            isOpen={isTopDrawerOpen}
            placement="top"
            onClose={() => setIsTopDrawerOpen(false)}
            className="rounded-lg bg-gray-800 border-r border-gray-400 p-5 flex flex-col space-y-5 "
          >
            <h2 className="text-xl font-semibold ">Drawer Content</h2>
            <p>This is a fully functional, customizable drawer component!</p>
            <button
              className="mt-3 hover:cursor-pointer hover:text-gray-500 text-white px-3 py-2 rounded absolute top-0 right-0 text-sm"
              onClick={() => setIsTopDrawerOpen(false)}
            >
              <XCircle />
            </button>
          </Drawer>

          {/* bottom drawer */}
          {/* Buttons to open drawer */}
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded hover:cursor-pointer"
            onClick={() => setIsBottomDrawerOpen(true)}
          >
            Open Bottom Drawer
          </button>
          {/* Drawer Component */}
          <Drawer
            isOpen={isBottomDrawerOpen}
            placement="bottom"
            onClose={() => setIsBottomDrawerOpen(false)}
            className="rounded-lg bg-gray-800 border-r border-gray-400 p-5 flex flex-col space-y-5 "
          >
            <h2 className="text-xl font-semibold ">Drawer Content</h2>
            <p>This is a fully functional, customizable drawer component!</p>
            <button
              className="mt-3 hover:cursor-pointer hover:text-gray-500 text-white px-3 py-2 rounded absolute top-0 right-0 text-sm"
              onClick={() => setIsBottomDrawerOpen(false)}
            >
              <XCircle />
            </button>
          </Drawer>
        </div>
      </div>

      {/* dropdown */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5 pb-10">
        <h2 className="text-xl font-bold mb-5 ">Dropdown</h2>

        <div className="p-5">
          <Dropdown placement="bottom">
            <DropdownTrigger className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer">
              Open Menu
            </DropdownTrigger>
            <DropdownMenu
              options={[
                {
                  key: "profile",
                  label: "Profile",
                  action: () => console.log("Profile"),
                },
                {
                  key: "logout",
                  label: "Logout",
                  action: () => console.log("Logout"),
                },
              ]}
              className="bg-black border w-full rounded p-3 flex flex-col space-y-2 items-start"
            />
          </Dropdown>
        </div>
      </div>

      {/* Input */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Input</h2>
        <div className="flex flex-col space-y-5 w-full h-full justify-center items-center">
          <Input
            placeholder="Flat style"
            className="text-white text-md bg-gray-700 "
            variant="flat"
            value={inputValue}
            onChange={(val) => setInputValue(val)}
          />
          <Input
            placeholder="Bordered style"
            className="text-white bg-gray-700 border-gray-400 text-md rounded-lg"
            variant="bordered"
            value={inputValue}
            onChange={(val) => setInputValue(val)}
          />
          <Input
            placeholder="Underlined style"
            className="text-md"
            variant="underlined"
            value={inputValue}
            onChange={(val) => setInputValue(val)}
          />
          <Input
            placeholder="Faded style"
            className="text-black text-md rounded-sm bg-white  "
            variant="faded"
            value={inputValue}
            onChange={(val) => setInputValue(val)}
          />
        </div>
      </div>

      {/* Input Otp */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Input OTP</h2>
        <InputOTP
          className="flex gap-2 justify-center items-center h-14"
          maxLength={6}
          onComplete={(otp) => setOtp(otp)}
        />
        {otp && <p className="mt-3 text-green-500">Entered OTP: {otp}</p>}
      </div>

      {/* jumbotron */}
      <div className="flex flex-col items-center  p-5 rounded-lg  w-[500px] h-[400px] m-5 border shadow-lg space-y-5">
        <h2 className="text-xl font-bold  mb-5">Jumbotron</h2>
        <div className="flex w-full h-full flex-1 rounded-lg overflow-hidden">
          <Jumbotron
            backgroundImage="https://tecdn.b-cdn.net/img/new/slides/041.webp"
            className=" bg-gray-900 opacity-60"
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
      </div>

      {/* lightbox */}
      <div className=" p-5 m-5 pb-10 rounded-lg  text-center h-fit w-[500px] border shadow-lg flex flex-col justify-start items-center ">
        <h2 className="text-xl font-bold mb-5 ">Lightbox</h2>

        <Lightbox
          images={images}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
        />
      </div>

      {/* Navbar */}
      <div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Navbar</h2>
        <div className="flex flex-col space-y-5 w-fit">
          <Navbar
            items={navbarItems}
            logo={<Menu size={24} />}
            className="bg-black border p-4 gap-5  rounded-md"
          />
        </div>
      </div>

      {/* number input */}
      <div className="rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5 p-5">
        <h2 className="text-xl font-bold mb-5">Number Input</h2>
        <div className="max-w-sm space-y-10">
          <NumberInput
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Amount</span>
              </span>
            }
            value={amount}
            onChange={(val) => setAmount(val)}
            placeholder="0.00"
            allowDecimals
            min={0}
            max={9999}
            variant="bordered"
          />
          <NumberInput
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Amount</span>
              </span>
            }
            value={amount}
            onChange={(val) => setAmount(val)}
            placeholder="0.00"
            allowDecimals
            min={0}
            max={9999}
            variant="faded"
          />
          <NumberInput
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Amount</span>
              </span>
            }
            value={amount}
            onChange={(val) => setAmount(val)}
            placeholder="0.00"
            allowDecimals
            min={0}
            max={9999}
            variant="flat"
          />
          <NumberInput
            label={
              <span className="text-sm text-gray-600 flex w-full absolute -bottom-6">
                <span>Amount</span>
              </span>
            }
            value={amount}
            onChange={(val) => setAmount(val)}
            placeholder="0.00"
            allowDecimals
            min={0}
            max={9999}
            variant="underlined"
          />
          <p className="text-sm text-gray-600">Typed value: {amount}</p>
        </div>
      </div>

      {/* pagination */}
      <div className="rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5 p-5">
        <h2 className="text-xl font-bold mb-5">Pagination</h2>

        {/* Mock Page Content Display */}
        <div className=" text-white mt-6 p-6 rounded-md ">
          <p className="">
            📄 You are currently viewing content for{" "}
            <strong>Page {currentPage}</strong>.
          </p>
        </div>

        {/* basic demo with no links */}
        <div className=" mx-auto py-10 px-4 border-b">
          <Pagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
            className="bg-blue-500 !rounded-full"
            visiblePages={2} // show 2 page buttons on each side of current
            renderPrev={() => (
              <span className="flex items-center gap-1">
                <ChevronLeft /> <span>Prev</span>
              </span>
            )}
            renderNext={() => (
              <span className="flex items-center gap-1">
                <span>Next</span> <ChevronRight />
              </span>
            )}
            renderFirst={() => (
              <div className="flex items-center justify-center -space-x-4">
                <ChevronLeft />
                <ChevronLeft />
              </div>
            )}
            renderLast={() => (
              <div className="flex items-center justify-center -space-x-4">
                <ChevronRight />
                <ChevronRight />
              </div>
            )}
            renderPage={(page) => <span>{page}</span>}
          />
        </div>

        {/*  demo with links */}
        <div className="w-full max-w-xl mx-auto p-6 shadow rounded-md flex flex-col items-center justify-center">
          <h2 className="font-semibold mb-4">📄 Page {currentPageWithLink}</h2>

          <ul className="space-y-2 mb-6 flex flex-col w-full">
            {currentItems.map((item) => (
              <li
                key={item}
                className="bg-stone-800 text-white p-1 rounded flex w-full items-center justify-center"
              >
                {item}
              </li>
            ))}
          </ul>

          <Pagination
            current={currentPageWithLink}
            total={totalPagesWithLink}
            onPageChange={updatePage}
            visiblePages={2}
            renderPage={(page) => (
              <a
                href={`?page=${page}`}
                onClick={(e) => {
                  e.preventDefault();
                  updatePage(page);
                }}
              >
                {page}
              </a>
            )}
            renderPrev={(disabled) => (
              <a
                href={`?page=${currentPageWithLink - 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (!disabled) updatePage(currentPageWithLink - 1);
                }}
              >
                <ChevronLeft /> Prev
              </a>
            )}
            renderNext={(disabled) => (
              <a
                href={`?page=${currentPageWithLink + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (!disabled) updatePage(currentPageWithLink + 1);
                }}
              >
                Next <ChevronRight />
              </a>
            )}
          />
        </div>
      </div>

      {/* Placeholder */}
      <div className=" p-5 m-5 pb-10 rounded-lg  text-center h-fit w-[500px] border shadow-lg flex flex-col justify-start items-center ">
        <h2 className="text-xl font-bold mb-5 ">Placeholder</h2>

        <div className="flex flex-col space-y-4 w-full ">
          <Placeholder className="bg-purple-300 rounded-lg w-full h-10" />
          <div className="flex flex-col space-y-2 w-full">
            <Placeholder className="rounded-lg bg-neutral-300 h-4 w-[75%]" />
            <Placeholder className="rounded-lg bg-neutral-300 h-4 w-[75%]" />
          </div>

          <div className="flex w-full justify-center">
            <Placeholder className="rounded-lg bg-blue-300 h-2 w-full" />
          </div>
        </div>
      </div>

      {/* Popover */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col space-y-10 justify-center items-center m-5">
        <h1 className="text-2xl font-bold">Popover</h1>
        <div className="flex space-x-5 justify-between">
          <Popover
            placement="top"
            content="Top popover"
            isOpen={isTopPopoverOpen}
            onToggle={setIsTopPopoverOpen} // ✅ Parent controls state
            popoverStyle="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
            // buttonStyle="hover:cursor-pointer bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded"
            trigger={
              <button className="hover:cursor-pointer bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">
                Top
              </button>
            }
          />
          {/* Top
        </Popover> */}

          <Popover
            placement="right"
            content="Right popover"
            isOpen={isRightPopoverOpen}
            onToggle={setIsRightPopoverOpen}
            popoverStyle="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
            trigger={
              <button className="hover:cursor-pointer bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">
                Right
              </button>
            }
          />
          <Popover
            placement="bottom"
            content="Bottom popover"
            isOpen={isBottomPopoverOpen}
            onToggle={setIsBottomPopoverOpen}
            popoverStyle="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
            trigger={
              <button className="hover:cursor-pointer bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">
                Bottom
              </button>
            }
          />
          <Popover
            placement="left"
            content="Left popover"
            isOpen={isLeftPopoverOpen}
            onToggle={setIsLeftPopoverOpen}
            popoverStyle="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
            trigger={
              <button className="hover:cursor-pointer bg-gray-800 text-white font-semibold border-blue-500 border px-6 py-2 rounded">
                Left
              </button>
            }
          />
        </div>
      </div>

      {/* Progressbar */}
      <div className="flex flex-col space-y-5 items-center  p-5 rounded-lg  h-fit w-fit border shadow-lg m-5">
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

      {/* Radio */}
      <div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Radio</h2>
        <div className="flex flex-col space-y-5">
          <RadioGroup
            name="preferences"
            checkedValue={radioSelected}
            onChange={setRadioSelected}
            options={[
              { id: "r1", value: "default", label: "Default" },
              { id: "r2", value: "comfortable", label: "Comfortable" },
              { id: "r3", value: "compact", label: "Compact" },
            ]}
            size="medium"
            onColor="blue"
            offColor="gray"
          />
        </div>
      </div>

      {/* Rating */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Rating</h2>
        <div className="p-5 space-y-5">
          <h2 className="text-xl font-bold">Interactive Star Rating</h2>
          <Rating
            value={rating}
            maxRating={5}
            icon={<Star />}
            activeColor="text-yellow-500"
            inactiveColor="text-gray-400"
            onChange={setRating} // ✅ Controlled by state
          />
          <p className="mt-4 text-gray-700">Current rating: {rating}</p>
        </div>
        <div className="p-5 space-y-5">
          <h2 className="text-xl font-bold">Read-Only Star Rating</h2>
          <Rating
            value={4} // ✅ Preset rating
            maxRating={5}
            icon={<Star />}
            activeColor="text-yellow-500"
            inactiveColor="text-gray-400"
            readOnly
          />
          <p className="mt-4 text-gray-700">This rating is set to 4 stars.</p>
        </div>
      </div>

      {/* resizable */}
      <div className="rounded-lg text-center h-96 w-full border shadow-lg flex flex-col justify-start items-center m-5 p-5">
        <h2 className="text-xl font-bold mb-5">Resizable</h2>

        <ResizablePanelGroup
          direction="vertical"
          className="w-full  border rounded-md"
          storageKey="my-layout"
        >
          {/* Header */}
          <ResizablePanel index={0}>
            <div className="flex justify-center items-center h-full p-6 ">
              Header
            </div>
          </ResizablePanel>
          <ResizableHandle index={0} />

          {/* Body */}
          <ResizablePanel index={1}>
            <ResizablePanelGroup
              direction="horizontal"
              storageKey="nested-layout"
            >
              <ResizablePanel index={0}>
                <div className="flex justify-center items-center w-full h-full p-6 ">
                  Sidebar
                </div>
              </ResizablePanel>
              <ResizableHandle index={0} />
              <ResizablePanel index={1}>
                <div className="flex justify-center items-center w-full h-full p-6 ">
                  Main Content
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle index={1} />

          {/* Footer */}
          <ResizablePanel index={2}>
            <div className="flex justify-center items-center h-full p-6">
              Footer
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* resizable grid */}
      <div className="rounded-lg text-center h-[800px] w-full border shadow-lg flex flex-col justify-start items-center m-5 p-5">
        <h2 className="text-xl font-bold mb-5">Resizable Grid</h2>
        <div className="flex w-full h-full relative">
          <ResizableGridProvider rows={4} cols={3}>
            <GridPanel row={0} col={0} colSpan={2} rowSpan={2}>
              <div className="flex w-full h-full relative">
                <ResizableGridProvider rows={2} cols={2}>
                  <GridPanel row={0} col={0}>
                    Top Left
                  </GridPanel>
                  <GridPanel row={0} col={1}>
                    Top Right
                  </GridPanel>
                  <GridPanel row={1} col={0}>
                    Bottom Left
                  </GridPanel>
                  <GridPanel row={1} col={1}>
                    Bottom Right
                  </GridPanel>
                </ResizableGridProvider>
              </div>
            </GridPanel>

            <GridPanel row={0} col={2}>
              right top
            </GridPanel>
            <GridPanel row={1} col={2}>
              right bottom
            </GridPanel>

            <GridPanel row={2} col={0} colSpan={3} rowSpan={2}>
              <ResizablePanelGroup
                direction="vertical"
                className="w-full  border rounded-md"
                storageKey="my-layout"
              >
                {/* Header */}
                <ResizablePanel index={0}>
                  <div className="flex justify-center items-center h-full p-6 ">
                    Header
                  </div>
                </ResizablePanel>
                <ResizableHandle index={0} />

                {/* Body */}
                <ResizablePanel index={1}>
                  <ResizablePanelGroup
                    direction="horizontal"
                    storageKey="nested-layout"
                  >
                    <ResizablePanel index={0}>
                      <div className="flex justify-center items-center w-full h-full p-6 ">
                        Sidebar
                      </div>
                    </ResizablePanel>
                    <ResizableHandle index={0} />
                    <ResizablePanel index={1}>
                      <div className="flex justify-center items-center w-full h-full p-6 ">
                        Main Content
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle index={1} />

                {/* Footer */}
                <ResizablePanel index={2}>
                  <div className="flex justify-center items-center h-full p-6">
                    Footer
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </GridPanel>
          </ResizableGridProvider>
        </div>
      </div>

      {/* Sidebar */}
      <div className="rounded-lg text-center h-96 w-full border shadow-lg flex flex-col justify-start items-center m-5 pt-5">
        <h2 className="text-xl font-bold mb-5">Sidebar</h2>
        <div className="w-full h-full grid grid-cols-[min-content_auto]  bg-black border">
          {/* <Sidebar /> */}
          <Sidebar
            isOpen={openSidebar}
            onOpenChange={setOpenSidebar}
            minWidth={280}
            maxWidth={480}
            defaultWidth={350}
            handleStyle=" border-stone-600 rounded-full border-2"
            resizable={true}
            className="w-full "
            trigger={
              <div className="flex h-full items-center justify-center w-full">
                {openSidebar ? (
                  <button>
                    <X
                      size={28}
                      className="absolute flex w-fit right-5 top-3 cursor-pointer shadow text-stone-800 bg-stone-200 hover:cursor-pointer z-50 hover:bg-stone-400 hover:text-stone-600 rounded-full border p-1"
                    />
                  </button>
                ) : (
                  <button className="flex flex-col items-center justify-center w-[130px] cursor-pointer shadow text-stone-800 bg-stone-200 hover:bg-stone-400 hover:text-stone-600 rounded-lg border py-1 px-2 ml-5 mt-5">
                    Toggle Sidebar
                  </button>
                )}
              </div>
            }
          >
            <div className="w-full h-full flex flex-col border-r  overflow-hidden">
              <div className="w-[calc(100%-16px)] rounded m-2 mx-4 mb-0 mt-3 h-max">
                <p className="font-sans antialiased text-base text-current font-semibold">
                  Sidebar
                </p>
              </div>

              <div className="w-full h-max rounded p-3">
                <ul className="flex flex-col gap-0.5 min-w-60">
                  <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                    <span className="grid place-items-center shrink-0 me-2.5">
                      <Inbox size={18} />
                    </span>
                    Inbox
                    <span className="grid place-items-center shrink-0 ps-2.5 ms-auto">
                      <div className="relative inline-flex items-center border font-sans font-medium rounded-md text-xs px-2 py-0.5 bg-stone-800/10 border-transparent text-stone-500 shadow-none">
                        14
                      </div>
                    </span>
                  </li>

                  <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                    <span className="grid place-items-center shrink-0 me-2.5">
                      <Send size={18} />
                    </span>
                    Sent
                  </li>

                  <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                    <span className="grid place-items-center shrink-0 me-2.5">
                      <FileText size={18} />
                    </span>
                    Drafts
                  </li>

                  <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                    <span className="grid place-items-center shrink-0 me-2.5">
                      <Pencil size={18} />
                    </span>
                    Pins
                  </li>

                  <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                    <span className="grid place-items-center shrink-0 me-2.5">
                      <Archive size={18} />
                    </span>
                    Archive
                  </li>

                  <li className="flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in bg-transparent hover:text-stone-800 hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800">
                    <span className="grid place-items-center shrink-0 me-2.5">
                      <Trash2 size={18} />
                    </span>
                    Trash
                  </li>
                </ul>
              </div>
            </div>
          </Sidebar>

          <div className="p-5 ">
            <h1>Main Content</h1>
            <div className="flex flex-col space-y-4 w-full h-full mt-5">
              <Placeholder className="bg-stone-800 rounded-lg h-3/5 w-full" />

              <Placeholder className="bg-stone-800 rounded-lg h-1/5 w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* slider */}
      <div className="rounded-lg text-center h-fit w-[500px] border shadow-lg flex flex-col justify-start items-center m-5 p-5">
        <h2 className="text-xl font-bold mb-5">Slider</h2>

        <div className="flex flex-col w-full">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Single: {single}
            </label>
            <Slider
              className="bg-gray-600 h-2 rounded-full"
              thumbClassName="w-4 h-4 bg-yellow-500 border-2 border-yellow-500 rounded-full"
              rangeClassName="h-2 bg-gray-400 rounded-full"
              value={single}
              onChange={setSingle}
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Range: {range[0]} - {range[1]}
            </label>
            <Slider
              className="bg-gray-200 h-2 rounded-full"
              thumbClassName="w-4 h-4 bg-white border-2 border-blue-500 rounded-full"
              rangeClassName="h-2 bg-blue-500 rounded-full"
              mode="range"
              value={range}
              onChange={setRange}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className=" p-5 rounded-lg  text-center h-fit w-fit border shadow-lg flex flex-col space-y-10 justify-center items-center m-5">
        <h1 className="text-2xl font-bold">Social Icons</h1>
        <div className="bg-gray-800 p-5 rounded-md">
          <SocialIcons className="hover:text-blue-700 transition duration-200 hover:cursor-pointer" />
        </div>
        <div className="bg-gray-800 p-5 rounded-md">
          <SocialIcons
            className="hover:text-blue-700 transition duration-200 hover:cursor-pointer"
            platforms={["instagram", "discord", "facebook", "google"]}
            color="text-blue-500"
          />
        </div>
      </div>

      {/* Stepper*/}
      <div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Stepper</h2>
        <div className="flex flex-col  space-y-5 items-center justify-center relative w-full">
          {/* basic */}
          <Stepper
            steps={[
              <span>Step 1</span>,
              <span>Step 2</span>,
              <span>Step 3</span>,
              <span>Step 4</span>,
            ]}
            activeStepStyle="bg-blue-600 text-white px-4 py-2 rounded-md hover:cursor-pointer"
            completedStepStyle="bg-green-500 text-white px-4 py-2 rounded-md hover:cursor-pointer"
            stepStyle="px-4 py-2 border rounded text-gray-500 hover:cursor-pointer"
            buttonStyle="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            nextButton={<span>Next</span>} // ✅ Custom Next button
            prevButton={<span>Previous</span>} // ✅ Custom Previous button
            className="flex items-center space-x-4"
            currentStep={currentStep} // ✅ Syncs with stepper
            setCurrentStep={setCurrentStep} // ✅ Updates step state
          />
          {/* with circles */}
          <Stepper
            steps={[
              <div className="w-4 h-4 rounded-full bg-gray-500" />,
              <div className="w-4 h-4 rounded-full bg-gray-500" />,
              <div className="w-4 h-4 rounded-full bg-gray-500" />,
              <div className="w-4 h-4 rounded-full bg-gray-500" />,
            ]}
            activeStepStyle="bg-blue-600 w-5 h-5 rounded-full flex items-center justify-center hover:cursor-pointer"
            completedStepStyle="bg-green-500 w-5 h-5 rounded-full flex items-center justify-center hover:cursor-pointer"
            stepStyle="bg-gray-400 w-4 h-4 rounded-full flex items-center justify-center hover:cursor-pointer"
            className="flex items-center w-full space-x-10 justify-center"
            currentStep={currentStep} // ✅ Syncs with stepper
            setCurrentStep={setCurrentStep} // ✅ Updates step state
          />
          {/* with icons */}
          <Stepper
            steps={[
              <User size={20} />,
              <Truck size={20} />,
              <CreditCard size={20} />,
              <CheckCircle size={20} />,
            ]}
            activeStepStyle="bg-blue-600 text-blue-600 p-3 rounded-full hover:cursor-pointer"
            completedStepStyle="bg-green-500 text-white p-3 rounded-full hover:cursor-pointer"
            stepStyle="bg-gray-400 p-3 rounded-full hover:cursor-pointer"
            className="flex items-center space-x-4"
            currentStep={currentStep} // ✅ Syncs with stepper
            setCurrentStep={setCurrentStep} // ✅ Updates step state
          />

          {/* with form */}

          <div className="w-full flex flex-col items-center">
            <Stepper
              steps={steps.map((step) => (
                <span>{step}</span>
              ))}
              activeStepStyle="bg-blue-600 text-white px-4 py-2 rounded-md hover:cursor-pointer"
              completedStepStyle="bg-green-500 text-white px-4 py-2 rounded-md hover:cursor-pointer"
              stepStyle="px-4 py-2 border rounded text-gray-500 hover:cursor-pointer"
              currentStep={currentStep} // ✅ Syncs with stepper
              setCurrentStep={setCurrentStep} // ✅ Updates step state
            />

            {/* ✅ Pass state and handlers to `FormStepper` */}
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
      </div>

      {/* Switch */}
      <div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Switch</h2>
        <div className="flex flex-col space-y-5">
          <Switch
            id="terms-switch"
            checked={isSwitchChecked}
            onChange={setIsSwitchChecked}
            size="large"
            onLabel="I Agree to Terms and Conditions"
            offLabel="I Agree to Terms and Conditions"
            disabled={false}
            onColor="blue" // ✅ Custom "on" color
            offColor="yellow" // ✅ Custom "off" color
          />
          <Switch
            id="terms-switch"
            checked={isSwitchChecked}
            onChange={setIsSwitchChecked}
            size="medium"
            onLabel="I Agree to Terms and Conditions"
            offLabel="I Agree to Terms and Conditions"
            disabled={false}
            onColor="red" // ✅ Custom "on" color
            offColor="gray" // ✅ Custom "off" color
          />
          <Switch
            id="terms-switch"
            checked={isSwitchChecked}
            onChange={setIsSwitchChecked}
            size="small"
            onLabel="I Agree to Terms and Conditions"
            offLabel="I Agree to Terms and Conditions"
            disabled={false}
            onColor="green" // ✅ Custom "on" color
            offColor="blue" // ✅ Custom "off" color
          />
        </div>
      </div>

      {/* Tab */}
      <div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Tab</h2>
        <div className="flex flex-col space-y-5 w-[350px]">
          <Tabs
            tabs={myTabs}
            variant="underlined"
            activeTab={selectedTab} // ✅ Controlled tab state
            onTabChange={setSelectedTab} // ✅ Updates state when clicked
            currentTabStyle="text-blue-500 font-semibold"
            inactiveTabStyle=" hover:opacity-50"
            className="flex"
            underlineStyle="bg-blue-500"
          />

          <Tabs
            tabs={myTabs}
            variant="solid"
            activeTab={selectedTab} // ✅ Controlled tab state
            onTabChange={setSelectedTab} // ✅ Updates state when clicked
            currentTabStyle="text-blue-500 font-semibold"
            inactiveTabStyle=" hover:opacity-50"
            className="flex"
            solidStyle="bg-gray-800 rounded-lg border"
          />

          <Tabs
            tabs={myTabs}
            variant="solid"
            activeTab={selectedTab} // ✅ Controlled tab state
            onTabChange={setSelectedTab} // ✅ Updates state when clicked
            currentTabStyle="text-blue-500 font-semibold"
            inactiveTabStyle=" hover:opacity-50"
            className="flex border rounded-lg p-2"
            solidStyle="bg-gray-800 rounded-lg border my-2 -mx-2"
          />
        </div>
      </div>

      {/* table */}
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
              headerClassName="bg-gray-700"
              rowClassName="hover:bg-blue-600 cursor-pointer"
              strippedClassName="bg-blue-600 text-black"
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
              rowClassName="hover:bg-blue-600 cursor-pointer"
              strippedClassName="bg-stone-50 text-black"
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
      </div>

      {/* Testimonial */}
      <div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Testimonial</h2>
        <div className="grid gap-12 text-center md:grid-cols-2">
          <Testimonial
            name="Anna Morian"
            review="Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing elit sed ut perspiciatis unde omnis."
            avatar="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(22).jpg"
            className="p-6 shadow-md rounded-lg bg-white dark:bg-gray-800 w-[300px]"
            rating={4}
          />

          <Testimonial
            name="Teresa May"
            review="Neque cupiditate assumenda in maiores repudiandae mollitia architecto elit sed adipiscing elit."
            avatar="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(19).jpg"
            className="p-6 shadow-md rounded-lg bg-white dark:bg-gray-800 w-[300px]"
            rating={5}
          />
        </div>
      </div>

      {/* Textarea */}
      <div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Textarea</h2>
        <div className="flex flex-col space-y-5 w-[350px]">
          <Textarea
            value={text}
            onChange={setText}
            rows={2}
            placeholder="Type your message..."
            className="flex w-full bg-gray-800 text-blue-500 border border-stone-200 text-sm py-2 px-2.5  hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none rounded-lg "
          />
        </div>
      </div>

      {/* timeline */}
      <div className="rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5 p-5">
        <h2 className="text-xl font-bold mb-5">Timeline</h2>

        <div className=" flex items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-6">🗓️ Vertical Timeline</h2>

            <Timeline
              items={events}
              withLine
              dotClassName="w-6 h-6 flex items-center justify-center rounded-full bg-stone-600 border-white"
              lineClassName="bg-white w-px"
              itemSpacing={"mb-8"}
              lineSpacingOverlap="-mb-8"
              renderIcon={(item) => (
                <span className="text-white">{item.icon}</span>
              )}
              renderContent={(item) => (
                <>
                  <p className="text-base font-semibold text-stone-700">
                    {item.title}
                  </p>
                  <small className="text-sm text-stone-500">
                    {item.timestamp}
                  </small>
                  <p className="mt-1 text-sm text-stone-600">
                    {item.description}
                  </p>
                </>
              )}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold  mb-6">📦 Card Timeline</h2>
            <Timeline
              items={events}
              withLine={false} // 👈 no connecting line
              itemSpacing="mb-6" // spacing between cards
              dotClassName="hidden" // 👈 no visible dot for cleaner card style
              renderIcon={(item) => (
                <span className="hidden">{item.icon}</span> // icon can go inside content
              )}
              renderContent={(item) => (
                <div className="w-full bg-stone-100 rounded-lg p-2 border border-stone-300 shadow-sm text-left">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-700 text-white">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-stone-800">
                        {item.title}
                      </p>
                      <small className="text-sm text-stone-500">
                        {item.timestamp}
                      </small>
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-sm text-stone-600">{item.description}</p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* time input */}
      <div className="rounded-lg text-center h-fit w-[300px] border shadow-lg flex flex-col justify-start items-center m-5 p-5">
        <h2 className="text-xl font-bold mb-5">Time Input</h2>

        <div className="flex w-full flex-col space-y-4">
          <TimeInput
            label="Start Time"
            value={time}
            onChange={setTime}
            hourFormat={12}
            variant="bordered"
          />
          <TimeInput
            label="Start Time"
            value={time}
            onChange={setTime}
            hourFormat={12}
            variant="bordered"
          />
          <TimeInput
            label="Start Time"
            value={time}
            onChange={setTime}
            hourFormat={12}
            variant="flat"
          />
          <TimeInput
            label="Start Time"
            value={time}
            onChange={setTime}
            hourFormat={12}
            variant="underlined"
          />
          <p className="text-sm text-gray-600">Time: {time || "--:--"}</p>
        </div>
      </div>

      {/* Toast*/}
      <div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Toast</h2>

        {/* Trigger a success toast */}
        <button
          onClick={() =>
            showToast("Success! Your action was completed.", "success")
          }
          className="px-4 py-2 border-white bg-green-500 text-white rounded-lg hover:cursor-pointer hover:bg-green-600 transition"
        >
          Show Success Toast
        </button>

        {/* Trigger an error toast */}
        <button
          onClick={() => showToast("Error! Something went wrong.", "error")}
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:cursor-pointer hover:bg-red-600 transition"
        >
          Show Error Toast
        </button>

        {/* Trigger an info toast */}
        <button
          onClick={() => showToast("Info! Display some info.", "info")}
          className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:cursor-pointer hover:bg-yellow-600 transition"
        >
          Show Info Toast
        </button>
      </div>

      {/* Tooltip*/}
      <div className="p-5 rounded-lg text-center h-fit w-fit border shadow-lg flex flex-col justify-start items-center m-5">
        <h2 className="text-xl font-bold mb-5">Tooltip</h2>
        <div className="flex  space-x-5 relative w-full">
          <Tooltip
            content="Tooltip on top"
            placement="top"
            offset={10}
            triggerContent={<span>Top</span>}
            tooltipStyle="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
            triggerStyle="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer"
          />

          <Tooltip
            content="Tooltip on bottom"
            placement="bottom"
            offset={10}
            triggerContent={<span>Bottom</span>}
            tooltipStyle="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
            triggerStyle="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer"
          />

          <Tooltip
            content="Tooltip on right"
            placement="right"
            offset={10}
            triggerContent={<span>Right</span>}
            tooltipStyle="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
            triggerStyle="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer"
          />

          <Tooltip
            content="Tooltip on left"
            placement="left"
            offset={10}
            triggerContent={<span>Left</span>}
            tooltipStyle="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg"
            triggerStyle="px-4 py-2 border rounded bg-gray-700 text-white hover:bg-gray-600 hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
