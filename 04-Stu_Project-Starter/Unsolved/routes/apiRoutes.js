var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/stocks", function(req, res) {
    db.Stock.findAll({}).then(function(dbStocks) {
      res.json(dbStocks);
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
};
