const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const res = require('express/lib/response');
const cafedraRoutes = require('./routes/cafedra-routes');
const cafedraApiRoutes = require('./routes/api-cafedra-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');
const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://SnowPanther37:Stalker14545@cluster0.yneog.mongodb.net/voodle?retryWrites=true&w=majority';

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to DataBase'))
    .catch((error) => console.log(error));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
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