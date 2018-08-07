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

  artposts.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated bids
    artposts.hasMany(models.bids, {
      onDelete: "cascade"
    });
    artposts.hasMany(models.comments, {
      onDelete: "cascade"
    });
  };
  return artposts;
};
