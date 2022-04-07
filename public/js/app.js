const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const searchResultElement = document.querySelector('#search-result')

weatherForm.addEventListener('submit', event => {
  event.preventDefault()

  alert('Loading...', 'warning')

  const location = searchInput.value
  fetch(`/weather?address=${encodeURIComponent(location)}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        alert(data.error, 'danger')
      } else {
        const { temperature, wind_dir, pressure, humidity } = data
        const message = `Temperature is ${temperature} and humidity is ${humidity}. Pressure is ${pressure} and wind direction is ${wind_dir}.`
        alert(message, 'success')
      }
    })
  })
})

const alert = (message, type) => {
  searchResultElement.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
}
