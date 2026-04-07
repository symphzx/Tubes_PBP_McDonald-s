import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
// import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./config/AppRoutes";
import { store } from "./redux/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    {/* <ThemeProvider theme={{theme}}> */}
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
