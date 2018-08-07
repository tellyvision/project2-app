module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define("comments", {
    commentor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  comments.associate = function(models) {
    comments.belongsTo(models.artposts, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return comments;
};
