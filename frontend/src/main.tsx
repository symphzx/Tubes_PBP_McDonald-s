<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './config/AppRoutes'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Layout } from './components/Layout'

// import './index.css'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./config/AppRoutes";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CssBaseline />
        {/* <ThemeProvider theme={{theme}}> */}
        {/* <Provider store={store}> */}
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
        {/* </Provider> */}
    </StrictMode>,
);
>>>>>>> origin/develop
