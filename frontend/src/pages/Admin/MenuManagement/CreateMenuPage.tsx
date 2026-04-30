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
  Collapse,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TuneIcon from "@mui/icons-material/Tune";
import StyleIcon from "@mui/icons-material/Style";
import { useKategori } from "../../../hooks/useKategori";
import { useNavigate } from "react-router";
import { useMenus } from "../../../hooks/useMenus";

// Type untuk Variasi & Opsi
interface VarianItem {
  nama: string;
  harga_tambahan: number | "";
}

interface OpsiItem {
  nama: string;
  harga_tambahan: number | "";
}

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

  const [varianList, setVarianList] = useState<VarianItem[]>([]);
  const [opsiList, setOpsiList] = useState<OpsiItem[]>([]);
  const [showVarian, setShowVarian] = useState(false);
  const [showOpsi, setShowOpsi] = useState(false);

  const { kategori, reload: reloadKategori } = useKategori();
  const { reload: reloadMenus } = useMenus();
  const navigate = useNavigate();

  useEffect(() => {
    reloadKategori();
  }, [reloadKategori]);

  // ========== VARIAN HANDLERS ==========
  const handleAddVarian = () => {
    setVarianList([...varianList, { nama: "", harga_tambahan: "" }]);
    setShowVarian(true);
  };

  const handleRemoveVarian = (index: number) => {
    setVarianList(varianList.filter((_, i) => i !== index));
  };

  const handleVarianChange = (
    index: number,
    field: keyof VarianItem,
    value: string
  ) => {
    const updated = [...varianList];
    if (field === "harga_tambahan") {
      updated[index][field] = value === "" ? "" : Number(value);
    } else {
      updated[index][field] = value;
    }
    setVarianList(updated);
  };

  // ========== OPSI HANDLERS ==========
  const handleAddOpsi = () => {
    setOpsiList([...opsiList, { nama: "", harga_tambahan: "" }]);
    setShowOpsi(true);
  };

  const handleRemoveOpsi = (index: number) => {
    setOpsiList(opsiList.filter((_, i) => i !== index));
  };

  const handleOpsiChange = (
    index: number,
    field: keyof OpsiItem,
    value: string
  ) => {
    const updated = [...opsiList];
    if (field === "harga_tambahan") {
      updated[index][field] = value === "" ? "" : Number(value);
    } else {
      updated[index][field] = value;
    }
    setOpsiList(updated);
  };

  // ========== SUBMIT ==========
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
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      const menuId = result.data.id;

      for (const varian of varianList) {
        if (varian.nama && varian.harga_tambahan !== "") {
          await fetch("http://localhost:3000/varian-menu", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              menu_id: menuId,
              nama: varian.nama,
              harga_tambahan: varian.harga_tambahan,
            }),
          });
        }
      }


      for (const opsi of opsiList) {
        if (opsi.nama && opsi.harga_tambahan !== "") {
          await fetch("http://localhost:3000/opsi-menu", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              menu_id: menuId,
              nama: opsi.nama,
              harga_tambahan: opsi.harga_tambahan,
            }),
          });
        }
      }

      alert("Menu berhasil dibuat!");
      reloadMenus();
      navigate("/admin/list-menu");
    } catch (error) {
      console.error(error);
      alert("Error creating menu");
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

          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >

            <Button
              variant="outlined"
              startIcon={<StyleIcon />}
              onClick={handleAddVarian}
              sx={{
                flex: 1,
                minWidth: 200,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 600,
                textTransform: "none",
                borderColor: "#7B1FA2",
                color: "#7B1FA2",
                "&:hover": {
                  borderColor: "#4A148C",
                  backgroundColor: "rgba(123, 31, 162, 0.04)",
                },
              }}
            >
              Tambah Variasi
            </Button>


            <Button
              variant="outlined"
              startIcon={<TuneIcon />}
              onClick={handleAddOpsi}
              sx={{
                flex: 1,
                minWidth: 200,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 600,
                textTransform: "none",
                borderColor: "#F57C00",
                color: "#F57C00",
                "&:hover": {
                  borderColor: "#E65100",
                  backgroundColor: "rgba(245, 124, 0, 0.04)",
                },
              }}
            >
              Tambah Opsi
            </Button>
          </Box>


          {varianList.length > 0 && (
            <Box sx={{ width: "100%" }}>
              <Box
                onClick={() => setShowVarian(!showVarian)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  p: 2,
                  borderRadius: "12px",
                  bgcolor: "#F3E5F5",
                  "&:hover": { bgcolor: "#E1BEE7" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <StyleIcon sx={{ color: "#7B1FA2" }} />
                  <Typography sx={{ fontWeight: 700, color: "#7B1FA2" }}>
                    Variasi ({varianList.length})
                  </Typography>
                </Box>
                {showVarian ? (
                  <ExpandLessIcon sx={{ color: "#7B1FA2" }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: "#7B1FA2" }} />
                )}
              </Box>

              <Collapse in={showVarian}>
                <Box
                  sx={{
                    mt: 1,
                    p: 2,
                    border: "1px solid #CE93D8",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {varianList.map((varian, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        borderRadius: "10px",
                        bgcolor: "#FAFAFA",
                        border: "1px solid #E0E0E0",
                      }}
                    >

                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#7B1FA2",
                          minWidth: 30,
                        }}
                      >
                        #{index + 1}
                      </Typography>

                      <TextField
                        label="Nama Variasi"
                        placeholder="cth: Level 1, Ukuran Large"
                        size="small"
                        value={varian.nama}
                        onChange={(e) =>
                          handleVarianChange(index, "nama", e.target.value)
                        }
                        sx={{ flex: 2 }}
                      />

                      <TextField
                        label="Harga Tambahan"
                        placeholder="cth: 5000"
                        type="number"
                        size="small"
                        value={varian.harga_tambahan}
                        onChange={(e) =>
                          handleVarianChange(
                            index,
                            "harga_tambahan",
                            e.target.value
                          )
                        }
                        sx={{ flex: 1 }}
                      />

                      <IconButton
                        onClick={() => handleRemoveVarian(index)}
                        sx={{ color: "#D32F2F" }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Box>
                  ))}

                  <Button
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddVarian}
                    sx={{
                      alignSelf: "flex-start",
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#7B1FA2",
                    }}
                  >
                    Tambah Variasi Lagi
                  </Button>
                </Box>
              </Collapse>
            </Box>
          )}


          {opsiList.length > 0 && (
            <Box sx={{ width: "100%" }}>
              <Box
                onClick={() => setShowOpsi(!showOpsi)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  p: 2,
                  borderRadius: "12px",
                  bgcolor: "#FFF3E0",
                  "&:hover": { bgcolor: "#FFE0B2" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TuneIcon sx={{ color: "#F57C00" }} />
                  <Typography sx={{ fontWeight: 700, color: "#F57C00" }}>
                    Opsi ({opsiList.length})
                  </Typography>
                </Box>
                {showOpsi ? (
                  <ExpandLessIcon sx={{ color: "#F57C00" }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: "#F57C00" }} />
                )}
              </Box>

              <Collapse in={showOpsi}>
                <Box
                  sx={{
                    mt: 1,
                    p: 2,
                    border: "1px solid #FFB74D",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {opsiList.map((opsi, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        borderRadius: "10px",
                        bgcolor: "#FAFAFA",
                        border: "1px solid #E0E0E0",
                      }}
                    >

                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#F57C00",
                          minWidth: 30,
                        }}
                      >
                        #{index + 1}
                      </Typography>

                      <TextField
                        label="Nama Opsi"
                        placeholder="cth: Extra Cheese, No Ice"
                        size="small"
                        value={opsi.nama}
                        onChange={(e) =>
                          handleOpsiChange(index, "nama", e.target.value)
                        }
                        sx={{ flex: 2 }}
                      />

                      <TextField
                        label="Harga Tambahan"
                        placeholder="cth: 3000"
                        type="number"
                        size="small"
                        value={opsi.harga_tambahan}
                        onChange={(e) =>
                          handleOpsiChange(
                            index,
                            "harga_tambahan",
                            e.target.value
                          )
                        }
                        sx={{ flex: 1 }}
                      />

                      <IconButton
                        onClick={() => handleRemoveOpsi(index)}
                        sx={{ color: "#D32F2F" }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Box>
                  ))}

                  <Button
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddOpsi}
                    sx={{
                      alignSelf: "flex-start",
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#F57C00",
                    }}
                  >
                    Tambah Opsi Lagi
                  </Button>
                </Box>
              </Collapse>
            </Box>
          )}


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
                  !nama ||
                  harga === "" ||
                  !kategoriId ||
                  !tipe ||
                  !ketersediaan
                    ? "#ccc"
                    : `linear-gradient(135deg, ${themeColor}, #b71c1c)`,
                boxShadow:
                  !nama ||
                  harga === "" ||
                  !kategoriId ||
                  !tipe ||
                  !ketersediaan
                    ? "none"
                    : "0 4px 14px rgba(218, 41, 28, 0.35)",
                "&:hover": {
                  background:
                    !nama ||
                    harga === "" ||
                    !kategoriId ||
                    !tipe ||
                    !ketersediaan
                      ? "#ccc"
                      : "linear-gradient(135deg, #c62828, #8e0000)",
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