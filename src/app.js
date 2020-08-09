const  express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(path.join(__dirname,'/../'))

const app = express()
const port = process.env.PORT || 3000

const publicpath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(publicpath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ananya Goel'
    })
})


app.get('/weather', (req, res) => {
    
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if(error) {
            return res.send( {
                error: 'You must provide an address'
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
            console.log(location)
            console.log(forecastData)
        })
    })
    // console.log(req.query.address)
    

})

app.get('/products' ,(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide asearch error'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather/*', (req,res) => {
    res.send('Help aticle not found')
})

app.get('*', (req, res) => {
    res.send('No page found')
})

app.listen(port, () => {
    console.log('Server started' + port)
})