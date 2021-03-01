var express = require('express')

var router = express.Router()


var ToDoController = require('../../controllers/todos.controller');

router.get('/', ToDoController.getCartItems)
router.post('/', ToDoController.createCartItems)

module.exports = router;
