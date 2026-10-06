import { Router } from "express";
import { Blog } from "../models/index.js";
import { errorHandler } from "../middlewares/error.js";

const router = Router();

async function blogFinder(req, res, next) {
  const id = req.params.id;
  const blog = await Blog.findByPk(id);

  if (blog) {
    req.blog = blog;
    next();
  } else {
    res.status(404).end();
  }
}

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs);
});

router.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;

  try {
    const newBlog = await Blog.create({ title, author, url, likes });

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", blogFinder, (req, res) => {
  res.json(req.blog);
});

router.put("/:id", blogFinder, async (req, res) => {
  const { title, author, url, likes } = req.body;

  try {
    await req.blog.update({ title, author, url, likes });

    res.json(req.blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  await req.blog.destroy();
  res.status(204).end();
});

app.use(errorHandler);

export default router;
