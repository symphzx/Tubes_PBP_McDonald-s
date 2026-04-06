import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Order } from "./Order";

@Table({
  tableName: "Payment",
  timestamps: true,
})
export class Payment extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  order_id!: string;

  @Column({
    type: DataType.ENUM("DEBIT", "QRIS", "CASHIER"),
    allowNull: false,
  })
  metode_pembayaran!: "DEBIT" | "QRIS" | "CASHIER";

  @Column({
    type: DataType.ENUM("PENDING", "PAID", "CANCELLED"),
    allowNull: false,
    defaultValue: "PENDING",
  })
  status!: "PENDING" | "PAID" | "CANCELLED";

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  paid_at!: Date;

  @BelongsTo(() => Order)
  order!: Order;
}
