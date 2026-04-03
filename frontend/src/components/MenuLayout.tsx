import {
  Box,
  Card,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import SetMealIcon from "@mui/icons-material/SetMeal";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import IcecreamIcon from "@mui/icons-material/Icecream";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import FastfoodIcon from "@mui/icons-material/Fastfood";

import logoMcDonalds from "../assets/logo_mcd.png";
import { Outlet } from "react-router";

export function MenuLayout() {
  const menuItems = [
    { label: "Promosi", icon: <LocalOfferIcon />, active: true },
    { label: "Burger & McNuggets", icon: <LunchDiningIcon />, active: false },
    { label: "Ayam McD Krispy", icon: <SetMealIcon />, active: false },
    { label: "Ayam McD Spicy", icon: <SetMealIcon />, active: false },
    { label: "Paket Keluarga", icon: <RestaurantIcon />, active: false },
    { label: "Happy Meal", icon: <FastfoodIcon />, active: false },
    { label: "Paket Hemat", icon: <RestaurantIcon />, active: false },
    { label: "Menu Receh", icon: <FastfoodIcon />, active: false },
    { label: "McSpaghetti", icon: <RestaurantIcon />, active: false },
    { label: "Camilan", icon: <FastfoodIcon />, active: false },
    { label: "Minuman", icon: <EmojiFoodBeverageIcon />, active: false },
    { label: "Pencuci Mulut", icon: <IcecreamIcon />, active: false },
    { label: "Nasi", icon: <RiceBowlIcon />, active: false },
  ];

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
        {/* SIDEBAR */}
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
                sx={{
                  height: 50,
                  px: 1.5,
                  backgroundColor: "#ffffff",
                }}
              >
                <ListItemIcon sx={{ minWidth: 34 }}>
                  <HomeIcon />
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 600, color: "#000" }}
                    >
                      Awal
                    </Typography>
                  }
                />
              </ListItemButton>
            </Card>

            {menuItems.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderTopRightRadius: index === 0 ? "4px" : "0px",
                  borderBottomRightRadius:
                    index === menuItems.length - 1 ? "4px" : "0px",
                  border: "1px solid #e0e0e0",
                  borderLeft: "none",
                  height: 44,
                  px: 1.5,
                  backgroundColor: item.active ? "#f5f5f5" : "transparent",
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
                    color: item.active ? "#000" : "#666",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: item.active ? 600 : 400,
                        color: item.active ? "#000" : "#555",
                      }}
                    >
                      {item.label}
                    </Typography>
                  }
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
          }}
        >
          {/* {props.children} */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
