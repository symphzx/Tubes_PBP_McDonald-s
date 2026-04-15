"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Menu", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            nama: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            harga_awal: {
                type: Sequelize.REAL,
                allowNull: false,
            },
            kategori: {
                type: Sequelize.ENUM("Burger & McNuggets", "Ayam McD Krispy", "Ayam McD Spicy", "Paket Keluarga", "Happy Meal", "Paket HeBat", "Menu Receh", "McSpaghetti", "Camilan", "Minuman", "Pencuci Mulut", "Nasi"),
                allowNull: false,
            },
            tipe: {
                type: Sequelize.ENUM("Ala Carte", "Paket"),
                allowNull: false,
            },
            gambar: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            ketersediaan: {
                type: Sequelize.ENUM("Tersedia", "Tidak Tersedia"),
                allowNull: false,
            },
            tag: {
                type: Sequelize.ENUM("Baru!"),
                allowNull: true,
            },
            // nat nambahin iniii buat yg rekomendasi paketan / satuan
            recommendation_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: "Menu",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Menu");
    },
};
``