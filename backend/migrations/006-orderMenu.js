"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Order_Menu", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Order", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      menu_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Menu", key: "id" },
      },
      mv_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "Varian_Menu", key: "id" },
      },
      mo_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "Opsi_Menu", key: "id" },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      harga_awal: {
        type: Sequelize.REAL,
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
    await queryInterface.dropTable("Order_Menu");
  },
};
