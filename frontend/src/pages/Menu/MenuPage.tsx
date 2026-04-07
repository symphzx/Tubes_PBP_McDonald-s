import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Modal,
    IconButton,
    Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; 
import { useNavigate } from "react-router"; 

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
        isAlaCarte: false, // false kl udh paket, true kl menu satuan
    },
    {
        title: "PaNas 2 with Fries Ayam McD Gulai Spicy",
        price: "Rp80.500",
        category: "Ayam Spicy",
        image: PaNas2Fries,
        tag: "Baru!",
        isAlaCarte: false,
    },
    {
        title: "Paket Spesial Ayam McD Gulai Spicy Perkedel",
        price: "Rp57.500",
        category: "Ayam Spicy",
        image: PaketSpesialGulai,
        tag: "Baru!",
        isAlaCarte: false,
    },
    {
        title: "PaNas 1 Ayam McD Gulai Spicy Perkedel",
        price: "Rp49.500",
        category: "Ayam Spicy",
        image: "https://via.placeholder.com/200",
        tag: "Baru!",
        isAlaCarte: false,
    },
    {
        title: "Paket 5 Ayam McD Gulai Spicy Perkedel",
        price: "Rp181.000",
        category: "Ayam Spicy",
        image: "https://via.placeholder.com/200",
        tag: "",
        isAlaCarte: false,
    },
    {
        title: "PaMer 5 Ayam McD Gulai Mix Perkedel",
        price: "Rp181.000",
        category: "Ayam Mix",
        image: "https://via.placeholder.com/200",
        tag: "Baru!",
        isAlaCarte: false,
    },
    {
        id: 99,
        title: "Big Mac",
        price: "Rp43.000",
        category: "Burger",
        image: "https://d2vuyvo9qdtgo9.cloudfront.net/foods/October2023/S2b8K7g2tM6cDksrAdVv.webp",
        tag: "",
        isAlaCarte: true,
        recommendation: {
                title: "Paket Big Mac",
                price: "Rp60.000",
                image: "https://d2vuyvo9qdtgo9.cloudfront.net/foods/July2024/Od0aM1u2WwlUFkMz4s5H.png"
            }
    },
];

export default function MenuPage() {
    const [activeFilter, setActiveFilter] = useState("Semua");

    const navigate = useNavigate();

    const handleCardClick = (item: any) => {
    // kalo menu satuan, arahin ke package selection
    if (item.isAlaCarte && item.recommendation) {
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
                        onClick={() => handleCardClick(item)}
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
