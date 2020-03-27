const { v4: uuidv4 } = require('uuid');
const models = require('../database/models');
const { sendSuccessResponse } = require('../utils/response');
const { filterFields } = require('../utils/filter');

const acceptedFields = ['items'];

exports.getOrders = async ctx => {
  const user = ctx.state.user;

  const orders = await models.Order.findAll({ where: { userId: user.id } });
  sendSuccessResponse(ctx, orders);
};

exports.getOrder = async ctx => {
  const orderId = ctx.params.orderId;

  try {
    const order = await models.Order.findAll({ where: { orderId } });
    sendSuccessResponse(ctx, order);
  } catch (er) {
    ctx.throw(404, `Order not found`);
  }
};

exports.createOrder = async ctx => {
  const filteredBody = filterFields(ctx.request.body, acceptedFields);
  const userId = ctx.state.user.id;
  const orderId = uuidv4();

  const data = [];
  for (let { id, quantity } of filteredBody.items) {
    data.push({
      orderId,
      userId,
      itemId: id,
      quantity
    });
  }

  const orders = await models.Order.bulkCreate(data, { returning: true });

  sendSuccessResponse(ctx, orders, 201);
};