import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import {
  Snackbar,
  Alert,
  AlertTitle,
  Slide,
  type SlideProps,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { isEmail } from "../../../utils/isEmail";
import { authActions } from "../../../store/authSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openSuccess, setOpenSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Palet Warna
  const colors = {
    yellow: "#FFC72C",
    red: "#DA291C",
    black: "#000000",
    white: "#FFFFFF",
  };

  const handleLogin = async () => {
    if (!isEmail(email)) {
      alert("Email is not valid");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    const response = await fetch("http://localhost:5173/api/auth/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      const data = await response.json();
      alert(`Login failed: ${data}`);
      throw new Error("Connection Error");
    }

    setOpenSuccess(true);
    setTimeout(async () => {
      await setUserInfo();
      navigate("/");
    }, 1500);
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }

  const setUserInfo = async () => {
    const response = await fetch("http://localhost:5173/api/auth/me", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });
    const data = await response.json();
    dispatch(authActions.setUserInfo(data));
  };

  return (
    <Box
      sx={{
        // Ganti height: "88.6vh" dengan ini:
        flex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // Gunakan minHeight agar jika di layar kecil konten tidak terpotong
        minHeight: "calc(100vh - 70px)",
        background: `radial-gradient(circle at center, ${colors.red} 0%, ${colors.black} 100%)`,
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={24}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 4,
          borderRadius: 4,
          bgcolor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            backgroundColor: colors.yellow,
          },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="800"
          sx={{ color: colors.black, mb: 1, letterSpacing: -1 }}
        >
          WELCOME BACK
        </Typography>
        <Typography variant="body2" sx={{ color: "gray", mb: 4 }}>
          Please enter your credentials to access your account
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Email Address"
            variant="filled"
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: colors.red }} />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: colors.white,
              borderRadius: 1,
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: colors.yellow,
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="filled"
            type="password"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: colors.red }} />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: colors.white,
              borderRadius: 1,
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: colors.yellow,
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 4,
              mb: 2,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              backgroundColor: colors.red,
              color: colors.white,
              borderRadius: "50px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: colors.black,
                transform: "scale(1.02)",
                boxShadow: `0 4px 20px ${colors.yellow}44`,
              },
            }}
          >
            SIGN IN
          </Button>

          <Button
            // onClick={handleForgotPassword} // Tambahkan fungsi navigasi Anda di sini
            sx={{
              textTransform: "none", // Menghilangkan gaya huruf kapital semua
              padding: 0, // Menghilangkan padding agar ukurannya pas dengan teks
              minWidth: 0, // Menghilangkan lebar minimal bawaan Button
              verticalAlign: "baseline", // Memastikan teks sejajar secara horizontal
              "&:hover": {
                backgroundColor: "transparent", // Menghilangkan background abu-abu saat di-hover
                textDecoration: "underline", // Opsional: memberi efek garis bawah saat hover
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: colors.black,
                mt: 2,
                display: "block",
              }}
            >
              Forgot Password?
            </Typography>
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          severity="success"
          variant="filled"
          icon={<CheckCircleOutlineIcon fontSize="large" />}
          sx={{
            backgroundColor: colors.black,
            color: colors.yellow,
            width: "100%",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            borderRadius: 2,
            fontSize: "1.1rem",
            border: `2px solid ${colors.yellow}`,
            "& .MuiAlert-icon": { color: colors.yellow },
          }}
        >
          <AlertTitle sx={{ fontWeight: "900", fontSize: "1.2rem" }}>
            LOGIN SUCCESS! 🚀
          </AlertTitle>
          Welcome back, <b>{email}</b>
        </Alert>
      </Snackbar>
    </Box>
  );
}
