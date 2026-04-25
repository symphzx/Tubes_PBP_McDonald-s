import { useEffect, useMemo } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useMenus } from "../../hooks/useMenus";
import { useKategori } from "../../hooks/useKategori";


// buat reduxnya
import { useAppSelector } from "../../hooks/useAppSelector"


export default function MenuPage() {
    const { menus, reload } = useMenus();

    const { kategori } = useKategori();
    const { category } = useParams();
    const navigate = useNavigate();

    const cartItems = useAppSelector((state) => state.cart.items);
    const totalHarga = useAppSelector((state) => state.cart.totalHarga);

    // ini buat ngitung jml menu sama jml bayar di cartnya
    const totalQty = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.qty, 0);
    }, [cartItems]);

    const selectedCategory = useMemo(() => {
        return kategori.find((item) => item.nama === category);
    }, [kategori, category]);

    const handleCardClick = (item: any) => {
      // kalo menu satuan, arahin ke package selection
      if (item.tipe === "Ala Carte" && item.recommendation) {
        const kategoriNama = item.kategori?.nama?.toLowerCase() || ""; 
        
        let targetPath = "";
        if (kategoriNama.includes("ayam")) {
            targetPath = "/order/package-selection-ayam";
        } else if (kategoriNama.includes("burger")) {
            targetPath = "/order/package-selection-burger";
        } else {
            targetPath = "/order/package-selection-ayam"; 
        }

        navigate(targetPath, { state: { selectedItem: item } }) 
    } else {
        navigate(`/setQuantity/${item.id}`); 
    }
    };

    const formatHarga = (harga: number) => {
      return new Intl.NumberFormat("en-US").format(harga);
    };

    useEffect(() => {
        reload();
    }, [reload]);

    const filteredAndSortedData = useMemo(() => {
        let data = [...menus];

        // filter berdasarkan sidebar
        if (selectedCategory) {
            data = data.filter((item) => item.kategori_id === selectedCategory.id);
        }

        // sort "Baru!" ke atas
        data.sort((a, b) =>
            Number(b.tag === "Baru!") - Number(a.tag === "Baru!")
        );

        return data;
    }, [menus, selectedCategory]);

    return (
        <Box>
            {/* TITLE */}
            <Typography
                sx={{ fontSize: 26, fontWeight: 700, color: "#333", mb: 1 }}
            >
                {selectedCategory?.nama}
            </Typography>

            {/* SUBTITLE */}
            <Typography sx={{ fontSize: 13, color: "#777", mb: 2 }}>
                Gunakan filter berikut untuk memudahkan pencarian
            </Typography>

            {/* GRID MENU */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 12 / 8, // 12px
                }}
            >
                {filteredAndSortedData.map((item, index) => (
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
                            image={item.gambar || "https://via.placeholder.com/150"}
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
                                Rp{formatHarga(item.harga_awal)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* nat nambah inii soalnya udah ada redux cart */}
            {/* FLOATING CART BAR */}
            {cartItems.length > 0 && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "90%",
                        maxWidth: "500px",
                        bgcolor: "#FFC72C", // Kuning McD
                        borderRadius: "50px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 3,
                        py: 1.5,
                        zIndex: 1000,
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/cart")}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{ position: "relative" }}>
                            <ShoppingCartIcon sx={{ color: "#000" }} />
                            <Box sx={{
                                position: "absolute", top: -8, right: -8,
                                bgcolor: "#DB0007", color: "white",
                                fontSize: "10px", borderRadius: "50%",
                                width: 18, height: 18,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontWeight: "bold"
                            }}>
                                {totalQty}
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: "bold", color: "#000" }}>
                            View Cart
                        </Typography>
                    </Box>

                    <Typography sx={{ fontWeight: "bold", color: "#000" }}>
                        Rp {formatHarga(totalHarga)}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
