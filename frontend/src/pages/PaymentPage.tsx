// import { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   Paper,
//   Stack,
//   IconButton,
//   Button,
//   Divider,
//   Grid,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Modal,
// } from "@mui/material"

// import ChevronRightIcon from "@mui/icons-material/ChevronRight"
// import CloseIcon from "@mui/icons-material/Close"
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
// import PaymentIcon from "@mui/icons-material/Payment"
// import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
// import StorefrontIcon from "@mui/icons-material/Storefront"

// import { useAppSelector } from "../hooks/useAppSelector"
// import { useAppDispatch } from "../hooks/useAppDispatch"

// export default function PaymentPage() {
//   const dispatch = useAppDispatch()
//   const { total, cart, metode_pembayaran } = useAppSelector(
//     (state) => state.payment,
//   )

//   const [showDetail, setShowDetail] = useState(false)
//   const [showCardForm, setShowCardForm] = useState(false)
//   const [timeLeft, setTimeLeft] = useState(300) // timernya 5 menit

//   // buat logic timer paymentnya
//   // prev = 300 detik. 1000 = 1 detik
//   // jadi bakal ngurang 1 detik terus"an
//   // clearInterval biar timernya berenti pas ud beres bayar
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
//     }, 1000)
//     return () => clearInterval(timer)
//   }, [])

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60)
//     const s = seconds % 60
//     return `00 : ${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`
//   }

//   const handleBackCard = () => {
//     const confirmBack = window.confirm("Cancel payment using this method?")
//     if (confirmBack) setShowCardForm(false)
//   }

//   return (
//     <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
//       {/* 1. HEADER */}
//       <Box
//         sx={{ bgcolor: "#FFBC0D", py: 2, textAlign: "center", boxShadow: 1 }}
//       >
//         <Typography variant="h6" sx={{ fontWeight: 900, color: "black" }}>
//           McDonald's{" "}
//           <Box component="span" sx={{ fontWeight: 400 }}>
//             Indonesia
//           </Box>
//         </Typography>
//       </Box>

//       {/* 3. TIMER SECTION */}
//       <Box
//         sx={{ bgcolor: "#222", color: "white", py: 0.5, textAlign: "center" }}
//       >
//         <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
//           Choose within{" "}
//           <Typography
//             component="span"
//             sx={{ color: "#FFBC0D", fontFamily: "monospace", ml: 1 }}
//           >
//             {formatTime(timeLeft)}
//           </Typography>
//         </Typography>
//       </Box>

//       <Box sx={{ maxWidth: "500px", margin: "0 auto", p: 3 }}>
//         {/* 2. JUMLAH BAYAR SECTION */}
//         <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", mb: 3 }}>
//           <Typography variant="caption" color="text.secondary" fontWeight={700}>
//             Total Payment
//           </Typography>
//           <Typography variant="h4" fontWeight={900} sx={{ mt: 0.5 }}>
//             Rp {total.toLocaleString("id-ID")}
//           </Typography>

//           <Divider sx={{ my: 2, borderStyle: "dashed" }} />

//           <Stack
//             direction="row"
//             sx={{
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="caption" color="text.secondary">
//               Order ID: MCD-{Math.random().toString().slice(2, 10)}
//             </Typography>
//             <Button
//               size="small"
//               onClick={() => setShowDetail(true)}
//               endIcon={<ChevronRightIcon />}
//               sx={{ color: "#DD1021", fontWeight: 700, textTransform: "none" }}
//             >
//               Detail
//             </Button>
//           </Stack>
//         </Paper>

//         {/* 4. PAYMENT METHOD GRID */}
//         {!showCardForm ? (
//           <Stack spacing={2}>
//             <Typography
//               variant="subtitle1"
//               fontWeight={700}
//               color="text.secondary"
//             >
//               Payment Method
//             </Typography>

