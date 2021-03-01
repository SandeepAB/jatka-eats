var ToDo = require('../models/todo.model')
var MenuItem = require('../models/menuItems.model')
var StaffItem = require('../models/staffItems.model')
var CartItem = require('../models/cartItems.model')
var StoreItem = require('../models/storeItems.model')
var CheckoutItem = require('../models/checkoutItems.model')


exports.createCheckoutItem = async function (todo) {

    var newTodo = new CheckoutItem({
        "items": todo,
    })

    try {
        var savedTodo = await newTodo.save()
        return savedTodo;
    } catch (e) {
        throw Error("Error while Creating CheckoutItem")
    }
}

exports.getCheckoutItems = async function (query, page, limit) {
    var options = {}
    try {
        var todos = await CheckoutItem.paginate(query, options)
        return todos;
    } catch (e) {
        throw Error('Error while CheckoutItem')
    }
}


_this = this

exports.getMenuItems = async function (query, page, limit) {
    var options = {}
    try {
        var todos = await MenuItem.paginate(query, options)
        return todos;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
}

exports.createMenuItem = async function (todo) {

    var newTodo = new MenuItem({
        "itemImageUrl": todo.itemImageUrl,
        "itemName": todo.itemName,
        "itemPrice": todo.itemPrice,
        "itemCurrency": todo.itemCurrency
    })

    try {
        var savedTodo = await newTodo.save()
        return savedTodo;
    } catch (e) {
        throw Error("Error while Creating Todo")
    }
}

exports.updateMenuItem = async function (todo) {
    var id = todo.id

    try {
        var oldTodo = await MenuItem.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Todo")
    }

    if (!oldTodo) {
        return false;
    }

    console.log(oldTodo)


    oldTodo.itemImageUrl = todo.itemImageUrl,
        oldTodo.itemName = todo.itemName,
        oldTodo.itemPrice = todo.itemPrice,
        oldTodo.itemCurrency = todo.itemCurrency

    console.log(oldTodo)

    try {
        var savedTodo = await oldTodo.save()
        return savedTodo;
    } catch (e) {
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteMenuItem = async function (id) {

    try {
        var deleted = await MenuItem.remove({ _id: id })
        if (deleted.result.n === 0) {
            throw Error("Todo Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Todo")
    }
}



exports.getStaffItems = async function (query, page, limit) {
    var options = {}
    try {
        var todos = await StaffItem.paginate(query, options)
        return todos;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
}

exports.createStaffItem = async function (todo) {

    var newTodo = new StaffItem({
        "id": todo.id,
        "staffImageUrl": todo.staffImageUrl,
        "name": todo.name,
        "email": todo.email,
        "number": todo.number,
        "location": todo.location
    })


    try {
        var savedTodo = await newTodo.save()
        return savedTodo;
    } catch (e) {
        throw Error("Error while Creating Todo")
    }
}

exports.updateStaffItem = async function (todo) {
    var id = todo._id

    try {
        var oldTodo = await StaffItem.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Todo")
    }

    if (!oldTodo) {
        return false;
    }

    console.log(oldTodo)

    oldTodo.id = todo.id,
        oldTodo.staffImageUrl = todo.staffImageUrl,
        oldTodo.name = todo.name,
        oldTodo.email = todo.email,
        oldTodo.number = todo.number,
        oldTodo.location = todo.location

    console.log(oldTodo)

    try {
        var savedTodo = await oldTodo.save()
        return savedTodo;
    } catch (e) {
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteStaffItem = async function (id) {

    try {
        var deleted = await StaffItem.remove({ _id: id })
        if (deleted.result.n === 0) {
            throw Error("Todo Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Todo")
    }
}


exports.getCartItems = async function (query, page, limit) {
    var options = {}
    try {
        var todos = await CartItem.paginate(query, options)
        return todos;
    } catch (e) {
        throw Error('Error while Paginating CartItems')
    }
}

exports.createCartItems = async function (todo) {

    var newTodo = new CartItem({
        "itemName": todo.itemName,
        "itemPrice": todo.itemPrice,
        "itemCurrency": todo.itemCurrency,
        "count": todo.count
    });
    
    try {
        var savedTodo = await newTodo.save()
        return savedTodo;
    } catch (e) {
        throw Error("Error while Creating CartItem")
    }
}


exports.getStoreItems = async function (query, page, limit) {
    var options = {}
    try {
        var todos = await StoreItem.paginate(query, options)
        return todos;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
}

exports.createStoreItem = async function (todo) {

    var newTodo = new StoreItem({
        "id": todo.id,
        "address": todo.address,
        "noOfStaff": todo.noOfStaff,
        "noOfMenuItems": todo.noOfMenuItems
    });

    try {
        var savedTodo = await newTodo.save()
        return savedTodo;
    } catch (e) {
        throw Error("Error while Creating Store")
    }
}

exports.updateStoreItem = async function (todo) {
    var id = todo._id

    try {
        var oldTodo = await StoreItem.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Store")
    }

    if (!oldTodo) {
        return false;
    }

        oldTodo.id =  todo.id,
        oldTodo.address =  todo.address,
        oldTodo.noOfStaff = todo.noOfStaff,
        oldTodo.noOfMenuItems = todo.noOfMenuItems
        oldTodo.rawItems = todo.rawItems


    try {
        var savedTodo = await oldTodo.save()
        return savedTodo;
    } catch (e) {
        throw Error("And Error occured while updating the Store");
    }
}

exports.deleteStoreItem = async function (id) {

    try {
        var deleted = await StoreItem.remove({ _id: id })
        if (deleted.result.n === 0) {
            throw Error("Store Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Store")
    }
}

exports.getTodos = async function (query, page, limit) {
    var options = {
        page,
        limit
    }
    try {
        var todos = await ToDo.paginate(query, options)
        return todos;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
}

exports.createTodo = async function (todo) {

    var newTodo = new ToDo({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status
    })

    try {
        var savedTodo = await newTodo.save()
        return savedTodo;
    } catch (e) {
        throw Error("Error while Creating Todo")
    }
}

exports.updateTodo = async function (todo) {
    var id = todo.id

    try {
        var oldTodo = await ToDo.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Todo")
    }

    if (!oldTodo) {
        return false;
    }

    console.log(oldTodo)

    oldTodo.title = todo.title
    oldTodo.description = todo.description
    oldTodo.status = todo.status


    console.log(oldTodo)

    try {
        var savedTodo = await oldTodo.save()
        return savedTodo;
    } catch (e) {
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteTodo = async function (id) {

    try {
        var deleted = await ToDo.remove({ _id: id })
        if (deleted.result.n === 0) {
            throw Error("Todo Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Todo")
    }
}