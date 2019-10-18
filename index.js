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
  // console.log('message', message)

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

// Define the result message
defineMessage = (message) => {
    if (!message || (message && typeof message.text === 'undefined')) {
      return false
    }
    
    let result = false
    switch(true) {
      case (
        (
          message.from.first_name.toLowerCase().indexOf('aryo') >= 0 ||
          message.from.first_name.toLowerCase().indexOf('satria') >= 0 ||
          message.from.first_name.toLowerCase().indexOf('imam') >= 0 ||
          message.from.first_name.toLowerCase().indexOf('alfan') >= 0
        ) &&
        (
          message.text.toLowerCase().indexOf('zoom kuy') >= 0 ||
          message.text.toLowerCase().indexOf('meeting sis') >= 0
        )):
          result = 'kuy kak, pake link ini ya.. https://zoom.us/j/9046286650'
          break
      case (
        message.text.toLowerCase().indexOf('mabar') >= 0 &&
        (
          message.text.toLowerCase().indexOf('kuy') >= 0 ||
          message.text.toLowerCase().indexOf('sis') >= 0
        )):
          result = 'kuy, ditunggu di loby nih. \n@shinichi_coding, @rizkydh, @trastanechora, @wibymf, @kobarseptyanus, @angga_dar, @king_of_bros, @tofas24, @azulkipli'
          break
      case (message.text.toLowerCase().indexOf('sabar sis') >= 0):
        result = 'iya kak, aku orangnya penyabar kok :\')'
        break
      case (message.text.toLowerCase().indexOf('kobar sis') >= 0):
        result = 'kak @kobarseptyanus dipanggil tuh. mau diajak maen.'
        break
      case (message.text.toLowerCase().indexOf('bubar sis') >= 0):
        result = 'jahadd. aku disuruh bubar :\'('
        break
      case (message.text.toLowerCase().indexOf('ada yang lagi test?') >= 0):
        result = 'tuh ditanyain lho. ada yang lagi test gak nih? kita mau merge lho :( \n@zhafiranisa, @safikaa, @shelayunita, @herawati_m, @dininovarianti, @fajartabuti, @Ferdi182'
        break
      case (
        message.text.toLowerCase().indexOf('makasih sis') >= 0 ||
        message.text.toLowerCase().indexOf('makasih luna') >= 0
        ):
          result = 'sama-sama kakak.. :)'
          break
      default:
        result = false
        break
    }

    return result
}