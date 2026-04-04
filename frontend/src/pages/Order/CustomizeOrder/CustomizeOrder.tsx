import {
    Box,
    Typography,
    Button,
    IconButton,
    Container
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import custOrderLogo from "../img/customizeOrder_Icon.png";
import testMenuImg from "../img/test_fries.avif";
import { useNavigate } from "react-router";

export default function CustomizeOrder() {


    const [additional, setAdditional] = useState(0);
    // const [comesWith, setComesWith] = useState<Array<string>>(["Small", "Regular", "Large"]);
    const navigate = useNavigate();

    const dataMenuDummy = [
        {
            name: "Fries",
            price: 25000,
            imageUrl: testMenuImg,
        },
        {
            name: "Chicken",
            price: 5050050,
            imageUrl: testMenuImg,
        },

    ];
    const additionalMenuDummy = [
        {
            name: "Cheesy Sauce",
            price: 5000,
            imageUrl: testMenuImg
        },

    ]
    const comesWithDummy = [
        {
            name: "Salt",
            price: 5000,
            imageUrl: testMenuImg
        },
    ]
    // GA NENTU, bisa aja customeOrder sesuai ID menu yang dipencet
    return (
        <>

            {/* LOGO */}
            <Box sx={{ display: "flex", justifyContent: "center", opacity: 0.3 }}>
                <img src={custOrderLogo} width="50" />
            </Box>
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>

                <Box>

                    {/* TITLE */}
                    <Typography
                        variant="h4"
                        sx={{ mb: 2, textAlign: "center", fontFamily: "Speedee-Bold" }}
                    >
                        Customize
                    </Typography>

                    {/* ITEM */}
                    {dataMenuDummy.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                border: "1px solid #ddd",
                                p: 2,
                                mb: 2,
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: 3
                            }}
                        >
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ width: "20%", mr: 2 }}>
                                    <img
                                        src={item.imageUrl}
                                        width="100%"
                                        style={{ objectFit: "cover" }}
                                    />
                                </Box>

                                <Box sx={{ marginTop: "20px", flex: 1 }}>
                                    <Typography>{item.name}</Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "Speedee-Regular" }}>
                                        Rp {item.price}
                                    </Typography>
                                </Box>
                            </Box>

                            <Button fullWidth variant="outlined" size="small" sx={{ fontFamily: "Speedee-Regular", mt: 2, borderColor: "text.secondary" }}>
                                <Typography sx={{ color: "text.secondary", fontFamily: "Speedee-Regular", fontSize: "12px" }}>Reset Changes</Typography>
                            </Button>
                        </Box>
                    ))}

                    {/* COMES WITH */}
                    <Box sx={{ border: "1px solid #ddd", p: 2, mb: 2 }}>
                        <Typography sx={{ fontWeight: 500 }}>Comes With</Typography>
                        <hr />
                        {comesWithDummy.map((item, index) => (
                            <Box
                                key={index}>
                                <Box sx={{ width: "20%", mr: 2, display: "flex", flexDirection: "row" }}>
                                    <img
                                        src={item.imageUrl}
                                        width="100%"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <Typography sx={{ display: "flex", flexDirection: "start",mt: "20px" , p: 2 , fontFamily: "Speedee-Bold" }}>{item.name}</Typography>
                                    {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <IconButton onClick={() => setComesWith(comesWith.filter((item) => item !== comesWith[index]))}>
                                            <RemoveIcon />
                                        </IconButton>

                                        {comesWith[index]}
                                        <IconButton onClick={() => setComesWith([...comesWith, comesWith[index]])}>
                                            <AddIcon />
                                        </IconButton>
                                    </Box> */}
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {/* ADDITIONAL */}
                    <Box sx={{ border: "1px solid #ddd", p: 2 }}>
                        <Typography sx={{ fontWeight: 500 }}>Additional Ingredients</Typography>
                        <hr />

                        {/* ITEM */}
                        {additionalMenuDummy.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: 2
                                }}
                            >
                                <Box sx={{ width: "20%", mr: 2, display: "flex", flexDirection: "row" }}>
                                    <img
                                        src={item.imageUrl}
                                        width="100%"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <Typography sx={{ display: "flex", flexDirection: "start", marginTop: "30px", fontFamily: "Coolvetica-Rg" }}>{item.name}</Typography>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <IconButton onClick={() => setAdditional(Math.max(additional - 1, 0))}>
                                        <RemoveIcon />
                                    </IconButton>

                                    {additional}
                                    <IconButton onClick={() => setAdditional(additional + 1)}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>


                    {/* ACTION */}
                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <Button fullWidth variant="outlined" sx={{ fontFamily: "Speedee-Regular" }} onClick={() => navigate(-1)}>
                            Cancel
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ backgroundColor: "#FFD700", color: "black", fontFamily: "Speedee-Regular" }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Container>

        </>
    );
}