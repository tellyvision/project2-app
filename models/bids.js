module.exports = function(sequelize, DataTypes) {
  var bids = sequelize.define("bids", {
    bidder: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bidAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  bids.associate = function(models) {
    //bid belongs to artpost
    bids.belongsTo(models.artposts, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return bids;
};
