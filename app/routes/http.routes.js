module.exports = app => {
    require('./restaurant.route')(app);
    require('./user.router')(app);
    require('./order.route')(app);
}