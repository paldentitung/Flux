import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: {
      type: String,
      default: "",
      trim: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],
    viewers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        viewedAt: {
          type: Date,
          default: Date.now,
        },
        _id: false,
      },
    ],
  },
  { timestamps: true },
);

// TTL index — Mongo auto-deletes the document 24h after createdAt
storySchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const Story = mongoose.model("Story", storySchema);

export default Story;
