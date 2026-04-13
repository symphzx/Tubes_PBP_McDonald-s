import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Paper,
    TextField,
    Button,
    MenuItem,
    Avatar,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";

export default function CreateMenuPage() {
    const themeColor = "#DA291C";

    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        type: "",
        availability: "",
        tag: "",
        image: null as File | null,
        preview: "",
    });

    const categories = [
        "Burger & McNuggets",
        "Ayam McD Krispy",
        "Ayam McD Spicy",
        "Paket Keluarga",
        "Happy Meal",
        "Paket HeBat",
        "Menu Receh",
        "McSpaghetti",
        "Camilan",
        "Minuman",
        "Pencuci Mulut",
        "Nasi",
    ];

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setForm({
                ...form,
                image: file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = () => {
        console.log(form);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* HEADER */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#111" }}>
                    Create New Menu
                </Typography>
                <Typography sx={{ color: "#666", mt: 1 }}>
                    Tambahkan menu baru ke dalam sistem
                </Typography>
            </Box>

            {/* FORM CARD */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: "20px",
                    border: "1px solid #E0E0E0",
                    bgcolor: "#FFFFFF",
                }}
            >
                {/* Container pengganti Grid */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                    }}
                >
                    {/* Nama */}
                    <Box sx={{ width: "100%" }}>
                        <TextField
                            fullWidth
                            label="Nama Menu"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </Box>

                    {/* Harga */}
                    <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Harga"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                        />
                    </Box>

                    {/* Kategori */}
                    <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                        <TextField
                            select
                            fullWidth
                            label="Kategori"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {/* Tipe */}
                    <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                        <TextField
                            select
                            fullWidth
                            label="Tipe"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                        >
                            <MenuItem value="Ala Carte">Ala Carte</MenuItem>
                            <MenuItem value="Paket">Paket</MenuItem>
                        </TextField>
                    </Box>

                    {/* Ketersediaan */}
                    <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                        <TextField
                            select
                            fullWidth
                            label="Ketersediaan"
                            name="availability"
                            value={form.availability}
                            onChange={handleChange}
                        >
                            <MenuItem value="Tersedia">Tersedia</MenuItem>
                            <MenuItem value="Tidak Tersedia">
                                Tidak Tersedia
                            </MenuItem>
                        </TextField>
                    </Box>

                    {/* Tag */}
                    <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                        <TextField
                            select
                            fullWidth
                            label="Tag"
                            name="tag"
                            value={form.tag}
                            onChange={handleChange}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="Baru!">Baru!</MenuItem>
                        </TextField>
                    </Box>

                    {/* Upload */}
                    <Box sx={{ width: "100%" }}>
                        <Box
                            sx={{
                                border: "2px dashed #E0E0E0",
                                borderRadius: "16px",
                                p: 3,
                                textAlign: "center",
                                cursor: "pointer",
                                "&:hover": {
                                    borderColor: themeColor,
                                },
                            }}
                            component="label"
                        >
                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />

                            {form.preview ? (
                                <Avatar
                                    src={form.preview}
                                    variant="rounded"
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        mx: "auto",
                                        mb: 2,
                                    }}
                                />
                            ) : (
                                <CloudUploadIcon
                                    sx={{
                                        fontSize: 50,
                                        color: "#999",
                                        mb: 1,
                                    }}
                                />
                            )}

                            <Typography sx={{ fontWeight: 600, color: "#333" }}>
                                Upload Gambar Menu
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#999" }}>
                                Klik untuk memilih file
                            </Typography>
                        </Box>
                    </Box>

                    {/* BUTTON */}
                    <Box sx={{ width: "100%" }}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSubmit}
                            sx={{
                                bgcolor: themeColor,
                                py: 1.5,
                                borderRadius: "12px",
                                fontWeight: 700,
                                textTransform: "none",
                                fontSize: "1rem",
                                "&:hover": {
                                    bgcolor: "#b22217",
                                },
                            }}
                        >
                            Simpan Menu
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}