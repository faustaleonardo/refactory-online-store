'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'Payment',
    {
      orderId: DataTypes.UUID,
      userId: DataTypes.INTEGER,
      discount: {
        type: DataTypes.SMALLINT,
        defaultValue: 0
      },
      deliveryCost: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      courier: DataTypes.STRING,
      finalPrice: DataTypes.DECIMAL,
      statusPayment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      expiredTime: DataTypes.DATE,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {}
  );
  Payment.associate = function(models) {
    Payment.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'user'
    });
  };
  return Payment;
};
