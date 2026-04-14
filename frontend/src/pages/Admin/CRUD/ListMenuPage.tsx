import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Button,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputBase from "@mui/material/InputBase";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router";
import { useMenus } from "../../../hooks/useMenus";
import { useKategori } from "../../../hooks/useKategori";

export default function ListMenuPage() {
  const navigate = useNavigate();
  const themeColor = "#DA291C";

  const { menus, reload: reloadMenu } = useMenus();
  const { kategori, reload: reloadKategori } = useKategori();

  const [search, setSearch] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortHarga, setSortHarga] = useState("");

  useEffect(() => {
    if (menus.length === 0) {
      reloadMenu();
    }

    if (kategori.length === 0) {
      reloadKategori();
    }
  }, [menus.length, kategori.length, reloadMenu, reloadKategori]);

  const filteredMenus = useMemo(() => {
    return menus
      .filter((menu) => {
        const matchSearch = menu.nama
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchKategori = selectedKategori
          ? menu.kategori_id === selectedKategori
          : true;

        const matchStatus = selectedStatus
          ? menu.ketersediaan === selectedStatus
          : true;

        const matchTag = selectedTag ? menu.tag === selectedTag : true;

        return matchSearch && matchKategori && matchStatus && matchTag;
      })
      .sort((a, b) => {
        if (sortHarga === "asc") return a.harga_awal - b.harga_awal;
        if (sortHarga === "desc") return b.harga_awal - a.harga_awal;
        return 0;
      });
  }, [menus, search, selectedKategori, selectedStatus, selectedTag, sortHarga]);

  // const selectedKategori = kategori.find(
  //   (cat) => cat.id === menu.kategori_id
  // );

  // const handleDelete = async (id: string) => {
  //   if (!confirm("Yakin ingin menghapus menu ini?")) return;

  //   try {
  //     await fetch(`http://localhost:3000/menu/${id}`, {
  //       method: "DELETE",
  //     });

  //     setMenus((prev) => prev.filter((m) => m.id !== id));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* HEADER */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Menu Management
          </Typography>
          <Typography sx={{ color: "#666", mt: 1 }}>
            Kelola semua menu yang tersedia
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/create-menu")}
          sx={{
            bgcolor: themeColor,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            "&:hover": { bgcolor: "#b22217" },
          }}
        >
          Tambah Menu
        </Button>
      </Box>

      {/* SEARCH BAR */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
            borderRadius: "14px",
            border: "1px solid #E0E0E0",
            bgcolor: "#FFF",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            transition: "all 0.2s ease",
            "&:focus-within": {
              borderColor: "#FFC72C",
              boxShadow: "0 4px 12px rgba(218, 212, 28, 0.15)",
            },
          }}
        >
          {/* ICON */}
          <SearchIcon sx={{ color: "#999", mr: 1 }} />

          {/* INPUT */}
          <InputBase
            placeholder="Cari menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
              fontSize: "0.95rem",
            }}
          />

          {/* CLEAR BUTTON */}
          {search && (
            <IconButton
              size="small"
              onClick={() => setSearch("")}
              sx={{
                color: "#999",
                "&:hover": {
                  color: "#C62828",
                  bgcolor: "rgba(198,40,40,0.05)",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        {/* LABEL */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterListIcon sx={{ color: "#666" }} />
          <Typography sx={{ fontWeight: 600, color: "#555" }}>
            Filter
          </Typography>
        </Box>

        {/* KATEGORI */}
        <Box
          sx={{
            minWidth: 180,
            border: "1px solid #E0E0E0",
            borderRadius: "12px",
            px: 1,
            bgcolor: "#FFF",
            "&:hover": { borderColor: "#FFC72C" },
          }}
        >
          <Select
            fullWidth
            displayEmpty
            value={selectedKategori}
            onChange={(e) => setSelectedKategori(e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              fontSize: "0.9rem",
              "& fieldset": { border: "none" },
            }}
          >
            <MenuItem value="" sx={{ color: "#6666667b" }}>
              Semua Kategori
            </MenuItem>
            {kategori.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.nama}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* STATUS */}
        <Box
          sx={{
            minWidth: 160,
            border: "1px solid #E0E0E0",
            borderRadius: "12px",
            px: 1,
            bgcolor: "#FFF",
            "&:hover": { borderColor: "#FFC72C" },
          }}
        >
          <Select
            fullWidth
            displayEmpty
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              fontSize: "0.9rem",
              "& fieldset": { border: "none" },
            }}
          >
            <MenuItem value="" sx={{ color: "#6666667b" }}>
              Semua Status
            </MenuItem>
            <MenuItem value="Tersedia">Tersedia</MenuItem>
            <MenuItem value="Tidak Tersedia">Tidak Tersedia</MenuItem>
          </Select>
        </Box>

        {/* TAG */}
        <Box
          sx={{
            minWidth: 160,
            border: "1px solid #E0E0E0",
            borderRadius: "12px",
            px: 1,
            bgcolor: "#FFF",
            "&:hover": { borderColor: "#FFC72C" },
          }}
        >
          <Select
            fullWidth
            displayEmpty
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              fontSize: "0.9rem",
              "& fieldset": { border: "none" },
            }}
          >
            <MenuItem value="" sx={{ color: "#6666667b" }}>
              Semua Tag
            </MenuItem>
            <MenuItem value="Baru!">Baru!</MenuItem>
          </Select>
        </Box>

        {/* SORT */}
        <Box
          sx={{
            minWidth: 180,
            border: "1px solid #E0E0E0",
            borderRadius: "12px",
            px: 1,
            bgcolor: "#FFF",
            "&:hover": { borderColor: "#FFC72C" },
          }}
        >
          <Select
            fullWidth
            displayEmpty
            value={sortHarga}
            onChange={(e) => setSortHarga(e.target.value)}
            IconComponent={SortIcon}
            sx={{
              fontSize: "0.9rem",
              "& fieldset": { border: "none" },
            }}
          >
            <MenuItem value="" sx={{ color: "#6666667b" }}>
              Urutkan Harga
            </MenuItem>
            <MenuItem value="asc">Harga Terendah</MenuItem>
            <MenuItem value="desc">Harga Tertinggi</MenuItem>
          </Select>
        </Box>

        {/* RESET BUTTON */}
        <Button
          onClick={() => {
            setSelectedKategori("");
            setSelectedStatus("");
            setSelectedTag("");
            setSortHarga("");
          }}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            color: "#C62828",
            "&:hover": {
              bgcolor: "rgba(198,40,40,0.05)",
            },
          }}
        >
          Reset
        </Button>
      </Box>

      {/* LIST CONTAINER */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid #E0E0E0",
          overflow: "hidden",
        }}
      >
        {/* HEADER TABLE */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 3,
            py: 2,
            bgcolor: "#FAFAFA",
            borderBottom: "1px solid #E0E0E0",
            fontWeight: 700,
            color: "#555",
          }}
        >
          <Box sx={{ width: "35%" }}>Menu</Box>
          <Box sx={{ width: "15%" }}>Harga</Box>
          <Box sx={{ width: "15%" }}>Kategori</Box>
          <Box sx={{ width: "15%" }}>Status</Box>
          <Box sx={{ width: "10%" }}>Tag</Box>
          <Box sx={{ width: "15%", textAlign: "right" }}>Aksi</Box>
        </Box>

        {/* LIST ITEM */}
        {filteredMenus.map((menu) => (
          <Box
            key={menu.id}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 3,
              py: 2,
              borderBottom: "1px solid #F0F0F0",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#FAFAFA",
              },
            }}
          >
            {/* MENU INFO */}
            <Box
              sx={{
                width: "35%",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                src={menu.gambar ?? undefined}
                variant="rounded"
                sx={{ width: 56, height: 56 }}
              />

              <Box>
                <Typography sx={{ fontWeight: 700 }}>{menu.nama}</Typography>
                <Typography variant="body2" sx={{ color: "#777" }}>
                  {menu.tipe}
                </Typography>
              </Box>
            </Box>

            {/* HARGA */}
            <Box sx={{ width: "15%" }}>
              <Typography sx={{ fontWeight: 600 }}>
                Rp {menu.harga_awal.toLocaleString()}
              </Typography>
            </Box>

            {/* KATEGORI */}
            <Box sx={{ width: "15%" }}>
              <Typography>
                {kategori.find((cat) => cat.id === menu.kategori_id)?.nama ||
                  "-"}
              </Typography>
            </Box>

            {/* STATUS */}
            <Box sx={{ width: "15%" }}>
              <Chip
                label={menu.ketersediaan}
                size="small"
                sx={{
                  bgcolor:
                    menu.ketersediaan === "Tersedia" ? "#E8F5E9" : "#FFEBEE",
                  color:
                    menu.ketersediaan === "Tersedia" ? "#2E7D32" : "#C62828",
                  fontWeight: 600,
                }}
              />
            </Box>

            {/* TAG */}
            <Box sx={{ width: "10%" }}>
              {menu.tag === "Baru!" && (
                <Chip
                  label="Baru!"
                  size="small"
                  sx={{
                    bgcolor: "#FFF8E1",
                    color: "#FF8F00",
                    fontWeight: 700,
                  }}
                />
              )}
            </Box>

            {/* ACTION */}
            <Box
              sx={{
                width: "15%",
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <IconButton
                onClick={() => navigate(`/admin/edit-menu/${menu.id}`)}
                sx={{
                  border: "1px solid #E0E0E0",
                  borderRadius: "10px",
                  "&:hover": {
                    color: "#DAD41C",
                    borderColor: "#DAD41C",
                    bgcolor: "rgba(198, 195, 40, 0.05)",
                  },
                }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                // onClick={() => handleDelete(menu.id)}
                sx={{
                  border: "1px solid #E0E0E0",
                  borderRadius: "10px",
                  "&:hover": {
                    color: "#C62828",
                    borderColor: "#C62828",
                    bgcolor: "rgba(198,40,40,0.05)",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}

        {/* EMPTY STATE */}
        {menus.length === 0 && (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "#777" }}>
              Belum ada menu tersedia
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
