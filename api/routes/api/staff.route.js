var express = require('express')

var router = express.Router()


var ToDoController = require('../../controllers/todos.controller');

router.get('/', ToDoController.getStaffItems)
router.post('/', ToDoController.createStaffItems)
router.put('/', ToDoController.updateStaffItems)
router.delete('/', ToDoController.removeStaffItems)

module.exports = router;