//             {[
//               {
//                 label: "Credit / Debit Card",
//                 icon: <PaymentIcon />,
//                 active: true,
//               },
//               { label: "QRIS", icon: <QrCodeScannerIcon />, active: false },
//               { label: "Cashier", icon: <StorefrontIcon />, active: false },
//             ].map((method, i) => (
//               <Paper
//                 key={i}
//                 component={Button}
//                 onClick={() => method.active && setShowCardForm(true)}
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   justifyContent: "space-between",
//                   textTransform: "none",
//                   color: method.active ? "inherit" : "text.disabled",
//                   borderRadius: "12px",
//                   border: "1px solid #eee",
//                   bgcolor: "white",
//                   width: "100%",
//                 }}
//               >
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   {method.icon}
//                   <Typography fontWeight={700}>{method.label}</Typography>
//                 </Stack>
//                 {method.active ? (
//                   <ChevronRightIcon />
//                 ) : (
//                   <Typography variant="caption">Skip</Typography>
//                 )}
//               </Paper>
//             ))}
//           </Stack>
//         ) : (
//           /* 5. CARD FORM SECTION */
//           <Paper
//             elevation={0}
//             sx={{ p: 4, borderRadius: "16px", border: "1px solid #eee" }}
//           >
//             <Stack
//               direction="row"
//               spacing={2}
//               alignItems="center"
//               sx={{ mb: 4 }}
//             >
//               <IconButton onClick={handleBackCard} sx={{ p: 0 }}>
//                 <ArrowBackIosNewIcon fontSize="small" />
//               </IconButton>
//               <Typography variant="h6" fontWeight={800}>
//                 Card Information
//               </Typography>
//             </Stack>

//             <Stack spacing={3}>
//               <Box>
//                 <Typography
//                   variant="caption"
//                   fontWeight={700}
//                   color="text.secondary"
//                   sx={{ mb: 1, display: "block" }}
//                 >
//                   CARD NUMBER
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="xxxx xxxx xxxx xxxx"
//                   variant="outlined"
//                   size="medium"
//                 />
//               </Box>

//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <Typography
//                     variant="caption"
//                     fontWeight={700}
//                     color="text.secondary"
//                     sx={{ mb: 1, display: "block" }}
//                   >
//                     EXPIRATION DATE
//                   </Typography>
//                   <TextField fullWidth placeholder="MM/YY" />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography
//                     variant="caption"
//                     fontWeight={700}
//                     color="text.secondary"
//                     sx={{ mb: 1, display: "block" }}
//                   >
//                     CVV
//                   </Typography>
//                   <TextField fullWidth type="password" placeholder="***" />
//                 </Grid>
//               </Grid>

//               <FormControlLabel
//                 control={
//                   <Checkbox sx={{ "&.Mui-checked": { color: "#DD1021" } }} />
//                 }
//                 label={
//                   <Typography variant="body2">
//                     Save this card for future use
//                   </Typography>
//                 }
//               />

//               <Button
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   bgcolor: "#DD1021",
//                   py: 2,
//                   borderRadius: "12px",
//                   fontWeight: 800,
//                   fontSize: "16px",
//                   "&:hover": { bgcolor: "#b90d1b" },
//                 }}
//               >
//                 Pay Rp {total.toLocaleString("id-ID")}
//               </Button>
//             </Stack>
//           </Paper>
//         )}
//       </Box>

//       {/* 2b. MODAL DETAIL */}
//       <Modal
//         open={showDetail}
//         onClose={() => setShowDetail(false)}
//         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//       >
//         <Paper
//           sx={{
//             width: "90%",
//             maxWidth: "400px",
//             borderRadius: "24px",
//             overflow: "hidden",
//           }}
//         >
//           <Stack
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//             sx={{ p: 3, bgcolor: "#f9f9f9" }}
//           >
//             <Typography variant="h6" fontWeight={800}>
//               Order Details
//             </Typography>
//             <IconButton onClick={() => setShowDetail(false)}>
//               <CloseIcon />
//             </IconButton>
//           </Stack>

//           <Box sx={{ p: 3, maxHeight: "60vh", overflowY: "auto" }}>
//             {cart.map((item, idx) => (
//               <Stack
//                 key={idx}
//                 direction="row"
//                 justifyContent="space-between"
//                 sx={{ mb: 2 }}
//               >
//                 <Box>
//                   <Typography variant="body1" fontWeight={700}>
//                     {item.menu_id.nama}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {item.quantity} x Rp {item.harga_awal.toLocaleString()}
//                   </Typography>
//                 </Box>
//                 <Typography fontWeight={700}>
//                   Rp {(item.quantity * item.harga_awal).toLocaleString()}
//                 </Typography>
//               </Stack>
//             ))}
//             <Divider sx={{ my: 2, borderStyle: "dashed" }} />
//             <Stack direction="row" justifyContent="space-between">
//               <Typography variant="h6" fontWeight={900} color="#DD1021">
//                 Total (Incl. Tax)
//               </Typography>
//               <Typography variant="h6" fontWeight={900} color="#DD1021">
//                 Rp {total.toLocaleString()}
//               </Typography>
//             </Stack>
//           </Box>
//         </Paper>
//       </Modal>
//     </Box>
//   )
// }

