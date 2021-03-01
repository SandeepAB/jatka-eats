var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var MenuItem = require('./menuItems.model')

var StoreSchema = new mongoose.Schema({
    "address": String,
    "id": String,
    "noOfStaff": String,
    "noOfMenuItems": [],
    "rawItems": [],

})

StoreSchema.plugin(mongoosePaginate)
const Store = mongoose.model('storeItems', StoreSchema)

module.exports = Store;