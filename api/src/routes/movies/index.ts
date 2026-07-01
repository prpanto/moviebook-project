import { Router } from "express";
import { Movie, Comment } from "./controllers";
import { validator } from "@/middlewares";
import schema from "./schema";

const router: Router = Router();

router.get("/search", Movie.search);
router.get("/list", Movie.list);
router.get("/:id/credits", Movie.credits);
router.get("/:id", Movie.detail);

router.get("/:movie/comments", Comment.index);
router.get("/:movie/comments/:id", Comment.show);
router.post("/:movie/comments", validator(schema.comment), Comment.store);
router.patch("/:movie/comments/:id", validator(schema.comment), Comment.update);
router.delete("/:movie/comments/:id", Comment.destroy);

export default router;
