module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('order', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        total: {
            type: Sequelize.DOUBLE,
            allowNUll: false
        },
        order_date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    return Order
}