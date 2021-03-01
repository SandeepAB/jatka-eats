import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

import { TodoApi } from "../../api/todoApi";


export const addStaffItem = (name) => {

    if (!name._id || name._id == "") {
        return dispatch => {
            axios.post('http://localhost:3005/api/staff', name)
                .then((response) => {
                    dispatch({
                        type: actionTypes.ADD_STAFFITEMS,
                        staffItems: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error)
                    dispatch(fetchStaffItemsFailed())
                });
        };
    }
    else {
        return dispatch => {
            axios.put('http://localhost:3005/api/staff', name)
                .then((response) => {
                    dispatch({
                        type: actionTypes.EDIT_STAFFITEMS,
                        staffItems: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error)
                    dispatch(fetchStaffItemsFailed())
                });
        };
    }
}

export const removeStaffItem = (name) => {


    return dispatch => {
        axios.delete('http://localhost:3005/api/staff?_id='+name._id)
            .then((response) => {
                dispatch({
                    type: actionTypes.REMOVE_STAFFITEMS,
                    staffItems: {
                        "_id" : name._id
                    }
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch(fetchStaffItemsFailed())
            });
    };
}


export const setStaffItems = (StaffItems) => {
    return {
        type: actionTypes.SET_STAFFITEMS,
        staffItems: StaffItems
    }
};

export const fetchStaffItemsFailed = () => {
    return {
        type: actionTypes.FETCH_STAFFITEMS_FAILED
    }
};

export const initStaffItems = () => {
    return dispatch => {
        axios.get('http://localhost:3005/api/staff')
            .then((response) => {
                dispatch(setStaffItems(response.data))
            })
            .catch((error) => {
                console.log(error)
                dispatch(fetchStaffItemsFailed())
            });
    };
};