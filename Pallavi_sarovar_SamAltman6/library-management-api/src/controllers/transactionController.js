const transactionModel = require("../models/transactionModel");

async function getAll(req, res, next) {
  try {
    res.json(await transactionModel.all());
  } catch (error) {
    next(error);
  }
}

async function getMy(req, res, next) {
  try {
    res.json(await transactionModel.byUser(req.user.userId));
  } catch (error) {
    next(error);
  }
}

module.exports = { getAll, getMy };