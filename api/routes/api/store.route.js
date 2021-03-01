var express = require('express')

var router = express.Router()


var ToDoController = require('../../controllers/todos.controller');

router.get('/', ToDoController.getStoreItems)
router.post('/', ToDoController.createStoreItems)
router.put('/', ToDoController.updateStoreItems)
router.delete('/', ToDoController.removeStoreItems)

module.exports = router;
