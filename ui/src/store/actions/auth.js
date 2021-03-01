import * as actionTypes from './actionTypes';
import axios from 'axios'; 

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = ( user, userType, login ) => {
    if(login){
        console.log("calling login")
        login()
    }
    console.log("not calling login")

    return {
        type: actionTypes.AUTH_SUCCESS,
        user: user,
        userType: userType
    };
};

export const authFailure = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const checkAuthTimeout = ( expirationTime ) => {
    return dispatch => {
        setTimeout(() => {
            dispatch( logout() ); 
        }, expirationTime * 1000 );
    };
};

export const logout = () => {
    localStorage.removeItem( 'user' );
    localStorage.removeItem( 'expirationDate' );
    localStorage.removeItem( 'userType' );
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = ( email, password, userType , login) => {
    return dispatch => {
        
        dispatch( authStart() );

        const authData = {
            email: email,
            password: password,
            userType: userType
        }

        console.log(authData)
        if((email == "Admin" && password == "Admin" && userType == "Admin") ||
        (email == "Admin" && password == "Admin" && userType == "Admin") ||
        (email == "Admin" && password == "Admin" && userType == "Admin")) {

            const expirationDate = new  Date( new Date().getTime() + 10000 * 1000 );
            localStorage.setItem( 'user', email );
            localStorage.setItem( 'expirationDate', expirationDate );
            localStorage.setItem( 'userType', userType );
            dispatch( authSuccess( email, userType, login) );
            dispatch( checkAuthTimeout( 100 ) );
        }
        else{
            dispatch( authFailure( "Invaid Credentials" ) );
        }
        // let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBdXr67ZNj8pTcwuxcgEhGixEtjk3MZTkc';

        // if( !isSignup ){
        //     url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBdXr67ZNj8pTcwuxcgEhGixEtjk3MZTkc';
        // }
        
        // axios.post( url, authData)
        // .then( response => {
        //     const expirationDate = new  Date( new Date().getTime() + response.data.expiresIn * 1000 );
        //     localStorage.setItem( 'user', response.data.user );
        //     localStorage.setItem( 'expirationDate', expirationDate );
        //     localStorage.setItem( 'userType', response.data.localId );
        //     dispatch( authSuccess( response.data.user, response.data.localId ) );
        //     dispatch( checkAuthTimeout( response.data.expiresIn ) );
        // })
        // .catch(err => {
        //     dispatch( authFailure( err.response.data.error ) );
        // });
    };
};

export const setAuthRedirectPath = ( path ) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path    
    }
}

export const authCheckState = () => {
    return dispatch => {
        const user = localStorage.getItem( 'user');
        if( !user ){
            dispatch( logout() );
        }else{
            const expirationDate = new Date(localStorage.getItem( 'expirationDate' ));

            if( expirationDate > new Date() ){
                const userType = localStorage.getItem( 'userType ');
                dispatch( authSuccess( user, userType ) );
                dispatch( checkAuthTimeout( ( expirationDate.getTime() - new Date().getTime() ) / 1000 ) );
            }else{
                dispatch( logout() );
            }
            
        }

    };
};