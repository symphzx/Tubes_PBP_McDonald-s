import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import { useKategori } from "../../../hooks/useKategori";

export default function CreateCategoryPage() {
  const themeColor = "#DA291C";
  const accentYellow = "#FFC72C";

  const { kategori, reload: reloadKategori } = useKategori();

  const [nama, setNama] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number | "">("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    reloadKategori();
  }, [reloadKategori]);

  const lastOrderKategori = kategori.reduce((max, kategori) => {
    return Math.max(max, kategori.sortOrder);
  }, 0);

  const isSortOrderInvalid =
    sortOrder !== "" && Number(sortOrder) <= lastOrderKategori;

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/kategori", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          nama,
          sortOrder: Number(sortOrder),
          startDate,
          endDate,
          startTime,
          endTime,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      alert("Kategori berhasil dibuat!");
      navigate("/admin/list-category");
    } catch (error) {
      console.error(error);
      alert("Error creating kategori");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Create New Category
        </Typography>

        <Typography sx={{ color: "#666", mt: 1 }}>
          Tambahkan kategori baru ke sistem
        </Typography>

        {/* accent line */}
        <Box
          sx={{
            width: 80,
            height: 6,
            bgcolor: themeColor,
            borderRadius: 10,
            mt: 2,
          }}
        />
      </Box>

      {/* MAIN LAYOUT */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {/* LEFT FORM */}
        <Box sx={{ width: { xs: "100%", md: "64%" } }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: "20px",
              border: "1px solid #E0E0E0",
            }}
          >
            {/* TITLE */}
            <Typography
              sx={{
                fontWeight: 700,
                mb: 3,
                borderLeft: `6px solid ${themeColor}`,
                pl: 2,
              }}
            >
              Informasi Kategori
            </Typography>

            <Box sx={{ display:"flex", flexDirection:"column", gap:3 }} >
              <TextField
                fullWidth
                label="Nama Kategori"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />

              <TextField
                fullWidth
                type="number"
                label="Sort Order"
                value={sortOrder}
                error={isSortOrderInvalid}
                helperText={
                  isSortOrderInvalid
                    ? `Harus lebih besar dari ${lastOrderKategori}`
                    : `Gunakan angka di atas ${lastOrderKategori}`
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setSortOrder(val === "" ? "" : Number(val));
                }}
              />
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* SCHEDULE */}
            <Typography
              sx={{
                fontWeight: 700,
                mb: 3,
                borderLeft: `6px solid ${accentYellow}`,
                pl: 2,
              }}
            >
              Jadwal Kategori
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
              }}
            >
              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Box>

              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Box>

              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  fullWidth
                  type="time"
                  label="Start Time"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </Box>

              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  fullWidth
                  type="time"
                  label="End Time"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* RIGHT INFO PANEL */}
        <Box sx={{ width: { xs: "100%", md: "32%" } }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "20px",
              border: "1px solid #E0E0E0",
              bgcolor: "#FFFDF7",
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
              Tips
            </Typography>

            <Typography sx={{ fontSize: "0.9rem", color: "#555", mb: 1 }}>
              • Gunakan nama kategori yang jelas
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#555", mb: 1 }}>
              • Sort order menentukan urutan tampil
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
              • Jadwal bisa digunakan untuk promo musiman
            </Typography>
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
            onClick={() => navigate("/admin/list-category")}
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
            disabled={!nama || !sortOrder || !startDate}
            sx={{
              flex: 1,
              py: 1.5,
              borderRadius: "12px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "1rem",

              background:
                !nama || !sortOrder || !startDate
                  ? "#ccc"
                  : `linear-gradient(135deg, ${themeColor}, #b71c1c)`,

              boxShadow:
                !nama || !sortOrder || !startDate
                  ? "none"
                  : "0 4px 14px rgba(218, 41, 28, 0.35)",

              cursor:
                !nama || !sortOrder || !startDate ? "not-allowed" : "pointer",

              "&:hover": {
                background:
                  !nama || !sortOrder || !startDate
                    ? "#ccc"
                    : "linear-gradient(135deg, #c62828, #8e0000)",
              },
            }}
          >
            Simpan Kategori
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
