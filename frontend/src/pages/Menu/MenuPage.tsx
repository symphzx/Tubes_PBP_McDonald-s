import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router";

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
        nama: "PaNas 1 Spicy, Medium",
        harga_awal: "Rp36.500",
        kategori: "Ayam Spicy",
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaNas 1 Spicy.png",
        ketersediaan: "Tersedia",
        tag: "",
    },
    {
        nama: "PaNas 2 Spicy, Medium",
        harga_awal: "Rp48.500",
        kategori: "Ayam Spicy",
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaNas 2 Spicy.png",
        ketersediaan: "Tersedia",
        tag: "",
    },
    {
        nama: "PaNas 2 with Fries Spicy",
        harga_awal: "Rp51.000",
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
    {   
        id: 99,
        nama: "Big Mac",
        harga_awal: "Rp43.000",
        kategori: "Burger & McNuggets",
        tipe: "Ala Carte",
        gambar: "https://d2vuyvo9qdtgo9.cloudfront.net/foods/October2023/S2b8K7g2tM6cDksrAdVv.webp",
        ketersediaan: "Tersedia",
        tag: "",
        recommendation: {
                        title: "Paket Big Mac",
                        price: "Rp60.000",
                        image: "https://d2vuyvo9qdtgo9.cloudfront.net/foods/July2024/Od0aM1u2WwlUFkMz4s5H.png"
                    }
    }
];

export default function MenuPage() {
    const [activeFilter, setActiveFilter] = useState("Semua");

    const navigate = useNavigate();

    const handleCardClick = (item: any) => {
      // kalo menu satuan, arahin ke package selection
      if (item.tipe === "Ala Carte" && item.recommendation) {
          navigate("/order/package-selection", { 
              state: { selectedItem: item } 
          });
      } else {
          // klo udah paket, lgsg custom
          navigate(`/customize/${item.id || 0}`);
      }
    };

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
                        onClick={() => handleCardClick(item)}
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

                            transition: "all 0.2s ease-in-out",

                            "&:hover": {
                                transform: "translateY(-6px)", // naik sedikit
                                boxShadow: "0 10px 25px rgba(0,0,0,0.08)", // soft shadow
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
                            image={item.gambar}
                            sx={{
                                height: "100%",
                                objectFit: "contain",
                                p: 1,

                                transition: "transform 0.2.3s ease-in-out",

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
