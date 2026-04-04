import { Model } from "sequelize-typescript";
import {
    Table,
    PrimaryKey,
    Column,
    DataType,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";

import { Orders } from "./Orders";
import { Menu } from "./Menu";
import { Varian_Menu } from "./VarianMenu";
@Table({
    tableName: "order_menus",
    timestamps: true,
})
export class OrderMenu extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare om_id: string;

    // FK ke Order
    @ForeignKey(() => Orders)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare order_id: string;

    @ForeignKey(() => Menu)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare menu_id: string;

    @ForeignKey(() => Varian_Menu)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    declare mv_id: string;

    // @ForeignKey(() => OpsiMenu)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    declare mo_id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare quantity: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare harga_awal: number;

    // relasi balik ke Order
    @BelongsTo(() => Orders)
    order!: Orders;

    // relasi ke Menu
    @BelongsTo(() => Menu)
    menu!: Menu;

    // relasi ke Varian_Menu
    @BelongsTo(() => Varian_Menu)
    varianMenu!: Varian_Menu;

    // relasi ke OpsiMenu
    // @BelongsTo(() => OpsiMenu)
    // opsiMenu!: OpsiMenu;
}