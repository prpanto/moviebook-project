import { Router } from "express";
import { Feed, Comment, Like } from "./controllers";
import { validator } from "@/middlewares";
import schema from "./schema";

const router: Router = Router()

router.get("/", Feed.index);
router.get("/:id", Feed.show);
router.post("/", validator(schema.feed.store), Feed.store);
router.patch("/:id", validator(schema.feed.update), Feed.update);
router.delete("/:id", Feed.destroy);

router.get("/:feed/likes/all", Like.index);
router.get("/:feed/likes", Like.show);
router.post("/:feed/likes", Like.store);
router.delete("/:feed/likes/:id", Like.destroy);

router.get("/:feed/comments", Comment.index);
router.get("/:feed/comments/:id", Comment.show);
router.post("/:feed/comments", validator(schema.comment), Comment.store);
router.patch("/:feed/comments/:id", validator(schema.comment), Comment.update);
router.delete("/:feed/comments/:id", Comment.destroy);

export default router
