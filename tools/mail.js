const nodemailer = require('nodemailer')
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  secure: true,
  port: 465,
  auth: {
    user: '505792925@qq.com',
    pass: 'fvyljahdlcvlcafb'
  }
})
function sendMail (opts) {
  let mailOptions = {
    from: '"Felbry 👻" <505792925@qq.com>', // sender address
    to: opts.receiver, // list of receivers
    subject: opts.subject, // Subject line
    html: opts.html
  }
  return transporter.sendMail(mailOptions)
}
module.exports = sendMail
