import { useEffect, useState } from "react";
import { 
    Box, 
    Container, 
    Typography, 
    Paper, 
    Avatar, 
    Snackbar,
    Alert,
    AlertTitle,
    type SlideProps,
    Slide
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CategoryIcon from '@mui/icons-material/Category';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useMenus } from "../../hooks/useMenus";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useLocation } from "react-router";
import { useOrders } from "../../hooks/useOrder";
import { useKategori } from "../../hooks/useKategori";

    const colors = {
        yellow: "#FFC72C",
        red: "#DA291C",
        black: "#000000",
        white: "#FFFFFF",
      };

    const StatCard = ({
        title,
        value,
        icon,
        color,
    }: {
        title: string;
        value: string | number;
        icon: React.ReactNode;
        color: string;
    }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: "16px",
                border: "1px solid #E0E0E0",
                display: "flex",
                alignItems: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                    borderColor: color,
                },
            }}
        >
            <Avatar
                sx={{
                    bgcolor: `${color}15`, // Transparansi 15% dari warna utama
                    color: color,
                    width: 56,
                    height: 56,
                    mr: 3,
                }}
            >
                {icon}
            </Avatar>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#111" }}>
                    {value}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                    {title}
                </Typography>
            </Box>
        </Paper>
        );
    };

export default function AdminDashboard() {
    const [openSuccess, setOpenSuccess] = useState(false);
    const { userInfo } = useAppSelector((state) => state.auth);
    const location = useLocation();
    
    const themeColor = "#DA291C"; // McDonald's Red
    const secondaryColor = "#FFC72C"; // McDonald's Yellow

    const { menus, reload: reloadMenu } = useMenus();
    const { orders, reload: reloadOrder } = useOrders();
    const { kategori, reload: reloadKategori } = useKategori();

    useEffect(() => {
        reloadMenu();
        reloadOrder();
        reloadKategori();
    }, [reloadMenu, reloadOrder, reloadKategori]);

    useEffect(() => {
        if (location.state?.success) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOpenSuccess(true);
        }

        window.history.replaceState({}, document.title);
    }, [location.state]);

    // Fungsi sederhana untuk sapaan berdasarkan waktu
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="down" />;
    }


    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* --- HERO BANNER --- */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: "20px",
                    bgcolor: themeColor,
                    color: "#FFFFFF",
                    position: "relative",
                    overflow: "hidden",
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: "200px",
                    boxShadow: "0 8px 24px rgba(218, 41, 28, 0.2)",
                }}
            >
                {/* Dekorasi Bentuk Abstrak di Background */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "-50%",
                        right: "-10%",
                        width: "300px",
                        height: "300px",
                        bgcolor: secondaryColor,
                        borderRadius: "50%",
                        opacity: 0.9,
                        zIndex: 0,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "-40%",
                        right: "10%",
                        width: "200px",
                        height: "200px",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "50%",
                        zIndex: 0,
                    }}
                />

                <Box sx={{ position: "relative", zIndex: 1, maxWidth: "600px" }}>
                    <Typography 
                        variant="h3" 
                        sx={{ fontWeight: 800, mb: 1, letterSpacing: "-0.5px" }}
                    >
                        {getGreeting()}, {"Admin"}!
                    </Typography>
                    <Typography 
                        variant="h6" 
                        sx={{ fontWeight: 400, opacity: 0.9, mb: 3 }}
                    >
                        Welcome to McDonald's Dashboard. Let's manage your posts, menus, and promotions today.
                    </Typography>
                    <Box
                        sx={{
                            display: "inline-block",
                            bgcolor: secondaryColor,
                            color: "#000",
                            px: 2,
                            py: 0.5,
                            borderRadius: "20px",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                        }}
                    >
                        Overview
                    </Box>
                </Box>
            </Paper>

            {/* --- QUICK STATS --- */}
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#333", mb: 3 }}>
                Quick Stats
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    mx: -1.5,
                }}
            >
                <Box sx={{ px: 1.5, mb: 3, width: { xs: "100%", sm: "50%", md: "25%" } }}>
                    <StatCard 
                        title="Total Menu" 
                        value={menus.length} 
                        icon={<FastfoodIcon fontSize="large" />} 
                        color={"#2c87ff"} 
                    />
                </Box>

                <Box sx={{ px: 1.5, mb: 3, width: { xs: "100%", sm: "50%", md: "25%" } }}>
                    <StatCard 
                        title="Total Orders" 
                        value={orders.length} 
                        icon={<AssignmentIcon fontSize="large" />} 
                        color={themeColor}
                    />
                </Box>

                <Box sx={{ px: 1.5, mb: 3, width: { xs: "100%", sm: "50%", md: "25%" } }}>
                    <StatCard 
                        title="New Menus" 
                        value={menus.filter(menu => menu.tag === "Baru!").length}
                        icon={<NewReleasesIcon fontSize="large" />} 
                        color={secondaryColor} 
                    />
                </Box>

                <Box sx={{ px: 1.5, mb: 3, width: { xs: "100%", sm: "50%", md: "25%" } }}>
                    <StatCard 
                        title="Total Categories" 
                        value={kategori.length} 
                        icon={<CategoryIcon fontSize="large" />} 
                        color="#4CAF50"
                    />
                </Box>
            </Box>


            {/* --- SECTION TAMBAHAN (Contoh: Aktivitas Terakhir) --- */}
            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#333", mb: 3 }}>
                    Recent Activities
                </Typography>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: 3, 
                        borderRadius: "16px", 
                        border: "1px solid #E0E0E0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "200px",
                        bgcolor: "#FFFFFF"
                    }}
                >
                    <Typography variant="body1" sx={{ color: "#999", fontStyle: "italic" }}>
                        Belum ada aktivitas terbaru untuk ditampilkan.
                    </Typography>
                </Paper>
            </Box>

            <Snackbar
              open={openSuccess}
              autoHideDuration={3000}
              onClose={() => setOpenSuccess(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              slots={{ transition: SlideTransition }}
            >
                <Alert
                  severity="success"
                  variant="filled"
                  icon={<CheckCircleOutlineIcon fontSize="large" />}
                  sx={{
                    backgroundColor: colors.black,
                    color: colors.yellow,
                    width: "100%",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                    borderRadius: 2,
                    fontSize: "1.1rem",
                    border: `2px solid ${colors.yellow}`,
                    "& .MuiAlert-icon": { color: colors.yellow },
                  }}
                >
                    <AlertTitle sx={{ fontWeight: "900", fontSize: "1.2rem" }}>
                      LOGIN SUCCESS!
                    </AlertTitle>
                  Welcome back, <b>{userInfo?.nama}</b>
                </Alert>
              </Snackbar>
        </Container>
    );
}