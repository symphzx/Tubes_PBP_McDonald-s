import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { Order_Menu } from "./OrderMenu";
import { Payment } from "./Payment";

@Table({
  tableName: "Order",
  timestamps: true,
})
export class Order extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.REAL,
    allowNull: false,
  })
  total_harga!: number;

  @Column({
    type: DataType.ENUM("DINE_IN", "TAKE_AWAY"),
    allowNull: false,
  })
  order_type!: "DINE_IN" | "TAKE_AWAY";

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  order_no!: string;

  @Column({
    type: DataType.ENUM("CART", "PAID", "PROCESS", "DONE", "CANCELLED"),
    allowNull: false,
    defaultValue: "CART",
  })
  status!: "CART" | "PAID" | "PROCESS" | "DONE" | "CANCELLED";

  @HasMany(() => Order_Menu)
  items!: Order_Menu[];

  @HasOne(() => Payment)
  payment_detail!: Payment;
}