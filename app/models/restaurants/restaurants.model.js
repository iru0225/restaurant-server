module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define('restaurant', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        setOne: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        setTwo: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        setThree: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        setFour: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        setFive: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        start_time: {
            type: Sequelize.TIME,
            allowNull: false
        },
        end_time: {
            type: Sequelize.TIME,
            allowNull: false
        },
        offDay1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        offDay2: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Restaurant;
}