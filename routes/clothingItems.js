const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems); // Read
router.post("/", createItem); // Create
router.delete("/:itemId", deleteItem); // Delete
router.put("/:itemId/likes", likeItem); // Like
router.delete("/:itemId/likes", dislikeItem); // Dislike

module.exports = router;
