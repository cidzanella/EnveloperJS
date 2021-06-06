
if (process.env.NODE_ENV !== 'production'){
    //load values from the ./env file in this directory into process.env
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParse = require('body-parser')

// carrega os Controller (route)
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs') //indica que ejs será a view engine
app.set('views', __dirname + '/views') //indica onde estarão as views
app.set('layout', 'layouts/layout') // hook-up layout files - indica onde estará o layout das views
app.use(expressLayouts) // indica para aplicação express que queremos usar o expressLayouts
app.use(express.static('public')) // indica ao express onde os arquivos públicos irão estar: files como css, js, images
//app.use(bodyParse.urlencoded({ limit: '10mb', extended: false }))
app.use(express.urlencoded({extended: false}))

// MongoDB connection
const mongoose = require('mongoose') //importa api Mongoose da library instalada 
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}) //define conexão com o banco
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose:' + process.env.DATABASE_URL))

//indica que esse caminho (path) usa esse controller (route)
app.use('/', indexRouter) 
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000) //pega a porta da variável environment quando fizer deploy o sevidor vai indicar a porta ou usar a porta fixa 3000 neste caso durante desenvolvimento npn



