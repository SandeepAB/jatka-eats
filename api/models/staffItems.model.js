var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ToDoSchema = new mongoose.Schema({
        "id":String,
        "staffImageUrl":String,
        "name":String,
        "email":String,
        "number":String,
        "location":String
    })

ToDoSchema.plugin(mongoosePaginate)
const ToDo = mongoose.model('staffItems', ToDoSchema)

module.exports = ToDo;