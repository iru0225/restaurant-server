module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNUll: false
        }
    });

    return User;
}