var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/stocks", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Post.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbStock) {
      res.json(dbStock);
    });
  });

  app.get("/api/stocks/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbStock) {
      res.json(dbStock);
    });
  });

  // Create a new example
  app.post("/api/stocks", function(req, res) {
    db.Stock.create(req.body).then(function(dbStock) {
      res.json(dbStock);
    });
  });

  // Delete an example by id
  app.delete("/api/stocks/:id", function(req, res) {
    db.Stock.destroy({ where: { id: req.params.id } }).then(function(dbStock) {
      res.json(dbStock);
    });
  });


  // PUT route for updating posts
  app.put("/api/stocks", function(req, res) {
    db.Stock.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbStock) {
      res.json(dbStock);
    });
  });
};  