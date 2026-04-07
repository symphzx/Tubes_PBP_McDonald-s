import dineInImg from "../img/dine_in.jpg";
import takeAwayImg from "../img/take_away.jpg";
import mcdLogo from "../img/mcdonalds_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid";
import { styled, Paper, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  cursor: 'pointer',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));



export default function OrderType() {
  const [selected, setSelected] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = (type: "DINE_IN" | "TAKEAWAY") => {
    setSelected(type);
    setTimeout(() => {
      localStorage.setItem("orderType", type);
      navigate("/menu");
    }, 300);
  };

  return (<>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <img src={mcdLogo} alt="Mcdonalds Logo" width="40px" height="40px" />
    </div>
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography
        variant="h1"
        component="div"
        sx={{
          fontFamily: 'Speedee-Bold',
          fontSize: "30px"
        }}
        gutterBottom>
        Where would you like to eat?
      </Typography>

      <Grid container spacing={4} style={{ marginTop: "50px", justifyContent: "center" }}>
        <Grid size={5}>
          <Item
            className={selected === "DINE_IN" ? "active" : ""}
            onClick={() => handleClick("DINE_IN")}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#00000",
                fontFamily: "Speedee-Regular"
              }}
            >Eat In</Typography>
            <img src={dineInImg} alt="Dine In" width="100%" height="250px" style={{ objectFit: "cover" }} />
          </Item>
        </Grid>

        <Grid size={5}>
          <Item
            className={selected === "TAKEAWAY" ? "active" : ""}
            onClick={() => handleClick("TAKEAWAY")}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#00000",
                fontFamily: "Speedee-Regular"

              }}
            >Take Away</Typography>
            <img src={takeAwayImg} alt="Take Away" width="100%" height="250px" style={{ objectFit: "cover" }} />
          </Item>
        </Grid>
      </Grid>
    </div>
  </>
  );
}