import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addCartItem = (name) => {

    if (!name._id || name._id == "") {
        return dispatch => {
            axios.post('http://localhost:3005/api/cart', name)
                .then((response) => {
                    dispatch({
                        type: actionTypes.ADD_CARTITEMS,
                        cartItems: response.data.data
                    })
                })
                .catch((error) => {
                    dispatch(fetchCartItemsFailed())
                });
        };
    }
    else {
        return dispatch => {
            axios.put('http://localhost:3005/api/cart', name)
                .then((response) => {
                    dispatch({
                        type: actionTypes.EDIT_CARTITEMS,
                        cartItems: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error)
                    dispatch(fetchCartItemsFailed())
                });
        };
    }
}

export const removeCartItem = (name) => {


    return dispatch => {
        axios.delete('http://localhost:3005/api/cart?_id='+name._id)
            .then((response) => {
                dispatch({
                    type: actionTypes.REMOVE_CARTITEMS,
                    cartItems: {
                        "_id" : name._id
                    }
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch(fetchCartItemsFailed())
            });
    };
}


export const setCartItems = (CartItems) => {
    return {
        type: actionTypes.SET_CARTITEMS,
        cartItems: CartItems
    }
};

export const fetchCartItemsFailed = () => {
    return {
        type: actionTypes.FETCH_CARTITEMS_FAILED
    }
};

export const initCartItems = () => {
    return dispatch => {
        axios.get('http://localhost:3005/api/cart')
            .then((response) => {
                dispatch(setCartItems(response.data))
            })
            .catch((error) => {
                console.log(error)
                dispatch(fetchCartItemsFailed())
            });
    };
};