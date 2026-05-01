import {
  Box,
  Typography,
  Button,
  Container,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Grid,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import custOrderLogo from "../img/mcd-plate.png";
import noItemFound from "../img/item-not-found-error.png";
import { useNavigate, useLocation } from "react-router";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { addItemToCart } from "../../../store/cartSlice";

// =====================================================
// TYPES
// =====================================================
interface VarianMenu {
  id: string;
  nama: string;
  harga_tambahan: number;
}
interface OpsiMenu {
  id: string;
  nama: string;
  harga_tambahan: number;
}
interface MenuItem {
  id: string;
  nama: string;
  harga_awal: number;
  gambar?: string;
  tipe: "Ala Carte" | "Paket";
  kategoriRelation?: { nama: string };
  varian_menus?: VarianMenu[];
  opsi_menus?: OpsiMenu[];
  // paketRelation: list item-item dalam paket
  paketRelation?: Array<{
    id: string;       // Paket_Menu.id
    menu_id: string;  // FK ke Menu (item di dalam paket)
    menuRelation: MenuItem;
  }>;
}

// State customization per "slot" (menu utama atau setiap row paket)
interface SlotCustomization {
  varian_id: string | null;
  opsi_ids: string[];
}

// =====================================================
// CONFIG
// =====================================================


// =====================================================
// COMPONENT
// =====================================================
export default function CustomizeOrder() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // selectedItem cukup berisi {id} - kita fetch detail-nya di bawah
  const { selectedItem, quantity = 1 } = location.state || {};

  const [menuDetail, setMenuDetail] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map<slotKey, SlotCustomization>
  // slotKey = "main" untuk non-paket, atau paket_menu.id untuk tiap item paket
  const [customizations, setCustomizations] = useState<
    Record<string, SlotCustomization>
  >({});

  // ---------- FETCH MENU DETAIL ----------
  useEffect(() => {
    if (!selectedItem?.id) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Endpoint harus return menu beserta:
        // - varian_menus, opsi_menus
        // - paketRelation (with nested menuRelation that includes its own varian_menus & opsi_menus)
        const response = await fetch(
          `http://localhost:3000/menu/${selectedItem.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // Antisipasi response yang dibungkus { data: ... } atau langsung object
        const data: MenuItem = result.records ?? result;

        setMenuDetail(data);

        // Inisialisasi state customization
        const initial: Record<string, SlotCustomization> = {};
        if (data.tipe === "Paket" && data.paketRelation?.length) {
          data.paketRelation.forEach((row) => {
            initial[row.id] = { varian_id: null, opsi_ids: [] };
          });
        } else {
          initial["main"] = { varian_id: null, opsi_ids: [] };
        }
        setCustomizations(initial);
      } catch (err) {
        // Skip kalau error karena unmount (abort)
        if ((err as Error).name === "AbortError") return;
        console.error("Gagal fetch detail menu:", err);
        setError("Gagal memuat detail menu. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();

    // Cleanup: abort fetch kalau component unmount sebelum selesai
    return () => controller.abort();
  }, [selectedItem?.id]);

  // ---------- HANDLERS ----------
  const handleVarianChange = (slotKey: string, varianId: string) => {
    setCustomizations((prev) => ({
      ...prev,
      [slotKey]: {
        ...prev[slotKey],
        // Toggle: kalau klik varian yang sama → un-select
        varian_id: prev[slotKey]?.varian_id === varianId ? null : varianId,
      },
    }));
  };

  const handleOpsiToggle = (slotKey: string, opsiId: string) => {
    setCustomizations((prev) => {
      const current = prev[slotKey]?.opsi_ids ?? [];
      const next = current.includes(opsiId)
        ? current.filter((x) => x !== opsiId)
        : [...current, opsiId];
      return { ...prev, [slotKey]: { ...prev[slotKey], opsi_ids: next } };
    });
  };

  const handleReset = () => {
    const reset: Record<string, SlotCustomization> = {};
    Object.keys(customizations).forEach((k) => {
      reset[k] = { varian_id: null, opsi_ids: [] };
    });
    setCustomizations(reset);
  };

  // ---------- HITUNG SUBTOTAL ----------
  const { totalTambahan, subtotal } = useMemo(() => {
    if (!menuDetail) return { totalTambahan: 0, subtotal: 0 };
    let tambahan = 0;

    const calcSlot = (
      slotKey: string,
      varians: VarianMenu[] = [],
      opsis: OpsiMenu[] = []
    ) => {
      const cust = customizations[slotKey];
      if (!cust) return;
      if (cust.varian_id) {
        const v = varians.find((x) => x.id === cust.varian_id);
        if (v) tambahan += v.harga_tambahan;
      }
      cust.opsi_ids.forEach((oid) => {
        const o = opsis.find((x) => x.id === oid);
        if (o) tambahan += o.harga_tambahan;
      });
    };

    if (menuDetail.tipe === "Paket" && menuDetail.paketRelation?.length) {
      menuDetail.paketRelation.forEach((row) => {
        calcSlot(
          row.id,
          row.menuRelation.varian_menus,
          row.menuRelation.opsi_menus
        );
      });
    } else {
      calcSlot("main", menuDetail.varian_menus, menuDetail.opsi_menus);
    }

    const total = (menuDetail.harga_awal + tambahan) * quantity;
    return { totalTambahan: tambahan, subtotal: total };
  }, [menuDetail, customizations, quantity]);

  // ---------- SAVE ----------
  const handleSave = () => {
    if (!menuDetail) return;

    // Build 1 customization per slot (ala carte = 1 slot, paket = N slot)
    const buildCust = (
      menu: MenuItem,
      slotKey: string,
      isMainItem: boolean
    ) => {
      const cust = customizations[slotKey] ?? { varian_id: null, opsi_ids: [] };

      const varianRaw = cust.varian_id
        ? menu.varian_menus?.find((v) => v.id === cust.varian_id)
        : null;

      const opsiRaw = (menu.opsi_menus ?? []).filter((o) =>
        cust.opsi_ids.includes(o.id)
      );

      return {
        slot_key: slotKey,
        menu_id: menu.id,
        menu_nama: menu.nama,
        // Untuk item dalam paket, harga_awal sub-item biasanya tidak dihitung lagi
        // (karena sudah include di harga paket). Set 0 untuk sub-item paket.
        menu_harga: isMainItem ? menu.harga_awal : 0,
        varian: varianRaw
          ? {
              mv_id: varianRaw.id,
              nama_varian: varianRaw.nama,
              harga_tambahan: varianRaw.harga_tambahan,
            }
          : null,
        opsi: opsiRaw.map((o) => ({
          mo_id: o.id,
          nama_option: o.nama,
          tambahan_harga: o.harga_tambahan,
        })),
      };
    };

    const isPaket =
      menuDetail.tipe === "Paket" && (menuDetail.paketRelation?.length ?? 0) > 0;

    const customizationsPayload = isPaket
      ? menuDetail.paketRelation!.map((row) =>
          buildCust(row.menuRelation, row.id, false)
        )
      : [buildCust(menuDetail, "main", true)];

    const orderData = {
      id: uuidv4(),
      menu_id: menuDetail.id,
      menu_nama: menuDetail.nama,
      menu_harga: menuDetail.harga_awal,
      menu_gambar: menuDetail.gambar ?? "",
      qty: quantity,
      isPaket,
      customizations: customizationsPayload,
      subtotal,
    };

    const mainItem = location.state?.mainItem;
    if (mainItem) {
        dispatch(addItemToCart({
            id: uuidv4(),
            menu_id: mainItem.id,
            menu_nama: mainItem.nama,
            menu_harga: mainItem.harga_awal,
            menu_gambar: mainItem.gambar ?? "",
            qty: quantity,
            isPaket: false,
            customizations: [{
                slot_key: "main",
                menu_id: mainItem.id,
                menu_nama: mainItem.nama,
                menu_harga: mainItem.harga_awal,
                varian: null,
                opsi: []
            }],
            subtotal: mainItem.harga_awal * quantity
        }));
    }

    // buat cek subtotal udh bnr blm soalnya msh slh
    // Di handleSave CustomizeOrder, sebelum dispatch:
    console.log("subtotal dari useMemo:", subtotal);
    console.log("customizationsPayload:", JSON.stringify(customizationsPayload, null, 2));

    dispatch(addItemToCart(orderData));
    navigate("/recommendation");
  };

  // =====================================================
  // RENDER
  // =====================================================
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !selectedItem || !menuDetail) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ mt: 15 }}>
          <img src={noItemFound} width="70%" />
        </Box>
        <Typography
          sx={{
            fontFamily: "Speedee-Bold",
            fontSize: "20px",
            textAlign: "center",
            mt: 2,
          }}
        >
          {error ?? "Item not found :("}
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2, fontFamily: "Speedee-Regular" }}
          onClick={() => navigate(-1)}
        >
          Kembali
        </Button>
      </Box>
    );
  }

  // -------------- Sub-component: Customization Section ---------------
  const renderCustomizationSection = (
    slotKey: string,
    menu: MenuItem,
    title?: string
  ) => {
    const varians = menu.varian_menus ?? [];
    const opsis = menu.opsi_menus ?? [];
    const cust = customizations[slotKey] ?? { varian_id: null, opsi_ids: [] };

    if (varians.length === 0 && opsis.length === 0) return null;

    return (
      <Box
        key={slotKey}
        sx={{ border: "1px solid #ddd", p: 2, mb: 2, boxShadow: 1 }}
      >
        {title && (
          <>
            <Typography sx={{ fontFamily: "Speedee-Bold", fontSize: 16 }}>
              {title}
            </Typography>
            <Divider sx={{ my: 1 }} />
          </>
        )}

        {/* VARIAN (single select) */}
        {varians.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontFamily: "Speedee-Regular", mb: 1 }}>
              Pilih Varian
            </Typography>
            <RadioGroup value={cust.varian_id ?? ""}>
              <Grid container spacing={1}>
                {varians.map((v) => (
                  <Grid key={v.id}>
                    <Paper
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        p: 1,
                        cursor: "pointer",
                        bgcolor:
                          cust.varian_id === v.id ? "#FFF8DC" : "transparent",
                      }}
                      onClick={() => handleVarianChange(slotKey, v.id)}
                    >
                      <FormControlLabel
                        value={v.id}
                        control={
                          <Radio
                            checked={cust.varian_id === v.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVarianChange(slotKey, v.id);
                            }}
                          />
                        }
                        label={
                          <Box>
                            <Typography sx={{ fontFamily: "Speedee-Regular" }}>
                              {v.nama}
                            </Typography>
                            {v.harga_tambahan > 0 && (
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary" }}
                              >
                                +Rp {v.harga_tambahan.toLocaleString("id-ID")}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Box>
        )}

        {/* OPSI (multi select) */}
        {opsis.length > 0 && (
          <Box>
            <Typography sx={{ fontFamily: "Speedee-Regular", mb: 1 }}>
              Tambahan / Opsi
            </Typography>
            <Grid container spacing={1}>
              {opsis.map((o) => (
                <Grid key={o.id}>
                  <Paper variant="outlined" sx={{ borderRadius: 2, p: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={cust.opsi_ids.includes(o.id)}
                          onChange={() => handleOpsiToggle(slotKey, o.id)}
                        />
                      }
                      label={
                        <Box>
                          <Typography sx={{ fontFamily: "Speedee-Regular" }}>
                            {o.nama}
                          </Typography>
                          {o.harga_tambahan > 0 && (
                            <Typography
                              variant="caption"
                              sx={{ color: "text.secondary" }}
                            >
                              +Rp {o.harga_tambahan.toLocaleString("id-ID")}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    );
  };

  const isPaket =
    menuDetail.tipe === "Paket" && (menuDetail.paketRelation?.length ?? 0) > 0;

  return (
    <>
      {/* LOGO */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src={custOrderLogo} width="70" />
      </Box>

      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ width: "100%", maxWidth: 800 }}>
          {/* TITLE */}
          <Typography
            variant="h4"
            sx={{ mb: 2, textAlign: "center", fontFamily: "Speedee-Bold" }}
          >
            Customize
          </Typography>

          {/* MAIN ITEM CARD */}
          <Box
            sx={{
              border: "1px solid #ddd",
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "20%", mr: 2 }}>
                <img
                  src={menuDetail.gambar}
                  width="100%"
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ marginTop: "20px", flex: 1 }}>
                <Typography sx={{ fontFamily: "Speedee-Bold" }}>
                  {menuDetail.nama}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "Speedee-Regular" }}>
                  Rp {menuDetail.harga_awal.toLocaleString("id-ID")}
                  {totalTambahan > 0 && (
                    <span style={{ color: "#888" }}>
                      {" "}
                      + Rp {totalTambahan.toLocaleString("id-ID")} (tambahan)
                    </span>
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "Speedee-Regular", mt: 0.5 }}
                >
                  Qty: {quantity} | Subtotal:{" "}
                  <strong>Rp {subtotal.toLocaleString("id-ID")}</strong>
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                fontFamily: "Speedee-Regular",
                mt: 2,
                borderColor: "text.secondary",
              }}
              onClick={handleReset}
            >
              <Typography
                sx={{
                  color: "text.secondary",
                  fontFamily: "Speedee-Regular",
                  fontSize: "12px",
                }}
              >
                Reset Changes
              </Typography>
            </Button>
          </Box>

          {/* CUSTOMIZATION SECTIONS */}
          {isPaket ? (
            <>
              <Typography
                sx={{
                  fontFamily: "Speedee-Bold",
                  mb: 1,
                  fontSize: 18,
                }}
              >
                Item dalam Paket
              </Typography>
              {menuDetail.paketRelation!.map((row) =>
                renderCustomizationSection(
                  row.id,
                  row.menuRelation,
                  row.menuRelation.nama
                )
              )}
            </>
          ) : (
            renderCustomizationSection("main", menuDetail)
          )}

          {/* Kalau ala carte tapi tidak ada varian/opsi sama sekali */}
          {!isPaket &&
            (menuDetail.varian_menus?.length ?? 0) === 0 &&
            (menuDetail.opsi_menus?.length ?? 0) === 0 && (
              <Box sx={{ border: "1px solid #ddd", p: 2, mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: "Speedee-Regular",
                    color: "text.secondary",
                    textAlign: "center",
                  }}
                >
                  Menu ini tidak memiliki opsi customization.
                </Typography>
              </Box>
            )}

          {/* ACTION BUTTONS */}
          <Box sx={{ display: "flex", gap: 2, mt: 3, color: "text.secondary" }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ fontFamily: "Speedee-Regular", color: "text.secondary" }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSave}
              sx={{
                backgroundColor: "#FFD700",
                color: "black",
                fontFamily: "Speedee-Regular",
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}