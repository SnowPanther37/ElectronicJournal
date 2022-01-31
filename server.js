const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const cafedraRoutes = require('./routes/cafedra-routes');
const cafedraApiRoutes = require('./routes/api-cafedra-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');
const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;


const app = express();

app.set('view engine', 'ejs');

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log(successMsg('Connected to DataBase')))
    .catch((error) => console.log(errorMsg(error)));

app.listen(process.env.PORT, (error) => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`listening port ${process.env.PORT}`));
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Voodle'
    res.render(createPath('index'), {title});
})

app.get('/about-us', (req, res) => {
    res.redirect('/contacts')
})

app.use(cafedraRoutes);
app.use(cafedraApiRoutes);
app.use(contactRoutes);

app.use((req, res) => {
    const title = 'Ошибка'
    res
       .status(404)
       .render(createPath('error'), {title});
});
