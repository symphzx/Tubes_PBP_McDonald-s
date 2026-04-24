import { Model } from "sequelize-typescript";
import { Table, PrimaryKey, Column, DataType, HasMany } from "sequelize-typescript";
import { OrderMenu } from "./OrderMenu";


@Table({
    tableName: "Orders",
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
        type: DataType.DATE,
        allowNull: false,
    })
    declare waktu_pemesanan: Date;

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
        allowNull: true,
    })
    declare no_meja: number;

    @Column({
        type: DataType.ENUM("PENDING", "PAID", "CANCELLED"),
        allowNull: false,
    })
    declare status: string;


    @HasMany(() => OrderMenu, {
        foreignKey: "order_id",
        as: "orderMenuRelation"
    })
    orderMenuRelation!: OrderMenu[];
}