import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const MYSQL_URI = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DB}`;

const sequelize = new Sequelize(MYSQL_URI);

export default sequelize;