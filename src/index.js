const express = require('express'); 
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//initiliazations
const app = express();
require('./database');

//settings
let PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layout' ),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname:'.hbs'
}));
app.set('view engine', '.hbs')

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}))

//global variables

//routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//server listening 
app.listen(PORT, () => {
  console.log("Server Listening on port 3000");
});