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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router";
import { useKategori } from "../../../hooks/useKategori";
import { useMenus } from "../../../hooks/useMenus";

export default function EditMenuPage() {
  const themeColor = "#DA291C";
  const accentYellow = "#FFC72C";

  const { id } = useParams();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState<number | "">("");
  const [kategoriId, setKategoriId] = useState("");
  const [tipe, setTipe] = useState("");
  const [ketersediaan, setKetersediaan] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState("");

  const { kategori, reload: reloadKategori } = useKategori();
  const { menus, reload: reloadMenus } = useMenus();


  useEffect(()=>{
    reloadKategori();
    reloadMenus();
  }, [reloadKategori, reloadMenus])

  useEffect(() => {
    if (!menus) return;

    const menu = menus.find((menu) => menu.id === id);
    if (!menu) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNama(menu.nama);
    setHarga(menu.harga_awal);
    setKategoriId(menu.kategori_id);
    setTipe(menu.tipe);
    setKetersediaan(menu.ketersediaan);
    setTag(menu.tag || "");
    setExistingImage(menu.gambar || "");

  }, [id, menus]);

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("kategori_id", kategoriId);
    formData.append("harga_awal", String(harga));
    formData.append("tipe", tipe);
    formData.append("ketersediaan", ketersediaan);
    formData.append("tag", tag || "");

    if (image) {
      formData.append("gambar", image);
    } else{
      formData.append("existingImage", existingImage);
    }

    const res = await fetch(`http://localhost:3000/menu/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message);
      return;
    }

    alert("Menu berhasil diupdate!");
    reloadMenus();
    navigate("/admin/list-menu");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Edit Menu
        </Typography>
        <Typography sx={{ color: "#666", mt: 1 }}>
          Update data menu
        </Typography>
      </Box>

      {/* MAIN LAYOUT */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {/* LEFT - FORM */}
        <Box sx={{ width: { xs: "100%", md: "64%" } }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: "20px",
              border: "1px solid #E0E0E0",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                mb: 3,
                borderLeft: `6px solid ${themeColor}`,
                pl: 2,
              }}
            >
              Informasi Menu
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Box sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  label="Nama Menu"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </Box>

              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Harga"
                  value={harga}
                  onChange={(e) =>
                    setHarga(e.target.value === "" ? "" : Number(e.target.value))
                  }
                />
              </Box>

              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  select
                  fullWidth
                  label="Kategori"
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

              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  select
                  fullWidth
                  label="Tipe"
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value)}
                >
                  <MenuItem value="Ala Carte">Ala Carte</MenuItem>
                  <MenuItem value="Paket">Paket</MenuItem>
                </TextField>
              </Box>

              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  select
                  fullWidth
                  label="Ketersediaan"
                  value={ketersediaan}
                  onChange={(e) => setKetersediaan(e.target.value)}
                >
                  <MenuItem value="Tersedia">Tersedia</MenuItem>
                  <MenuItem value="Tidak Tersedia">Tidak Tersedia</MenuItem>
                </TextField>
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                  select
                  fullWidth
                  label="Tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Baru!">Baru!</MenuItem>
                </TextField>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* RIGHT - IMAGE PANEL */}
        <Box sx={{ width: { xs: "100%", md: "32%" } }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "20px",
              border: "1px solid #E0E0E0",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2,
                borderBottom: `3px solid ${accentYellow}`,
                display: "inline-block",
                pb: 0.5,
              }}
            >
              Preview Gambar
            </Typography>

            <Avatar
              src={
                preview
                  ? preview
                  : existingImage
                  ? existingImage
                  : ""
              }
              variant="rounded"
              sx={{
                width: 160,
                height: 160,
                mx: "auto",
                mb: 2,
                boxShadow: 3,
              }}
            />

            <Box
              component="label"
              sx={{
                border: "2px dashed #E0E0E0",
                borderRadius: "12px",
                p: 2,
                cursor: "pointer",
                "&:hover": {
                  borderColor: themeColor,
                  bgcolor: "#FFF5F5",
                },
              }}
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

              <CloudUploadIcon sx={{ color: themeColor }} />
              <Typography sx={{ fontSize: "0.9rem" }}>
                Ganti Gambar
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* BUTTON */}
        <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/admin/list-menu")}
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 600,
                textTransform: "none",
                borderColor: "#ccc",
                color: "#555",

                "&:hover": {
                  borderColor: themeColor,
                  color: themeColor,
                  backgroundColor: "rgba(218, 41, 28, 0.04)",
                },
              }}
            >
              Kembali
            </Button>

            <Button
                fullWidth
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                disabled={
                  !nama ||
                  harga === "" ||
                  !kategoriId ||
                  !tipe ||
                  !ketersediaan
                }
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1rem",

                  background:
                    !nama || harga === "" || !kategoriId || !tipe || !ketersediaan
                      ? "#ccc"
                      : `linear-gradient(135deg, ${themeColor}, #b71c1c)`,

                  boxShadow:
                    !nama || harga === "" || !kategoriId || !tipe || !ketersediaan
                      ? "none"
                      : "0 4px 14px rgba(218, 41, 28, 0.35)",

                  cursor:
                    !nama || harga === "" || !kategoriId || !tipe || !ketersediaan
                      ? "not-allowed"
                      : "pointer",

                  "&:hover": {
                    background:
                      !nama || harga === "" || !kategoriId || !tipe || !ketersediaan
                        ? "#ccc"
                        : "linear-gradient(135deg, #c62828, #8e0000)",
                  },
                }}
              >
                Update Menu
              </Button>
        </Box>
      </Box>
    </Container>
  );
}