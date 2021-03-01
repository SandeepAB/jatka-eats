import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    items: [],
    error: false,
};

const addStoreItem = ( state, action ) => {
    let items = [...state.items];
    items.push(action.storeItems);
    // return state;

    return updateObject( state, {
        ...state,
        items: items,
        error: false,
    });
}

const editStoreItem = ( state, action ) => {    
    let items = [...state.items];
    let newItems = [];
    items.map(item => {if(action.storeItems._id == item._id){ newItems.push(action.storeItems) } else{ return newItems.push(item) }  })

    return updateObject( state, {
        ...state,
        items: newItems,
        error: false,
    });
}


const removeStoreItem = ( state, action ) => {
    let items = [...state.items];
    let newItems = [];
    items.map(item => {if(action.storeItems._id != item._id){ newItems.push(item) }})

    return updateObject( state, {
        ...state,
        items: newItems,
        error: false,
    });
}

const setStoreItems = ( state, action ) => {
    return updateObject( state, {
        ...state,
        items: action.storeItems.data,
        error: false,
    });
}

const fetchStoreItems = ( state, action ) => {
    return updateObject( state, {
        error: true
    } );
}

const reducer = ( state = initialState, action) => {
    switch( action.type ){
        
        case actionTypes.ADD_STOREITEMS: return addStoreItem( state, action );
        case actionTypes.EDIT_STOREITEMS: return editStoreItem( state, action );

        case actionTypes.REMOVE_STOREITEMS: return removeStoreItem ( state, action );
        case actionTypes.SET_STOREITEMS: return setStoreItems( state, action );   
        case actionTypes.FETCH_STOREITEMS_FAILED:  return fetchStoreItems( state, action );     

        default: return state; 
    }
};  

export default reducer;