//importing express, routes, sequelize, path for static fies and the helpers
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');

//importing sessions for logged in sessions
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//importing handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});

//local and online ports
const app = express();
const PORT = process.env.PORT || 3001;

//making json objects and array data to be usable 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//path for the scripts and styles
app.use(express.static(path.join(__dirname, 'public')));

//using the sessions imports
app.use(session(sess));

//setting handlebars as the engine
app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');

//uing the controllers
app.use(routes);

//starting up the server
sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,() =>console.log("Now listening"));
});