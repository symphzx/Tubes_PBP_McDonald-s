import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";

import PaNas2Perkedel from "../../assets/PaNas 2 Ayam McD Gulai Perkedel.webp";
import PaNas2Fries from "../../assets/PaNas 2 Fries Ayam McD Gulai.webp";
import PaketSpesialGulai from "../../assets/Paket Spesial Ayam McD Gulai Perkedel.webp";

const filters = ["Semua", "Ayam Spicy", "Ayam Mix"];

const menuData = [
    {
        title: "PaNas 2 Ayam McD Gulai Spicy Perkedel",
        price: "Rp65.500",
        category: "Ayam Spicy",
        image: PaNas2Perkedel,
        tag: "Baru!",
    },
    {
        title: "PaNas 2 with Fries Ayam McD Gulai Spicy",
        price: "Rp80.500",
        category: "Ayam Spicy",
        image: PaNas2Fries,
        tag: "Baru!",
    },
    {
        title: "Paket Spesial Ayam McD Gulai Spicy Perkedel",
        price: "Rp57.500",
        category: "Ayam Spicy",
        image: PaketSpesialGulai,
        tag: "Baru!",
    },
    {
        title: "PaNas 1 Ayam McD Gulai Spicy Perkedel",
        price: "Rp49.500",
        category: "Ayam Spicy",
        image: "https://via.placeholder.com/200",
        tag: "Baru!",
    },
    {
        title: "Paket 5 Ayam McD Gulai Spicy Perkedel",
        price: "Rp181.000",
        category: "Ayam Spicy",
        image: "https://via.placeholder.com/200",
        tag: "",
    },
    {
        title: "PaMer 5 Ayam McD Gulai Mix Perkedel",
        price: "Rp181.000",
        category: "Ayam Mix",
        image: "https://via.placeholder.com/200",
        tag: "Baru!",
    },
];

export default function MenuPage() {
    const [activeFilter, setActiveFilter] = useState("Semua");

    const filteredData =
        activeFilter === "Semua"
            ? menuData
            : menuData.filter((item) => item.category === activeFilter);

    return (
        // <div>
        //     <h1>Menu</h1>
        // </div>
        <Box>
            {/* TITLE */}
            <Typography
                sx={{ fontSize: 26, fontWeight: 700, color: "#333", mb: 1 }}
            >
                Ayam McD
            </Typography>

            {/* SUBTITLE */}
            <Typography sx={{ fontSize: 13, color: "#777", mb: 2 }}>
                Gunakan filter berikut untuk memudahkan pencarian
            </Typography>

            {/* FILTER */}
            <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
                {filters.map((filter) => (
                    <Button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        sx={{
                            borderRadius: "20px",
                            textTransform: "none",
                            fontSize: 12,
                            px: 2.5,
                            py: 0.5,
                            border: "1px solid #ddd",
                            backgroundColor:
                                activeFilter === filter ? "#eee" : "#fff",
                            color: "#333",
                            "&:hover": {
                                backgroundColor: "#f5f5f5",
                            },
                        }}
                    >
                        {filter}
                    </Button>
                ))}
            </Box>

            {/* GRID MENU */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 12 / 8, // 12px
                }}
            >
                {filteredData.map((item, index) => (
                    <Card
                        key={index}
                        sx={{
                            borderRadius: "8px",
                            border: "1px solid #e0e0e0",
                            position: "relative",
                            boxShadow: "none",
                            height: "100%",
                            aspectRatio: "2.5 / 4",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
                                borderColor: "#d4da1c74",
                            },
                        }}
                    >
                        {/* TAG */}
                        {item.tag && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 6,
                                    left: 6,
                                    backgroundColor: "#f7c948",
                                    px: 1,
                                    fontSize: 10,
                                    fontWeight: 600,
                                    borderRadius: "3px",
                                }}
                            >
                                {item.tag}
                            </Box>
                        )}

                        <CardMedia
                            component="img"
                            image={item.image}
                            sx={{
                                height: "100%",
                                objectFit: "contain",
                                p: 1,
                            }}
                        />

                        <CardContent sx={{ p: 1.5 }}>
                            <Typography
                                sx={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    lineHeight: 1.3,
                                    mb: 0.5,
                                    minHeight: 32,
                                }}
                            >
                                {item.title}
                            </Typography>

                            <Typography sx={{ fontSize: 12, color: "#555" }}>
                                {item.price}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
