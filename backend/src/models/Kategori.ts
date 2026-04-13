import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    HasMany,
} from "sequelize-typescript";
import { Menu } from "./Menu";

@Table({
    tableName: "Kategori",
    timestamps: true,
    paranoid: true
})

export class Kategori extends Model {
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

    @HasMany(() => Menu, "kategori_id")
    menuRelation!: Menu
}