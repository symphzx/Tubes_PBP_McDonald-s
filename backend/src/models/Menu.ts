import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    HasMany,
    BelongsTo,
} from "sequelize-typescript";
import { Varian_Menu } from "./VarianMenu";
import { Opsi_Menu } from "./OpsiMenu";
import { Paket_Menu } from "./PaketMenu";
import { Order_Menu } from "./OrderMenu";
import { Kategori } from "./Kategori";

@Table({
    tableName: "Menu",
    timestamps: true,
    paranoid: true
})

export class Menu extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare id: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    kategori_id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nama!: string;

    @Column({
        type: DataType.REAL,
        allowNull: false,
    })
    harga_awal!: number;

    @Column({
        type: DataType.ENUM("Ala Carte", "Paket"),
        allowNull: false,
    })
    tipe!: "Ala Carte" | "Paket";

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    gambar!: string;

    @Column({
        type: DataType.ENUM("Tersedia", "Tidak Tersedia"),
        allowNull: false,
    })
    ketersediaan!: "Tersedia" | "Tidak Tersedia";

    @Column({
        type: DataType.ENUM("Baru!"),
        allowNull: true,
    })
    tag!: "Baru!";

    @BelongsTo(() => Kategori, "kategori_id")
    kategoriRelation!: Kategori
    
    @HasMany(() => Varian_Menu, "menu_id")
    varian_menus!: Varian_Menu[]

    @HasMany(() => Opsi_Menu, "menu_id")
    opsi_menus!: Opsi_Menu[]

    @HasMany(() => Paket_Menu, {
    foreignKey: "menu_id",
    as: "menuRelation"
    })
    menuRelation!: Paket_Menu[];

    @HasMany(() => Paket_Menu, {
        foreignKey: "paket_id",
        as: "paketRelation"
    })
    paketRelation!: Paket_Menu[];
    
    @HasMany(() => Order_Menu, {
        foreignKey: "menu_id",
        as: "orderMenuRelation"
    })
    orderMenuRelation!: Order_Menu[];
}
