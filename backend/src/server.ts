import app from "./app";
import { sequelize } from "./config/database";
import { appConfig } from "./appConfig";

const PORT = appConfig.server.port;

sequelize.authenticate().then(() => {
  console.log("Database connected!");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
