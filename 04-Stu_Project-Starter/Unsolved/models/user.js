module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
      // Giving the Author model a name of type STRING
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },

    password: {
      type : DataTypes.STRING,
      allowNull : false
    },

    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    }
  });
  
  User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Stock, {
      onDelete: "cascade"
    });
  };
  
    return User;
  };