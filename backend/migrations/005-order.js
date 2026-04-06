"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Order", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      total_harga: {
        type: Sequelize.REAL,
        allowNull: false,
      },
      order_type: {
        type: Sequelize.ENUM("DINE_IN", "TAKE_AWAY"),
        allowNull: false,
      },
      order_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("CART", "PAID", "PROCESS", "DONE", "CANCELLED"),
        allowNull: false,
        defaultValue: "CART",
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
    await queryInterface.dropTable("Order");
  },
};