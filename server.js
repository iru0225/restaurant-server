const express = require('express');
const cors = require('cors');

// Models
const db = require('./app/models');

// initialized app
const app = express();

// cors white list
let whiteList = [
    'http://localhost:8081',
    'http://localhost:3000'
];
let corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by Cors!'));
        }
    }
}

// set white list in app
app.use(cors(corsOptions));

// parse request application/json
app.use(express.json());

// parse request x-www-form-urlencode
app.use(express.urlencoded({
    extended: true
}));

// sync database
const Restaurant = db.restaurant;

db.sequelize.sync();

// Routes
require('./app/routes/http.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT);