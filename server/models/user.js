const mongoose = require('mongoose')


const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile :Number,
},{
  timestamps : true
})

module.exports = mongoose.model("user",schemaData)