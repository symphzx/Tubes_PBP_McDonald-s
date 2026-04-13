import {
    Box,
    Card,
    List,
    ListItemText,
    ListItemIcon,
    ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useLocation, useParams } from "react-router";

import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import SetMealIcon from "@mui/icons-material/SetMeal";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import IcecreamIcon from "@mui/icons-material/Icecream";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import FastfoodIcon from "@mui/icons-material/Fastfood";

import { Outlet } from "react-router";
import { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import type { KategoriMenu } from "../types";
import { categoryActions } from "../store/categorySlice";

const homeItems = { Label: "Home", icon: <HomeIcon />};
const menuItems = [
    { label: "Promosi", icon: <LocalOfferIcon />},
    {
        label: "Burger & McNuggets",
        icon: <LunchDiningIcon />,
    },
    { label: "Ayam McD Krispy", icon: <SetMealIcon />},
    { label: "Ayam McD Spicy", icon: <SetMealIcon />},
    { label: "Paket Keluarga", icon: <RestaurantIcon />},
    { label: "Happy Meal", icon: <FastfoodIcon />},
    { label: "Paket Hemat", icon: <RestaurantIcon />},
    { label: "Menu Receh", icon: <FastfoodIcon />},
    { label: "McSpaghetti", icon: <RestaurantIcon />},
    { label: "Camilan", icon: <FastfoodIcon />},
    { label: "Minuman", icon: <EmojiFoodBeverageIcon />},
    { label: "Pencuci Mulut", icon: <IcecreamIcon />},
    { label: "Nasi", icon: <RiceBowlIcon />},
];

export function MenuLayout() {
    const location = useLocation();
    const { category } = useParams();

    const isHomeActive = location.pathname === "/";
    const activeIndex = menuItems.findIndex(
        (item) => item.label === category
    );

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleMenuClick = (label: string) => {
        dispatch(categoryActions.setCategory(label as KategoriMenu));
        navigate(`/menu/${label}`);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* WRAPPER (AREA TENGAH) */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    height: "100%",
                    display: "flex",
                    backgroundColor: "#fff",
                    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                }}
            >
                {/* SIDEBAR */}
                <Box
                    sx={{
                        width: 200,
                        bgcolor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        py: 2,
                        flexShrink: 0,
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    {/* LOGO */}
                    <Card
                        sx={{
                            width: "100%",
                            height: 150,
                            flexShrink: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 0,
                            mb: 3,
                        }}
                    >
                        <Box
                            component="img"
                            src="http://localhost:3000/uploads/assets/logo_mcd.png"
                            sx={{
                                width: 60,
                                height: 60,
                                objectFit: "contain",
                            }}
                        />
                    </Card>

                    {/* MENU LIST */}
                    <List sx={{ p: 0 }}>
                        <Card
                            sx={{
                                mb: 3,
                                borderTopRightRadius: "10px",
                                borderBottomRightRadius: "10px",
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,

                                boxShadow: "0px 1px 0px 0px #767676",
                                border: "1px solid #e0e0e0",
                                borderLeft: "none",
                            }}
                        >
                            <ListItemButton
                                onClick={() => {
                                    navigate("/");
                                }}
                                sx={{
                                    height: 50,
                                    px: 1.5,
                                    backgroundColor: isHomeActive
                                        ? "#f5f5f5"
                                        : "transparent",
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 34,
                                        color: isHomeActive ? "#000" : "#666",
                                    }}
                                >
                                    <HomeIcon />
                                </ListItemIcon>

                                <ListItemText
                                    primary={homeItems.Label}
                                    primaryTypographyProps={{
                                        fontSize: 13,
                                        fontWeight: 600,
                                    }}
                                    sx={{
                                        fontWeight: isHomeActive ? 600 : 400,
                                        color: isHomeActive ? "#000" : "#555",
                                    }}
                                />
                            </ListItemButton>
                        </Card>

                        {menuItems.map((item, index) => (
                            <ListItemButton
                                onClick={() => {
                                    handleMenuClick(item.label)
                                    // setActiveIndex(index);
                                }}
                                key={index}
                                sx={{
                                    borderTopRightRadius:
                                        index === 0 ? "4px" : "0px",
                                    borderBottomRightRadius:
                                        index === menuItems.length - 1
                                            ? "4px"
                                            : "0px",
                                    border: "1px solid #e0e0e0",
                                    borderLeft: "none",
                                    height: 44,
                                    px: 1.5,
                                    backgroundColor: activeIndex === index
                                        ? "#f5f5f5"
                                        : "transparent",
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                    },
                                    boxShadow:
                                        index === menuItems.length - 1
                                            ? "0px 1px 0px 0px #767676"
                                            : "none",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 34,
                                        color: activeIndex === index ? "#000" : "#666",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize: 13,
                                        fontWeight: activeIndex === index ? 600 : 400,
                                        color: activeIndex === index ? "#000" : "#555",
                                    }}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>

                {/* CONTENT */}
                <Box
                    sx={{
                        flex: 1,
                        p: 3,
                        height: "100vh",
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    {/* {props.children} */}
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
