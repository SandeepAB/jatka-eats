var express = require('express')

var router = express.Router()


var ToDoController = require('../../controllers/todos.controller');

router.get('/', ToDoController.getCheckoutItems)
router.post('/', ToDoController.createCheckoutItem)

module.exports = router;
