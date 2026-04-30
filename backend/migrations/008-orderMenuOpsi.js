"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderMenu_Opsi", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      order_menu_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "OrderMenu",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      mo_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Opsi_Menu",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      // Snapshot harga saat order dibuat (penting!)
      // Karena harga opsi bisa berubah, kita simpan harga saat itu
      harga_tambahan: {
        type: Sequelize.REAL,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Composite unique index: 1 order_menu tidak bisa punya opsi yang sama 2x
    await queryInterface.addIndex("OrderMenu_Opsi", {
      fields: ["order_menu_id", "mo_id"],
      unique: true,
      name: "uniq_ordermenu_opsi",
    });

    // Index untuk query cepat
    await queryInterface.addIndex("OrderMenu_Opsi", {
      fields: ["order_menu_id"],
      name: "idx_ordermenu_opsi_order_menu",
    });

    // 🔥 OPTIONAL: Hapus kolom mo_id dari OrderMenu
    await queryInterface.removeColumn("OrderMenu", "mo_id");
  },

  async down(queryInterface, Sequelize) {
    // Restore mo_id di OrderMenu
    await queryInterface.addColumn("OrderMenu", "mo_id", {
      type: Sequelize.UUID,
      allowNull: true,
    });

    await queryInterface.dropTable("OrderMenu_Opsi");
  },
};