const request = require('request')

const weatherstack = (address, callback) => {
  const accessKey = process.env.WEATHERSTACK_ACCESS_KEY
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${encodeURIComponent(
    address
  )}`

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback(error, undefined)
    } else {
      const data = body.current
      callback(undefined, data)
    }
  })
}

module.exports = weatherstack
