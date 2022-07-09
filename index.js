require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileupload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileupload({}));
app.use('/api', router);
app.use(errorHandler);

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