var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ToDoSchema = new mongoose.Schema({
        "items": Object
    })

ToDoSchema.plugin(mongoosePaginate)
const ToDo = mongoose.model('checkOutItems', ToDoSchema)

module.exports = ToDo;