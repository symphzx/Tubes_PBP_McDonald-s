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
import { useUpdateKategori } from "../../../hooks/useUpdateKategori";
import { useKategoriDetail } from "../../../hooks/useKategoriDetail";
import formatDate from "../../../utils/formatDate";
import formatTime from "../../../utils/formatTime";

export default function EditCategoryPage() {
  const themeColor = "#DA291C";
  const accentYellow = "#FFC72C";

  const { id } = useParams();

  const { kategori, reload: reloadKategori } = useKategori();
  const { kategori: kategoriDetail, reload: reloadKategoriDetail } = useKategoriDetail(id as string);

  const [nama, setNama] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number | "">("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const updateKategori = useUpdateKategori();

  const navigate = useNavigate();

  useEffect(() => {
    reloadKategori();
    reloadKategoriDetail();
  }, [reloadKategori, reloadKategoriDetail]);

  useEffect(() => {
    if (!kategoriDetail) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNama(kategoriDetail.nama ?? "");
    setSortOrder(kategoriDetail.sortOrder ?? "");
    setStartDate(formatDate(kategoriDetail.startDate));
    setEndDate(formatDate(kategoriDetail.endDate));
    setStartTime(formatTime(kategoriDetail.startTime));
    setEndTime(formatTime(kategoriDetail.endTime));
  }, [kategoriDetail]);

  const lastOrderKategori = kategori?.reduce((max, kategori) => {
    return Math.max(max, kategori.sortOrder);
  }, 0);

  const isSortOrderInvalid =
    sortOrder !== "" && Number(sortOrder) <= lastOrderKategori;

  const handleSubmit = async () => {
    if (!id) return;

    try {
      await updateKategori({
        id,
        nama,
        sortOrder: Number(sortOrder),
        startDate,
        endDate,
        startTime,
        endTime,
      });

      alert("Kategori berhasil diupdate!");
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
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
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
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
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </Box>

              {/* End Time */}
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
          </Box>

          <Divider />

          {/* BUTTON */}
          <Box sx={{ display: "flex", gap: 2 }}>
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
              disabled={!nama || !sortOrder}
              sx={{
                bgcolor: themeColor,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
                background:
                  !nama || !sortOrder
                    ? "#ccc"
                    : `linear-gradient(135deg, ${themeColor}, #b71c1c)`,

                boxShadow:
                  !nama || !sortOrder
                    ? "none"
                    : "0 4px 14px rgba(218, 41, 28, 0.35)",

                cursor: !nama || !sortOrder ? "not-allowed" : "pointer",

                "&:hover": {
                  background:
                    !nama || !sortOrder
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
