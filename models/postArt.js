module.exports = function(sequelize, DataTypes) {
    var postArt = sequelize.define("postArt", {

        artTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        artUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },

        artistName: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    return postArt;
    
  };
  