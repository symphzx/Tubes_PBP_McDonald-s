import { Model } from "sequelize-typescript";
import { Table, PrimaryKey, Column, DataType, HasMany } from "sequelize-typescript";
import { Order_Menu } from "./OrderMenu";


@Table({
    tableName: "orders",
    timestamps: true,
    paranoid: true
})

export class Order extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare waktu_pesanan: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare total_harga: number;

    @Column({
        type: DataType.ENUM("DINE_IN", "TAKEAWAY"),
        allowNull: false,
    })
    declare order_type: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare order_no: number;

    @Column({
        type: DataType.ENUM("CART", "PENDING", "PROCESS", "COMPLETED"), // nath ngubah inii biar sama kaya di migration
        allowNull: false,
    })
    declare status: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare no_meja: number;

    @HasMany(() => Order_Menu, {
        foreignKey: "order_id",
        as: "orderMenuRelation"
    })
    orderMenuRelation!: Order_Menu[];
}