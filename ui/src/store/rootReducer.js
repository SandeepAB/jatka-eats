import {combineReducers} from 'redux'
import {TodoListReducer} from '../store/reducers/todoReducer';
import burgerBuilderReducer from './reducers/burgerBuilder';
import menuItems from './reducers/menuItems';
import staffItems from './reducers/staffItems';
import storeItems from './reducers/storeItems';
import cartItems from './reducers/cartItems';




import authReducer from './reducers/auth';


//One root reducer for the whole app. This is done so that the app will have one single reducer to manage lots of other resources.
// And also communication between the reducers will be easier to maintain.
 
const rootReducer = combineReducers({
    todos: TodoListReducer,
    burgerBuilder: burgerBuilderReducer,
    auth: authReducer,
    menuItems : menuItems,
    staffItems : staffItems,
    storeItems : storeItems,
    cartItems : cartItems
})

export default rootReducer