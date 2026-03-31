import { Box, Card } from "@mui/material";
import { Outlet } from "react-router";

import logoMcDonalds from "../assets/logo_mcd.png";

export function TemplateLayout() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
                minHeight: "100vh",
            }}
        >
            {/* WRAPPER (AREA TENGAH) */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    display: "flex",
                    backgroundColor: "#fff",
                    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        width: 200,
                        bgcolor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        py: 2,
                        flexShrink: 0,
                    }}
                >
                    {/* LOGO */}
                    <Card
                        sx={{
                            width: "100%",
                            height: 150,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 0,
                            mb: 3,
                        }}
                    >
                        <Box
                            component="img"
                            src={logoMcDonalds}
                            sx={{
                                width: 60,
                                height: 60,
                                objectFit: "contain",
                            }}
                        />
                    </Card>
                </Box>

                {/* CONTENT */}
                <Box
                    sx={{
                        flex: 1,
                        p: 3,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
