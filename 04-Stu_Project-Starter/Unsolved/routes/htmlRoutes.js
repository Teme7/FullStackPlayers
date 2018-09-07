var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Stock.findAll({}).then(function(dbStocks) {
      res.render("index", {
        stocks: dbStocks
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/stock/:id", function(req, res) {
    db.Stock.findOne({ where: { id: req.params.id } }).then(function(dbStock) {
      res.render("stock", {
        stock: dbStock
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
