const db = require('../models');
const Order = db.order;
const Orderitem = db.orderitem;
const Restaurant = db.restaurant;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    const order_data = req.body.order;
    const order_item = req.body.order_item;

    const order = await Order.create(order_data);

    let items = order_item;
    items = items.map(({orderId= order.id, ...res}) => ({orderId, ...res}));
    
    await Orderitem.bulkCreate(items)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occured when create order'
            })
        });
}

exports.getList = (req, res) => {
    const data = req.params;

    console.log(data);

    let userid = data.userId;
    let offset = data.offset;

    Order.findAll({
        attributes: [
            'id',
            'createdAt',
            'total',
            'order_date'
        ],
        where: {
            userId: {
                [Op.eq]: userid
            }
        },
        order:[
            ['createdAt', 'ASC']
        ],
        offset: parseInt(offset),
        limit: 20,
        include: [{
            model: Orderitem,
            required: true,
            include:[{
                model: Restaurant,
                require: true,
                attributes: ['name']
            }]
        }]
    }).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while try get data'
        })
    })
}