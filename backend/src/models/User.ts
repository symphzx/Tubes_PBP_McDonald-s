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
  paranoid: true,
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
  declare nama: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.ENUM("Admin", "Cashier"),
    allowNull: false,
  })
  declare role: "Admin" | "Cashier";

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare forget_token: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare forget_token_expired: Date;
}
