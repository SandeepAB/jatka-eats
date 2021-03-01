import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addStoreItem = (name) => {

    if (!name._id || name._id == "") {
        return dispatch => {
            axios.post('http://localhost:3005/api/store', name)
                .then((response) => {
                    dispatch({
                        type: actionTypes.ADD_STOREITEMS,
                        storeItems: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error)
                    dispatch(fetchStoreItemsFailed())
                });
        };
    }
    else {
        return dispatch => {
            axios.put('http://localhost:3005/api/store', name)
                .then((response) => {
                    dispatch({
                        type: actionTypes.EDIT_STOREITEMS,
                        storeItems: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error)
                    dispatch(fetchStoreItemsFailed())
                });
        };
    }
}

export const removeStoreItem = (name) => {


    return dispatch => {
        axios.delete('http://localhost:3005/api/store?_id='+name._id)
            .then((response) => {
                dispatch({
                    type: actionTypes.REMOVE_STOREITEMS,
                    storeItems: {
                        "_id" : name._id
                    }
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch(fetchStoreItemsFailed())
            });
    };
}


export const setStoreItems = (StoreItems) => {
    return {
        type: actionTypes.SET_STOREITEMS,
        storeItems: StoreItems
    }
};

export const fetchStoreItemsFailed = () => {
    return {
        type: actionTypes.FETCH_STOREITEMS_FAILED
    }
};

export const initStoreItems = () => {
    return dispatch => {
        axios.get('http://localhost:3005/api/store')
            .then((response) => {
                dispatch(setStoreItems(response.data))
            })
            .catch((error) => {
                console.log(error)
                dispatch(fetchStoreItemsFailed())
            });
    };
};