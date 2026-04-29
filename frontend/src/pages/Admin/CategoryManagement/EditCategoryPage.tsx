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
import { useNavigate, useParams } from "react-router";
import { useKategori } from "../../../hooks/useKategori";

export default function EditCategoryPage() {
  const themeColor = "#DA291C";
  const accentYellow = "#FFC72C";

  const { id } = useParams();

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

  useEffect(() => {
    if (!kategori) return;

    const category = kategori.find((kategori) => kategori.id === id);
    if (!category) return;
    
    const rawStartTime = category.startTime;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNama(category.nama);
    setSortOrder(category.sortOrder);
    setStartDate(category.startDate.toString().split("T")[0]);
    setEndDate(category.endDate?.toString().split("T")[0] || "");
    if (rawStartTime && rawStartTime.toString().includes("T")) {
      setStartTime(rawStartTime.toString().split("T")[1].slice(0, 5));
    } else if (rawStartTime) {
      setStartTime(rawStartTime.toString().slice(0, 5));
    } else {
      setStartTime("");
    }
  }, [kategori, id]);

  const lastOrderKategori = kategori.reduce((max, kategori) => {
    return Math.max(max, kategori.sortOrder);
  }, 0);

  const isSortOrderInvalid =
  sortOrder !== "" && Number(sortOrder) <= lastOrderKategori;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/kategori/${id}`, {
        method: "PUT",
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

      alert("Kategori berhasil diedit!");
      navigate("/admin/list-category");
    } catch (error) {
      console.error(error);
      alert("Error updating kategori");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            width: 50,
            height: 6,
            bgcolor: themeColor,
            borderRadius: 10,
            mb: 2,
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#111" }}>
          Edit Category
        </Typography>
        <Typography sx={{ color: "#666", mt: 1 }}>
          Modifikasi kategori yang sudah ada
        </Typography>
      </Box>

      {/* FORM */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "20px",
          border: "1px solid #E0E0E0",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box display="flex" flexDirection="column" gap={3}>
          {/* INFORMASI */}
          <Box>
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

            <Box display="flex" flexDirection="column" gap={3}>
              {/* Nama */}
              <TextField
                fullWidth
                label="Nama Kategori"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />

              {/* Sort Order */}
              <TextField
                fullWidth
                type="number"
                label="Sort Order"
                value={sortOrder}
                // error={isSortOrderInvalid}
                helperText={
                  isSortOrderInvalid
                    ? `Sort Order harus lebih besar dari ${lastOrderKategori}`
                    : `Gunakan angka di atas ${lastOrderKategori}`
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setSortOrder(val === "" ? "" : Number(val));
                }}
              />
            </Box>
          </Box>

          <Divider />

          {/* SCHEDULE */}
          <Box>
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
              {/* Start Date */}
              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Box>

              {/* End Date */}
              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Box>

              {/* Start Time */}
              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  fullWidth
                  type="time"
                  label="Start Time"
                  InputLabelProps={{ shrink: true }}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)
                  }
                />
              </Box>

              {/* End Time */}
              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <TextField
                  fullWidth
                  type="time"
                  label="End Time"
                  InputLabelProps={{ shrink: true }}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* BUTTON */}
          <Box display="flex" gap={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/admin/list-category")}
              sx={{
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
                bgcolor: themeColor,
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
                    !nama || !sortOrder || !startDate
                      ? "not-allowed"
                      : "pointer",

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
      </Paper>
    </Container>
  );
}