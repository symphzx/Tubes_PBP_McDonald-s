import { Model } from "sequelize-typescript";
import { Table, PrimaryKey, Column, DataType, HasMany } from "sequelize-typescript";
import { Order_Menu } from "./OrderMenu";


@Table({
    tableName: "orders",
    timestamps: true,
})

export class Orders extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare order_id: string;

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
        type: DataType.ENUM("PENDING", "PAID", "CANCELLED"),
        allowNull: false,
    })
    declare status: string;

    @HasMany(() => Order_Menu, 'order_id')
    orderMenu!: Order_Menu[];
}

