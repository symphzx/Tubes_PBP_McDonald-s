import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo, HasMany, } from "sequelize-typescript";
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

  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  order_id!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  menu_id!: string;

  @Column({
    type: DataType.UUID,
    allowNull: true
  })
  mv_id!: string;

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

  @BelongsTo(() => Order, "order_id")
  order!: Order;

  @BelongsTo(() => Menu, "menu_id")
  menu!: Menu;

  @BelongsTo(() => Varian_Menu, "mv_id")
  varian_menu!: Varian_Menu;

  @BelongsTo(() => Opsi_Menu, "mv_id")
  opsi_menu!: Opsi_Menu;
}
