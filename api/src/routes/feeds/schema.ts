import { z } from "zod";

const feedStore = z.object({
  movie_id: z.string(),
  rating: z.coerce.number().min(1).max(5).default(1),
  content: z.string("Content must include.").default(""),
});

const feedUpdate = z.object({
  rating: z.coerce.number().min(1).max(5).optional(),
  content: z.string("Content must include.").optional(),
});

const feedComment = z.object({
  content: z.string("Content must include."),
  parent: z.string().nullable().optional(),
});

export type FeedStoreInput = z.infer<typeof feedStore>;
export type FeedUpdateInput = z.infer<typeof feedUpdate>;
export type FeedCommentInput = z.infer<typeof feedComment>;

const schema = {
  feed: {
    store: feedStore,
    update: feedUpdate,
  },
  comment: feedComment,
};

export default schema;
