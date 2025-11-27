import { config } from "dotenv";
config();
import express from "express";
import authRouter from "./routes/auth-router.js";
import notFoundRouter from "./routes/not-found-router.js";
import errorRouter from "./routes/error-router.js";
import dbsRouter from "./routes/dbs-router.js";
import helmet from "helmet";
import corsManager from "./util/corsManager.js";
import sequelize from "./util/sequelize.js";
import defineAssociations from "./models/associations.js";

defineAssociations();

await sequelize.sync();

await sequelize.authenticate();
console.log("\x1b[32mConnected to MySql\x1b[0m");

const app = express();

app.use(express.json());

app.use(helmet()); // Security headers

app.use(corsManager);

app.use("/connections", dbsRouter);

app.use("/auth", authRouter);

app.use(notFoundRouter);

app.use(errorRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `\x1b[32m\Server listening on port \x1b[34m${process.env.PORT}\x1b[0m`
  );
});
