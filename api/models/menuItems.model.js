var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ToDoSchema = new mongoose.Schema({
        "itemImageUrl":String,
        "itemName":String,
        "itemPrice":String,
        "itemCurrency":String
    })

ToDoSchema.plugin(mongoosePaginate)
const ToDo = mongoose.model('menuItems', ToDoSchema)

module.exports = ToDo;