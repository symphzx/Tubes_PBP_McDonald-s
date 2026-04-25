import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from '@mui/icons-material/Cancel';
import { useOrders } from "../../../hooks/useOrder";

export default function ListOrderPage() {
  const themeColor = "#DA291C";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { orders, reload: reloadOrder } = useOrders();

  useEffect(() => {
    reloadOrder();
  }, [reloadOrder]);


  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.orderMenuRelation.some((item) =>
          item.menu?.nama.toLowerCase().includes(search.toLowerCase())
        );

      const matchStatus = statusFilter
        ? order.status === statusFilter
        : true;

      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return {
          bg: "#E8F5E9",
          color: "#2E7D32",
          icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
        };
      case "PENDING":
        return {
          bg: "#FFF8E1",
          color: "#EF6C00",
          icon: <PendingActionsIcon sx={{ fontSize: 16 }} />,
        };
      case "CANCELLED":
        return {
          bg: "#fde3e3",
          color: "#c02f15",
          icon: <CancelIcon sx={{ fontSize: 16 }} />,
        };
      default:
        return {
          bg: "#F5F5F5",
          color: "#555",
          icon: <ReceiptLongIcon sx={{ fontSize: 16 }} />,
        };
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* HEADER */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Order Management
          </Typography>

          <Typography sx={{ color: "#777", mt: 1 }}>
            Pantau seluruh transaksi pesanan pelanggan
          </Typography>
        </Box>

        {/* <Button
          startIcon={<RefreshIcon />}
          variant="contained"
          sx={{
            bgcolor: themeColor,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            "&:hover": { bgcolor: "#b71f15" },
          }}
        >
          Refresh
        </Button> */}
      </Box>

      {/* FILTER */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <Box
          sx={{
            flex: 1,
            minWidth: 260,
            display: "flex",
            alignItems: "center",
            px: 2,
            border: "1px solid #E0E0E0",
            borderRadius: "14px",
            bgcolor: "#FFF",
            height: 48,
          }}
        >
          <SearchIcon sx={{ color: "#999", mr: 1 }} />
          <InputBase
            fullWidth
            placeholder="Cari order / menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            minWidth: 180,
            border: "1px solid #E0E0E0",
            borderRadius: "14px",
            px: 1,
            bgcolor: "#FFF",
          }}
        >
          <Select
            fullWidth
            displayEmpty
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              height: 48,
              "& fieldset": { border: "none" },
            }}
          >
            <MenuItem value="" sx={{opacity: 0.6}}>Semua Status</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="PAID">Paid</MenuItem>
            <MenuItem value="CANCELLED">Cancelled</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* LIST */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {filteredOrders.map((order) => {
          const statusUI = getStatusColor(order.status);

          return (
            <Paper
              key={order.id}
              elevation={0}
              sx={{
                borderRadius: "22px",
                border: "1px solid #ECECEC",
                overflow: "hidden",
              }}
            >
              {/* HEADER ORDER */}
              <Box
                sx={{
                  px: 3,
                  py: 2.2,
                  bgcolor: "#FAFAFA",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: "1rem", }}>
                    {order.no_order}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.6,
                    }}
                  >
                    <AccessTimeIcon
                      sx={{ fontSize: 15, color: "#888" }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "#777" }}
                    >
                      {new Date(order.waktu_pemesanan).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      •{" "}
                      {new Date(order.waktu_pemesanan).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: 1.5,
                    display: "flex",
                    gap: 1.2,
                    flexWrap: "wrap",
                  }}
                >
                  {/* TIPE ORDER */}
                  <Chip
                    label={order.order_type === "DINE_IN" ? "Dine In" : "Take Away"}
                    size="small"
                    sx={{
                      height: 30,
                      px: 1,
                      fontWeight: 700,
                      borderRadius: "10px",
                      bgcolor:
                        order.order_type === "DINE_IN"
                          ? "#E3F2FD"
                          : "#FFF3E0",
                      color:
                        order.order_type === "DINE_IN"
                          ? "#1565C0"
                          : "#EF6C00",
                    }}
                  />

                  {/* NOMOR MEJA */}
                  {order.order_type === "DINE_IN" && (
                    <Chip
                      label={`Meja ${order.no_meja}`}
                      size="small"
                      sx={{
                        height: 30,
                        px: 1,
                        fontWeight: 700,
                        borderRadius: "10px",
                        bgcolor: "#F5F5F5",
                        color: "#444",
                      }}
                    />
                  )}
                </Box>
                <Chip
                  icon={statusUI.icon}
                  label={order.status}
                  sx={{
                    bgcolor: statusUI.bg,
                    color: statusUI.color,
                    fontWeight: 700,
                    px: 1,
                  }}
                />
              </Box>

              {/* TABLE HEADER */}
              <Box
                sx={{
                  px: 3,
                  py: 1.6,
                  display: "flex",
                  bgcolor: "#FFF",
                  borderTop: "1px solid #F0F0F0",
                  borderBottom: "1px solid #F0F0F0",
                  fontWeight: 700,
                  color: "#666",
                }}
              >
                <Box sx={{ width: "32%" }}>Menu</Box>
                <Box sx={{ width: "18%" }}>Variant</Box>
                <Box sx={{ width: "22%" }}>Option</Box>
                <Box sx={{ width: "10%" }}>Qty</Box>
                <Box sx={{ width: "18%", textAlign: "right" }}>
                  Harga
                </Box>
              </Box>

              {/* ITEMS */}
              {order.orderMenuRelation.map((item, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      px: 3,
                      py: 2,
                      display: "flex",
                      alignItems: "center",
                      "&:hover": {
                        bgcolor: "#FCFCFC",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "32%",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "12px",
                          bgcolor: "#FFF3E0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Avatar
                          src={item.menu?.gambar ?? undefined}
                          variant="rounded"
                          sx={{ width: 56, height: 56 }}
                        />
                      </Box>

                      <Typography sx={{ fontWeight: 700 }}>
                        {item.menu?.nama}
                      </Typography>
                    </Box>

                    <Box sx={{ width: "18%" }}>{item.varian_menu.nama}</Box>

                    <Box sx={{ width: "22%" }}>{item.opsi_menu.nama}</Box>

                    <Box sx={{ width: "10%", fontWeight: 700 }}>
                      x{item.quantity}
                    </Box>

                    <Box
                      sx={{
                        width: "18%",
                        textAlign: "right",
                        fontWeight: 700,
                      }}
                    >
                      Rp {(item.harga_awal * item.quantity).toLocaleString()}
                    </Box>
                  </Box>

                  {index !== order.orderMenuRelation.length - 1 && <Divider />}
                </Box>
              ))}

              {/* FOOTER */}
              <Box
                sx={{
                  px: 3,
                  py: 2,
                  bgcolor: "#FAFAFA",
                  borderTop: "1px solid #F0F0F0",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Typography sx={{ color: "#666" }}>
                  {order.orderMenuRelation.length} item pesanan
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 800,
                    color: themeColor,
                  }}
                >
                  Total: Rp {(order.total_harga).toLocaleString()}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Container>
  );
}