const sql = require("./db.js");

// constructor
const Element = function(element) {
  this.title = element.title;
  this.description = element.description;
  this.published = element.published;
};

Element.create = (newElement, result) => {
  sql.query("INSERT INTO tutorials SET ?", newElement, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created element: ", { id: res.insertId, ...newElement });
    result(null, { id: res.insertId, ...newElement });
  });
};

Element.findById = (id, result) => {
  sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found element: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Element with the id
    result({ kind: "not_found" }, null);
  });
};

Element.getAll = (title, result) => {
  let query = "SELECT * FROM tutorials";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("elements: ", res);
    result(null, res);
  });
};

Element.getAllPublished = result => {
  sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("elements: ", res);
    result(null, res);
  });
};

Element.updateById = (id, element, result) => {
  sql.query(
    "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
    [element.title, element.description, element.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Element with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated element: ", { id: id, ...element });
      result(null, { id: id, ...element });
    }
  );
};

Element.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found element with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted element with id: ", id);
    result(null, res);
  });
};

Element.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} elements`);
    result(null, res);
  });
};

module.exports = Element;
