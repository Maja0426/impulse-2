const express = require('express')
const mongoose = require('mongoose')
const blogRoute = require('./routes/blogs')
const ejsMate = require('ejs-mate')
const path = require('path')
const methodOverride = require('method-override')
require('dotenv').config()

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB database is connected!')
  })
  .catch((err) => {
    console.log('Something went wrong')
    console.log(err)
  })

const app = express()
const port = 3000 || process.env.PORT

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/api/posts', blogRoute)

app.get('/', (req, res) => {
  res.redirect('/api/posts')
})

app.get('*', (req, res) => {
  res.send('Page not found! Error 404')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
})
