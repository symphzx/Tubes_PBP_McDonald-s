import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import CategoryIcon from '@mui/icons-material/Category';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import InputBase from "@mui/material/InputBase";

import { useNavigate } from "react-router";
import { useKategori } from "../../../hooks/useKategori";
import type { KategoriMenu } from "../../../types";

export default function ListCategoryPage() {
  const navigate = useNavigate();
  const themeColor = "#DA291C";

  const [search, setSearch] = useState("");

  const { kategori, reload: reloadKategori } = useKategori();

  const [deleteTarget, setDeleteTarget] = useState<KategoriMenu | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    reloadKategori();
  }, [reloadKategori]);

  const filteredKategori = useMemo(() => {
    return kategori
      .filter((cat) => {
        const matchSearch = cat.nama
          .toLowerCase()
          .includes(search.toLowerCase());

        return matchSearch;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [kategori, search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setLoadingDelete(true);

      await fetch(`http://localhost:3000/kategori/${deleteTarget.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setDeleteTarget(null);
      reloadKategori();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDelete(false);
    }
  };

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <CategoryIcon sx={{ fontSize: 36, color: themeColor }} />
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Category Management
            </Typography>
          </Box>
          <Typography sx={{ color: "#666", mt: 1 }}>
            Kelola kategori menu
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/create-category")}
          sx={{
            bgcolor: themeColor,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            "&:hover": { bgcolor: "#b22217" },
          }}
        >
          Tambah Kategori
        </Button>
      </Box>

      {/* SEARCH */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
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
            "&:focus-within": {
              borderColor: "#FFC72C",
              boxShadow: "0 4px 12px rgba(255,199,44,0.2)",
            },
          }}
        >
          <SearchIcon sx={{ color: "#999", mr: 1 }} />

          <InputBase
            placeholder="Cari kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1 }}
          />

          {search && (
            <IconButton size="small" onClick={() => setSearch("")}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* TABLE */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid #E0E0E0",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            px: 3,
            py: 2,
            bgcolor: "#FAFAFA",
            borderBottom: "1px solid #E0E0E0",
            fontWeight: 700,
            color: "#555",
          }}
        >
          <Box sx={{ width: "20%" }}>Nama</Box>
          <Box sx={{ width: "10%" }}>Urutan</Box>
          <Box sx={{ width: "15%" }}>Start Date</Box>
          <Box sx={{ width: "15%" }}>End Date</Box>
          <Box sx={{ width: "15%" }}>Start Time</Box>
          <Box sx={{ width: "15%" }}>End Time</Box>
          <Box sx={{ width: "10%", textAlign: "right" }}>Aksi</Box>
        </Box>

        {/* ROW */}
        {filteredKategori.map((cat) => (
          <Box
            key={cat.id}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 3,
              py: 2,
              borderBottom: "1px solid #F0F0F0",
              transition: "0.2s",
              "&:hover": {
                bgcolor: "#FAFAFA",
              },
            }}
          >
            {/* NAMA */}
            <Box sx={{ width: "20%" }}>
              <Typography sx={{ fontWeight: 700 }}>{cat.nama}</Typography>
            </Box>

            {/* SORT */}
            <Box sx={{ width: "10%" }}>
              <Chip
                label={cat.sortOrder}
                size="small"
                sx={{
                  bgcolor: "#F5F5F5",
                  fontWeight: 600,
                }}
              />
            </Box>

            {/* START DATE */}
            <Box sx={{ width: "15%" }}>
              <Typography>
                {new Date(cat.startDate).toLocaleDateString()}
              </Typography>
            </Box>

            {/* END DATE */}
            <Box sx={{ width: "15%" }}>
              <Typography sx={{ color: cat.endDate ? "#333" : "#999" }}>
                {cat.endDate ? new Date(cat.endDate).toLocaleDateString() : "-"}
              </Typography>
            </Box>

            {/* START TIME */}
            <Box sx={{ width: "15%" }}>
              <Typography>{cat.startTime || "-"}</Typography>
            </Box>

            {/* END TIME */}
            <Box sx={{ width: "15%" }}>
              <Typography sx={{ color: cat.endTime ? "#333" : "#999" }}>
                {cat.endTime || "-"}
              </Typography>
            </Box>

            {/* ACTION */}
            <Box
              sx={{
                width: "10%",
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <IconButton
                onClick={() => navigate(`/admin/edit-category/${cat.id}`)}
                sx={{
                  border: "1px solid #E0E0E0",
                  borderRadius: "10px",
                  "&:hover": {
                    color: "#DAD41C",
                    borderColor: "#DAD41C",
                    bgcolor: "rgba(218,212,28,0.05)",
                  },
                }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={() => setDeleteTarget(cat)}
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

        {/* EMPTY */}
        {filteredKategori.length === 0 && (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "#777" }}>
              Tidak ada kategori ditemukan
            </Typography>
          </Box>
        )}
      </Paper>
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "22px",
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            fontWeight: 800,
            fontSize: "1.1rem",
          }}
        >
          <WarningAmberRoundedIcon sx={{ color: "#F59E0B" }} />
          Hapus Kategori?
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Typography sx={{ color: "#555", lineHeight: 1.8 }}>
            Kategori <b>{deleteTarget?.nama}</b> akan dihapus permanen.
            <br />
            Tindakan ini tidak dapat dibatalkan.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setDeleteTarget(null)}
            variant="outlined"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Batal
          </Button>

          <Button
            onClick={handleDelete}
            disabled={loadingDelete}
            variant="contained"
            sx={{
              bgcolor: "#DC2626",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              "&:hover": {
                bgcolor: "#B91C1C",
              },
            }}
          >
            {loadingDelete ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
