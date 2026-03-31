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

@Table({
    tableName: "Paket_Menu",
    timestamps: true,
})

export class Paket_Menu extends Model {
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
    paket_id!: string;

    @Column({
        type: DataType.UUIDV4,
        allowNull: true,
    })
    menu_id!: string;
    
    @BelongsTo(() => Menu, "menu_id")
    menuRelation!: Menu

    @BelongsTo(() => Menu, "paket_id")
    paketRelation!: Menu
}
