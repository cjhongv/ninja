if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const indexRouter = require('./routes/indexRoute');
const methodOverride = require('method-override')


app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true, useUnifiedTopology: true,
  })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to mongodb'));

app.use(indexRouter);

app.use((req, res) => {
  res.render('404', {title: 'page not found'});
})

app.listen(process.env.PORT || 3000);