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
      case (message.text.toLowerCase().indexOf('/start') >= 0):
        result = 'Hai kak. kenalin aku Lulu. Bot Assistent buat tim GADA. \n\n'
        result += 'Nih daftar kata-kata yang bisa lulu respon: \n\n'
        result += '- "zoom kuy" = ngajakin zoom + ngasi link nya, cuma bisa diperintah sama kak Aryo, kak Satria, kak Imam, kak Azul, sama kak Abi aja\n\n'
        result += '- "mabar kuy" atau "kuy lah" = ngajakin temen-temen buat mabar ML pas istirahat\n\n'
        result += '- "ada yang lagi test?" = nanyain temen-temen QE ada yang lagi testing staging gak, soalnya tim BE mau merge deploy kodingan nih\n\n'
        result += '- "makasih luna" = ucapan makasih buat lulu\n\n'
        result += '- "sabar sis" = nyabarin lulu\n\n'
        result += '- "bubar sis" = nyuruh lulu bubar :(\n\n'
        result += '- "kobar sis" = manggil bang kobar\n\n'
        break
      case (
        (
          message.from.first_name.toLowerCase().indexOf('aryo') >= 0 ||
          message.from.first_name.toLowerCase().indexOf('satria') >= 0 ||
          message.from.first_name.toLowerCase().indexOf('imam') >= 0 ||
          message.from.first_name.toLowerCase().indexOf('abi') >= 0 ||
          message.from.first_name.toLowerCase().indexOf('azul') >= 0 ||
          message.from.first_name.toLowerCase().indexOf('alfan') >= 0
        ) &&
        (
          message.text.toLowerCase().indexOf('zoom kuy') >= 0 ||
          message.text.toLowerCase().indexOf('meeting sis') >= 0
        )):
          result = 'kuy kak, pake link ini ya.. https://zoom.us/j/9046286650'
          break
      case (
        (
          message.text.toLowerCase().indexOf('mabar') >= 0 &&
          (
            message.text.toLowerCase().indexOf('kuy') >= 0 ||
            message.text.toLowerCase().indexOf('sis') >= 0
          )
        ) ||
          message.text.toLowerCase().indexOf('kuy lah') >= 0
        ):
          result = 'kuy, ditunggu di loby nih. \n@shinichi_coding, @rizkydh, @trastanechora, @wibymf, @kobarseptyanus, @angga_dar, @king_of_bros, @tofas24, @muhammad_ariyanto, @azulkipli'
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
        message.text.toLowerCase().indexOf('makasih') >= 0 &&
          (
            message.text.toLowerCase().indexOf('sis') >= 0 ||
            message.text.toLowerCase().indexOf('luna') >= 0
          )
        ):
          result = 'sama-sama kakak.. :)'
          break
      case (message.text.toLowerCase().indexOf('sis') >= 0):
          result = 'iya? ada apa kakak?'
          break
      case (message.text.toLowerCase().indexOf('kuy') >= 0):
          result = 'BACOT LU BOCAH'
          break
      default:
        result = false
        break
    }

    return result
}