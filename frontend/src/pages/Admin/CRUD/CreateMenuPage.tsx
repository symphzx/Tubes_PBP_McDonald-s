import { useEffect, useState } from "react";
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
import { useKategori } from "../../../hooks/useKategori";

export default function CreateMenuPage() {
  const themeColor = "#DA291C";
  const [nama, setNama] = useState<string>("");
  const [harga, setHarga] = useState<number | "">("");
  const [kategoriId, setKategoriId] = useState<string>("");
  const [tipe, setTipe] = useState<string>("");
  const [ketersediaan, setKetersediaan] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const { kategori, reload } = useKategori();

  useEffect(() => {
    reload();
  }, [reload]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("nama", nama);
      formData.append("kategori_id", kategoriId);
      formData.append("harga_awal", String(harga));
      formData.append("tipe", tipe);
      formData.append("ketersediaan", ketersediaan);
      formData.append("tag", tag || "");

      if (image) {
        formData.append("gambar", image);
      }

      const response = await fetch("http://localhost:3000/menu", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      alert("Menu berhasil dibuat!");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
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
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </Box>

          {/* Harga */}
          <Box sx={{ width: { xs: "100%", md: "48%" } }}>
            <TextField
              fullWidth
              type="number"
              label="Harga"
              name="price"
              value={harga}
              onChange={(e) => {
                const value = e.target.value;
                setHarga(value === "" ? "" : Number(value));
              }}
            />
          </Box>

          {/* Kategori */}
          <Box sx={{ width: { xs: "100%", md: "48%" } }}>
            <TextField
              select
              fullWidth
              label="Kategori"
              name="category"
              value={kategoriId}
              onChange={(e) => setKategoriId(e.target.value)}
            >
              {kategori.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.nama}
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
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
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
              value={ketersediaan}
              onChange={(e) => setKetersediaan(e.target.value)}
            >
              <MenuItem value="Tersedia">Tersedia</MenuItem>
              <MenuItem value="Tidak Tersedia">Tidak Tersedia</MenuItem>
            </TextField>
          </Box>

          {/* Tag */}
          <Box sx={{ width: { xs: "100%", md: "48%" } }}>
            <TextField
              select
              fullWidth
              label="Tag"
              name="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />

              {preview ? (
                <Avatar
                  src={preview}
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
