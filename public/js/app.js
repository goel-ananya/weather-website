//const { response } = require("express")

console.log('Client side js file is loaded')



const weatherform = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading....'
    const loc = searchElement.value
    console.log(loc)

    fetch('http://localhost:3000/weather?address='+loc).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log = data.forecast
        }
    })
})
})