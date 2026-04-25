import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router";


import { Outlet } from "react-router";

export default function PackageSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedItem } = location.state || {};

  if (!selectedItem) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography>Menu Tidak Tersedia</Typography>
        <Button onClick={() => navigate("/menu")}>Kembali ke Menu</Button>
      </Box>
    );
  }

  if (!selectedItem.recommendation) {
    navigate(`/customize-order/${selectedItem.id}`, {
        state: { selectedItem, isPaket: false }
    });
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* WRAPPER (AREA TENGAH) */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          backgroundColor: "#fff",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
          minHeight: "80vh",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 200,
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
            py: 2,
            flexShrink: 0,
          }}
        >
          {/* LOGO */}
          {/* <Card
            sx={{
              width: "100%",
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 0,
              mb: 3,
            }}
          >
            <Box
              component="img"
              src={logoMcDonalds}
              sx={{
                width: 60,
                height: 60,
                objectFit: "contain",
              }}
            />
          </Card> */}
        </Box>

        {/* CONTENT */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            justifyContent: "center",
            display: "flex", 
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* TEXT HEADER */}
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              justifyContent: "center",
              fontWeight: 800,
              mb: 4,
              mt: 2,
              color: "#333",
            }}
          >
            Mau tambah kentang atau minuman?
          </Typography>

          <Grid
            container
            spacing={4}
            sx={{ justifyContent: "center", width: "100%", ml: 0 }}
          >
            {" "}
            {/* OPSI 1: JADIKAN PAKET */}
            <Grid size={{ xs: 12, sm: 5 }}>
              {" "}
              <Paper
                variant="outlined"
                onClick={() =>
                  navigate(`/customize-order/${selectedItem.recommendation.id}`, {
                    state: { 
                      selectedItem: selectedItem.recommendation,
                      isPaket: true 
                    },
                  })
                }
                sx={{
                  p: 3,
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: 4,
                  height: "100%",
                  transition: "0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "&:hover": {
                    borderColor: "#FFBC0D",
                    bgcolor: "#fffdf5",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={selectedItem.recommendation.gambar}
                  sx={{
                    width: "100%",
                    height: 160,
                    objectFit: "contain",
                    mb: 2,
                  }}
                />
                <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 1 }}>
                  Iya, jadikan paket
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mulai dari Rp {selectedItem.recommendation.harga_awal?.toLocaleString("id-ID")}
                </Typography>
              </Paper>
            </Grid>
            {/* OPSI 2: SATUAN SAJA */}
            <Grid size={{ xs: 12, sm: 5 }}>
              <Paper
                variant="outlined"
                onClick={() => navigate(`/customize-order/${selectedItem.id}`, {
                    state: { 
                      selectedItem: selectedItem,
                      isPaket: false 
                    },
                  })
                }
                sx={{
                  p: 3,
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: 4,
                  height: "100%",
                  transition: "0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "&:hover": {
                    borderColor: "#FFBC0D",
                    bgcolor: "#fffdf5",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={selectedItem.gambar}
                  sx={{
                    width: "100%",
                    height: 160,
                    objectFit: "contain",
                    mb: 2,
                  }}
                />
                <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 1 }}>
                  Tidak, satuan saja
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rp {selectedItem.harga_awal?.toLocaleString("id-ID")}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          {/* BATAL */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <Button
              onClick={() => navigate(-1)}
              variant="outlined"
              sx={{
                width: "100%",
                maxWidth: 400, 
                py: 1.5,
                borderRadius: "12px",
                color: "#333",
                borderColor: "#ddd",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": { borderColor: "#999", bgcolor: "#f9f9f9" },
              }}
            >
              Batal
            </Button>
          </Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
