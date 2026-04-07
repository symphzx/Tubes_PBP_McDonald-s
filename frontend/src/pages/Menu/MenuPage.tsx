import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";

const filters = ["Semua", "Ayam Spicy", "Ayam Mix"];

const menuData = [
    {
        nama: "PaNas 2 Ayam McD Gulai Spicy Perkedel",
        harga_awal: "Rp65.500",
        kategori: "Ayam Spicy",
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaNas 2 Ayam McD Gulai Perkedel.webp",
        ketersediaan: "Tersedia",
        tag: "Baru!",
    },
    {
        nama: "PaNas 2 with Fries Ayam McD Gulai Spicy",
        harga_awal: "Rp80.500",
        kategori: "Ayam Spicy",
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaNas 2 Fries Ayam McD Gulai.webp",
        ketersediaan: "Tersedia",
        tag: "Baru!",
    },
    {
        nama: "Paket Spesial Ayam McD Gulai Spicy Perkedel",
        harga_awal: "Rp57.500",
        kategori: "Ayam Spicy",
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/Paket Spesial Ayam McD Gulai Perkedel.webp",
        ketersediaan: "Tersedia",
        tag: "Baru!",
    },
    {
        nama: "PaNas 1 Spicy",
        harga_awal: "Rp48.500",
        kategori: "Ayam Spicy",
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaNas 1 Spicy.png",
        ketersediaan: "Tersedia",
        tag: "",
    },
    {
        nama: "PaNas 2 with Fries Spicy",
        harga_awal: "Rp58.500",
        kategori: "Ayam Mix",
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaNas 2 with Fries Spicy.png",
        ketersediaan: "Tersedia",
        tag: "",
    },
    {
        nama: "PaMer 5 Spicy",
        harga_awal: "Rp88.000",
        kategori: "Ayam Spicy",
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaMer 5 Spicy.png",
        ketersediaan: "Tersedia",
        tag: "",
    },
    {
        nama: "Ayam Spicy McDonald's",
        harga_awal: "Rp22.000",
        kategori: "Ayam Spicy",
        tipe: "Ala Carte",
        gambar: "http://localhost:3000/uploads/assets/Ayam Spicy McDonald's.webp",
        ketersediaan: "Tersedia",
        tag: "",
    },
];

export default function MenuPage() {
    const [activeFilter, setActiveFilter] = useState("Semua");

    const filteredData =
        activeFilter === "Semua"
            ? menuData
            : menuData.filter((item) => item.kategori === activeFilter);

    return (
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
                            aspectRatio: "2.5 / 4", // lebih tinggi dari lebar (vertical card)
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            cursor: "pointer",

                            transition: "all 0.25s ease",

                            "&:hover": {
                                transform: "translateY(-6px)", // naik sedikit
                                boxShadow: "0 10px 25px rgba(0,0,0,0.08)", // soft shadow
                                borderColor: "#d5d5d5",
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
                            image={item.gambar}
                            sx={{
                                height: "100%",
                                objectFit: "contain",
                                p: 1,

                                transition: "transform 0.3s ease",

                                ".MuiCard-root:hover &": {
                                    transform: "scale(1.05)", // zoom halus
                                },
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
                                {item.nama}
                            </Typography>

                            <Typography sx={{ fontSize: 12, color: "#555" }}>
                                {item.harga_awal}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
