const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secure: true,
    port: 465,
    auth: {
        user: '505792925@qq.com',
        pass: 'fvyljahdlcvlcafb'
    }
});
function sendMail (opts) {
    let mailOptions = {
        from: '"Felbry 👻" <505792925@qq.com>', // sender address
        to: opts.receiver, // list of receivers
        subject: '柴方博的个人网站登录密码 ✔', // Subject line
        html: '<p>您正在进行 柴方博的个人网站 注册</p><p>登录密码为：<b>' + opts.code + '</b></p>'
    };
    return transporter.sendMail(mailOptions);
}
module.exports = sendMail;