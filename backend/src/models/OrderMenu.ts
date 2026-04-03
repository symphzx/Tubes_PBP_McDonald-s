import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo, } from "sequelize-typescript";
import { Order } from "./Order";
import { Menu } from "./Menu";
import { Varian_Menu } from "./VarianMenu";
import { Opsi_Menu } from "./OpsiMenu";

@Table({
  tableName: "Order_Menu",
  timestamps: true,
})
export class Order_Menu extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  order_id!: string;

  @ForeignKey(() => Menu)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  menu_id!: string;

  @ForeignKey(() => Varian_Menu)
  @Column({
    type: DataType.UUID,
    allowNull: true
  })
  mv_id!: string;

  @ForeignKey(() => Opsi_Menu)
  @Column({
    type: DataType.UUID,
    allowNull: true
  })
  mo_id!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.REAL,
    allowNull: false,
  })
  harga_awal!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @BelongsTo(() => Menu)
  menu!: Menu;
}
