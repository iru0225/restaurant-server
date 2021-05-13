const db = require('../models');
const User = db.user;
const bcrypt = require('bcrypt');
const saltRounds = 12
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const data = req.body;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(data.password, salt, (err, hash) => {
            let values = {
                name: data.name,
                username: data.username,
                password: hash
            }
            
            User.create(values).then((result) => {
                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'username or password not match'
                    })
                }


                res.send(result);
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occured while create user'
                })
            })
        })
    });
}

exports.login = async (req, res) => {
    const data = req.body;
    
    const userData = await User.findOne({
        attributes: [
            'password', 'name'
        ],
        where: {
            username: {
                [Op.eq]: data.username
            }
        }
    }).then((result) => {
        return result
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'username or password incorrect'
        })
    });

    if (userData.length == 0) {
        return res.status(400).send({
            message: 'username or password incorrect'
        })
    }

    try {
        if (await bcrypt.compare(data.password, userData.password)) {
            return res.send(userData);
        }
        
        res.status(400).send({
            message: 'username or password incorrect'
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occured while try to login'
        })
    }
}