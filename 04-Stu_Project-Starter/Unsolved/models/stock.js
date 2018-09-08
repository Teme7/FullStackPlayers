module.exports = function(sequelize, DataTypes) {
  var Stock = sequelize.define("Stock", {
    symbol: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },

    companyName: {
       type : DataTypes.STRING,
       allowNull : false,
       unique : true
    }
  });

  Stock.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Stock.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Stock;
};
