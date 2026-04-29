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
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CategoryIcon from '@mui/icons-material/Category';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import { useAppDispatch } from "../hooks/useAppDispatch";
import { authActions } from "../store/authSlice";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export function AdminLayout() {
    const { userInfo, reload: reloadAuth } = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const themeColor = "#DA291C";
    const secondaryColor = "#FFC72C";

    useEffect(() => {
      reloadAuth();
    }, [reloadAuth]);

    const handleLogout = () => {
        dispatch(authActions.setUserInfo(undefined));
        localStorage.removeItem("token");
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
                    backdropFilter: "blur(10px)",
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
                                src="http://localhost:3000/uploads/assets/logo_mcd.png"
                                alt="Logo"
                                sx={{
                                    height: 40,
                                    width: "auto",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate("/admin")}
                            />
                        </Box>

                        {/* --- MENU NAVIGASI (Hanya jika Login) --- */}
                        <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
                            {userInfo && (
                                <>
                                    <Button
                                        component={Link}
                                        to="/admin/list-category"
                                        startIcon={<CategoryIcon />}
                                        sx={{
                                            position: "relative",
                                            borderRadius: "12px",
                                            textTransform: "none",
                                            fontWeight: 600,
                                            fontSize: "0.95rem",
                                            px: 2.5,
                                            py: 1,
                                            color: "#fff",

                                            background: `linear-gradient(135deg, ${themeColor}, #b71c1c)`,
                                            boxShadow: "0 4px 14px rgba(218, 41, 28, 0.35)",
                                            transition: "all 0.25s ease",

                                            "&:hover": {
                                                transform: "translateY(-1px)",
                                                boxShadow: "0 6px 18px rgba(218, 41, 28, 0.45)",
                                                background: `linear-gradient(135deg, #c62828, #8e0000)`,
                                            },

                                            "&:active": {
                                                transform: "scale(0.97)",
                                            },
                                        }}
                                    >
                                        Category Management
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<RestaurantMenuIcon />}
                                        component={Link}
                                        to="/admin/list-menu"
                                        sx={{
                                          position: "relative",
                                          borderRadius: "12px",
                                          textTransform: "none",
                                          fontWeight: 600,
                                          fontSize: "0.95rem",
                                          px: 2.5,
                                          py: 1,
                                          color: "#1a1a1a",

                                          background: "linear-gradient(135deg, #FFD54F, #FFC72C)",

                                          boxShadow: "0 4px 14px rgba(255, 199, 44, 0.35)",
                                          transition: "all 0.25s ease",

                                          "&:hover": {
                                            transform: "translateY(-1px)",
                                            boxShadow: "0 6px 18px rgba(255, 199, 44, 0.45)",
                                            background: "linear-gradient(135deg, #FFCA28, #FFB300)",
                                          },

                                          "&:active": {
                                            transform: "scale(0.97)",
                                          },
                                        }}
                                      >
                                        Menu Management
                                      </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<AssignmentIcon />}
                                        component={Link}
                                        to="/admin/list-order"
                                        sx={{
                                          position: "relative",
                                          borderRadius: "12px",
                                          textTransform: "none",
                                          fontWeight: 600,
                                          fontSize: "0.95rem",
                                          px: 2.5,
                                          py: 1,
                                          color: "#ffffff",

                                          background: "linear-gradient(135deg, #556b2f, #3e4f1c)",

                                          boxShadow: "0 4px 14px rgba(62, 79, 28, 0.35)",
                                          transition: "all 0.25s ease",

                                          "&:hover": {
                                            transform: "translateY(-1px)",
                                            boxShadow: "0 6px 18px rgba(79, 98, 40, 0.35)",
                                            background: "linear-gradient(135deg, #6b8e23, #4f6228)",
                                          },

                                          "&:active": {
                                            transform: "scale(0.97)",
                                          },
                                        }}
                                      >
                                        Order Management
                                      </Button>
                                    <Button
                                      variant="contained"
                                      startIcon={<PeopleIcon />}
                                      component={Link}
                                      to="/admin/list-user"
                                      sx={{
                                        position: "relative",
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        fontSize: "0.95rem",
                                        px: 2.5,
                                        py: 1,
                                        color: "#ffffff",

                                        background: "linear-gradient(135deg, #6D4C41, #4E342E)",

                                        boxShadow: "0 4px 14px rgba(78, 52, 46, 0.35)",
                                        transition: "all 0.25s ease",

                                        "&:hover": {
                                          transform: "translateY(-1px)",
                                          boxShadow: "0 6px 18px rgba(78, 52, 46, 0.45)",
                                          background: "linear-gradient(135deg, #5D4037, #3E2723)",
                                        },

                                        "&:active": {
                                          transform: "scale(0.97)",
                                        },
                                      }}
                                    >
                                      User Management
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
                                                {userInfo.nama}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ color: "gray" }}
                                            >
                                                Role : {userInfo.role}
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
                                            {userInfo.nama
                                                .split(" ")
                                                .map((name) => name[0])
                                                .join("")}
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
