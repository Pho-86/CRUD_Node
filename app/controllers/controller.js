const Element = require("../models/model.js");

// Create and Save a new Element
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Element
  const element = new Element({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Element in the database
  Element.create(element, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Element."
      });
    else res.send(data);
  });
};

// Retrieve all Elements from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Element.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving elements."
      });
    else res.send(data);
  });
};

// Find a single Element by Id
exports.findOne = (req, res) => {
  Element.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Element with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Element with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Elements
exports.findAllPublished = (req, res) => {
  Element.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving elements."
      });
    else res.send(data);
  });
};

// Update a Element identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Element.updateById(
    req.params.id,
    new Element(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Element with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Element with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Element with the specified id in the request
exports.delete = (req, res) => {
  Element.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Element with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Element with id " + req.params.id
        });
      }
    } else res.send({ message: `Element was deleted successfully!` });
  });
};

// Delete all Elements from the database.
exports.deleteAll = (req, res) => {
  Element.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all elements."
      });
    else res.send({ message: `All Elements were deleted successfully!` });
  });
};
