import React from "react";
import { 
    Box, 
    Container, 
    Typography, 
    Grid, 
    Paper, 
    Avatar, 
    Divider 
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ArticleIcon from "@mui/icons-material/Article";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// import { useAppSelector } from "../hooks/useAppSelector";

export default function AdminDashboard() {
    // Mengambil data user dari Redux (menyesuaikan dengan store Anda)
    // const userInfo = useAppSelector((state) => state.auth.userInfo);
    
    const themeColor = "#DA291C"; // McDonald's Red
    const secondaryColor = "#FFC72C"; // McDonald's Yellow

    // Fungsi sederhana untuk sapaan berdasarkan waktu
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    // Komponen Card reusable untuk statistik
    const StatCard = ({ title, value, icon, color }) => (
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
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Total Posts" 
                        value="142" 
                        icon={<ArticleIcon fontSize="large" />} 
                        color={themeColor} 
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Active Promos" 
                        value="8" 
                        icon={<StarBorderIcon fontSize="large" />} 
                        color={secondaryColor} 
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="New Menus" 
                        value="12" 
                        icon={<FastfoodIcon fontSize="large" />} 
                        color="#000000" 
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Total Visitors" 
                        value="45.2K" 
                        icon={<TrendingUpIcon fontSize="large" />} 
                        color="#4CAF50" // Aksen hijau untuk growth
                    />
                </Grid>
            </Grid>

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
        </Container>
    );
}