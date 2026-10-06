import express from "express";
import { env } from "./utils/config.js";
import { connectToDatabase } from "./utils/db.js";
import blogsRouter from "./controllers/blogs.js";

const app = express();

app.use(express.json());

app.use("/api/blogs", blogsRouter);

async function startServer() {
  await connectToDatabase();
  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

startServer();
