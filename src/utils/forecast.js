const request = require('request')

const f2c = (temp) => {
  return Math.floor((temp * (9/5)) + 32)
}

const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=47b0ad5e3c0a27c02ba8e1d1bf666683&query=' + lat + ',' + long

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      console.log('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      console.log('Unable to find location.', undefined)
    } else {
      callback(undefined, 'Forecast: ' + body.current.weather_descriptions[0] + '; It is currently ' + f2c(body.current.temperature) + ' degrees, but feels like it is ' + f2c(body.current.feelslike) + '. Humidity is currently at ' + body.current.humidity + '.')
    //   const loc = body.location
    //   callback(undefined, {
    //     location: loc.name + ', ' + loc.region + ', ' + loc.country,
    //     temp: f2c(body.current.temperature),
    //     time: body.current.observation_time,
    //     rain: body.current.precip,
    //     description: 'You can expect to see ' + body.current.weather_descriptions[0].toLowerCase() + ' weather today.'
    //   })
    }
  })
}

module.exports = forecast