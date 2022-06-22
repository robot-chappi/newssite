const {Schema, model} = require('mongoose')

const schema = new Schema({
    newsId: {type: String, required: true},
    userId: {type: String, required: true},
    name: {type: String, required: true},
    text: {type: String, required: true},
    time: {type: Date, default: Date.now}
})

module.exports = model('Comments', schema)