import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Typography, Paper, Stack, IconButton, Button, Divider, Grid, TextField, Checkbox, FormControlLabel, Modal } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PaymentIcon from "@mui/icons-material/Payment";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function PaymentPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { total, cart, order_id } = useAppSelector((state) => state.payment);
  const [showDetail, setShowDetail] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 menit

  const displayOrderId = order_id || "blm ada ya krn blm dibuat backendnya";

  const handlePay = () => {
    navigate("/payment/success");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `00 : ${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;
  };

  const handleBackCard = () => {
    const confirmBack = window.confirm("Cancel payment using this method?");
    if (confirmBack) setShowCardForm(false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >

      {/* yg kyk layout putih */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          bgcolor: "#fff",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <Box sx={{ bgcolor: "#FFBC0D", py: 2, textAlign: "center", boxShadow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: "black" }}>
            McDonald's Indonesia
          </Typography>
        </Box>

        {/* timer */}
        <Box sx={{ bgcolor: "#222", color: "white", py: 0.5, textAlign: "center" }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
            Choose within{" "}
            <Box component="span" sx={{ color: "#FFBC0D", fontFamily: "monospace", ml: 1 }}>
              {formatTime(timeLeft)}
            </Box>
          </Typography>
        </Box>

        <Box sx={{ maxWidth: "500px", margin: "0 auto", p: 3 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", mb: 3 }}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Total Payment
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, mt: 0.5 }}>
              Rp {total.toLocaleString("id-ID")}
            </Typography>

            <Divider sx={{ my: 2, borderStyle: "dashed" }} />

            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Order ID : {order_id}
              </Typography>
              <Button
                size="small"
                onClick={() => setShowDetail(true)}
                endIcon={<ChevronRightIcon />}
                sx={{
                  color: "#DD1021",
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Detail
              </Button>
            </Stack>
          </Paper>

          {!showCardForm ? (
            <Stack spacing={2}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "text.secondary" }}
              >
                Payment Method
              </Typography>

              {[
                {
                  label: "Credit / Debit Card",
                  icon: <PaymentIcon />,
                  active: true,
                },
                { label: "QRIS",
                  icon: <QrCodeScannerIcon />,
                  active: false },
                { label: "Cashier",
                  icon: <StorefrontIcon />,
                  active: false
                },
              ].map((method, i) => (
                <Paper
                  key={i}
                  component={Button}
                  onClick={() => method.active && setShowCardForm(true)}
                  elevation={0}
                  sx={{
                    p: 3,
                    justifyContent: "space-between",
                    textTransform: "none",
                    color: method.active ? "inherit" : "text.disabled",
                    borderRadius: "12px",
                    border: "1px solid #eee",
                    bgcolor: "white",
                    width: "100%",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center" }}
                  >
                    {method.icon}
                    <Typography sx={{ fontWeight: 700 }}>
                      {method.label}
                    </Typography>
                  </Stack>
                  {method.active ? (
                    <ChevronRightIcon />
                  ) : (
                    <Typography variant="caption">Skip</Typography>
                  )}
                </Paper>
              ))}
            </Stack>
          ) : (
            /* 5. CARD FORM SECTION */
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: "16px", border: "1px solid #eee" }}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: "center", mb: 4 }}
              >
                <IconButton onClick={handleBackCard} sx={{ p: 0 }}>
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Card Information
                </Typography>
              </Stack>

              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: "text.secondary",
                      mb: 1,
                      display: "block",
                    }}
                  >
                    CARD NUMBER
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="xxxx xxxx xxxx xxxx"
                    variant="outlined"
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: "text.secondary",
                        mb: 1,
                        display: "block",
                      }}
                    >
                      EXPIRATION DATE
                    </Typography>
                    <TextField fullWidth placeholder="MM/YY" />
                  </Grid>

                  <Grid size={6}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: "text.secondary",
                        mb: 1,
                        display: "block",
                      }}
                    >
                      CVV
                    </Typography>
                    <TextField fullWidth type="password" placeholder="***" />
                  </Grid>
                </Grid>

                <FormControlLabel
                  control={
                    <Checkbox sx={{ "&.Mui-checked": { color: "#DD1021" } }} />
                  }
                  label={
                    <Typography variant="body2">
                      Save this card for future use
                    </Typography>
                  }
                />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handlePay}
                  sx={{
                    bgcolor: "#DD1021",
                    py: 2,
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontSize: "16px",
                    "&:hover": { bgcolor: "#b90d1b" },
                  }}
                >
                  Pay Rp {total.toLocaleString("id-ID")}
                </Button>
              </Stack>
            </Paper>
          )}
        </Box>
      </Box>

      {/* ini klo klik Detail, munculin ini */}
      <Modal
        open={showDetail}
        onClose={() => setShowDetail(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper
          sx={{
            width: "90%",
            maxWidth: "400px",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              bgcolor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Order Details
            </Typography>
            <IconButton onClick={() => setShowDetail(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box sx={{ p: 3, maxHeight: "60vh", overflowY: "auto" }}>
            {cart.map((item, idx) => (
              <Stack  
                key={idx}
                direction="row"
                sx={{ justifyContent: "space-between", mb: 2 }}
              >
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {item.menu?.nama || "Menu Name"}
                  </Typography>

                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.quantity} x Rp{" "}
                    {item.harga_awal.toLocaleString("id-ID")}
                  </Typography>
                </Box>

                <Typography sx={{ fontWeight: 700 }}>
                  Rp {(item.quantity * item.harga_awal).toLocaleString("id-ID")}
                </Typography>
              </Stack>
            ))}
            <Divider sx={{ my: 2, borderStyle: "dashed" }} />
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, color: "#DD1021" }}
              >
                Total (Incl. Tax)
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, color: "#DD1021" }}
              >
                Rp {total.toLocaleString()}
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}

// btw yg qris ama cashier blm kebayang jd skip dulu hehe, nanti dilanjut klo uda ada gambaran