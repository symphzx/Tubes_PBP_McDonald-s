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
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation } from "react-router";

import custOrderLogo from "../img/mcd-plate.png";
import noItemFound from "../img/item-not-found-error.png";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { addItemToCart, updateItemCustomization } from "../../../store/cartSlice";
import type { cartItem, customization } from "../../../store/cartSlice";

import type { Menu } from "../../../types";
import { useMenuDetailCustomization } from "../../../hooks/useMenuDetailCustomization";

// State customization untuk 1 menu (varian yang dipilih + opsi-opsi yang dipilih)
interface SlotCustomization {
    varian_id: string | null;
    opsi_ids: string[];
}

export default function CustomizeOrder() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const locationState = location.state as
    | {
          selectedItem?: Menu;
          quantity?: number;
          mainItem?: Menu;
          editItem?: cartItem;
      }
    | null;

    const selectedItem = locationState?.selectedItem;
    const quantity = locationState?.quantity ?? 1;
    const mainItem = locationState?.mainItem;
    const editItem = locationState?.editItem;

    // ---------- FETCH MENU DETAIL ----------
    const { menu, reload } = useMenuDetailCustomization(selectedItem?.id);

    useEffect(() => {
        reload();
    }, [reload]);

    // ---------- TENTUKAN APAKAH PAKET / ALA CARTE ----------
    const isPaket =
        menu?.tipe === "Paket" && (menu.paketRelation?.length ?? 0) > 0;

    // ---------- DAFTAR MENU YANG BISA DI-CUSTOMIZE ----------
    // Ala carte: hanya 1 menu (menu utama itu sendiri)
    // Paket: setiap sub-menu di dalam paket
    const customizableItems: Menu[] = [];
    if (menu) {
        if (isPaket) {
            for (const row of menu.paketRelation!) {
                customizableItems.push(row.menuRelation);
            }
        } else {
            customizableItems.push(menu);
        }
    }

    // ---------- STATE CUSTOMIZATIONS ----------
    // customizations[i] = pilihan user untuk customizableItems[i]
    const [customizations, setCustomizations] = useState<SlotCustomization[]>([]);

    // Inisialisasi state setiap kali menu baru selesai di-fetch
    useEffect(() => {
        if (!menu) return;

        // Tentukan slot_key untuk setiap slot yang akan diisi
        const slotKeys: string[] = [];
        if (menu.tipe === "Paket" && menu.paketRelation) {
            for (const row of menu.paketRelation) {
                slotKeys.push(row.id);
            }
        } else {
            slotKeys.push("main");
        }

        // Untuk tiap slot: cari customization existing di editItem (kalau mode edit)
        const initial: SlotCustomization[] = [];
        for (const slotKey of slotKeys) {
            const existing: customization | undefined = editItem?.customizations.find(
              (c) => c.slot_key === slotKey
            );

            if (existing) {
                // Ada data lama → pre-fill
                initial.push({
                    varian_id: existing.varian?.mv_id ?? null,
                    opsi_ids: existing.opsi.map((o) => o.mo_id),
                });
            } else {
                // Tidak ada → kosong
                initial.push({ varian_id: null, opsi_ids: [] });
            }
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCustomizations(initial);
    }, [menu, editItem]);

    // ---------- HANDLERS ----------
    const handleVarianChange = (slotIndex: number, varianId: string) => {
        const updated = [...customizations];
        const current = updated[slotIndex];

        // Toggle: kalau user klik varian yang sama, batalkan pilihan
        if (current.varian_id === varianId) {
            updated[slotIndex] = { ...current, varian_id: null };
        } else {
            updated[slotIndex] = { ...current, varian_id: varianId };
        }

        setCustomizations(updated);
    };

    const handleOpsiToggle = (slotIndex: number, opsiId: string) => {
        const updated = [...customizations];
        const current = updated[slotIndex];

        if (current.opsi_ids.includes(opsiId)) {
            // Sudah ada → hapus
            updated[slotIndex] = {
                ...current,
                opsi_ids: current.opsi_ids.filter((id) => id !== opsiId),
            };
        } else {
            // Belum ada → tambah
            updated[slotIndex] = {
                ...current,
                opsi_ids: [...current.opsi_ids, opsiId],
            };
        }

        setCustomizations(updated);
    };

    const handleReset = () => {
        const reset: SlotCustomization[] = [];
        for (let i = 0; i < customizableItems.length; i++) {
            reset.push({ varian_id: null, opsi_ids: [] });
        }
        setCustomizations(reset);
    };

    // ---------- HITUNG TOTAL TAMBAHAN & SUBTOTAL ----------
    let totalTambahan = 0;

    for (let i = 0; i < customizableItems.length; i++) {
        const item = customizableItems[i];
        const cust = customizations[i];
        if (!cust) continue;

        // Tambahan harga dari varian yang dipilih
        if (cust.varian_id && item.varian_menus) {
            const varianTerpilih = item.varian_menus.find(
                (v) => v.id === cust.varian_id
            );
            if (varianTerpilih) {
                totalTambahan += varianTerpilih.harga_tambahan;
            }
        }

        // Tambahan harga dari opsi-opsi yang dipilih
        if (item.opsi_menus) {
            for (const opsi of item.opsi_menus) {
                if (cust.opsi_ids.includes(opsi.id)) {
                    totalTambahan += opsi.harga_tambahan;
                }
            }
        }
    }

    const subtotal = ((menu?.harga_awal ?? 0) + totalTambahan) * quantity;

    // ---------- SAVE ----------
    const handleSave = () => {
        if (!menu) return;

        // Build payload customization untuk setiap item
        const customizationsPayload = [];

        for (let i = 0; i < customizableItems.length; i++) {
            const item = customizableItems[i];
            const cust = customizations[i];
            const slotKey = isPaket ? menu.paketRelation![i].id : "main";

            // Ambil data varian yang dipilih (kalau ada)
            let varianData = null;
            if (cust.varian_id && item.varian_menus) {
                const v = item.varian_menus.find((x) => x.id === cust.varian_id);
                if (v) {
                    varianData = {
                        mv_id: v.id,
                        nama_varian: v.nama,
                        harga_tambahan: v.harga_tambahan,
                    };
                }
            }

            // Ambil data opsi-opsi yang dipilih
            const opsiData = [];
            if (item.opsi_menus) {
                for (const opsi of item.opsi_menus) {
                    if (cust.opsi_ids.includes(opsi.id)) {
                        opsiData.push({
                            mo_id: opsi.id,
                            nama_option: opsi.nama,
                            tambahan_harga: opsi.harga_tambahan,
                        });
                    }
                }
            }

            customizationsPayload.push({
                slot_key: slotKey,
                menu_id: item.id,
                menu_nama: item.nama,
                // Sub-item dalam paket: harga_awal sudah include di paket → 0
                menu_harga: isPaket ? 0 : item.harga_awal,
                varian: varianData,
                opsi: opsiData,
            });
        }

        // Kalau user datang bawa mainItem (dari flow package-selection),
        // dispatch dia sebagai cart item terpisah dulu
        // Build cart item payload
        const cartPayload = {
            id: editItem ? editItem.id : uuidv4(), // 👈 pertahankan id lama kalau mode edit
            menu_id: menu.id,
            menu_nama: menu.nama,
            menu_harga: menu.harga_awal,
            menu_gambar: menu.gambar ?? "",
            qty: quantity,
            isPaket,
            customizations: customizationsPayload,
            subtotal,
        };

        if (editItem) {
            // MODE EDIT: overwrite cart item yang sudah ada
            dispatch(updateItemCustomization(cartPayload));
            navigate("/cart");
        } else {
            // MODE TAMBAH

            // Flow package-selection: kalau bawa mainItem, dispatch dulu sebagai item terpisah
            if (mainItem) {
                dispatch(
                    addItemToCart({
                        id: uuidv4(),
                        menu_id: mainItem.id,
                        menu_nama: mainItem.nama,
                        menu_harga: mainItem.harga_awal,
                        menu_gambar: mainItem.gambar ?? "",
                        qty: quantity,
                        isPaket: false,
                        customizations: [
                            {
                                slot_key: "main",
                                menu_id: mainItem.id,
                                menu_nama: mainItem.nama,
                                menu_harga: mainItem.harga_awal,
                                varian: null,
                                opsi: [],
                            },
                        ],
                        subtotal: mainItem.harga_awal * quantity,
                    })
                );
            }

            dispatch(addItemToCart(cartPayload));
            navigate("/recommendation");
        }
    };

    // ---------- ERROR / NOT FOUND ----------
    if (!selectedItem || !menu) {
        return (
            <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
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
                    Item not found :(
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

    // ---------- RENDER 1 SECTION CUSTOMIZATION ----------
    const renderSection = (item: Menu, slotIndex: number, title?: string) => {
        const varians = item.varian_menus ?? [];
        const opsis = item.opsi_menus ?? [];
        const cust = customizations[slotIndex] ?? {
            varian_id: null,
            opsi_ids: [],
        };

        if (varians.length === 0 && opsis.length === 0) return null;

        return (
            <Box
                key={`${item.id}-${slotIndex}`}
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
                                                    cust.varian_id === v.id
                                                        ? "#FFF8DC"
                                                        : "transparent",
                                            }}
                                            onClick={() => handleVarianChange(slotIndex, v.id)}
                                        >
                                            <FormControlLabel
                                                value={v.id}
                                                control={
                                                    <Radio
                                                        checked={cust.varian_id === v.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleVarianChange(slotIndex, v.id);
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Box>
                                                        <Typography
                                                            sx={{ fontFamily: "Speedee-Regular" }}
                                                        >
                                                            {v.nama}
                                                        </Typography>
                                                        {v.harga_tambahan > 0 && (
                                                            <Typography
                                                                variant="caption"
                                                                sx={{ color: "text.secondary" }}
                                                            >
                                                                +Rp{" "}
                                                                {v.harga_tambahan.toLocaleString(
                                                                    "id-ID"
                                                                )}
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
                                                    onChange={() =>
                                                        handleOpsiToggle(slotIndex, o.id)
                                                    }
                                                />
                                            }
                                            label={
                                                <Box>
                                                    <Typography
                                                        sx={{ fontFamily: "Speedee-Regular" }}
                                                    >
                                                        {o.nama}
                                                    </Typography>
                                                    {o.harga_tambahan > 0 && (
                                                        <Typography
                                                            variant="caption"
                                                            sx={{ color: "text.secondary" }}
                                                        >
                                                            +Rp{" "}
                                                            {o.harga_tambahan.toLocaleString(
                                                                "id-ID"
                                                            )}
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

    // Cek: ala carte tanpa varian & opsi sama sekali
    const hasNoCustomization =
        !isPaket &&
        (menu.varian_menus?.length ?? 0) === 0 &&
        (menu.opsi_menus?.length ?? 0) === 0;

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
                                    src={menu.gambar ?? ""}
                                    width="100%"
                                    style={{ objectFit: "cover" }}
                                />
                            </Box>
                            <Box sx={{ marginTop: "20px", flex: 1 }}>
                                <Typography sx={{ fontFamily: "Speedee-Bold" }}>
                                    {menu.nama}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontFamily: "Speedee-Regular" }}
                                >
                                    Rp {menu.harga_awal.toLocaleString("id-ID")}
                                    {totalTambahan > 0 && (
                                        <span style={{ color: "#888" }}>
                                            {" "}
                                            + Rp {totalTambahan.toLocaleString("id-ID")}{" "}
                                            (tambahan)
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
                    {isPaket && (
                        <Typography
                            sx={{ fontFamily: "Speedee-Bold", mb: 1, fontSize: 18 }}
                        >
                            Item dalam Paket
                        </Typography>
                    )}

                    {customizableItems.map((item, index) =>
                        renderSection(item, index, isPaket ? item.nama : undefined)
                    )}

                    {/* Ala carte tanpa customization */}
                    {hasNoCustomization && (
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
                            sx={{
                                fontFamily: "Speedee-Regular",
                                color: "text.secondary",
                            }}
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