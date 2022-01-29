const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const res = require('express/lib/response');
const Cafedra = require('./models/cafedra');
const Contact = require('./models/contact');


const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://SnowPanther37:Stalker14545@cluster0.yneog.mongodb.net/voodle?retryWrites=true&w=majority';

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to DataBase'))
    .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`)

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

app.get('/contacts', (req, res) => {
    const title = 'Контакты'
    Contact
        .find()
        .then((contacts) => res.render(createPath('contacts'), {contacts, title}))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' })
        });
});


app.get('/about-us', (req, res) => {
    res.redirect('/contacts')
})

app.get('/cafedras/:id', (req, res) => {
    const title = 'Кафедра'
    Cafedra
        .findById(req.params.id)
        .then((cafedra) => res.render(createPath('cafedra'), {cafedra, title}))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' })
        });
})

app.delete('/cafedras/:id', (req, res) => {
    const title = 'Кафедра'
    Cafedra
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' })
        });
})

app.get('/edit/:id', (req, res) => {
    const title = 'Редактирование Кафедры'
    Cafedra
        .findById(req.params.id)
        .then((cafedra) => res.render(createPath('edit-cafedra'), {cafedra, title}))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' })
        });
})

app.put('/edit/:id', (req, res) => {
    const { title, dekan, text, redirect } = req.body;
    const { id } = req.params;
    Cafedra
        .findByIdAndUpdate(id, { title, dekan, text, redirect })
        .then((result) => res.redirect(`/cafedras/${id}`))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' })
        });
})

app.get('/cafedras', (req, res) => {
    const title = 'Кафедры'
    Cafedra
        .find()
        .sort({ createdAt: -1 })
        .then((cafedras) => res.render(createPath('cafedras'), {cafedras, title}))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' })
        });
});

app.post('/add-cafedra', (req, res) => {
    const { title, dekan, text, direction } = req.body;
    const cafedra = new Cafedra({ title, dekan, text, direction });
    cafedra
        .save()
        .then((result) => res.redirect('/cafedras'))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' })
        })
});

app.get('/add-cafedra', (req, res) => {
    const title = 'Добавление кафедры'
    res.render(createPath('add-cafedra'), {title});
})


app.use((req, res) => {
    const title = 'Ошибка'
    res
       .status(404)
       .render(createPath('error'), {title});
});