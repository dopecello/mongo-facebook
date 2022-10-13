const router = require("express").Router();

const {
  getAllThoughts,
  getOneThought,
  addThought,
  updateThought,
  removeThought,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts);

router.route("/:thoughtId").get(getOneThought);

router.route("/:userId").post(addThought);

router.route("/:userId/:thoughtId").put(updateThought).delete(removeThought);

module.exports = router;
