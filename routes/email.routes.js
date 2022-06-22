const {Router} = require('express')
const {validationResult} = require('express-validator')
const mailer = require('../email/SendEmail')
const users = require('../models/user')
const router = Router()

router.post('/send', [
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(),
            message: 'Incorrect data'})
        }

        const {header, theme, content, img, link} = req.body 
        const data = await users.find()

        data.map((f) => {
            const letter = {        
                to: `${f.email}`,
                subject: `${header}`,
                html: `
                    <style type="text/css">
                    
                    .header p {
                        font-size: 20px;
                        color: #000;
                    }

                    .footage p {
                        font-size: 15px;
                        color: #000;
                    }

                    .footage a {
                        text-decoration: none;
                        color: #8B008B;

                    }

                    .footage img {
                        width: 100%;
                        height: 100%;
                    }

                    </style>
                        <div>
                            <div class="header">
                                <p>${theme}</p>
                            </div>
                            <div class="footage">
                                <p>${content}</p>
                                <a href="${link}">Follow us here</a>
                                <img src="${img}">
                            </div>
                        </div>`,
                
            }
            mailer(letter) 
        })

        

        res.status(201).json({message: 'Done!'})

    } catch (e) {
        res.status(500).json({message: 'Something is going wrong...'})
    }
})

router.post('/getcode', [
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(),
            message: 'Incorrect data'})
        }

        const {email, code} = req.body 

        const letter = {        
                to: `${email}`,
                subject: `Your code`,
                html: `
                    <style type="text/css">
                    
                    .header p {
                        font-size: 20px;
                        color: #000;
                    }

                    .footage p {
                        font-size: 15px;
                        color: #000;
                    }


                    </style>
                        <div>
                            <div class="header">
                                <p></p>
                            </div>
                            <div class="footage">
                                <p>Complete the authentication</p>
                                <p>Authentication code - ${code}</p>
                            </div>
                        </div>`,
                
            }
            mailer(letter) 

        

        res.status(201).json({message: 'Done!'})

    } catch (e) {
        res.status(500).json({message: 'Something is going wrong...'})
    }
})

module.exports = router