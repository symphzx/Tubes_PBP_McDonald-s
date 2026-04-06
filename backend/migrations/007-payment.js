"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payment", {
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
      metode_pembayaran: {
        type: Sequelize.ENUM("DEBIT", "QRIS", "CASHIER"),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("PENDING", "PAID", "CANCELLED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      paid_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Payment");
  },
};