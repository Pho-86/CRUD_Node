module.exports = app => {
  const elements = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new element
  router.post("/", elements.create);

  // Retrieve all elements
  router.get("/", elements.findAll);

  // Get all published elements
  router.get("/published", elements.findAllPublished);

  // Get a single element with id
  router.get("/:id", elements.findOne);

  // Update a element with id
  router.put("/:id", elements.update);

  // Delete a element with id
  router.delete("/:id", elements.delete);

  // Delete all elements
  router.delete("/", elements.deleteAll);

  app.use('/api/elements', router);
};
