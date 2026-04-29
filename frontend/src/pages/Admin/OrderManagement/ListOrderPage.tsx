import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AssignmentIcon from '@mui/icons-material/Assignment';
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from '@mui/icons-material/Cancel';

import { useOrders } from "../../../hooks/useOrder";

export default function ListOrderPage() {
  const today = new Date();

  const defaultFilter = {
    day: String(today.getDate()).padStart(2, "0"),
    month: String(today.getMonth() + 1).padStart(2, "0"),
    year: String(today.getFullYear()),
  };

  const themeColor = "#DA291C";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [draftFilter, setDraftFilter] = useState(defaultFilter);
  const [activeFilter, setActiveFilter] = useState(defaultFilter);

  const { orders, reload: reloadOrder } = useOrders();

  useEffect(() => {
    reloadOrder();
  }, [reloadOrder]);

  const extractDateFromOrderNo = (noOrder: string) => {
    const rawDate = noOrder.split("-")[0];

    return {
      day: rawDate.slice(0, 2),
      month: rawDate.slice(2, 4),
      year: rawDate.slice(4, 8),
    };
  };


  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const matchSearch =
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.no_order.toLowerCase().includes(search.toLowerCase()) ||
          order.orderMenuRelation.some((item) =>
            item.menu?.nama.toLowerCase().includes(search.toLowerCase())
          );

        const matchStatus = statusFilter
          ? order.status === statusFilter
          : true;

        const orderDate = extractDateFromOrderNo(order.no_order);

        const matchDay = activeFilter.day
          ? orderDate.day === activeFilter.day
          : true;

        const matchMonth = activeFilter.month
          ? orderDate.month === activeFilter.month
          : true;

        const matchYear = activeFilter.year
          ? orderDate.year === activeFilter.year
          : true;

        return (
          matchSearch &&
          matchStatus &&
          matchDay &&
          matchMonth &&
          matchYear
        );
      })

      .sort((a, b) => {
        const [dateA, seqA] = a.no_order.split("-");
        const [dateB, seqB] = b.no_order.split("-");

        const sortableDateA =
          dateA.slice(4, 8) +
          dateA.slice(2, 4) +
          dateA.slice(0, 2);

        const sortableDateB =
          dateB.slice(4, 8) +
          dateB.slice(2, 4) +
          dateB.slice(0, 2);

        const numDateA = Number(sortableDateA);
        const numDateB = Number(sortableDateB);

        // tanggal terbaru dulu
        if (numDateA !== numDateB) {
          return numDateB - numDateA;
        }

        // nomor ascending
        return Number(seqA) - Number(seqB);
      });
  }, [orders, search, statusFilter, activeFilter.day, activeFilter.month, activeFilter.year]);

  const resetDateFilter = () => {
    const empty = {
      day: "",
      month: "",
      year: "",
    };

    setDraftFilter(empty);
    setActiveFilter(empty);
  };

  const applyDateFilter = () => {
    setActiveFilter(draftFilter);
  };

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

  const handleChangeStatus = async (orderId: string, orderType: string, noMeja: number | null, newStatus: string) => {
    try {
      if (orderType === "TAKEAWAY") {
        noMeja = null;
      }
      const response = await fetch(`http://localhost:3000/order/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ 
          order_type: orderType, 
          no_meja: noMeja,
          status: newStatus }),
      })

      
      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      await reloadOrder();
    } catch (error) {
      console.error(error);
      alert("Gagal update status");
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <AssignmentIcon sx={{ fontSize: 36, color: "#556b2f" }} />
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Order Management
            </Typography>
          </Box>

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
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      opacity: 0.6,
                    }}
                  >
                    Semua Status
                  </Box>
                );
              }

              const statusUI = getStatusColor(selected as string);

              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    height: "100%",
                  }}
                >
                  {statusUI.icon}

                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    {selected}
                  </Typography>
                </Box>
              );
            }}
            sx={{
              height: 48,

              "& fieldset": {
                border: "none",
              },

              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                paddingTop: "0 !important",
                paddingBottom: "0 !important",
                minHeight: "48px !important",
              },

              "& .MuiSvgIcon-root": {
                color: "#666",
              },
            }}
          >
            <MenuItem value="" sx={{opacity: "0.6"}}>Semua Status</MenuItem>

            <MenuItem value="PENDING">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {getStatusColor("PENDING").icon}
                Pending
              </Box>
            </MenuItem>

            <MenuItem value="PAID">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {getStatusColor("PAID").icon}
                Paid
              </Box>
            </MenuItem>

            <MenuItem value="CANCELLED">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {getStatusColor("CANCELLED").icon}
                Cancelled
              </Box>
            </MenuItem>
          </Select>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>

      {/* TANGGAL */}
      <Select
        value={draftFilter.day}
        onChange={(e) =>
          setDraftFilter({
            ...draftFilter,
            day: e.target.value,
          })
        }
        displayEmpty
        sx={{ minWidth: 90, height: 48 }}
      >
        <MenuItem value="">Tanggal</MenuItem>
        {Array.from({ length: 31 }, (_, i) => {
          const val = String(i + 1).padStart(2, "0");
          return (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          );
        })}
      </Select>

      {/* BULAN */}
      <Select
        value={draftFilter.month}
        onChange={(e) =>
          setDraftFilter({
            ...draftFilter,
            month: e.target.value,
          })
        }
        displayEmpty
        sx={{ minWidth: 90, height: 48 }}
      >
        <MenuItem value="">Bulan</MenuItem>
        {Array.from({ length: 12 }, (_, i) => {
          const val = String(i + 1).padStart(2, "0");
          return (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          );
        })}
      </Select>

      {/* TAHUN */}
      <Select
        value={draftFilter.year}
        onChange={(e) =>
          setDraftFilter({
            ...draftFilter,
            year: e.target.value,
          })
        }
        displayEmpty
        sx={{ minWidth: 110, height: 48 }}
      >
        <MenuItem value="">Tahun</MenuItem>

        {[2024, 2025, 2026, 2027, 2028].map((year) => (
          <MenuItem key={year} value={String(year)}>
            {year}
          </MenuItem>
        ))}
      </Select>

      {/* RESET */}
      <Button
        variant="contained"
        onClick={applyDateFilter}
        sx={{
          height: 48,
          borderRadius: "12px",
          bgcolor: themeColor,
          textTransform: "none",
          fontWeight: 700,
          px: 3,
          "&:hover": {
            bgcolor: "#b71f15",
          },
        }}
      >
        Apply Filter
      </Button>
      <Button
        variant="outlined"
        onClick={resetDateFilter}
        sx={{
          height: 48,
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 700,
        }}
      >
        Reset Filter
      </Button>
    </Box>

      {/* LIST */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {filteredOrders.map((order) => {
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
                  <Box>
                    <Select
                      value={order.order_type}
                      onChange={(e) =>
                        handleChangeStatus(
                          order.id,
                          e.target.value,
                          order.no_meja,
                          order.status
                        )
                      }
                      size="small"
                      IconComponent={KeyboardArrowDownIcon}

                      renderValue={(selected) => {
                        const isDineIn = selected === "DINE_IN";

                        return (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              component="span"
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.82rem",
                              }}
                            >
                              {isDineIn ? "Dine In" : "Take Away"}
                            </Typography>
                          </Box>
                        );
                      }}

                      sx={{
                        // minWidth: 130,
                        width: 110,
                        height: 36,
                        borderRadius: "999px",
                        fontWeight: 700,

                        bgcolor:
                          order.order_type === "DINE_IN"
                            ? "#E3F2FD"
                            : "#FFF3E0",

                        color:
                          order.order_type === "DINE_IN"
                            ? "#1565C0"
                            : "#EF6C00",

                        "& .MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                          py: 0.5,
                          px: 1.5,
                        },

                        "& fieldset": {
                          border: "none",
                        },

                        "& .MuiSvgIcon-root": {
                          color: "inherit",
                        },
                      }}
                    >
                      <MenuItem value="DINE_IN">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          Dine In
                        </Box>
                      </MenuItem>

                      <MenuItem value="TAKEAWAY">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          Take Away
                        </Box>
                      </MenuItem>
                    </Select>
                  </Box>

                  {/* NOMOR MEJA */}
                  {order.order_type === "DINE_IN" && (
                    <Box
                      sx={{
                        height: 36,
                        minWidth: 108,
                        px: 1.2,
                        borderRadius: "999px",
                        border: "1px solid #E5E7EB",
                        bgcolor: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                        transition: "0.2s ease",
                        "&:hover": {
                          borderColor: "#CBD5E1",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      <TableRestaurantIcon
                        sx={{
                          fontSize: 16,
                          color: "#64748B",
                          flexShrink: 0,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "#64748B",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Meja
                      </Typography>

                      <InputBase
                        defaultValue={order.no_meja ?? ""}
                        type="number"
                        onBlur={(e) => {
                          const newNoMeja = Number(e.target.value);

                          if (!newNoMeja || newNoMeja < 1) return;

                          const mejaSudahDipakai = orders.some(
                            (item) =>
                              item.id !== order.id &&
                              item.order_type === "DINE_IN" &&
                              item.no_meja === newNoMeja &&
                              item.status !== "CANCELLED" && item.status !== "PAID"
                          );

                          if (mejaSudahDipakai) {
                            alert(`Meja ${newNoMeja} sedang digunakan`);
                            e.target.value = String(order.no_meja ?? "");
                            return;
                          }

                          handleChangeStatus(
                            order.id,
                            order.order_type,
                            newNoMeja,
                            order.status
                          );
                        }}
                        inputProps={{
                          min: 1,
                          style: {
                            width: "34px",
                            textAlign: "center",
                            fontWeight: 800,
                            fontSize: "0.82rem",
                            padding: 0,
                          },
                        }}
                      />
                    </Box>
                  )}
                </Box>
                {/* STATUS */}
                <Box>
              <Select
                value={order.status}
                onChange={(e) =>
                  handleChangeStatus(
                    order.id,
                    order.order_type,
                    order.no_meja,
                    e.target.value
                  )
                }
                size="small"
                IconComponent={KeyboardArrowDownIcon}

                renderValue={(selected) => {
                  const statusUI = getStatusColor(selected as string);

                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {statusUI.icon}

                      <Typography
                        component="span"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.82rem",
                        }}
                      >
                        {selected}
                      </Typography>
                    </Box>
                  );
                }}

                sx={{
                  minWidth: 145,
                  height: 36,
                  borderRadius: "999px",
                  fontWeight: 700,

                  bgcolor: getStatusColor(order.status).bg,
                  color: getStatusColor(order.status).color,

                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    py: 0.5,
                    px: 1.5,
                  },

                  "& fieldset": {
                    border: "none",
                  },

                  "& .MuiSvgIcon-root": {
                    color: "inherit",
                  },
                }}
              >
                <MenuItem value="PENDING">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PendingActionsIcon sx={{ fontSize: 16 }} />
                    Pending
                  </Box>
                </MenuItem>

                <MenuItem value="PAID">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                    Paid
                  </Box>
                </MenuItem>

                <MenuItem value="CANCELLED">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CancelIcon sx={{ fontSize: 16 }} />
                    Cancelled
                  </Box>
                </MenuItem>
              </Select>
            </Box>
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

                    <Box sx={{ width: "18%" }}>{item.varian_menu?.nama ?? "-"}</Box>

                    <Box sx={{ width: "22%" }}>{item.opsi_menu?.nama ?? "-"}</Box>

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