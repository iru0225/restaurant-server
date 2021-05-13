const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// model list
db.user = require('./users/users.model')(sequelize, Sequelize);
db.order = require('./orders/orders.model')(sequelize, Sequelize);
db.restaurant = require('./restaurants/restaurants.model')(sequelize, Sequelize);
db.orderitem = require('./orders/orders-item.model')(sequelize, Sequelize);

// table relation
db.order.hasMany(db.orderitem);
db.orderitem.belongsTo(db.order);

db.restaurant.hasMany(db.orderitem);
db.orderitem.belongsTo(db.restaurant);

db.user.hasMany(db.order, {as: 'user'});
db.order.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'order'
});

module.exports = db;