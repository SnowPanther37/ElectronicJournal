const express = require('express');
//const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
require('dotenv').config();
const methodOverride = require('method-override');
const cafedraRoutes = require('./routes/cafedra-routes');
const prepodRoutes = require('./routes/prepod-routes');
const cafedraApiRoutes = require('./routes/api-cafedra-routes');
const contactRoutes = require('./routes/contact-routes');
const taskRoutes = require('./routes/task-routes');
const profileRoutes = require('./routes/profile-routes');
const createPath = require('./helpers/create-path');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/users-routes');
const cookieParser = require('cookie-parser');
const aboutOurInternships = require("./public/data/aboutOurInternships");
const internshipTracks = require("./public/data/internshipTracks");
const remarksData = require("./public/data/remarksData.js");
const User = require("./models/user");
//const { requireAuth, checkUser } = require('./middleware/authMiddleware');
//const errorMsg = chalk.bgKeyword('white').redBright;
//const successMsg = chalk.bgKeyword('green').white;


const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.json());

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to DataBase'))
    .catch((error) => console.log(error));

app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${process.env.PORT ?? 3000}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('styles'));

app.use(methodOverride('_method'));
app.get('*', checkUser);

app.get("/", async (req, res) => {
    const title = 'Voodle'
    res.render("index", { aboutOurInternships, internshipTracks, remarksData, title });
  });

/* app.get('/', (req, res) => {
    const title = 'Voodle'
    res.render(createPath('index'), {title});
}) */

app.get('/about-us', (req, res) => {
    res.redirect('/contacts')
})

  app.get("/software-development", requireAuth, (req, res) => {
    res.render("./partials/course", { internshipTracks: internshipTracks[0] });
  });
  app.get("/data-analytics", requireAuth, (req, res) => {
    res.render("./partials/course", { internshipTracks: internshipTracks[1] });
  });
  app.get("/marketing-and-sales", requireAuth, (req, res) => {
    res.render("./partials/course", { internshipTracks: internshipTracks[2] });
  });

app.use(authRoutes);
app.use(cafedraRoutes);
app.use(cafedraApiRoutes);
app.use(contactRoutes);
app.use(prepodRoutes);
app.use(taskRoutes);
app.use(profileRoutes);
app.use(usersRoutes);

app.use((req, res) => {
    const title = 'Ошибка'
    res
       .status(404)
       .render(createPath('error'), {title});
});
