
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { router } from "./routes";
import { StrictMode } from "react";

const App = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </StrictMode>
  );
};

export default App;
