import { Sequelize } from "sequelize-typescript";
import { appConfig } from "../appConfig";

import { Menu } from "../models/Menu";
import { Varian_Menu } from "../models/VarianMenu";
import { Opsi_Menu } from "../models/OpsiMenu";
import { Paket_Menu } from "../models/PaketMenu";
import { Order } from "../models/Order";
import { Order_Menu } from "../models/OrderMenu";
import { User } from "../models/User";
import { Kategori } from "../models/Kategori";

export const sequelize = new Sequelize({
  username: appConfig.database.username,
  password: appConfig.database.password,
  database: appConfig.database.database,
  host: appConfig.database.host,
  port: appConfig.database.port,
  dialect: appConfig.database.dialect,
  models: [Kategori, Menu, Varian_Menu, Opsi_Menu, Paket_Menu, Order, Order_Menu, User],
});
