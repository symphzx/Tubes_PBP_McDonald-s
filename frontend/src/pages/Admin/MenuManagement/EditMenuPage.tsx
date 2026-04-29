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
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TuneIcon from "@mui/icons-material/Tune";
import StyleIcon from "@mui/icons-material/Style";
import { useParams, useNavigate } from "react-router";
import { useKategori } from "../../../hooks/useKategori";
import { useMenus } from "../../../hooks/useMenus";
import type { MenuOption, MenuVarian } from "../../../types";

// ✅ Type dengan optional id untuk membedakan existing vs baru
interface VarianItem {
  id?: string; // ada id = data dari DB, undefined = baru
  nama: string;
  harga_tambahan: number | "";
}

interface OpsiItem {
  id?: string;
  nama: string;
  harga_tambahan: number | "";
}

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

  const [varianList, setVarianList] = useState<VarianItem[]>([]);
  const [opsiList, setOpsiList] = useState<OpsiItem[]>([]);
  const [showVarian, setShowVarian] = useState(false);
  const [showOpsi, setShowOpsi] = useState(false);

  const [deletedVarianIds, setDeletedVarianIds] = useState<string[]>([]);
  const [deletedOpsiIds, setDeletedOpsiIds] = useState<string[]>([]);

  const { kategori, reload: reloadKategori } = useKategori();
  const { menus, reload: reloadMenus } = useMenus();

  useEffect(() => {
    reloadKategori();
    reloadMenus();
  }, [reloadKategori, reloadMenus]);

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

    if (menu.varian_menus && menu.varian_menus.length > 0) {
      setVarianList(
        menu.varian_menus.map((v: MenuVarian) => ({
          id: v.id,
          nama: v.nama,
          harga_tambahan: v.harga_tambahan,
        }))
      );
      setShowVarian(true);
    }

    if (menu.opsi_menus && menu.opsi_menus.length > 0) {
      setOpsiList(
        menu.opsi_menus.map((o: MenuOption) => ({
          id: o.id,
          nama: o.nama,
          harga_tambahan: o.harga_tambahan,
        }))
      );
      setShowOpsi(true);
    }
  }, [id, menus]);

  // ========== VARIAN HANDLERS ==========
  const handleAddVarian = () => {
    setVarianList([...varianList, { nama: "", harga_tambahan: "" }]);
    setShowVarian(true);
  };

  const handleRemoveVarian = (index: number) => {
    const removed = varianList[index];
    // Jika item punya id (dari DB), track untuk dihapus di backend
    if (removed.id) {
      setDeletedVarianIds((prev) => [...prev, removed.id!]);
    }
    setVarianList(varianList.filter((_, i) => i !== index));
  };

  const handleVarianChange = (
    index: number,
    field: "nama" | "harga_tambahan",
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
    const removed = opsiList[index];
    if (removed.id) {
      setDeletedOpsiIds((prev) => [...prev, removed.id!]);
    }
    setOpsiList(opsiList.filter((_, i) => i !== index));
  };

  const handleOpsiChange = (
    index: number,
    field: "nama" | "harga_tambahan",
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
      } else {
        formData.append("existingImage", existingImage);
      }

      const res = await fetch(`http://localhost:3000/menu/${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      for (const varianId of deletedVarianIds) {
        await fetch(`http://localhost:3000/varian-menu/${varianId}`, {
          method: "DELETE",
          credentials: "include",
        });
      }

      for (const opsiId of deletedOpsiIds) {
        await fetch(`http://localhost:3000/opsi-menu/${opsiId}`, {
          method: "DELETE",
          credentials: "include",
        });
      }

      for (const varian of varianList) {
        if (varian.nama && varian.harga_tambahan !== "") {
          if (varian.id) {
            await fetch(`http://localhost:3000/varian-menu/${varian.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                menu_id: id,
                nama: varian.nama,
                harga_tambahan: varian.harga_tambahan,
              }),
            });
          } else {
            await fetch("http://localhost:3000/varian-menu", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                menu_id: id,
                nama: varian.nama,
                harga_tambahan: varian.harga_tambahan,
              }),
            });
          }
        }
      }

      for (const opsi of opsiList) {
        if (opsi.nama && opsi.harga_tambahan !== "") {
          if (opsi.id) {
            await fetch(`http://localhost:3000/opsi-menu/${opsi.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                menu_id: id,
                nama: opsi.nama,
                harga_tambahan: opsi.harga_tambahan,
              }),
            });
          } else {
            await fetch("http://localhost:3000/opsi-menu", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                menu_id: id,
                nama: opsi.nama,
                harga_tambahan: opsi.harga_tambahan,
              }),
            });
          }
        }
      }

      alert("Menu berhasil diupdate!");
      reloadMenus();
      navigate("/admin/list-menu");
    } catch (error) {
      console.error(error);
      alert("Error updating menu");
    }
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
                    setHarga(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
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
              src={preview ? preview : existingImage ? existingImage : ""}
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
              <Typography sx={{ fontSize: "0.9rem" }}>Ganti Gambar</Typography>
            </Box>
          </Paper>
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
                    key={varian.id || `new-varian-${index}`}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: "10px",
                      bgcolor: varian.id ? "#F3E5F5" : "#FAFAFA",
                      border: `1px solid ${varian.id ? "#CE93D8" : "#E0E0E0"}`,
                    }}
                  >
                    {/* Nomor + Badge */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#7B1FA2",
                          minWidth: 30,
                        }}
                      >
                        #{index + 1}
                      </Typography>
                      {varian.id ? (
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            bgcolor: "#7B1FA2",
                            color: "#fff",
                            px: 1,
                            py: 0.2,
                            borderRadius: "6px",
                            fontWeight: 600,
                          }}
                        >
                          EXISTING
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            bgcolor: "#4CAF50",
                            color: "#fff",
                            px: 1,
                            py: 0.2,
                            borderRadius: "6px",
                            fontWeight: 600,
                          }}
                        >
                          NEW
                        </Typography>
                      )}
                    </Box>

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
                    key={opsi.id || `new-opsi-${index}`}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: "10px",
                      bgcolor: opsi.id ? "#FFF3E0" : "#FAFAFA",
                      border: `1px solid ${opsi.id ? "#FFB74D" : "#E0E0E0"}`,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#F57C00",
                          minWidth: 30,
                        }}
                      >
                        #{index + 1}
                      </Typography>
                      {opsi.id ? (
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            bgcolor: "#F57C00",
                            color: "#fff",
                            px: 1,
                            py: 0.2,
                            borderRadius: "6px",
                            fontWeight: 600,
                          }}
                        >
                          EXISTING
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            bgcolor: "#4CAF50",
                            color: "#fff",
                            px: 1,
                            py: 0.2,
                            borderRadius: "6px",
                            fontWeight: 600,
                          }}
                        >
                          NEW
                        </Typography>
                      )}
                    </Box>

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
              !nama || harga === "" || !kategoriId || !tipe || !ketersediaan
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
            Update Menu
          </Button>
        </Box>
      </Box>
    </Container>
  );
}