const {Schema, model} = require('mongoose')

const schema = new Schema({
    typeNews: {type: Number, required: true},
    typeImportant: {type: Number, required: true},
    header: {type: String, required: true},
    subtitle: {type: String, required: true},
    content: {type: String, required: true},
    img: {type: String, required: true},
    author: {type: String, required: true},
    likes: {type: Number, required: true, default: 0}
})

module.exports = model('News', schema)