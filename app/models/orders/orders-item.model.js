module.exports = (sequelize, Sequelize) => {
    const Orderitem = sequelize.define('orderitem', {
        item: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        qty: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        subtotal: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        currency: {
            type: Sequelize.STRING(10),
            allowNull: false
        }
    });

    return Orderitem;
}