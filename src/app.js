const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log('__dirname: ' + __dirname)
// console.log('__filename: ' + __filename)
// console.log(path.join(__dirname, '../public'))

// Store express application
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')      // customized location vice 'views' directory
const partialsPath = path.join(__dirname, '../templates/partials') // customized location for partials (dynamic) files

// Setup handlebars engine and views location
app.set('view engine', 'hbs')                   // Sets up handlebars for dynamic templating
app.set('views', viewsPath)                     // Reset the default 'views' location to now point to viewsPath directory set up above
hbs.registerPartials(partialsPath)

// Customize server to serve up 'public' folder; set up static directory to serve
app.use(express.static(publicDirectoryPath))

// ENDPOINTS
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Will Dutcher'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Will Dutcher'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        msg: 'This is a help message',
        name: 'Will Dutcher'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } =  {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            return res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

// match any page that hasn't been matched so far that starts with /help/
app.get('/help/*', (req, res) => {
    res.render('404', {                                         // first arg id's page you are rendering!!!
        title: '404 Error',
        name: 'Will Dutcher',
        errorMessage: 'Help article not found.'
    })
})

// 404 Page; MUST come last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Will Dutcher',
        errorMessage: 'Page not found.'
    })
})

// OLD
// app.get('/', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Will',
//         age: 40
//     }, {
//         name: 'Amamnda',
//         age: 34
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1 style="color: red">About Page</h1><p>This is an about page.</p>')
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

app.