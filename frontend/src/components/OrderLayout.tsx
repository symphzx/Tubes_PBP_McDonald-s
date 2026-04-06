import { Outlet } from "react-router";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../pages/Order/Theme";
export default function OrderLayout() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 600,
            height: "100%",
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: 3,
            overflowY: "scroll",
            p: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}