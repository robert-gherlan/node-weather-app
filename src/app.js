const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weatherstack = require('./utils/weatherstack')

const app = express()
const port = process.env.PORT || 3000
const name = 'Robert Gherlan'

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars Engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup routes
app.get('/', (request, response) => {
  response.render('index', {
    title: 'Weather App',
    name
  })
})

app.get('/about', (request, response) => {
  response.render('about', {
    title: 'About',
    name
  })
})

app.get('/help', (request, response) => {
  response.render('help', {
    title: 'Help',
    name,
    helpText: 'This is some helpful text.'
  })
})

app.get('/help/*', (request, response) => {
  response.render('404', {
    title: '404',
    name,
    errorMessage: 'Help article not found'
  })
})

app.get('/weather', (request, response) => {
  const address = request.query.address
  if (!address) {
    return response.status(400).send({
      error: 'You must provide an address!'
    })
  }

  weatherstack(address, (error, data) => {
    console.log(error, data)
    if (error) {
      return response.status(400).send({ error })
    } else if (!data) {
      return response.status(500).send({
        error: 'Failed to retrieve data from external API.'
      })
    }

    response.send(data)
  })
})

app.get('*', (request, response) => {
  response.render('404', {
    title: '404',
    name,
    errorMessage: 'Page not found'
  })
})

// Start application
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
