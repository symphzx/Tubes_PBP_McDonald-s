import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import LockResetIcon from "@mui/icons-material/LockReset";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // token dari URL reset link

  const colors = {
    yellow: "#FFC72C",
    red: "#DA291C",
    black: "#000000",
    white: "#FFFFFF",
  };

  // Validasi password
  const hasMinLength = newPassword.length >= 6;
  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  const handleResetPassword = async () => {
    if (!hasMinLength) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!token) {
      alert("Invalid or missing reset token");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:3000/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (response.status !== 200) {
        const data = await response.json();
        alert("Reset Failed: " + data.message);
        return;
      }

      alert("Password has been reset successfully!");
      navigate("/login");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        {/* BACK BUTTON */}
        <IconButton
          onClick={() => navigate("/login")}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            color: colors.black,
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* ICON */}
        <LockResetIcon
          sx={{
            fontSize: 48,
            color: colors.red,
            mt: 1,
            mb: 1,
          }}
        />

        {/* TITLE */}
        <Typography
          variant="h4"
          fontWeight="800"
          sx={{ color: colors.black, mb: 1, letterSpacing: -1 }}
        >
          RESET PASSWORD
        </Typography>

        {/* SUBTITLE */}
        <Typography variant="body2" sx={{ color: "gray", mb: 4 }}>
          Enter your new password below to reset your account password
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          {/* NEW PASSWORD */}
          <TextField
            fullWidth
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            variant="filled"
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: colors.red }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                    size="small"
                  >
                    {showNewPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
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

          {/* PASSWORD STRENGTH INDICATOR */}
          {newPassword.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mt: 0.5,
                ml: 1,
              }}
            >
              {hasMinLength ? (
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 16, color: "green" }}
                />
              ) : (
                <CancelOutlinedIcon sx={{ fontSize: 16, color: "gray" }} />
              )}
              <Typography
                variant="caption"
                sx={{ color: hasMinLength ? "green" : "gray" }}
              >
                Minimum 6 characters
              </Typography>
            </Box>
          )}

          {/* CONFIRM PASSWORD */}
          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="filled"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={passwordsMismatch}
            helperText={passwordsMismatch ? "Passwords do not match" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: colors.red }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {/* Match Indicator */}
                  {confirmPassword.length > 0 && (
                    <>
                      {passwordsMatch ? (
                        <CheckCircleOutlineIcon
                          sx={{ color: "green", mr: 0.5 }}
                        />
                      ) : null}
                    </>
                  )}
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: colors.white,
              borderRadius: 1,
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: passwordsMismatch
                  ? colors.red
                  : colors.yellow,
              },
            }}
          />

          {/* RESET BUTTON */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleResetPassword}
            disabled={!hasMinLength || !passwordsMatch || isSubmitting}
            sx={{
              mt: 4,
              mb: 2,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              backgroundColor: colors.red,
              color: colors.white,
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
              "&.Mui-disabled": {
                backgroundColor: "#ccc",
                color: "#888",
              },
            }}
          >
            {isSubmitting ? "RESETTING..." : "RESET PASSWORD"}
          </Button>

          {/* BACK TO LOGIN LINK */}
          <Button
            onClick={() => navigate("/login")}
            sx={{ p: 0, minWidth: 0, mt: 2 }}
          >
            <Typography variant="caption" sx={{ color: colors.black }}>
              Back to Sign In
            </Typography>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}