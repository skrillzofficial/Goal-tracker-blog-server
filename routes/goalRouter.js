const router = require("express").Router();
const {
  createGoal,
  getGoals,
  getSingleGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalsController");

//////    Standard Method of structuring your routes domain below;  //////
//== Direct routes;
router.route("/").get(getGoals).post(createGoal);
//== Dynamic routes;
router
  .route("/:goalId")
  .get(getSingleGoal)
  .patch(updateGoal)
  .delete(deleteGoal);

module.exports = router;
