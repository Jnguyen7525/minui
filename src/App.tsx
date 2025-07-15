import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme";
import { ToastProvider } from "./components/toast";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ComponentPageLayout from "./pages/ComponentDemo";

export default function App() {
  return (
    <ToastProvider
      placement="bottom-right"
      toastStyles={{
        success:
          "bg-green-600 text-white border border-white border-2 px-6 py-4 rounded-md",
        error:
          "bg-red-600 text-white border-white border-2 px-6 py-4 rounded-md",
        info: "bg-yellow-500 text-white border-white border-2 px-6 py-4 rounded-md",
      }}
    >
      <ThemeProvider
        themes={{
          light: { background: "bg-white", text: "text-black" },
          dark: { background: "bg-black", text: "text-white" },
          blue: { background: "bg-blue-600", text: "text-white" },
          pink: { background: "bg-pink-200", text: "text-black" },
        }}
        defaultTheme="dark"
      >
        <BrowserRouter>
          <MainLayout>
            {/* <Home /> */}
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/component/:component"
                element={<ComponentPageLayout />}
              />
            </Routes>
          </MainLayout>{" "}
        </BrowserRouter>
      </ThemeProvider>
    </ToastProvider>
  );
}
