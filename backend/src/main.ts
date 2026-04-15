import express from "express";
import { Sequelize } from "sequelize-typescript";
import { Menu } from "./models/Menu";
import { appConfig } from "./appConfig";
import { Varian_Menu } from "./models/VarianMenu";
import { Opsi_Menu } from "./models/OpsiMenu";
import { Paket_Menu } from "./models/PaketMenu";
import { Order } from "./models/Order";
import { Order_Menu } from "./models/OrderMenu";
import { Kategori } from "./models/Kategori";

const sequelize = new Sequelize({
    username: appConfig.database.username,
    password: appConfig.database.password,
    database: appConfig.database.database,
    host: appConfig.database.host,
    port: appConfig.database.port,
    dialect: appConfig.database.dialect,
    models: [Kategori, Menu, Varian_Menu, Opsi_Menu, Paket_Menu, Order, Order_Menu],
});

const app = express();

app.use(express.json());

const menuRouter = express.Router();
app.use('/menu', menuRouter)

menuRouter.get("/", async (req, res) => {
    res.json({
        records: await Menu.findAll({
            // where: {
            //     ketersediaan: "Tersedia",
            // },
            // order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Varian_Menu,
                },
                {
                    model: Opsi_Menu,
                },
                {
                    model: Paket_Menu, as: "menuRelation"
                    
                },
                {
                    model: Paket_Menu, as: "paketRelation"
                    
                },
            ],
        }),
    });
});

app.use("/uploads", express.static("uploads"));

const PORT = appConfig.server.port;
app.listen(PORT, () => {
    console.log("Server started!");
});