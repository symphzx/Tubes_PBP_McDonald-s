import { Box, Typography, Paper, Button, Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { paymentActions } from "../../store/paymentSlice";
import { clearCart } from "../../store/cartSlice"

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { order_no } = useAppSelector((state) => state.payment);

  const handleDone = () => {
    dispatch(paymentActions.resetPayment());
    dispatch(clearCart())
    navigate("/");
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 10,
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 100, color: "#4CAF50", mb: 2 }}
        />

        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
          Payment Successful!
        </Typography>

        <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
          Your order is being processed.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            bgcolor: "#f9f9f9",
            p: 4,
            borderRadius: "16px",
            textAlign: "center",
            mb: 4,
            border: "1px dashed #ccc",
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: "text.secondary" }}
          >
            YOUR ORDER NUMBER
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, color: "#FFBC0D" }}>
            {/* klo ada dari redux, pake. klo gada, pake strip */}
            #{order_no ? order_no.toString().padStart(3, "0") : "---"}
          </Typography>
        </Paper>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", px: 4, mb: 6, color: "text.secondary" }}
        >
          Please take your receipt and wait.
        </Typography>

        <Button
          variant="contained"
          onClick={handleDone}
          sx={{
            bgcolor: "#FFBC0D",
            color: "#000",
            fontWeight: 800,
            px: 4,
            py: 1.5,
            borderRadius: "50px",
            "&:hover": { bgcolor: "#e5a90b" },
          }}
        >
          DONE
        </Button>
      </Box>
    </Box>
  );
}
