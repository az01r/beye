import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const DB_URI = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(DB_URI, {
    dialect: 'mysql',
    logging: false,
});

export default sequelize;