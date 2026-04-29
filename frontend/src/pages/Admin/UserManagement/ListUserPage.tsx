import { useMemo, useState, useEffect } from "react";
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
  InputBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortIcon from "@mui/icons-material/Sort";
import PeopleIcon from "@mui/icons-material/People";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useNavigate } from "react-router";
import type { UserInfo } from "../../../types";

export default function ListUserPage() {
  const navigate = useNavigate();
  const themeColor = "#DA291C";

  const [users, setUsers] = useState<UserInfo[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [sortNama, setSortNama] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<UserInfo | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  /* ================= FETCH ================= */
  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();

      const mapped: UserInfo[] = data.records.map(
        (u: { id: string; nama: string; email: string; role: string }) => ({
          id: String(u.id),
          nama: u.nama,
          email: u.email,
          role: u.role,
        })
      );

      setUsers(mapped);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setLoadingDelete(true);

      const response = await fetch(
        `http://localhost:3000/user/${deleteTarget.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to delete user");

      setDeleteTarget(null);
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Gagal menghapus user");
    } finally {
      setLoadingDelete(false);
    }
  };

  /* ================= FILTER + SORT ================= */
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const matchSearch =
          user.nama.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = selectedRole ? user.role === selectedRole : true;
        return matchSearch && matchRole;
      })
      .sort((a, b) => {
        if (sortNama === "asc") return a.nama.localeCompare(b.nama);
        if (sortNama === "desc") return b.nama.localeCompare(a.nama);
        return 0;
      });
  }, [users, search, selectedRole, sortNama]);

  /* ================= ROLE CHIP COLOR ================= */
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return { bg: "#F3E5F5", color: "#7B1FA2" };
      case "Cashier":
        return { bg: "#FFF3E0", color: "#E65100" };
      default:
        return { bg: "#E0E0E0", color: "#616161" };
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
            {/* 🟤 Icon tetap coklat */}
            <PeopleIcon sx={{ fontSize: 36, color: "#6D4C41" }} />
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              User Management
            </Typography>
          </Box>
          <Typography sx={{ color: "#666", mt: 1 }}>
            Kelola semua user yang terdaftar di sistem
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/create-user")}
          sx={{
            bgcolor: themeColor,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            "&:hover": { bgcolor: "#b22217" },
          }}
        >
          Tambah User
        </Button>
      </Box>

      {/* ============================== */}
      {/* =========== SEARCH =========== */}
      {/* ============================== */}
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
            transition: "all 0.2s ease",
            "&:focus-within": {
              borderColor: "#FFC72C",
              boxShadow: "0 4px 12px rgba(255, 199, 44, 0.2)",
            },
          }}
        >
          <SearchIcon sx={{ color: "#999", mr: 1 }} />
          <InputBase
            placeholder="Cari berdasarkan nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, fontSize: "0.95rem" }}
          />
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

      {/* ============================== */}
      {/* =========== FILTER =========== */}
      {/* ============================== */}
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

        {/* ROLE */}
        <Box
          sx={{
            minWidth: 170,
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
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              fontSize: "0.9rem",
              "& fieldset": { border: "none" },
            }}
          >
            <MenuItem value="" sx={{ color: "#6666667b" }}>
              Semua Role
            </MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Cashier">Cashier</MenuItem>
          </Select>
        </Box>

        {/* SORT NAMA */}
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
            value={sortNama}
            onChange={(e) => setSortNama(e.target.value)}
            IconComponent={SortIcon}
            sx={{
              fontSize: "0.9rem",
              "& fieldset": { border: "none" },
            }}
          >
            <MenuItem value="" sx={{ color: "#6666667b" }}>
              Urutkan Nama
            </MenuItem>
            <MenuItem value="asc">A → Z</MenuItem>
            <MenuItem value="desc">Z → A</MenuItem>
          </Select>
        </Box>

        {/* RESET */}
        <Button
          onClick={() => {
            setSearch("");
            setSelectedRole("");
            setSortNama("");
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

      {/* ============================== */}
      {/* ========= TABLE LIST ========= */}
      {/* ============================== */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid #E0E0E0",
          overflow: "hidden",
        }}
      >
        {/* TABLE HEADER */}
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
          <Box sx={{ width: "40%" }}>User</Box>
          <Box sx={{ width: "30%" }}>Email</Box>
          <Box sx={{ width: "15%" }}>Role</Box>
          <Box sx={{ width: "15%", textAlign: "right" }}>Aksi</Box>
        </Box>

        {/* TABLE ROWS */}
        {filteredUsers.map((user) => {
          const roleColor = getRoleColor(user.role);
          return (
            <Box
              key={user.id}
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
              {/* USER (Avatar + Nama) */}
              <Box
                sx={{
                  width: "40%",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: "#6D4C41",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {user.nama
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </Avatar>
                <Typography sx={{ fontWeight: 700 }}>{user.nama}</Typography>
              </Box>

              {/* EMAIL */}
              <Box sx={{ width: "30%" }}>
                <Typography sx={{ color: "#777", fontSize: "0.9rem" }}>
                  {user.email}
                </Typography>
              </Box>

              {/* ROLE */}
              <Box sx={{ width: "15%" }}>
                <Chip
                  label={user.role}
                  size="small"
                  sx={{
                    bgcolor: roleColor.bg,
                    color: roleColor.color,
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    borderRadius: "8px",
                  }}
                />
              </Box>

              {/* AKSI */}
              <Box
                sx={{
                  width: "15%",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <IconButton
                  onClick={() => navigate(`/admin/edit-user/${user.id}`)}
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
                  onClick={() => setDeleteTarget(user)}
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
          );
        })}

        {/* EMPTY STATE */}
        {filteredUsers.length === 0 && (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <PeopleIcon sx={{ fontSize: 60, color: "#E0E0E0", mb: 1 }} />
            <Typography sx={{ color: "#777" }}>
              Tidak ada user ditemukan
            </Typography>
          </Box>
        )}
      </Paper>

      {/* ============================== */}
      {/* ======= DELETE DIALOG ======== */}
      {/* ============================== */}
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
          Hapus User?
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Typography sx={{ color: "#555", lineHeight: 1.8 }}>
            User <b>{deleteTarget?.nama}</b> ({deleteTarget?.email}) akan
            dihapus permanen.
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