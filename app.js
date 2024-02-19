const express =require('express');
const app = express()

const CookieParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/errors')
app.use(express.json())
app.use(CookieParser())

app.set('view engine', 'ejs')
app.use(express.static('public'))


// Import All Routes
const auth = require('./routes/auth-route');
const index = require('./routes/index-route');
const user = require('./routes/user-route');



app.use('/api/v1', auth)
app.use('/', index)
app.use('/user',user)
app.get("*", function (req, res, next) {
    res.status(404).render("pages/error404", {
      title: "ParkSafe:Page Not Found",
    });
});


// MiddleWare To handle Errors
app.use(errorMiddleware);

module.exports = app