module.exports = function(sequelize, DataTypes) {
  var Stock = sequelize.define("Stock", {
    symbol: DataTypes.STRING,
    companyName: DataTypes.TEXT
  });
  return Stock;
};
