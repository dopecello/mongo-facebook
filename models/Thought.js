const { Schema, Types, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId() // ---> All this does is create a new ObjectId inside parent. Import "Types" from mongoose.
    },
    reactionBody: {
      type: String,
      validate: {
        validator: function (str) {
          if (str.length <= 280) {
            return;
          }
        },
        message: "Don't use more than 280 characters for your reply.",
      },
      required: [true, "What's your reaction?"],
    },
    username: {
      type: String,
      required: [true, "Who wrote this reply?"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      validate: {
        validator: function (str) {
          if (str.length <= 280 && str.length >= 1) {
            return;
          }
        },
        message: "Please keep you thought between 1-280 characters",
      },
      required: [true, "A penny for your thoughts?"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: [true, "Who wrote this thought?"],
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
