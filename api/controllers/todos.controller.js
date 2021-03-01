var TodoService = require('../services/todos.service')


_this = this


exports.createCheckoutItem = async function(req, res, next){
    var todo = req.body
    try{
        var createdTodo = await TodoService.createCheckoutItem(todo)
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created createCheckoutItem"})
    }catch(e){
        console.log(e)
        return res.status(400).json({status: 400, message: "createCheckoutItem Creation was Unsuccesfull"})
    }
}

exports.getCheckoutItems = async function(req, res, next){
    try{
        var todos = await TodoService.getCheckoutItems({})
        return res.status(200).json({status: 200, data: todos.docs, message: "Succesfully getCheckoutItems Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getItems = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100; 

    console.log(page, limit)

    try{
        var todos = await TodoService.getMenuItems({})
        return res.status(200).json({status: 200, data: todos.docs, message: "Succesfully Todos Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createItems = async function(req, res, next){
    var todo = req.body

    try{
        var createdTodo = await TodoService.createMenuItem(todo)
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created ToDo"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
}

exports.updateItems = async function(req, res, next){
    req.body.id = req.body._id ? req.body._id : req.body.id;
    if(!req.body.id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.id;

    console.log(req.body)

    var todo = req.body
    // var todo = {
    //     id,
    //     title: req.body.title ? req.body.title : null,
    //     description: req.body.description ? req.body.description : null,
    //     status: req.body.status ? req.body.status : null
    // }

    try{
        var updatedTodo = await TodoService.updateMenuItem(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}


exports.removeItems= async function(req, res, next){

    var id = req.query._id;

    console.log(id);
    console.log(req);


    try{
        var deleted = await TodoService.deleteMenuItem(id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}





exports.getStaffItems = async function(req, res, next){

    try{
        var todos = await TodoService.getStaffItems({})
        return res.status(200).json({status: 200, data: todos.docs, message: "Succesfully Todos Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createStaffItems = async function(req, res, next){
    var todo = req.body
    try{
        var createdTodo = await TodoService.createStaffItem(todo)
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created ToDo"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
}

exports.updateStaffItems = async function(req, res, next){
    // req.body.id = req.body._id ? req.body._id : req.body.id;
    if(!req.body.id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.id;

    console.log(req.body)

    var todo = req.body
    // var todo = {
    //     id,
    //     title: req.body.title ? req.body.title : null,
    //     description: req.body.description ? req.body.description : null,
    //     status: req.body.status ? req.body.status : null
    // }

    try{
        var updatedTodo = await TodoService.updateStaffItem(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}


exports.removeStaffItems= async function(req, res, next){

    var id = req.query._id;

    console.log(id);
    console.log(req);


    try{
        var deleted = await TodoService.deleteStaffItem(id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}


exports.getCartItems = async function(req, res, next){

    try{
        var todos = await TodoService.getCartItems({})
        return res.status(200).json({status: 200, data: todos, message: "Succesfully CartItems Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createCartItems = async function(req, res, next){

    console.log("items received", req.body)
    var CartItem = {

        "itemName": req.body.itemName,
        "itemPrice": req.body.itemPrice,
        "itemCurrency": req.body.itemCurrency,
        "count": req.body.count
    }

    try{
        var createdTodo = await TodoService.createCartItems(CartItem)
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created CartItems"})
    }catch(e){
        return res.status(400).json({status: 400, message: "CartItems Creation was Unsuccesfull"})
    }
}




exports.getStoreItems = async function(req, res, next){

    try{
        var todos = await TodoService.getStoreItems({})
        return res.status(200).json({status: 200, data: todos.docs, message: "Succesfully Stores Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createStoreItems = async function(req, res, next){
    var todo = req.body
    try{
        var createdTodo = await TodoService.createStoreItem(todo)
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created ToDo"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Store Creation was Unsuccesfull"})
    }
}

exports.updateStoreItems = async function(req, res, next){
    // req.body.id = req.body._id ? req.body._id : req.body.id;
    if(!req.body.id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.id;

    console.log(req.body)

    var todo = req.body
    // var todo = {
    //     id,
    //     title: req.body.title ? req.body.title : null,
    //     description: req.body.description ? req.body.description : null,
    //     status: req.body.status ? req.body.status : null
    // }

    try{
        var updatedTodo = await TodoService.updateStoreItem(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Store"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}


exports.removeStoreItems= async function(req, res, next){

    var id = req.query._id;

    console.log(id);
    console.log(req);


    try{
        var deleted = await TodoService.deleteStoreItem(id)
        return res.status(204).json({status:204, message: "Succesfully Store Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.getTodos = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    console.log(page, limit)

    try{
        var todos = await TodoService.getTodos({}, page, limit)
        return res.status(200).json({status: 200, data: todos, message: "Succesfully Todos Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createTodo = async function(req, res, next){
    var todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }

    try{
        var createdTodo = await TodoService.createTodo(todo)
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created ToDo"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
}

exports.updateTodo = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedTodo = await TodoService.updateTodo(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTodo = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await TodoService.deleteTodo(id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}