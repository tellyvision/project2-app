module.exports = function(sequelize, DataTypes) {
  var artposts = sequelize.define("artposts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    URL: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return artposts;
};
