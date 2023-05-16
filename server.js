const path = require('path');
//port
const express = require('express');
// routes and errer
const routes = require('./controllers');
//todo graph
const sequelize = require('./config/connection');
//todo timer
const helpers = require('./utils/helpers');
//handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: "super secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10, // will check every 10 minutes
        expiration: 1000 * 60 * 30 // will expire after 30 minutes
    })
};
//port to load the information
const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);
// sync the chart
sequelize.sync();

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});