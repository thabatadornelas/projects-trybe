const createUserModel = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  // criar relacionamento entre a Users e Posts.
  users.associate = (models) => {
    users.hasMany(models.Posts, {
      foreingKey: 'userId',
      as: 'Post',
    });
  };

  return users;
};

module.exports = createUserModel;
