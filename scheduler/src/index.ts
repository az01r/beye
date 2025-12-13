import { config } from "dotenv";
config();
import express from "express";
import notFoundRouter from "./routes/not-found-router.js";
import errorRouter from "./routes/error-router.js";
import scheduleRouter from "./routes/schedule-router.js";
import helmet from "helmet";
import corsManager from "./util/corsManager.js";
import sequelize from "./util/sequelize.js";
import defineAssociations from "./models/associations.js";
import { initScheduler } from "./util/query-scheduler.js";

defineAssociations();

await sequelize.sync();

await sequelize.authenticate();
console.log("\x1b[32mConnected to MySql\x1b[0m");

await initScheduler();

const app = express();

app.use(express.json());

app.use(helmet()); // Security headers

app.use(corsManager);

app.use("/schedules", scheduleRouter);

app.use(notFoundRouter);

app.use(errorRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `\x1b[32m\Server listening on port \x1b[34m${process.env.PORT}\x1b[0m`
  );
});
