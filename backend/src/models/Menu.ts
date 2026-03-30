import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    HasMany,
} from "sequelize-typescript";
import { Varian_Menu } from "./VarianMenu";

@Table({
    tableName: "Menu",
    timestamps: true,
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
        type: DataType.ENUM("Burger & McNuggets", "Ayam McD Krispy", "Ayam McD Spicy", "Paket Keluarga", "Happy Meal", "Paket HeBat", "Menu Receh", "McSpaghetti", "Camilan", "Minuman", "Pencuci Mulut", "Nasi"),
        allowNull: false,
    })
    kategori!: "Burger & McNuggets" | "Ayam McD Krispy" | "Ayam McD Spicy" | "Paket Keluarga" | "Happy Meal" | "Paket HeBat" | "Menu Receh" | "McSpaghetti" | "Camilan" | "Minuman" | "Pencuci Mulut" | "Nasi";

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
    
    @HasMany(() => Varian_Menu, "menu_id")
    varian_menus!: Varian_Menu[]
}
