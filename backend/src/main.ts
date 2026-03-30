import express from "express";
import { Sequelize } from "sequelize-typescript";
import { Menu } from "./models/Menu";
import { appConfig } from "./appConfig";
import { Varian_Menu } from "./models/VarianMenu";

const sequelize = new Sequelize({
    username: appConfig.database.username,
    password: appConfig.database.password,
    database: appConfig.database.database,
    host: appConfig.database.host,
    port: appConfig.database.port,
    dialect: appConfig.database.dialect,
    models: [Menu, Varian_Menu],
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
            ],
        }),
    });
});

const PORT = appConfig.server.port;
app.listen(PORT, () => {
    console.log("Server started!");
});