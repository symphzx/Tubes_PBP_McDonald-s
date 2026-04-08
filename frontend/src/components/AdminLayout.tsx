import {
    Toolbar,
    AppBar,
    Button,
    Box,
    Typography,
    Avatar,
    Container,
    Tooltip,
    IconButton,
} from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../hooks/useAppDispatch";
import logoMcd from "../assets/logo_mcd.png";
import { authActions } from "../store/authSlice";
import { useAppSelector } from "../hooks/useAppSelector";

export function AdminLayout() {
    const userInfo = useAppSelector((state) => state.auth.userInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const themeColor = "#DA291C";
    const secondaryColor = "#FFC72C";

    const handleLogout = () => {
        dispatch(authActions.setUserInfo(undefined));
        navigate("/login");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "#F8F9FA",
            }}
        >
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)", // Efek kaca modern
                    borderBottom: "1px solid #E0E0E0",
                    height: "70px",
                    justifyContent: "center",
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* --- LOGO --- */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mr: 4,
                            }}
                        >
                            <Box
                                component="img"
                                src={logoMcd}
                                alt="Logo"
                                sx={{
                                    height: 40,
                                    width: "auto",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate("/")}
                            />
                        </Box>

                        {/* --- MENU NAVIGASI (Hanya jika Login) --- */}
                        <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
                            {userInfo && (
                                <>
                                    <Button
                                        sx={{
                                            color: "#555",
                                            fontWeight: 500,
                                            textTransform: "none",
                                            fontSize: "0.95rem",
                                            px: 2,
                                            position: "relative",
                                        }}
                                    >
                                        Dashboard
                                    </Button>
                                    <Button
                                        sx={{
                                            color: "#555",
                                            fontWeight: 500,
                                            textTransform: "none",
                                            fontSize: "0.95rem",
                                            px: 2,
                                            position: "relative",
                                        }}
                                    >
                                        Post Management
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        component={Link}
                                        to="/post/create"
                                        sx={{
                                            bgcolor: themeColor,
                                            borderRadius: "8px",
                                            textTransform: "none",
                                            fontWeight: 600,
                                            "&:hover": { bgcolor: "#b22217" },
                                            display: { xs: "none", sm: "flex" },
                                        }}
                                    >
                                        Create Post
                                    </Button>
                                </>
                            )}
                        </Box>

                        {/* --- BAGIAN KANAN: USER INFO & ACTIONS --- */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            {userInfo ? (
                                <>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.5,
                                            ml: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                textAlign: "right",
                                                display: {
                                                    xs: "none",
                                                    md: "block",
                                                },
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    color: "#333",
                                                    lineHeight: 1,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                Admin
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ color: "gray" }}
                                            >
                                                Role : Admin / Cashier
                                                Ditampilkan di sini
                                            </Typography>
                                        </Box>
                                        <Avatar
                                            sx={{
                                                width: 38,
                                                height: 38,
                                                bgcolor: secondaryColor,
                                                color: "#000",
                                                fontWeight: "bold",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            A
                                        </Avatar>
                                    </Box>

                                    <Tooltip title="Logout">
                                        <IconButton
                                            onClick={handleLogout}
                                            sx={{
                                                color: "#666",
                                                "&:hover": {
                                                    color: themeColor,
                                                    bgcolor:
                                                        "rgba(218, 41, 28, 0.04)",
                                                },
                                            }}
                                        >
                                            <LogoutIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            ) : (
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/login")}
                                    sx={{
                                        color: themeColor,
                                        borderColor: themeColor,
                                        textTransform: "none",
                                    }}
                                >
                                    Sign In
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Kontainer Utama untuk Isi Halaman */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 0,
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
