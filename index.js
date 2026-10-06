import { Sequelize, Model, DataTypes } from "sequelize";
import express from "express";

const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  },
);

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  const blog = await Blog.create(req.body);

  res.json(blog);
});

app.delete("/api/blogs/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.destroy({
    where: {
      id: id,
    },
  });

  res.status(204).end();
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
