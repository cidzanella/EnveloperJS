
if (process.env.NODE_ENV !== 'production'){
    //load values from the ./env file in this directory into process.env
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// carrega o Controller (route) para o Index
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs') //indica que ejs será a view engine
app.set('views', __dirname + '/views') //indica onde estarão as views
app.set('layout', 'layouts/layout') // hook-up layout files - indica onde estará o layout das views
app.use(expressLayouts) // indica para aplicação express que queremos usar o expressLayouts
app.use(express.static('public')) // indica ao express onde os arquivos públicos irão estar: files como css, js, images

// MongoDB connection
const mongoose = require('mongoose') //importa api Mongoose da library instalada 
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}) //define conexão com o banco
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose:' + process.env.DATABASE_URL))



app.use('/', indexRouter) //indica que esse caminho (path) usa esse controller (route)

app.listen(process.env.PORT || 3000) //pega a porta da variável environment quando fizer deploy o sevidor vai indicar a porta ou usar a porta fixa 3000 neste caso durante desenvolvimento npn



