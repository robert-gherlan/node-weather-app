const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', event => {
  event.preventDefault()

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  const location = searchInput.value
  fetch(`/weather?address=${encodeURIComponent(location)}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        const { temperature, wind_dir, pressure, humidity } = data
        messageOne.textContent = `Temperature is ${temperature} and humidity is ${humidity}.`
        messageTwo.textContent = `Pressure is ${pressure} and wind direction is ${wind_dir}.`
      }
    })
  })
})
