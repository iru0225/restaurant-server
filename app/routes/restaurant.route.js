module.exports = app => {
    const restaurant = require('../controllers/restaurant.controller');

    let router = require('express').Router();

    router.post('/bulkCreate', restaurant.bulkCreate);
    router.get('/:days.:time.:offset', restaurant.getData);

    app.use('/api/restaurant', router);
}