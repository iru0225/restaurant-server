const db = require('../models');
const csvtojson = require('csvtojson');
const async = require('async');
const Restaurant = db.restaurant;
const Op = db.Sequelize.Op;

exports.getData = (req, res) => {
    const data = req.params;

    let day = data.days;
    let time = data.time;
    let offset = data.offset

    Restaurant.findAll({
        attributes: [
            'id', 'name', 'setOne', 'setTwo', 'setThree', 'setFour', 'setFive', 'offDay1', 'offDay2', 'start_time', 'end_time'
        ],
        where: {
            start_time: {
                [Op.lte]: time
            },
            end_time: {
                [Op.gte]: time
            },
            offDay1: {
                [Op.ne]: day
            },
            offDay2: {
                [Op.ne]: day
            }
        },
        offset: parseInt(offset),
        limit: 20
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occured while find data'
        })
    });
}

exports.bulkCreate = (req, res) => {
    const file = require.resolve('../assets/csv/data.csv');

    csvtojson().fromFile(file).then(source => {
        let newData = source.map(e => {
            let temp = Object.assign({}, e);
            let operation = temp.operationHours.split(' - ');
            let offDays = temp.offDays.split(',');

            temp.start_time = `${operation[0].substring(0, operation[0].length - 2)}:00:00`;
            temp.end_time = `${(parseInt(operation[1].substring(0, operation[1].length - 2)) + 12).toString()}:00:00`;

            temp.offDay1 = offDays[0];
            temp.offDay2 = offDays[2];
            return temp;
        });

        let littleData = [];
        let chunk = 2500;

        for (let i = 0; i < newData.length; i+= chunk) {
            temp = newData.slice(i, i+chunk);
            littleData.push(temp);
        }

        async.times(littleData.length, (n, callback) => {
            Restaurant.bulkCreate(littleData[n])
                .then((result) => {
                    callback(result);
                }).catch((err) => {
                    res.status(500).send({
                        message: err.message || 'Some error occured when create new data'
                    })
                })
        }, function(result){
            res.send(result);
        });
    });
}