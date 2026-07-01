import { z } from "zod";

const movieComment = z.object({
  content: z.string("Content must include."),
  parent: z.string().nullable().optional(),
});

export type MovieCommentInput = z.infer<typeof movieComment>;

const schema = {
  comment: movieComment,
};

export default schema;
