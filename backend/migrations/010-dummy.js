"use strict";

const pe = process.env;
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const hashedPassword = bcrypt.hashSync(
  pe.BCRYPT_PEPPER + "jordan123",
  parseInt(pe.BCRYPT_SALT_ROUNDS)
);

// =========================================================================
// HELPER FUNCTIONS
// =========================================================================
const now = () => new Date();

const randomDateInLastMonth = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30);
  const ts = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(ts);
};

const formatNoOrder = (date, sequence) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const seq = String(sequence).padStart(4, "0");
  return `${dd}${mm}${yyyy}-${seq}`;
};

const pickWeighted = (items) => {
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  let r = Math.random() * total;
  for (const item of items) {
    if ((r -= item.weight) < 0) return item.value;
  }
  return items[0].value;
};

const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // =====================================================================
    // 1. KATEGORI
    // =====================================================================
    const kategoriData = [
      { id: uuidv4(), nama: "Burger & McNuggets", sortOrder: 1 },
      { id: uuidv4(), nama: "Ayam McD Krispy", sortOrder: 2 },
      { id: uuidv4(), nama: "Ayam McD Spicy", sortOrder: 3 },
      { id: uuidv4(), nama: "Paket Keluarga", sortOrder: 4 },
      { id: uuidv4(), nama: "Happy Meal", sortOrder: 5 },
      { id: uuidv4(), nama: "Paket HeBat", sortOrder: 6 },
      { id: uuidv4(), nama: "Menu Receh", sortOrder: 7 },
      { id: uuidv4(), nama: "McSpaghetti", sortOrder: 8 },
      { id: uuidv4(), nama: "Camilan", sortOrder: 9 },
      { id: uuidv4(), nama: "Minuman", sortOrder: 10 },
      { id: uuidv4(), nama: "Pencuci Mulut", sortOrder: 11 },
      { id: uuidv4(), nama: "Nasi", sortOrder: 12 },
    ];

    await queryInterface.bulkInsert(
      "Kategori",
      kategoriData.map((k) => ({
        ...k,
        startDate: now(),
        createdAt: now(),
        updatedAt: now(),
      }))
    );

    const kategoriMap = {};
    kategoriData.forEach((k) => (kategoriMap[k.nama] = k.id));

    // =====================================================================
    // 2. MENU
    // =====================================================================
    const ASSET = "http://localhost:3000/uploads/assets/";

    // Helper bikin menu lebih ringkas
    const m = (kategori, nama, harga, tipe, gambar, tag = null) => ({
      id: uuidv4(),
      kategori_id: kategoriMap[kategori],
      nama,
      harga_awal: harga,
      tipe,
      gambar: ASSET + gambar,
      ketersediaan: "Tersedia",
      tag,
      createdAt: now(),
      updatedAt: now(),
    });

    const menus = [
      // ---------- Burger & McNuggets ----------
      m("Burger & McNuggets", "Big Mac", 49000, "Ala Carte", "bigmac.webp"),
      m("Burger & McNuggets", "Cheeseburger", 23000, "Ala Carte", "cheeseburger.avif"),
      m("Burger & McNuggets", "Double Cheeseburger", 39000, "Ala Carte", "DoubleChesseburger.avif"),
      m("Burger & McNuggets", "McChicken Burger", 35000, "Ala Carte", "McChicken Burger.avif"),
      m("Burger & McNuggets", "Beef Prosperity Burger", 45000, "Ala Carte", "BeefProsperityBurger.png"),
      m("Burger & McNuggets", "Chicken Prosperity Burger", 42000, "Ala Carte", "ChickenProsperityBurger.png"),
      m("Burger & McNuggets", "McNuggets 6 pcs", 35000, "Ala Carte", "6mcnuggets.avif"),
      m("Burger & McNuggets", "McNuggets 9 pcs", 50000, "Ala Carte", "9mcnuggets.png"),

      // ---------- Ayam McD Krispy ----------
      m("Ayam McD Krispy", "PaNas 1 Krispy, Medium", 36500, "Paket", "PaNas 1 Krispy.webp"),
      m("Ayam McD Krispy", "PaNas Special Krispy", 45000, "Paket", "PaNas Special Krispy.webp"),
      m("Ayam McD Krispy", "PaNas 2 Krispy, Medium", 48500, "Paket", "PaNas 2 Krispy.webp"),
      m("Ayam McD Krispy", "PaNas 2 Krispy with Fries, Medium", 51000, "Paket", "PaNas 2 Krispy with Fries.webp"),
      m("Ayam McD Krispy", "PaMer 5 Krispy", 88000, "Paket", "PaMer 5 Krispy.webp"),
      m("Ayam McD Krispy", "PaMer 7 Krispy", 120000, "Paket", "PaMer 7 Krispy.webp"),
      m("Ayam McD Krispy", "Ayam Krispy McDonald's", 22000, "Ala Carte", "Ayam Krispy McDonald's.webp"),

      // ---------- Ayam McD Spicy ----------
      m("Ayam McD Spicy", "PaNas 2 Ayam McD Gulai Spicy Perkedel", 65500, "Paket", "PaNas 2 Ayam McD Gulai Perkedel.webp", "Baru!"),
      m("Ayam McD Spicy", "PaNas 2 with Fries Ayam McD Gulai Spicy", 80500, "Paket", "PaNas 2 Fries Ayam McD Gulai.webp", "Baru!"),
      m("Ayam McD Spicy", "Paket Spesial Ayam McD Gulai Spicy Perkedel", 57500, "Paket", "Paket Spesial Ayam McD Gulai Perkedel.webp", "Baru!"),
      m("Ayam McD Spicy", "PaNas 1 Spicy, Medium", 36500, "Paket", "PaNas 1 Spicy.png"),
      m("Ayam McD Spicy", "PaNas 2 Spicy, Medium", 48500, "Paket", "PaNas 2 Spicy.png"),
      m("Ayam McD Spicy", "PaNas 2 with Fries Spicy", 51000, "Paket", "PaNas 2 with Fries Spicy.png"),
      m("Ayam McD Spicy", "PaMer 5 Spicy", 88000, "Paket", "PaMer 5 Spicy.png"),
      m("Ayam McD Spicy", "Ayam Spicy McDonald's", 22000, "Ala Carte", "Ayam Spicy McDonald's.webp"),

      // ---------- Paket Keluarga ----------
      m("Paket Keluarga", "Bundle Hemat Bertiga", 130000, "Paket", "paketHematKeluarga-2pie-3tea.png.png"),
      m("Paket Keluarga", "Bundle Hemat Berempat", 165000, "Paket", "Bundle Berempat.webp"),
      m("Paket Keluarga", "Bundle Hemat Berlima", 200000, "Paket", "Bundle Berlima.webp"),
      m("Paket Keluarga", "McD Family Time 8 pcs", 250000, "Paket", "Family Time 8.webp"),

      // ---------- Happy Meal ----------
      m("Happy Meal", "Happy Meal Hamburger", 45000, "Paket", "HamburgerHappyMeal.avif"),
      m("Happy Meal", "Happy Meal McNuggets 4 pcs", 50000, "Paket", "4McNuggetsHappyMeal.avif"),
      m("Happy Meal", "Happy Meal Ayam McD", 50000, "Paket", "AyamHappyMeal.webp"),
      m("Happy Meal", "Happy Meal McSpaghetti", 45000, "Paket", "Happy Meal McSpaghetti.webp"),

      // ---------- Paket HeBat ----------
      m("Paket HeBat", "HeBat 1 Cheeseburger", 30000, "Paket", "Paket Hebat 1.png"),
      m("Paket HeBat", "HeBat 2 McChicken", 40000, "Paket", "HeBat 2.webp"),
      m("Paket HeBat", "HeBat 3 Double Cheeseburger", 50000, "Paket", "HeBat 3.webp"),
      m("Paket HeBat", "Hebat McSpaghetti Ayam", 40000, "Paket", "Paket Hebat McSpaghetti Ayam.png"),

      // ---------- Menu Receh ----------
      m("Menu Receh", "Pie Ketan Hitam Kelapa Receh", 8000, "Ala Carte", "Pie Ketan Hitam Kelapa.webp", "Baru!"),
      m("Menu Receh", "Es Krim Cone Receh", 7000, "Ala Carte", "icecreamCone.png"),
      m("Menu Receh", "Mineral Water Receh", 6000, "Ala Carte", "MineralWaterPrima.png"),

      // ---------- McSpaghetti ----------
      m("McSpaghetti", "McSpaghetti", 22000, "Ala Carte", "Ala carte McSpaghetti.png"),
      m("McSpaghetti", "Paket McSpaghetti", 35000, "Paket", "McSpaghetti.png"),

      // ---------- Camilan ----------
      m("Camilan", "French Fries", 22000, "Ala Carte", "French Fries.avif"),
      m("Camilan", "Hash Brown", 11000, "Ala Carte", "Hash_Brown.png"),
      m("Camilan", "Apple Pie", 11000, "Ala Carte", "applepie.webp"),
      m("Camilan", "Spicy Chicken Bites", 25000, "Ala Carte", "SpicyChickenBites.webp", "Baru!"),

      // ---------- Minuman ----------
      m("Minuman", "Coca-Cola", 17000, "Ala Carte", "CocaCola.avif"),
      m("Minuman", "Sprite", 17000, "Ala Carte", "Sprite.avif"),
      m("Minuman", "Fanta", 17000, "Ala Carte", "FANTA.png"),
      m("Minuman", "Mineral Water Prim-a", 11000, "Ala Carte", "MineralWaterPrima.png"),
      m("Minuman", "Hot Coffee", 17000, "Ala Carte", "Hot Coffee.webp"),
      m("Minuman", "Iced Coffee", 22000, "Ala Carte", "Iced Coffee.webp"),
      m("Minuman", "Milo", 17000, "Ala Carte", "Milo.png"),
      m("Minuman", "Orange Juice", 22000, "Ala Carte", "Orange Juice.webp"),
      m("Minuman", "Tehbotol Kotak", 11000, "Ala Carte", "Tehbotol Sosro Kotak.webp"),

      // ---------- Pencuci Mulut ----------
      m("Pencuci Mulut", "Sundae Cone Coklat", 11000, "Ala Carte", "Chocolate Sundae.png"),
      m("Pencuci Mulut", "Sundae Cone Stroberi", 11000, "Ala Carte", "Strawberry Sundae.png"),
      m("Pencuci Mulut", "McFlurry Oreo", 22000, "Ala Carte", "McFlurry.avif"),
      m("Pencuci Mulut", "McFlurry Biscoff", 25000, "Ala Carte", "mcflurryBiscoff.webp","Baru!"),
      m("Pencuci Mulut", "Pie Coklat", 11000, "Ala Carte", "Pie Coklat.webp"),

      // ---------- Nasi ----------
      m("Nasi", "Nasi Putih", 11000, "Ala Carte", "Nasi Putih.webp"),
      m("Nasi", "Nasi Uduk", 13000, "Ala Carte", "Nasi Uduk.webp"),
    ];

    // Set up beberapa recommendation_id (self-reference)
    // Big Mac merekomendasikan French Fries, dst.
    const findMenuId = (nama) => menus.find((x) => x.nama === nama)?.id;
    const setRec = (nama, recNama) => {
      const target = menus.find((x) => x.nama === nama);
      if (target) target.recommendation_id = findMenuId(recNama);
    };
    setRec("Big Mac", "French Fries");
    setRec("Cheeseburger", "Coca-Cola");
    setRec("McNuggets 6 pcs", "Sprite");
    setRec("PaNas 1 Spicy, Medium", "Sundae Cone Coklat");
    setRec("PaNas 1 Krispy, Medium", "McFlurry Oreo");

    await queryInterface.bulkInsert("Menu", menus);

    // Map nama -> id menu (untuk dipakai relasi berikutnya)
    const menuMap = {};
    menus.forEach((x) => (menuMap[x.nama] = x.id));

    // =====================================================================
    // 3. VARIAN_MENU
    //    - Size Small/Medium/Large untuk minuman & paket tertentu
    //    - Potongan ayam untuk menu paket ayam
    // =====================================================================
    const v = (menuNama, nama, harga) => ({
      id: uuidv4(),
      menu_id: menuMap[menuNama],
      nama,
      harga_tambahan: harga,
      createdAt: now(),
      updatedAt: now(),
    });

    const minumanWithSize = [
      "Coca-Cola",
      "Sprite",
      "Fanta",
      "Hot Coffee",
      "Iced Coffee",
      "Milo",
      "Orange Juice",
      "Tehbotol Kotak",
    ];

    const paketAyam = [
      "PaNas 1 Spicy, Medium",
      "PaNas 2 Spicy, Medium",
      "PaNas 2 with Fries Spicy",
      "PaMer 5 Spicy",
      "PaNas 1 Krispy, Medium",
      "PaNas 2 Krispy, Medium",
      "PaNas 2 Krispy with Fries, Medium",
      "PaMer 5 Krispy",
      "PaMer 7 Krispy",
      "PaNas Special Krispy",
      "PaNas 2 Ayam McD Gulai Spicy Perkedel",
      "PaNas 2 with Fries Ayam McD Gulai Spicy",
      "Paket Spesial Ayam McD Gulai Spicy Perkedel",
      "Ayam Spicy McDonald's",
      "Ayam Krispy McDonald's",
    ];

    const varianMenu = [];

    // Size untuk minuman
    minumanWithSize.forEach((nama) => {
      varianMenu.push(v(nama, "Small", 0));
      varianMenu.push(v(nama, "Medium", 5000));
      varianMenu.push(v(nama, "Large", 10000));
    });

    // Size untuk French Fries
    varianMenu.push(v("French Fries", "Small", 0));
    varianMenu.push(v("French Fries", "Medium", 5000));
    varianMenu.push(v("French Fries", "Large", 10000));

    // Size untuk paket ayam (Medium/Large)
    [
      "PaNas 1 Spicy, Medium",
      "PaNas 2 Spicy, Medium",
      "PaNas 1 Krispy, Medium",
      "PaNas 2 Krispy, Medium",
      "PaNas 2 Krispy with Fries, Medium",
      "PaNas 2 with Fries Spicy",
    ].forEach((nama) => {
      varianMenu.push(v(nama, "Medium", 0));
      varianMenu.push(v(nama, "Large", 8000));
    });

    // Potongan ayam untuk paket ayam & ala carte ayam
    paketAyam.forEach((nama) => {
      varianMenu.push(v(nama, "Paha Atas", 0));
      varianMenu.push(v(nama, "Paha Bawah", 0));
      varianMenu.push(v(nama, "Sayap", 0));
      varianMenu.push(v(nama, "Dada", 0));
      varianMenu.push(v(nama, "Dada Tanpa Tulang", 0));
    });

    await queryInterface.bulkInsert("Varian_Menu", varianMenu);

    // =====================================================================
    // 4. OPSI_MENU (Add-ons)
    // =====================================================================
    const o = (menuNama, nama, harga) => ({
      id: uuidv4(),
      menu_id: menuMap[menuNama],
      nama,
      harga_tambahan: harga,
      createdAt: now(),
      updatedAt: now(),
    });

    const opsiMenu = [];

    // Burger add-ons
    [
      "Big Mac",
      "Cheeseburger",
      "Double Cheeseburger",
      "McChicken Burger",
      "Beef Prosperity Burger",
      "Chicken Prosperity Burger",
    ].forEach((nama) => {
      opsiMenu.push(o(nama, "Extra Cheese", 5000));
      opsiMenu.push(o(nama, "Extra Sauce", 1000));
      opsiMenu.push(o(nama, "No Onion", 0));
      opsiMenu.push(o(nama, "No Pickle", 0));
    });

    // Ayam add-ons (paket & ala carte)
    paketAyam.forEach((nama) => {
      opsiMenu.push(o(nama, "Extra Sauce", 1000));
      opsiMenu.push(o(nama, "Extra Salt", 0));
      opsiMenu.push(o(nama, "Extra Sambal", 2000));
    });

    // Minuman add-ons (FIXED NAMES HERE)
    minumanWithSize.concat(["Mineral Water Prim-a", "Mineral Water Receh"]).forEach((nama) => {
      opsiMenu.push(o(nama, "No Ice", 0));
      opsiMenu.push(o(nama, "Less Sugar", 0));
      opsiMenu.push(o(nama, "Extra Ice", 0));
    });

    // Fries add-ons
    opsiMenu.push(o("French Fries", "Extra Salt", 0));
    opsiMenu.push(o("French Fries", "No Salt", 0));
    opsiMenu.push(o("French Fries", "Extra Ketchup", 1000));

    // McNuggets add-ons
    ["McNuggets 6 pcs", "McNuggets 9 pcs"].forEach((nama) => {
      opsiMenu.push(o(nama, "Extra BBQ Sauce", 1000));
      opsiMenu.push(o(nama, "Extra Sweet & Sour", 1000));
      opsiMenu.push(o(nama, "Extra Chili Sauce", 1000));
    });

    // Sundae & McFlurry add-ons (FIXED BISCOFF HERE)
    ["Sundae Cone Coklat", "Sundae Cone Stroberi", "McFlurry Oreo", "McFlurry Biscoff"].forEach((nama) => {
      opsiMenu.push(o(nama, "Extra Topping", 3000));
    });

    // McSpaghetti
    ["McSpaghetti", "Paket McSpaghetti"].forEach((nama) => {
      opsiMenu.push(o(nama, "Extra Cheese", 5000));
      opsiMenu.push(o(nama, "Extra Sauce", 2000));
    });

    await queryInterface.bulkInsert("Opsi_Menu", opsiMenu);

    // =====================================================================
    // 5. PAKET_MENU
    //    Bundling: paket_id = parent paket, menu_id = item dalam paket
    //    Contoh: PaNas 1 = Ayam Spicy + Nasi Putih + Coca-Cola
    // =====================================================================
    const p = (paketNama, itemNama) => ({
      id: uuidv4(),
      paket_id: menuMap[paketNama],
      menu_id: menuMap[itemNama],
      createdAt: now(),
      updatedAt: now(),
    });

    const paketMenu = [
      // ---------- PaNas Spicy ----------
      p("PaNas 1 Spicy, Medium", "Ayam Spicy McDonald's"),
      p("PaNas 1 Spicy, Medium", "Nasi Putih"),
      p("PaNas 1 Spicy, Medium", "Coca-Cola"),

      p("PaNas 2 Spicy, Medium", "Ayam Spicy McDonald's"),
      p("PaNas 2 Spicy, Medium", "Ayam Spicy McDonald's"),
      p("PaNas 2 Spicy, Medium", "Nasi Putih"),
      p("PaNas 2 Spicy, Medium", "Coca-Cola"),

      p("PaNas 2 with Fries Spicy", "Ayam Spicy McDonald's"),
      p("PaNas 2 with Fries Spicy", "Nasi Putih"),
      p("PaNas 2 with Fries Spicy", "French Fries"),
      p("PaNas 2 with Fries Spicy", "Coca-Cola"),

      p("PaMer 5 Spicy", "Ayam Spicy McDonald's"),
      p("PaMer 5 Spicy", "Ayam Spicy McDonald's"),
      p("PaMer 5 Spicy", "Nasi Putih"),
      p("PaMer 5 Spicy", "Nasi Putih"),
      p("PaMer 5 Spicy", "Coca-Cola"),
      p("PaMer 5 Spicy", "Coca-Cola"),

      // ---------- PaNas Krispy ----------
      p("PaNas 1 Krispy, Medium", "Ayam Krispy McDonald's"),
      p("PaNas 1 Krispy, Medium", "Nasi Putih"),
      p("PaNas 1 Krispy, Medium", "Coca-Cola"),

      p("PaNas 2 Krispy, Medium", "Ayam Krispy McDonald's"),
      p("PaNas 2 Krispy, Medium", "Ayam Krispy McDonald's"),
      p("PaNas 2 Krispy, Medium", "Nasi Putih"),
      p("PaNas 2 Krispy, Medium", "Coca-Cola"),

      p("PaNas 2 Krispy with Fries, Medium", "Ayam Krispy McDonald's"),
      p("PaNas 2 Krispy with Fries, Medium", "Nasi Putih"),
      p("PaNas 2 Krispy with Fries, Medium", "French Fries"),
      p("PaNas 2 Krispy with Fries, Medium", "Coca-Cola"),

      p("PaNas Special Krispy", "Ayam Krispy McDonald's"),
      p("PaNas Special Krispy", "Nasi Uduk"),
      p("PaNas Special Krispy", "Coca-Cola"),

      p("PaMer 5 Krispy", "Ayam Krispy McDonald's"),
      p("PaMer 5 Krispy", "Ayam Krispy McDonald's"),
      p("PaMer 5 Krispy", "Nasi Putih"),
      p("PaMer 5 Krispy", "Nasi Putih"),
      p("PaMer 5 Krispy", "Coca-Cola"),
      p("PaMer 5 Krispy", "Coca-Cola"),

      p("PaMer 7 Krispy", "Ayam Krispy McDonald's"),
      p("PaMer 7 Krispy", "Ayam Krispy McDonald's"),
      p("PaMer 7 Krispy", "Ayam Krispy McDonald's"),
      p("PaMer 7 Krispy", "Nasi Putih"),
      p("PaMer 7 Krispy", "Nasi Putih"),
      p("PaMer 7 Krispy", "Nasi Putih"),
      p("PaMer 7 Krispy", "Coca-Cola"),

      // ---------- PaNas Gulai ----------
      p("PaNas 2 Ayam McD Gulai Spicy Perkedel", "Ayam Spicy McDonald's"),
      p("PaNas 2 Ayam McD Gulai Spicy Perkedel", "Nasi Uduk"),
      p("PaNas 2 Ayam McD Gulai Spicy Perkedel", "Coca-Cola"),

      p("PaNas 2 with Fries Ayam McD Gulai Spicy", "Ayam Spicy McDonald's"),
      p("PaNas 2 with Fries Ayam McD Gulai Spicy", "Nasi Uduk"),
      p("PaNas 2 with Fries Ayam McD Gulai Spicy", "French Fries"),
      p("PaNas 2 with Fries Ayam McD Gulai Spicy", "Coca-Cola"),

      p("Paket Spesial Ayam McD Gulai Spicy Perkedel", "Ayam Spicy McDonald's"),
      p("Paket Spesial Ayam McD Gulai Spicy Perkedel", "Nasi Uduk"),
      p("Paket Spesial Ayam McD Gulai Spicy Perkedel", "Coca-Cola"),

      // ---------- HeBat ----------
      p("HeBat 1 Cheeseburger", "Cheeseburger"),
      p("HeBat 1 Cheeseburger", "French Fries"),
      p("HeBat 1 Cheeseburger", "Coca-Cola"),

      p("HeBat 2 McChicken", "McChicken Burger"),
      p("HeBat 2 McChicken", "French Fries"),
      p("HeBat 2 McChicken", "Coca-Cola"),

      p("HeBat 3 Double Cheeseburger", "Double Cheeseburger"),
      p("HeBat 3 Double Cheeseburger", "French Fries"),
      p("HeBat 3 Double Cheeseburger", "Coca-Cola"),

      // ---------- Happy Meal (FIXED HAMBURGER HERE) ----------
      p("Happy Meal Hamburger", "Cheeseburger"),
      p("Happy Meal Hamburger", "French Fries"),
      p("Happy Meal Hamburger", "Milo"),

      p("Happy Meal McNuggets 4 pcs", "McNuggets 6 pcs"),
      p("Happy Meal McNuggets 4 pcs", "French Fries"),
      p("Happy Meal McNuggets 4 pcs", "Milo"),

      p("Happy Meal Ayam McD", "Ayam Krispy McDonald's"),
      p("Happy Meal Ayam McD", "Nasi Putih"),
      p("Happy Meal Ayam McD", "Milo"),

      p("Happy Meal McSpaghetti", "McSpaghetti"),
      p("Happy Meal McSpaghetti", "Milo"),

      // ---------- Paket Keluarga ----------
      p("Bundle Hemat Bertiga", "Ayam Krispy McDonald's"),
      p("Bundle Hemat Bertiga", "Ayam Krispy McDonald's"),
      p("Bundle Hemat Bertiga", "Ayam Krispy McDonald's"),
      p("Bundle Hemat Bertiga", "Nasi Putih"),
      p("Bundle Hemat Bertiga", "Nasi Putih"),
      p("Bundle Hemat Bertiga", "Nasi Putih"),
      p("Bundle Hemat Bertiga", "Coca-Cola"),
      p("Bundle Hemat Bertiga", "Coca-Cola"),
      p("Bundle Hemat Bertiga", "Coca-Cola"),

      p("McD Family Time 8 pcs", "Ayam Krispy McDonald's"),
      p("McD Family Time 8 pcs", "Ayam Krispy McDonald's"),
      p("McD Family Time 8 pcs", "Ayam Krispy McDonald's"),
      p("McD Family Time 8 pcs", "Ayam Krispy McDonald's"),
      p("McD Family Time 8 pcs", "Ayam Spicy McDonald's"),
      p("McD Family Time 8 pcs", "Ayam Spicy McDonald's"),
      p("McD Family Time 8 pcs", "Ayam Spicy McDonald's"),
      p("McD Family Time 8 pcs", "Ayam Spicy McDonald's"),
      p("McD Family Time 8 pcs", "Nasi Putih"),
      p("McD Family Time 8 pcs", "Nasi Putih"),

      // ---------- Paket McSpaghetti ----------
      p("Paket McSpaghetti", "McSpaghetti"),
      p("Paket McSpaghetti", "Coca-Cola"),
    ];

    await queryInterface.bulkInsert("Paket_Menu", paketMenu);

    // =====================================================================
    // 6. USER
    // =====================================================================
    await queryInterface.bulkInsert("User", [
      {
        id: uuidv4(),
        nama: "Jordan",
        email: "jordan@gmail.com",
        password: hashedPassword,
        role: "Admin",
        createdAt: now(),
        updatedAt: now(),
      },
      {
        id: uuidv4(),
        nama: "Nathalie",
        email: "nathalie@gmail.com",
        password: hashedPassword,
        role: "Cashier",
        createdAt: now(),
        updatedAt: now(),
      },
      {
        id: uuidv4(),
        nama: "Josh",
        email: "josh@gmail.com",
        password: hashedPassword,
        role: "Admin",
        createdAt: now(),
        updatedAt: now(),
      },
    ]);

    // =====================================================================
    // 7. ORDERS, ORDER_MENU & ORDER_MENU_OPSI (15 orders, random 1 bulan terakhir)
    // =====================================================================

    // Ambil opsi & varian per menu untuk lookup cepat
    const opsiByMenu = {};
    opsiMenu.forEach((x) => {
      (opsiByMenu[x.menu_id] = opsiByMenu[x.menu_id] || []).push(x);
    });
    const varianByMenu = {};
    varianMenu.forEach((x) => {
      (varianByMenu[x.menu_id] = varianByMenu[x.menu_id] || []).push(x);
    });

    const allMenus = menus; // alias
    const ordersToInsert = [];
    const orderMenusToInsert = [];
    const orderMenuOpsisToInsert = []; // 🆕 junction rows

    // Distribusi konfigurasi
    const statusDist = [
      { value: "PAID", weight: 65 },
      { value: "PENDING", weight: 25 },
      { value: "CANCELLED", weight: 10 },
    ];
    const typeDist = [
      { value: "DINE_IN", weight: 70 },
      { value: "TAKEAWAY", weight: 30 },
    ];

    const TOTAL_ORDERS = 15;
    // Sort by date supaya no_order incremental per hari
    const orderDates = Array.from({ length: TOTAL_ORDERS }, () =>
      randomDateInLastMonth()
    ).sort((a, b) => a - b);

    // Counter sequence per tanggal (DDMMYYYY-XXXX)
    const sequenceByDate = {};

    // Helper: pilih N elemen unik random dari array
    const pickRandomUnique = (arr, count) => {
      const shuffled = arr.slice().sort(() => Math.random() - 0.5);
      return shuffled.slice(0, Math.min(count, arr.length));
    };

    for (let i = 0; i < TOTAL_ORDERS; i++) {
      const orderId = uuidv4();
      const waktu = orderDates[i];
      const dateKey = waktu.toDateString();
      sequenceByDate[dateKey] = (sequenceByDate[dateKey] || 0) + 1;
      const noOrder = formatNoOrder(waktu, sequenceByDate[dateKey]);

      const orderType = pickWeighted(typeDist);
      const status = pickWeighted(statusDist);
      const noMeja = orderType === "DINE_IN" ? randInt(1, 30) : null;

      // Pilih 1-4 menu random
      const itemCount = randInt(1, 4);
      const chosenMenuIds = new Set();
      let totalHarga = 0;

      for (let j = 0; j < itemCount; j++) {
        const menu = allMenus[randInt(0, allMenus.length - 1)];
        if (chosenMenuIds.has(menu.id)) continue;
        chosenMenuIds.add(menu.id);

        const quantity = randInt(1, 3);
        const orderMenuId = uuidv4();

        // Pilih varian (kalau ada) — 70% chance pakai varian
        let varianId = null;
        let varianHarga = 0;
        const varians = varianByMenu[menu.id];
        if (varians && Math.random() < 0.7) {
          const v = varians[randInt(0, varians.length - 1)];
          varianId = v.id;
          varianHarga = v.harga_tambahan;
        }

        let totalOpsiHarga = 0;
        const opsis = opsiByMenu[menu.id];
        if (opsis && opsis.length > 0 && Math.random() < 0.6) {
          const opsiCount = randInt(1, Math.min(3, opsis.length));
          const chosenOpsis = pickRandomUnique(opsis, opsiCount);

          chosenOpsis.forEach((o) => {
            totalOpsiHarga += o.harga_tambahan;
            orderMenuOpsisToInsert.push({
              id: uuidv4(),
              order_menu_id: orderMenuId,
              mo_id: o.id,
              harga_tambahan: o.harga_tambahan,
              createdAt: waktu,
              updatedAt: waktu,
            });
          });
        }

        // harga_awal sudah include varian + total opsi (snapshot)
        const hargaSatuan = menu.harga_awal + varianHarga + totalOpsiHarga;
        const subtotal = hargaSatuan * quantity;
        totalHarga += subtotal;

        orderMenusToInsert.push({
          id: orderMenuId,
          order_id: orderId,
          menu_id: menu.id,
          mv_id: varianId,
          quantity,
          harga_awal: hargaSatuan,
          createdAt: waktu,
          updatedAt: waktu,
        });
      }

      if (chosenMenuIds.size === 0) continue;

      ordersToInsert.push({
        id: orderId,
        no_order: noOrder,
        waktu_pemesanan: waktu,
        total_harga: totalHarga,
        order_type: orderType,
        no_meja: noMeja,
        status,
        createdAt: waktu,
        updatedAt: waktu,
      });
    }

    await queryInterface.bulkInsert("Orders", ordersToInsert);
    await queryInterface.bulkInsert("OrderMenu", orderMenusToInsert);

    if (orderMenuOpsisToInsert.length > 0) {
      await queryInterface.bulkInsert("OrderMenu_Opsi", orderMenuOpsisToInsert);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderMenu_Opsi", null, {});
    await queryInterface.bulkDelete("OrderMenu", null, {});
    await queryInterface.bulkDelete("Orders", null, {});
    await queryInterface.bulkDelete("User", null, {});
    await queryInterface.bulkDelete("Paket_Menu", null, {});
    await queryInterface.bulkDelete("Opsi_Menu", null, {});
    await queryInterface.bulkDelete("Varian_Menu", null, {});
    await queryInterface.bulkDelete("Menu", null, {});
    await queryInterface.bulkDelete("Kategori", null, {});
  },
};