import { Box } from "@mui/material";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      {children}
    </Box>
  );
};