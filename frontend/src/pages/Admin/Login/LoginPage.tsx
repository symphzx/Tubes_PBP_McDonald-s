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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
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
  const [modeLogin, setModeLogin] = useState(true);
  const [recoveryEmail, setRecoveryEmail] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Palet Warna
  const colors = {
    yellow: "#FFC72C",
    red: "#DA291C",
    black: "#000000",
    white: "#FFFFFF",
  };

  const handleLoginMode = () => {
    if (modeLogin) {
      setModeLogin(false);
    } else {
      setModeLogin(true);
    }
  };

  const handleRecovery = async () => {
    if (!isEmail(recoveryEmail)) {
      alert("Email is not valid");
      return;
    }

    await fetch("http://localhost:5173/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: recoveryEmail }),
    });

    alert("Recovery email sent!");
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
        flex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        {modeLogin === false && (
          <IconButton
            onClick={handleLoginMode}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              color: colors.black,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography
          variant="h4"
          fontWeight="800"
          sx={{ color: colors.black, mb: 1, letterSpacing: -1 }}
        >
          {modeLogin === true ? "WELCOME BACK" : "FORGOT PASSWORD"}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray", mb: 4 }}>
          {modeLogin === true
            ? "Please enter your credentials to access your account"
            : "Enter your email to receive password recovery instructions"}
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          {modeLogin === true ? (
            <>
              {/* EMAIL */}
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

              {/* PASSWORD */}
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="filled"
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

              {/* LOGIN BUTTON */}
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
                }}
              >
                SIGN IN
              </Button>

              {/* FORGOT BUTTON */}
              <Button onClick={handleLoginMode} sx={{ p: 0, minWidth: 0, mt: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ color: colors.black }}
                >
                  Forgot Password?
                </Typography>
              </Button>
            </>
          ) : (
            <>
              {/* RECOVERY EMAIL */}
              <TextField
                fullWidth
                label="Recovery Email"
                variant="filled"
                margin="normal"
                onChange={(e) => setRecoveryEmail(e.target.value)}
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

              {/* RECOVERY BUTTON */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleRecovery}
                sx={{
                  mt: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  backgroundColor: colors.red,
                  color: colors.white,
                  borderRadius: "50px",
                }}
              >
                SEND RECOVERY EMAIL
              </Button>
            </>
          )}
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
