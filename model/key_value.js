module.exports = (Sequelize, DataTypes) => {
  const KeyValue = Sequelize.define(
    "key_value",
    {
      key: {
        type: DataTypes.TEXT
      },
      value: {
        type: DataTypes.JSON
      },
      timestamp: {
        type: DataTypes.DATE
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "key_value",
      timestamps: false,
    }
  );
  return KeyValue;
};
