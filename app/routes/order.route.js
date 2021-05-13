module.exports = app => {
    const order = require('../controllers/order.controller');

    let route = require('express').Router();

    route.post('/', order.create);
    route.get('/:userId.:offset', order.getList);

    app.use('/api/order', route);
}