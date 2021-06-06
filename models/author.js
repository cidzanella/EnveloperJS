const mongoose = require('mongoose')

// a schema is like a table on SQL database
const authoSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authoSchema)