import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
} from "sequelize-typescript";

@Table({
    tableName: "User",
    timestamps: true,
    paranoid: true
})

export class User extends Model {
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
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.ENUM("Admin", "Cashier"),
        allowNull: false,
    })
    role!: "Admin" | "Cashier";
}
