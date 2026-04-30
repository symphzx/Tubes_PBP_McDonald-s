/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

// reduxnyaa
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { addItemToCart } from "../../../store/cartSlice";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from 'uuid';


const menuData = [
  {
    title: "Choco Matcha Sundae",
    price: 14.000,
    image: "http://localhost:3000/uploads/assets/Choco Matcha Sundae.png",
    tag: "Baru!",
  },
  {
    title: "Dark Choco McFlurry With OREO",
    price: "Rp17.500",
    image:
      "http://localhost:3000/uploads/assets/Dark Choco McFlurry With OREO.webp",
    tag: "Baru!",
  },
  {
    title: "Biscoff McFlurry",
    price: 17.500,
    image: "http://localhost:3000/uploads/assets/Biscoff%20McFlurry.png",
    tag: "Baru!",
  },
  {
    title: "Pie Ketan Hitam Kelapa",
    price: 17.000,
    image: "http://localhost:3000/uploads/assets/Pie Ketan Hitam Kelapa.png",
    tag: "Baru!",
  },
  {
    title: "Ice Cream Cone Matcha",
    price: 10.000,
    image: "http://localhost:3000/uploads/assets/Ice Cream Cone Matcha.png",
  },
];

export default function RecomendationPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddRecommendation = (item: any) => {
    const orderData = {
      id: uuidv4(),
      menu_id: item.id,
      menu_nama: item.title,
      menu_harga: item.price,
      menu_gambar: item.image,
      qty: 1,
      varian: null,
      opsi: null,
      subtotal: item.price
    };

    dispatch(addItemToCart(orderData));
    navigate("/"); 
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        py: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 600,
          mb: 2,
          color: "#333",
        }}
      >
        Bolehkah kami menyarankan
      </Typography>

      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* ROW ATAS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          {menuData.slice(0, 3).map((item, index) => (
            <Card
              key={index}
              onClick={() => handleAddRecommendation(item)}
              sx={{
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                position: "relative",
                boxShadow: "none",
                aspectRatio: "2 / 4", 
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                cursor: "pointer",
                transition: "all 0.25s ease",

                "&:hover": {
                  transform: "translateY(-6px)", 
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)", 
                  borderColor: "#ddd",
                },
              }}
            >
              {/* TAG */}
              {item.tag && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    backgroundColor: "#f7c948",
                    px: 1,
                    fontSize: 10,
                    fontWeight: 600,
                    borderRadius: "4px",
                    zIndex: 1,
                  }}
                >
                  {item.tag}
                </Box>
              )}

              {/* IMAGE AREA */}
              <Box
                sx={{
                  height: "60%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1,
                  backgroundColor: "#fafafa",
                  borderBottom: "1px solid #eee",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                />
              </Box>

              {/* CONTENT */}
              <CardContent
                sx={{
                  height: 70,
                  flex: 1,
                  p: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
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

        {/* ROW BAWAH (CENTER) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {menuData.slice(3).map((item, index) => (
            <Card
              key={index}
              onClick={() => handleAddRecommendation(item)}
              sx={{
                width: "calc((100% / 3) - 16px)",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                position: "relative",
                boxShadow: "none",
                aspectRatio: "2 / 4",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                cursor: "pointer",
                transition: "all 0.25s ease",

                "&:hover": {
                  transform: "translateY(-6px)", 
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)", 
                  borderColor: "#ddd",
                },
              }}
            >
              {item.tag && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    backgroundColor: "#f7c948",
                    px: 1,
                    fontSize: 10,
                    fontWeight: 600,
                    borderRadius: "4px",
                    zIndex: 1,
                  }}
                >
                  {item.tag}
                </Box>
              )}

              {/* IMAGE */}
              <Box
                sx={{
                  height: "60%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1,
                  backgroundColor: "#fafafa",
                  borderBottom: "1px solid #eee",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                />
              </Box>

              {/* CONTENT */}
              <CardContent
                sx={{
                  height: 70,
                  flex: 1,
                  p: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
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

      <Button
        variant="outlined"
        onClick={() => navigate("/cart")}
        sx={{
          mt: 2,
          width: "70%",
          height: 48,
          borderRadius: "8px",
          textTransform: "none",
          fontSize: 14,
          color: "#333",
          borderColor: "#ccc",
        }}
      >
        Tidak
      </Button>
    </Box>
  );
}