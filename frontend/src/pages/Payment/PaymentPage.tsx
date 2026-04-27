import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Button,
  Divider,
  Modal,
} from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import PaymentIcon from "@mui/icons-material/Payment";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { paymentActions } from "../../store/paymentSlice";

export default function PaymentPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { total, cart, order_id, no_meja } = useAppSelector(
    (state) => state.payment,
  );
  const handleProcessPayment = (method: "DEBIT" | "QRIS" | "CASHIER") => {
    dispatch(paymentActions.setPaymentMethod(method));
    console.log(`Processing payment ${method} for order ${order_id}`);
    navigate("/payment/success");
  };

  const [showDetail, setShowDetail] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 menit

  const displayOrderId = order_id || "blm ada ya krn blm dibuat backendnya";

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

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
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
        <Box sx={{ bgcolor: "#FFBC0D", py: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            McDonald's Indonesia
          </Typography>
        </Box>
        <Box
          sx={{ bgcolor: "#222", color: "white", py: 0.5, textAlign: "center" }}
        >
          <Typography sx={{ fontSize: "12px" }}>
            Choose within{" "}
            <Box component="span" sx={{ color: "#FFBC0D", ml: 1 }}>
              {formatTime(timeLeft)}
            </Box>
          </Typography>
        </Box>

        <Box sx={{ maxWidth: "500px", margin: "0 auto", p: 3, width: "100%" }}>
          {/* order summary */}
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: "16px", mb: 3, border: "1px solid #eee" }}
          >
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 700 }}
            >
              Order Summary
            </Typography>

            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                Rp {total.toLocaleString("id-ID")}
              </Typography>
              {/* no meja */}
              {no_meja && (
                <Box
                  sx={{
                    bgcolor: "#FFBC0D",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "8px",
                  }}
                >
                  <Typography sx={{ fontWeight: 800, fontSize: "14px" }}>
                    Table {no_meja}
                  </Typography>
                </Box>
              )}
            </Stack>

            <Divider sx={{ my: 2, borderStyle: "dashed" }} />

            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Order ID: {order_id || "Generating..."}
              </Typography>
              <Button
                size="small"
                onClick={() => setShowDetail(true)}
                sx={{
                  color: "#DD1021",
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                View Items
              </Button>
            </Stack>
          </Paper>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "text.secondary", mb: 2 }}
          >
            Select Payment Method
          </Typography>

          <Stack spacing={2}>
            {[
              {
                id: "DEBIT",
                label: "Credit / Debit Card",
                icon: <PaymentIcon />,
              },
              {
                id: "QRIS",
                label: "QRIS / E-Wallet",
                icon: <QrCodeScannerIcon />,
              },
              {
                id: "CASHIER",
                label: "Pay at Cashier",
                icon: <StorefrontIcon />,
              },
            ].map((method) => (
              <Paper
                key={method.id}
                component={Button}
                onClick={() => handleProcessPayment(method.id as any)}
                elevation={0}
                sx={{
                  p: 3,
                  justifyContent: "space-between",
                  textTransform: "none",
                  borderRadius: "12px",
                  border: "1px solid #eee",
                  bgcolor: "white",
                  width: "100%",
                  color: "black",
                  "&:hover": { bgcolor: "#fff9e6", borderColor: "#FFBC0D" },
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Box sx={{ color: "#DD1021", display: "flex" }}>
                    {method.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 700 }}>
                    {method.label}
                  </Typography>
                </Stack>
                <ChevronRightIcon sx={{ color: "#ccc" }} />
              </Paper>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* modal yg kita pencet Detail */}
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
          <Box
            sx={{
              p: 3,
              bgcolor: "#f9f9f9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Order Details
            </Typography>
            <IconButton onClick={() => setShowDetail(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total Pembayaran
              </Typography>
              <Typography variant="h4" sx={{ color: "#FFBC0D", fontWeight: 900, mt: 1 }}>
                  Rp {total.toLocaleString("id-ID")}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                  Detail order tersimpan di sistem
              </Typography>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}
