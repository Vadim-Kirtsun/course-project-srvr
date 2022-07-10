require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileupload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const events = require('events');

const emitter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileupload({}));
app.use('/api', router);
app.use(errorHandler);

app.get('/get-messages', (reg, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message);
    })
})

app.post('/new-messages', (reg, res) => {
    const message = reg.body;
    emitter.emit('newMessage', message);
    res.status(200);
})


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen((process.env.PORT || 3001), () => console.log(`server started`))
    } catch (e) {
        console.log(e)
    }
}


start();