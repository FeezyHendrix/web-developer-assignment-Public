import { Router, Request, Response } from "express";
import { createNewPost, deletePosts, getPosts } from "../db/posts/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const requiredKeys: (keyof PostPayload)[] = ["title", "body", "userId"];
    const body = req.body;

    const errors: string[] = [];
    requiredKeys.forEach((key) => {
      if (!Object.keys(body).includes(key)) {
        errors.push(`${key} is missing`);
      }
    });

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    await createNewPost(body.title, body.body, body.userId);
    res.status(200).send({ message: "Post created successfully" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Unable to create post" });
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      res.status(400).send({ error: "id is required" });
      return;
    }

    await deletePosts(postId);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "An error occured" });
  }
});

export default router;
