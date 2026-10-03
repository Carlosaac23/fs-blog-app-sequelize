import { Sequelize, QueryTypes } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

async function main() {
  try {
    await sequelize.authenticate();
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT });
    blogs.map((blog) => console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`));
    sequelize.close();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

main();
