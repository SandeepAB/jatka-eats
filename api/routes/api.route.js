var express = require('express')

var router = express.Router()
var todos = require('./api/todos.route')
var items = require('./api/items.route')
var staff = require('./api/staff.route')
var cart =  require('./api/cart.route')
var store =  require('./api/store.route')
var auth =  require('./api/auth.route')
var checkout = require('./api/checkoutItems.route');

router.use('/checkout', checkout);
router.use('/login', auth);
router.use('/todos', todos);
router.use('/items', items);
router.use('/staff', staff);
router.use('/cart', cart);
router.use('/store', store);



module.exports = router;