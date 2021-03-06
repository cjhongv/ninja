if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const indexRouter = require('./routes/indexRoute');


app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true, useUnifiedTopology: true,
  })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to mongodb'));

app.use(indexRouter);


app.listen(process.env.PORT || 3000);