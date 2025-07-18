import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isApproved: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comment", CommentSchema);

export default CommentModel;
