const router = require("express").Router();

const {
  getAllThoughts,
  getOneThought,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts);

router.route("/:thoughtId").get(getOneThought);

router.route("/:userId").post(addThought);

router.route("/:userId/:thoughtId").put(updateThought).delete(removeThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
