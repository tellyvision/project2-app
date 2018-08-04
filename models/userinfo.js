module.exports = function(Sequelize, DataTypes){
var Post = Sequelize.define("Postinfo", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    userName: {
      type: DataTypes.TEXT,
      allowNull: false,
     
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: "Personal"
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: "Personal"
    },
    password2: {
      type: DataTypes.STRING,
      defaultValue: "Personal"
    }
   
   });
   return Post;
};