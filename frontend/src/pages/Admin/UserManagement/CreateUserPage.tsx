import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router";
import { isEmail } from "../../../utils/isEmail";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const themeColor = "#DA291C";

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!nama.trim()) {
      alert("Nama wajib diisi");
      return;
    }
    if (!isEmail(email)) {
      alert("Email tidak valid");
      return;
    }
    if (password.length < 6) {
      alert("Password minimal 6 karakter");
      return;
    }
    if (!role) {
      alert("Role wajib dipilih");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ nama, email, password, role }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal membuat user");
        return;
      }

      alert("User berhasil dibuat!");
      navigate("/admin/list-user");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Terjadi kesalahan saat membuat user");
    }
  };

  const isFormValid = nama.trim() && email.trim() && password.length >= 6 && role;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <PeopleIcon sx={{ fontSize: 36, color: "#6D4C41" }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#111" }}>
            Create New User
          </Typography>
        </Box>
        <Typography sx={{ color: "#666", mt: 1 }}>
          Tambahkan user baru ke dalam sistem
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
          {/* NAMA */}
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Nama Lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </Box>

          {/* EMAIL */}
          <Box sx={{ width: { xs: "100%", md: "48%" } }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          {/* ROLE */}
          <Box sx={{ width: { xs: "100%", md: "48%" } }}>
            <TextField
              select
              fullWidth
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Cashier">Cashier</MenuItem>
            </TextField>
          </Box>

          {/* PASSWORD */}
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {password.length > 0 && password.length < 6 && (
              <Typography
                variant="caption"
                sx={{ color: "#C62828", ml: 1, mt: 0.5 }}
              >
                Password minimal 6 karakter
              </Typography>
            )}
          </Box>

          {/* BUTTONS */}
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
              onClick={() => navigate("/admin/list-user")}
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
              disabled={!isFormValid}
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
                background: !isFormValid
                  ? "#ccc"
                  : `linear-gradient(135deg, ${themeColor}, #b71c1c)`,
                boxShadow: !isFormValid
                  ? "none"
                  : "0 4px 14px rgba(218, 41, 28, 0.35)",
                "&:hover": {
                  background: !isFormValid
                    ? "#ccc"
                    : "linear-gradient(135deg, #c62828, #8e0000)",
                },
              }}
            >
              Simpan
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}