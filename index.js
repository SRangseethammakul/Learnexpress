const path =require('path');

const express = require('express');

const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs({ extname : 'hbs' }));
app.set('view engine', 'hbs');


const restaurantsRouter = require('./routes/restaurants');
const indexRouter = require('./routes');

const logger = require('./middleware/logger');

//Middleware 
app.use(express.json()); //ทำให้อ่าน req.body ได้
app.use(express.urlencoded({
    extended : false
}));
app.use(express.static(path.join(__dirname, 'public')));
//custom middle are
app.use(logger);

//Route
app.use('/apis/restaurants', restaurantsRouter);
app.use('/', indexRouter);


app.listen('3000', () => {
    console.log('Port 3000');
});
