'use-strict'
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
            
            // mo_id:{
            //     type: Sequelize.UUID,
            //     allowNull: true,
            //     references: {
            //         model: "opsiMenu",
            //         key: "mo_id"
            //     }
            // },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            harga_awal: {
                type: Sequelize.INTEGER,
                allowNull: false
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
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
        
        await queryInterface.addColumn("OrderMenu", "order_id", {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: "Orders",
                key: "order_id"
            }
        });

        await queryInterface.addColumn("OrderMenu", "menu_id", {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: "Menu",
                key: "menu_id"
            }
        });

        await queryInterface.addColumn("OrderMenu", "mv_id", {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: "Varian_Menu",
                key: "mv_id"
            }
        });

        await queryInterface.addColumn("OrderMenu", "mo_id", {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: "opsiMenu",
                key: "mo_id"
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("OrderMenu");
    }
}