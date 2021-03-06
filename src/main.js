const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');  
const { engine } = require('express-handlebars');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;
const route = require('./routes/index.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// HTTP protocol logger
app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');

// Set folder of template
app.set('views', path.join(__dirname, 'resources/views'));

// Routes init
route(app);

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`),
);
