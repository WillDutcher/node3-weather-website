// How fetch API works (with a 'then' promise)
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log('Your hangman puzzle answer: ' + data.puzzle)
//     })
// })

// fetch('http://localhost:3000/weather?address=seattle').then((response) => {
//     response.json().then((weatherData) => {
//         if (weatherData.error) {
//             return console.log( weatherData.error )
//         }
//         console.log('The weather in: ' + weatherData.location + ':')
//         console.log(weatherData.forecast)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  // Prevent the browser refresh!

    const location = search.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((weatherData) => {
            if (weatherData.error) {
                msg1.textContent = weatherData.error
            } else {
                msg1.textContent = 'The weather in: ' + weatherData.location + ':'
                msg2.textContent = weatherData.forecast
            }
        })
    })
})