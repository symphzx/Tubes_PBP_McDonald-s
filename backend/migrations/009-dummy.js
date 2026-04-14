"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. DEFINE KATEGORI (SIMPAN UUID)
    const kategoriData = [
      { id: uuidv4(), nama: "Burger & McNuggets" },
      { id: uuidv4(), nama: "Ayam McD Krispy" },
      { id: uuidv4(), nama: "Ayam McD Spicy" },
      { id: uuidv4(), nama: "Paket Keluarga" },
      { id: uuidv4(), nama: "Happy Meal" },
      { id: uuidv4(), nama: "Paket HeBat" },
      { id: uuidv4(), nama: "Menu Receh" },
      { id: uuidv4(), nama: "McSpaghetti" },
      { id: uuidv4(), nama: "Camilan" },
      { id: uuidv4(), nama: "Minuman" },
      { id: uuidv4(), nama: "Pencuci Mulut" },
      { id: uuidv4(), nama: "Nasi" },
    ];

    // 2. INSERT KATEGORI
    await queryInterface.bulkInsert(
      "Kategori",
      kategoriData.map((kategori) => ({
        ...kategori,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );

    // 3. BUAT MAP (🔥 INI KUNCI)
    const kategoriMap = {};
    kategoriData.forEach((kategori) => {
      kategoriMap[kategori.nama] = kategori.id;
    });

    // 4. INSERT MENU (PAKAI kategori_id)
    await queryInterface.bulkInsert("Menu", [
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Spicy"],
        nama: "PaNas 2 Ayam McD Gulai Spicy Perkedel",
        harga_awal: 65500,
        tipe: "Paket",
        gambar:
          "http://localhost:3000/uploads/assets/PaNas 2 Ayam McD Gulai Perkedel.webp",
        ketersediaan: "Tersedia",
        tag: "Baru!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Spicy"],
        nama: "PaNas 2 with Fries Ayam McD Gulai Spicy",
        harga_awal: 80500,
        tipe: "Paket",
        gambar:
          "http://localhost:3000/uploads/assets/PaNas 2 Fries Ayam McD Gulai.webp",
        ketersediaan: "Tersedia",
        tag: "Baru!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Spicy"],
        nama: "Paket Spesial Ayam McD Gulai Spicy Perkedel",
        harga_awal: 57500,
        tipe: "Paket",
        gambar:
          "http://localhost:3000/uploads/assets/Paket Spesial Ayam McD Gulai Perkedel.webp",
        ketersediaan: "Tersedia",
        tag: "Baru!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Spicy"],
        nama: "PaNas 1 Spicy, Medium",
        harga_awal: 36500,
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaNas 1 Spicy.png",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Spicy"],
        nama: "PaNas 2 Spicy, Medium",
        harga_awal: 48500,
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaNas 2 Spicy.png",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Spicy"],
        nama: "PaNas 2 with Fries Spicy",
        harga_awal: 51000,
        tipe: "Paket",
        gambar:
          "http://localhost:3000/uploads/assets/PaNas 2 with Fries Spicy.png",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Spicy"],
        nama: "PaMer 5 Spicy",
        harga_awal: 88000,
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaMer 5 Spicy.png",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Spicy"],
        nama: "Ayam Spicy McDonald's",
        harga_awal: 22000,
        tipe: "Ala Carte",
        gambar:
          "http://localhost:3000/uploads/assets/Ayam Spicy McDonald's.webp",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Krispy"],
        nama: "PaNas 1 Krispy, Medium",
        harga_awal: 36500,
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaNas 1 Krispy.webp",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Krispy"],
        nama: "PaNas Special Krispy",
        harga_awal: 45000,
        tipe: "Paket",
        gambar:
          "http://localhost:3000/uploads/assets/PaNas Special Krispy.webp",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Krispy"],
        nama: "PaNas 2 Krispy, Medium",
        harga_awal: 48500,
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaNas 2 Krispy.webp",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Krispy"],
        nama: "PaNas 2 Krispy with Fries, Medium",
        harga_awal: 51000,
        tipe: "Paket",
        gambar:
          "http://localhost:3000/uploads/assets/PaNas 2 Krispy with Fries.webp",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Krispy"],
        nama: "PaMer 5 Krispy",
        harga_awal: 88000,
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaMer 5 Krispy.webp",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Ayam McD Krispy"],
        nama: "PaMer 7 Krispy",
        harga_awal: 12000,
        tipe: "Paket",
        gambar: "http://localhost:3000/uploads/assets/PaMer 7 Krispy.webp",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        kategori_id: kategoriMap["Minuman"],
        nama: "Tehbotol Kotak",
        harga_awal: 11000,
        tipe: "Ala Carte",
        gambar:
          "http://localhost:3000/uploads/assets/Tehbotol Sosro Kotak.webp",
        ketersediaan: "Tersedia",
        tag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Menu", null, {});
    await queryInterface.bulkDelete("Kategori", null, {});
  },
};