const { z } = require("zod");

const upsertPostSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    content: z.string().min(1),
    status: z.enum(["draft", "published"]).optional(),
  }),
});

module.exports = {
  upsertPostSchema,
};
