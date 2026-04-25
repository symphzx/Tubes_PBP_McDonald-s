import React from "react";
import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material";

const categories = [
  { title: "Burger", image: "https://via.placeholder.com/150" },
  { title: "Ayam McD", image: "https://via.placeholder.com/150" },
  { title: "Menu HeBat", image: "https://via.placeholder.com/150" },
  { title: "Menu Receh", image: "https://via.placeholder.com/150" },
];

const recommendations = [
  { nama: "PaNas 2 Ayam McD Gulai Krispy Perkedel", harga_awal: 65500, gambar: "https://via.placeholder.com/150", tag: "Baru!" },
  { nama: "Paket Spesial Ayam McD Gulai Krispy Perkedel", harga_awal: 57500, gambar: "https://via.placeholder.com/150", tag: "Baru!" },
  { nama: "Dark Choco McFlurry With OREO", harga_awal: 17500, gambar: "https://via.placeholder.com/150", tag: "Baru!" },
  { nama: "Choco Matcha Sundae", harga_awal: 14000, gambar: "https://via.placeholder.com/150", tag: "Baru!" },
  { nama: "McSpaghetti Pedas Manis", harga_awal: 15000, gambar: "https://via.placeholder.com/150", tag: "Baru!" },
  { nama: "Pie Ketan Hitam Kelapa", harga_awal: 17000, gambar: "https://via.placeholder.com/150", tag: "Baru!" },
];

const formatHarga = (num: number) => {
  return num.toLocaleString("id-ID");
};

export default function HomePage() {

  return (
    <Box sx={{ p: 2, minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h5"sx={{ fontWeight: 700, mb: 2 }}>
        Pesan Sekarang
      </Typography>

      {/* Categories */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {categories.map((item, i) => (
          <Box key={i} sx={{ width: "calc(50% - 8px)" }}>
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #36363666",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                transition: "all 0.18s ease",
                "&:hover": {
                  cursor: "pointer",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
                },
              }}
            >
              <CardContent>
                <Typography sx={{fontWeight: 600}}>{item.title}</Typography>
                <Box
                  component="img"
                  src={item.image}
                  sx={{ width: "100%", mt: 1 }}
                />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Banner */}
      <Box
        sx={{
          mt: 3,
          height: 120,
          borderRadius: 3,
          bgcolor: "#ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{fontWeight: 600}}>Promo Banner</Typography>
      </Box>

      {/* Recommendations */}
      <Typography variant="h6" sx={{mt: 3, mb: 2, fontWeight: 700}}>
        Rekomendasi
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {recommendations.map((item, index) => (
          <Box key={index} sx={{ width: "calc(33.333% - 10.67px)" }}>
            <Card
              // onClick={() => handleCardClick(item)}
              sx={{
                borderRadius: "8px",
                border: "1px solid #36363666",
                position: "relative",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                height: "100%",
                aspectRatio: "2.5 / 4",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all 0.18s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
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
                  transition: "transform 0.18s ease",
                  ".MuiCard-root:hover &": {
                    transform: "scale(1.03)",
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
                  Rp{formatHarga(item.harga_awal)}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}