var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const { message } = req.body
  console.log('message', message)

  if (!message) {
    return res.end()
  }

  const responseMessage = defineMessage(message)

  if (!responseMessage) {
    return res.end()
  }

  axios
    .post(
      'https://api.telegram.org/bot910597252:AAEfDXVyBpI2Hwoh093uBAP-XJgOAW8d2Vg/sendMessage',
      {
        chat_id: message.chat.id,
        text: responseMessage
      }
    )
    .then(response => {
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      console.log('Error :', err)
      res.end('Error :' + err)
    })
})

// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!')
})

defineMessage = (message) => {
    if (typeof message.text === 'undefined') {
        return false
    }
    
    let result = false
    switch(true) {
        case ((message.from.first_name.toLowerCase().indexOf('aryo') >= 0 || message.from.first_name.toLowerCase().indexOf('alfan') >= 0 || message.from.first_name.toLowerCase().indexOf('satria') >= 0 || message.from.first_name.toLowerCase().indexOf('imam') >= 0) && message.text.toLowerCase().indexOf('meeting sis') >= 0):
            result = 'iya, nih aku buatin linknya. https://zoom.us/j/9046286650'
            break
        case (message.text.toLowerCase().indexOf('mabar sis') >= 0):
            result = 'kuy, ditunggu di loby. @shinichi_coding, @rizkydh, @trastanechora, @wibymf, @kobarseptyanus, @angga_dar, @azulkipli'
            break
        case (message.text.toLowerCase().indexOf('ada yang lagi test?') >= 0):
            result = 'tuh ditanyain lho. ada yang lagi test gak nih? mau merge lho :('
            break
        case (message.from.first_name.toLowerCase().indexOf('alfan') >= 0 && message.text.toLowerCase().indexOf('makasih sis') >= 0):
            result = 'sama-sama tampan :)'
            break
        default:
            result = false
            break
    }

    return result
}