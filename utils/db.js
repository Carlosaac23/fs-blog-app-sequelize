import { Sequelize } from "sequelize";
import { env } from "./config.js";

export const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: "postgres",
});

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return process.exit(1);
  }
}
