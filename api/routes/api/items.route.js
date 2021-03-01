var express = require('express')

var router = express.Router()


var ToDoController = require('../../controllers/todos.controller');

router.get('/', ToDoController.getItems)
router.post('/', ToDoController.createItems)
router.put('/', ToDoController.updateItems)
router.delete('/', ToDoController.removeItems)

module.exports = router;
