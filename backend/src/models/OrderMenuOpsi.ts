import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  BelongsTo,
} from "sequelize-typescript";
import { OrderMenu } from "./OrderMenu";
import { Opsi_Menu } from "./OpsiMenu";

@Table({
  tableName: "OrderMenu_Opsi",
  timestamps: true,
  paranoid: true,
})
export class OrderMenu_Opsi extends Model {
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
  order_menu_id!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  mo_id!: string;

  @Column({
    type: DataType.REAL,
    allowNull: false,
    defaultValue: 0,
  })
  harga_tambahan!: number;

  @BelongsTo(() => OrderMenu, "order_menu_id")
  orderMenu!: OrderMenu;

  @BelongsTo(() => Opsi_Menu, "mo_id")
  opsiMenu!: Opsi_Menu;
}