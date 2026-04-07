import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    HasMany,
    BelongsTo
} from "sequelize-typescript";
import { Menu } from "./Menu";
import { Order_Menu } from "./OrderMenu";

@Table({
    tableName: "Opsi_Menu",
    timestamps: true,
})

export class Opsi_Menu extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare id: string;

    @Column({
        type: DataType.UUIDV4,
        allowNull: true,
    })
    menu_id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nama!: string;

    @Column({
        type: DataType.REAL,
        allowNull: false,
    })
    harga_tambahan!: number;
    
    @BelongsTo(() => Menu, "menu_id")
    menu!: Menu

    @HasMany(() => Order_Menu, {
            foreignKey: "mo_id",
            as: "orderMenuRelation"
        })
    orderMenuRelation!: Order_Menu[];
}
