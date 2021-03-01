import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const MENUITEM_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.2,
    bacon: 1
}

const initialState = {
    items: [],
    checkoutItems : [],
    CheckoutError : false,
    error: false,
};

const addMenuItem = ( state, action ) => {
    let items = [...state.items];
    items.push(action.menuItems);
    // return state;

    return updateObject( state, {
        ...state,
        items: items,
        error: false,
    });
}

const editMenuItem = ( state, action ) => {    
    let items = [...state.items];
    let newItems = [];
    items.map(item => {if(action.menuItems._id == item._id){ newItems.push(action.menuItems) } else{ return newItems.push(item) }  })

    return updateObject( state, {
        ...state,
        items: newItems,
        error: false,
    });
}


const removeMenuItem = ( state, action ) => {
    let items = [...state.items];
    let newItems = [];
    items.map(item => {if(action.menuItems._id != item._id){ newItems.push(item) }})

    return updateObject( state, {
        ...state,
        items: newItems,
        error: false,
    });
}

const setMenuItems = ( state, action ) => {
    console.log("data in menu actions", action)
    return updateObject( state, {
        ...state,
        items: action.menuItems.data,
        error: false,
    });
}

const fetchMenuItems = ( state, action ) => {
    return updateObject( state, {
        error: true
    } );
}

const setCheckoutItems = ( state, action ) => {
    console.log("data in setCheckoutItems actions", action)
    return updateObject( state, {
        ...state,
        checkoutItems: action.menuItems.data,
        error: false,
    });
}

const fetchCheckoutItems = ( state, action ) => {
    return updateObject( state, {
        CheckoutError: true
    } );
}


const reducer = ( state = initialState, action) => {
    switch( action.type ){
        
        case actionTypes.ADD_MENUITEMS: return addMenuItem( state, action );
        case actionTypes.EDIT_MENUITEMS: return editMenuItem( state, action );

        case actionTypes.REMOVE_MENUITEMS: return removeMenuItem ( state, action );
        case actionTypes.SET_MENUITEMS: return setMenuItems( state, action );   
        case actionTypes.FETCH_MENUITEMS_FAILED:  return fetchMenuItems( state, action );     

        case actionTypes.SET_CHECKOUTITEMS: return setCheckoutItems( state, action );   
        case actionTypes.FETCH_CHECKOUTITEMS_FAILED:  return fetchCheckoutItems( state, action );    

        default: return state; 
    }
};  

export default reducer;