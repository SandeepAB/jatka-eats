import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

import { TodoApi } from "../../api/todoApi";


export const addMenuItem = (name) => {

    if (!name._id || name._id == "") {
        return dispatch => {
            axios.post('http://localhost:3005/api/items', name)
                .then((response) => {
                    dispatch({
                        type: actionTypes.ADD_MENUITEMS,
                        menuItems: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error)
                    dispatch(fetchMenuItemsFailed())
                });
        };
    }
    else {
        return dispatch => {
            axios.put('http://localhost:3005/api/items', name)
                .then((response) => {
                    dispatch({
                        type: actionTypes.EDIT_MENUITEMS,
                        menuItems: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error)
                    dispatch(fetchMenuItemsFailed())
                });
        };
    }
}

export const removeMenuItem = (name) => {


    return dispatch => {
        axios.delete('http://localhost:3005/api/items?_id=' + name._id)
            .then((response) => {
                dispatch({
                    type: actionTypes.REMOVE_MENUITEMS,
                    menuItems: {
                        "_id": name._id
                    }
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch(fetchMenuItemsFailed())
            });
    };
}

export const checkoutItems = (name) => {
    axios.post('http://localhost:3005/api/checkout', name)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        });
}

export const getCheckoutItems = () => {
    return dispatch => {
    axios.get('http://localhost:3005/api/checkout')
    .then((response) => {
        dispatch(setCheckoutItems(response.data))
    })
    .catch((error) => {
        console.log(error)
        dispatch(fetchCheckoutItemsFailed())

    });
}
}

export const setCheckoutItems = (MenuItems) => {
    return {
        type: actionTypes.SET_CHECKOUTITEMS,
        menuItems: MenuItems
    }
};

export const fetchCheckoutItemsFailed = () => {
    return {
        type: actionTypes.FETCH_CHECKOUTITEMS_FAILED
    }
};

export const setMenuItems = (MenuItems) => {
    return {
        type: actionTypes.SET_MENUITEMS,
        menuItems: MenuItems
    }
};

export const fetchMenuItemsFailed = () => {
    return {
        type: actionTypes.FETCH_MENUITEMS_FAILED
    }
};

export const initMenuItems = () => {
    return dispatch => {
        axios.get('http://localhost:3005/api/items')
            .then((response) => {
                dispatch(setMenuItems(response.data))
            })
            .catch((error) => {
                console.log(error)
                dispatch(fetchMenuItemsFailed())
            });
    };
};