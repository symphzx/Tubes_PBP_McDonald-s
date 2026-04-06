"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("OrderMenu", {
            om_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },

            order_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Orders",
                    key: "order_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },

            mv_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Varian_Menu",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT",
            },

            mo_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: "MenuOption",
                    key: "mo_id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },

            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },

            harga_awal: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        await queryInterface.dropTable("OrderMenu");
    },
};