var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var CartItemsSchema = new mongoose.Schema({
    "itemName": String,
    "itemPrice": String,
    "itemCurrency": String,
    "count": Number
})

CartItemsSchema.plugin(mongoosePaginate)
const CartItem = mongoose.model('cartItems', CartItemsSchema)

module.exports = CartItem;