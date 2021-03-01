import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const STAFFITEM_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.2,
    bacon: 1
}

const initialState = {
    items: [],
    error: false,
};

const addStaffItem = ( state, action ) => {
    let items = [...state.items];
    items.push(action.staffItems);
    // return state;

    return updateObject( state, {
        ...state,
        items: items,
        error: false,
    });
}

const editStaffItem = ( state, action ) => {    
    let items = [...state.items];
    let newItems = [];
    items.map(item => {if(action.staffItems._id == item._id){ newItems.push(action.staffItems) } else{ return newItems.push(item) }  })

    return updateObject( state, {
        ...state,
        items: newItems,
        error: false,
    });
}


const removeStaffItem = ( state, action ) => {
    let items = [...state.items];
    let newItems = [];
    items.map(item => {if(action.staffItems._id != item._id){ newItems.push(item) }})

    return updateObject( state, {
        ...state,
        items: newItems,
        error: false,
    });
}

const setStaffItems = ( state, action ) => {
    return updateObject( state, {
        ...state,
        items: action.staffItems.data,
        error: false,
    });
}

const fetchStaffItems = ( state, action ) => {
    return updateObject( state, {
        error: true
    } );
}

const reducer = ( state = initialState, action) => {
    switch( action.type ){
        
        case actionTypes.ADD_STAFFITEMS: return addStaffItem( state, action );
        case actionTypes.EDIT_STAFFITEMS: return editStaffItem( state, action );

        case actionTypes.REMOVE_STAFFITEMS: return removeStaffItem ( state, action );
        case actionTypes.SET_STAFFITEMS: return setStaffItems( state, action );   
        case actionTypes.FETCH_STAFFITEMS_FAILED:  return fetchStaffItems( state, action );     

        default: return state; 
    }
};  

export default reducer;