// create order, cekout dari cart
// 1. bikin data ordernya
// 2. mapping dari cart ke table order_menu
// 3. kalo berhasil, commit. kalo error, rollback (transaction)
// kenapa pake trancaction? krn bikin 1 order kudu pake 2 table (Orders sama Order_Menu)
// get list order

import { Request, Response } from "express"
import { sequelize } from "../config/database"
import { Order } from "../models/Order"
import { Order_Menu } from "../models/OrderMenu"
import { Op } from "sequelize"
import { isBIC } from "class-validator"


export class OrderController {
    // bikin order buat customer
    static async createOrder(req: Request, res:Response) {
        const transaction = await sequelize.transaction()

        try {
            const { order_type, no_meja, items, total_harga } = req.body
            
            // buat generate no_meja sama order_no
            const lastOrder = await Order.findOne({
                order: [['createdAt', 'DESC']],
                transaction
            })

            // konsepnya dapet order_no brdsrkn order_no terakhir
            // klo blm ada last order, otomatis 1
            let nextOrder_no = 1
            if (lastOrder && lastOrder.order_no) {
                nextOrder_no = lastOrder.order_no + 1 
            }

            // konsepnya ngambil semua no_meja yg lagi dipake && status ga completed
            // trus cari no_meja dari 1-50 yg gaada di list occupied
            let assignedTable = 0
            if (order_type === "DINE_IN") {
                const activeOrders = await Order.findAll({
                    attributes: ['no_meja'],
                    where: {
                        status: { [Op.not]: "COMPLETED"},
                        order_type: "DINE_IN"
                    },
                    transaction
                })

                const occupiedTables = activeOrders.map(o => o.no_meja) // ngambil no_meja nya aja dari activeOrders

                for (let i = 1; i <= 50; i++) {
                    if (!occupiedTables.includes(i)) {
                        assignedTable = i
                        break
                    }
                }

                if (assignedTable === 0) {
                    await transaction.rollback()
                    return res.status(400).json({
                        message: "Semua meja penuh"
                    })
                }
            }
            
            // bikin order
            const newOrder = await Order.create({
                waktu_pesanan: new Date().toISOString(),
                total_harga,
                order_type,
                no_meja: order_type === "TAKEAWAY" ? 0 : assignedTable,
                status: "PENDING",
                order_no: nextOrder_no
            },
            {
                transaction
            })

            // bikin detail menu
            const orderItems = items.map((item: any) => ({
                order_id: newOrder.id,
                menu_id: item.menu_id,
                mv_id: item.mv_id || null,
                mo_id: item.mo_id || null,
                quantity: item.quantity,
                harga_awal: item.harga_awal
            }))

            // pake bulkCreate krn mau add banyak data sekaligus
            await Order_Menu.bulkCreate(orderItems, { transaction })

            await transaction.commit()

            return res.status(201).json({
                message: "Order created",
                order_no: newOrder.order_no,
                data: newOrder
            })
        } catch (err: any) {
            await transaction.rollback()
            return res.status(500).json({
                message: err.message
            })
        }
    }

    // list get update order buat admin sama cashier
    // get all
    static async getAllOrders(req: Request, res: Response) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: Order_Menu,
                        as: "orderMenuRelation",
                        include: ["menu", "varian_menu", "opsi_menu"]
                    }
                ],
                order: [['createdAt', 'DESC']]
            })

            return res.status(200).json({
                message: "Bisa get all orders",
                data: orders
            })
        } catch (err: any) {
            return res.status(500).json({
                message: err.message
            })
        }
    }

    // get by id
    static async getOrderById(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).json({
                    message: "ID Order harus diisi"
                })
            }

            const order = await Order.findByPk(id as string, {
                include: [
                    { 
                        model: Order_Menu, 
                        as: "orderMenuRelation",
                        include: ["menu", "varian_menu", "opsi_menu"]
                    }
                ]
            })

            if (!order) {
                return res.status(404).json({
                    message: "Order tidak ditemukan"
                })
            }

            return res.status(200).json({
                data: order
            })
        } catch (err: any) {
            return res.status(500).json({
                message: err.message
            })
        }
    }

    // update order status 
    static async updateOrderStatus(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { status } = req.body 

            if (!id) {
                return res.status(400).json({
                    message: "ID Order harus diisi"
                })
            }

            const order = await Order.findByPk(id as string) // klo gapake as string error aih kneapa ya

            if (!order) {
                return res.status(404).json({
                    message: "Order tidak ditemukan"
                })
            }

            order.status = status
            await order.save()

            return res.status(200).json({
                message: `Status order berhasil diupdate ke ${status}`,
                data: order
            })
        } catch (err: any) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
}