// // 1. header backgroundnya kuning : tulisan McDonalds Indonesia (hitam)
// // 2. section jumlah bayar Rp sekian (tulisan agak besar). bawah kirinya ada tulisan kecil Order ID berapa. bawah kanannya ada arrow "Detail", kalo dipencet munculin nama pesenan, jumlahnya berapa, harganya berapa per item, totalnya berapa (detailnya bisa diclose pake tanda silang)
// // 3. section timer buat bayarnya : ada tulisan "Choose within jam : menit : detik". ini sectionnya kecil dan sempit tampilannya
// // 4. section payment method : pilihannya ada credit / debit card, qris, cashier. ini tampilannya mau kotak kotak aja (grid?)
// // 5. kalo debit / credit card diklik, muncul section form buat ngisi card number, expiration Date, sama cvv. ada checkbox save this card. bisa di back, kalo klik back, muncul tulisan alert "Cancel payment using this method? sama button Back dan Yes, Cancel"
// // 6.  kalo qris, skip dulu
// // 7. kalo cashier juga skip dulu
// // 8. disini konsepnya belum ada voucher dan promo ya
// // 9. urusan tax juga bukan di page ini jadi skip. tapi munculin harga disini tuh udah include tax

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Button,
  Divider,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Modal,
} from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PaymentIcon from "@mui/icons-material/Payment";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";

export default function PaymentPage() {
  const dispatch = useAppDispatch();
  const { total, cart } = useAppSelector((state) => state.payment);

  const [showDetail, setShowDetail] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 menit

  const [orderId] = useState(
    () => `MCD-${Math.random().toString().slice(2, 10)}`,
  );

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
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* 1. HEADER */}
      <Box
        sx={{ bgcolor: "#FFBC0D", py: 2, textAlign: "center", boxShadow: 1 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 900, color: "black" }}>
          McDonald's Indonesia{" "}
        </Typography>
      </Box>

      {/* 3. TIMER SECTION */}
      <Box
        sx={{ bgcolor: "#222", color: "white", py: 0.5, textAlign: "center" }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
          Choose within{" "}
          <Box
            component="span"
            sx={{ color: "#FFBC0D", fontFamily: "monospace", ml: 1 }}
          >
            {formatTime(timeLeft)}
          </Box>
        </Typography>
      </Box>

      <Box sx={{ maxWidth: "500px", margin: "0 auto", p: 3 }}>
        {/* 2. JUMLAH BAYAR SECTION */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: "16px", mb: 3 }}>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: 700 }}
          >
            Total Payment
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 900, mt: 0.5 }}>
            Rp {total.toLocaleString("id-ID")}
          </Typography>

          <Divider sx={{ my: 2, borderStyle: "dashed" }} />

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Order ID: {orderId}
            </Typography>
            <Button
              size="small"
              onClick={() => setShowDetail(true)}
              endIcon={<ChevronRightIcon />}
              sx={{ color: "#DD1021", fontWeight: 700, textTransform: "none" }}
            >
              Detail
            </Button>
          </Stack>
        </Paper>

        {/* 4. PAYMENT METHOD */}
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
              { label: "QRIS", icon: <QrCodeScannerIcon />, active: false },
              { label: "Cashier", icon: <StorefrontIcon />, active: false },
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
                {/* Pakai 'item' dan 'xs' tapi pastikan import-nya sudah benar */}
                <Grid item xs={6}>
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

                <Grid item xs={6}>
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

      {/* MODAL DETAIL */}
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
                    {item.menu_id.nama}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.quantity} x Rp {item.harga_awal.toLocaleString()}
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 700 }}>
                  Rp {(item.quantity * item.harga_awal).toLocaleString()}
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
