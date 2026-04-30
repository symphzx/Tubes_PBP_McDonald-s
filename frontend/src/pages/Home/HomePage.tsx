import React, { useEffect, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router";

import { useMenus } from "../../hooks/useMenus";
import { useKategori } from "../../hooks/useKategori";

const categories = [
  {
    title: "Burger",
    image: "http://localhost:3000/uploads/assets/Burger Banner.jpg",
    link: "/menu/Burger%20&%20McNuggets",
  },
  {
    title: "Ayam McD",
    image: "http://localhost:3000/uploads/assets/Ayam McD Banner.png",
    link: "/menu/Ayam%20McD%20Krispy",
  },
  {
    title: "Menu HeBat",
    image: "http://localhost:3000/uploads/assets/HeBat Banner.webp",
    link: "/menu/Paket%20HeBat",
  },
  {
    title: "Menu Receh",
    image: "http://localhost:3000/uploads/assets/Menu Receh Banner.webp",
    link: "/menu/Menu%20Receh",
  },
];

const formatHarga = (num: number) => num.toLocaleString("id-ID");

export default function HomePage() {
  const navigate = useNavigate();

  const { menus, reload } = useMenus();
  const { kategori } = useKategori();

  useEffect(() => {
    reload();
  }, [reload]);

  
  const recommendations = useMemo(() => {
    if (!menus.length || !kategori.length) return [];

    const getKategoriId = (nama: string) =>
      kategori.find((item) => item.nama === nama)?.id;

    const ayamSpicyId = getKategoriId("Ayam McD Spicy");
    const camilanId = getKategoriId("Camilan");
    const dessertId = getKategoriId("Pencuci Mulut");

    // hanya menu tag Baru!
    const menuBaru = menus.filter(
      (item) =>
        item.tag === "Baru!" &&
        item.ketersediaan === "Tersedia"
    );

    // ambil 2 dari Ayam McD Spicy
    const ayamSpicy = menuBaru
      .filter((item) => item.kategori_id === ayamSpicyId)
      .slice(0, 2);

    // sisanya dari Camilan / Dessert
    const lainnya = menuBaru
      .filter(
        (item) =>
          item.kategori_id === camilanId ||
          item.kategori_id === dessertId
      )
      .slice(0, 4);

    return [...ayamSpicy, ...lainnya];
  }, [menus, kategori]);

  // const handleCardClick = (item: any) => {
  //   navigate(`/customize/${item.id}`);
  // };

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
              onClick={() => navigate(item.link)}
              sx={{
                borderRadius: 3,
                border: "1px solid #36363666",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Typography sx={{fontWeight: 600}}>{item.title}</Typography>
                <Box
                  component="img"
                  src={item.image}
                  sx={{
                    width: "100%",
                    height: 100,
                    mt: 1,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Banner */}
      <Box
        component="img"
        src="http://localhost:3000/uploads/assets/Promo Banner.webp"
        sx={{
          mt: 3,
          width: "100%",
          borderRadius: 3,
        }}
      />

      {/* Recommendations */}
      <Typography variant="h6" sx={{mt: 3, mb: 2, fontWeight: 700}}>
        Rekomendasi
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {recommendations.map((item, index) => (
          <Box
            key={index}
            sx={{ width: "calc(33.333% - 10.67px)" }}
          >
            <Card
              onClick={() => navigate(`/menu/${item.nama}`)}
              sx={{
                borderRadius: "8px",
                border: "1px solid #36363666",
                position: "relative",
                height: "100%",
                aspectRatio: "2.5 / 4",
                cursor: "pointer",
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
                image={item.gambar || "https://via.placeholder.com/150"}
                sx={{
                  height: 210,
                  objectFit: "contain",
                  p: 1,
                  mt: 1,
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

                <Typography
                  sx={{ fontSize: 12, color: "#555" }}
                >
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