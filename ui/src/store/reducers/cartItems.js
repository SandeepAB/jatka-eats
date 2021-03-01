import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    items: {},
    error: false,
};

const addCartItem = ( state, action ) => {
    let items = [...state.items];
    items.push(action.cartItems);
    // return state;

    return updateObject( state, {
        ...state,
        items: items,
        error: false,
    });
}

const editCartItem = ( state, action ) => {    
    let items = [...state.items];
    let newItems = [];
    items.map(item => {if(action.cartItems._id == item._id){ newItems.push(action.cartItems) } else{ return newItems.push(item) }  })

    return updateObject( state, {
        ...state,
        items: newItems,
        error: false,
    });
}


const removeCartItem = ( state, action ) => {
    let items = [...state.items];
    let newItems = [];
    items.map(item => {if(action.cartItems._id != item._id){ newItems.push(item) }})
    
    return updateObject( state, {
        ...state,
        items: newItems,
        error: false,
    });
}

const setCartItems = ( state, action ) => {
    console.log("cart item action", action)
    return updateObject( state, {
        ...state,
        items: action.cartItems.data,
        error: false,
    });
}

const fetchCartItems = ( state, action ) => {
    return updateObject( state, {
        error: true
    } );
}

const reducer = ( state = initialState, action) => {
    switch( action.type ){
        
        case actionTypes.ADD_CARTITEMS: return addCartItem( state, action );
        case actionTypes.EDIT_CARTITEMS: return editCartItem( state, action );

        case actionTypes.REMOVE_CARTITEMS: return removeCartItem ( state, action );
        case actionTypes.SET_CARTITEMS: return setCartItems( state, action );   
        case actionTypes.FETCH_CARTITEMS_FAILED:  return fetchCartItems( state, action );     

        default: return state; 
    }
};  

export default reducer;