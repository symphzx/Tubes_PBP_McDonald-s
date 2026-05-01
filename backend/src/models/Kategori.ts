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
    declare nama: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare sortOrder: number;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare startDate: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare endDate: Date;

    @Column({
        type: DataType.TIME,
        allowNull: true,
    })
    declare startTime: string;

    @Column({
        type: DataType.TIME,
        allowNull: true,
    })
    declare endTime: string;

    @HasMany(() => Menu, "kategori_id")
    menuRelation!: Menu[];
}