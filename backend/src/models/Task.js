import mongoose from "mongoose";

const taskSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true
      },

      title: {
        type: String,

        required: true,

        trim: true,

        maxlength: 150
      },

      description: {
        type: String,

        trim: true,

        maxlength: 2000,

        default: ""
      },

      status: {
        type: String,

        enum: [
          "TODO",
          "IN_PROGRESS",
          "DONE"
        ],

        default: "TODO",

        index: true
      },

      priority: {
        type: String,

        enum: [
          "LOW",
          "MEDIUM",
          "HIGH"
        ],

        default: "MEDIUM",

        index: true
      },

      dueDate: {
        type: Date,

        default: null,

        index: true
      }
    },

    {
      timestamps: true
    }
  );

taskSchema.index({
  user: 1,
  status: 1,
  priority: 1
});

taskSchema.index({
  user: 1,
  title: "text",
  description: "text"
});

export default mongoose.model(
  "Task",
  taskSchema
);