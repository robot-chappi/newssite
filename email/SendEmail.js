const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
           // Пожалуйста, используйте свой собственный аккаунт для рассылки
            user: 'anonim_96@internet.ru', // (замените звездочики на название вашего почтового ящика)
            pass: 'UY0RGzXZNvAf2WDws5NS' //  (замените звездочики на пароль вашего почтового ящика)
        }, 
        // Qer-vWT-5fs-n2Q                  8rf-wYK-n2g-iiz 
        // CkkQngYUvvBGnaJ0inv4              samuraiEEfsdfssdSDFsamuraiFFSF        RpC6Zxhhg2t2fKjD2smt
        tls: {
            rejectUnauthorized: false
        }
    },
    {
        from: 'Anonim <anonim_96@internet.ru>',
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer