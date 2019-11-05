// APP REQUIRE
const express        = require('express'),
      bodyParser     = require('body-parser'),
      cookieParser   = require('cookie-parser'),
      path           = require('path'),
      methodOverride = require('method-override'),
      exphbs         = require('express-handlebars')

// ROUTER REQUIRE
require('./src/db/mongoose')
const indexRouter = require('./src/routers/index')
const moviesRouter = require('./src/routers/movies')
const usersRouter = require('./src/routers/users')

// APP CONFIG
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(methodOverride('_method'))

// APP ROUTERS
app.use(indexRouter)
app.use(moviesRouter)
app.use(usersRouter)

// APP PATHS
const publicPath = path.join(__dirname, '/public')
app.use(express.static(publicPath))

// APP ENGINE
app.engine('handlebars', exphbs({ defaultLayout: 'primary' }))
app.set('view engine', 'handlebars')


app.listen(port, () => {
    console.log(`Movies shown on port ${port}`)
})