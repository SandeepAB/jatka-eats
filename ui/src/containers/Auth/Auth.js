import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';


class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            controls: {
                email: {
                    label: "Username",
                    elementType: 'input',
                    elementConfig: {
                        type: 'input',
                        placeholder: 'Username'
                    },
                    value: '',
                    validation: {
                        required: true,
                        // isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    label: "Password",
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: '**********'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 4
                    },
                    valid: false,
                    touched: false
                }
            },
            userType: "Admin",
            error: null
        };
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidation(value, rules) {

        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        // if (rules.isNumeric) {
        //     const pattern = /^\d+$/;
        //     isValid = pattern.test(value) && isValid;
        // }

        // if (rules.isEmail) {
        //     const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //     isValid = pattern.test(value) && isValid;
        // }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        this.setState({
            controls: updatedControls
        });
    }

    handleUserType = (event) => {
        console.log(event)
        this.setState({
            userType: event.target.value
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        let email = this.state.controls.email.value, password = this.state.controls.password.value, userType = this.state.userType

        console.log(email);
        console.log(password);
        console.log(userType);

        if ((email == "Admin" && password == "Admin" && userType == "Admin") ||
            (email == "Executive" && password == "Executive" && userType == "Executive") ||
            (email == "Staff" && password == "Staff" && userType == "Staff")) {
            this.setState({
                error: null
            });
            
            const expirationDate = new Date(new Date().getTime() + 10000 * 1000);
            localStorage.setItem('user', email);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userType', userType);
            this.props.login();
        }
        else {
            this.setState({
                error: "Invalid User"
            });
            this.props.logout();
            localStorage.removeItem( 'user' );
            localStorage.removeItem( 'expirationDate' );
            localStorage.removeItem( 'userType' );
            
        }


        // this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.userType, this.props.login());
    }

    render() {

        const formElementArray = [];

        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement => (
            <div className={classes.FormElementWrapper}>
                <label className={[classes.Label, classes.LabelInput].join(" ")}>{formElement.config.label}: </label>
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            </div>
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.state.error) {
            errorMessage = (
                <p className={classes.config_error}>{this.state.error}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth} >
                <Logo margin="50px" />
                { authRedirect}
                { errorMessage}
                <form onSubmit={this.submitHandler.bind(this)} className={classes.Form}>
                    {/* onChange={this.paymentMethodChange.bind(this)} value={this.state.paymentMethod} */}
                    <div className={[classes.UserTypeWrapper, classes.FormElementWrapper].join(" ")}>
                        <label className={classes.Label}>User Type:</label>
                        <select className={classes.Select} onChange={this.handleUserType.bind(this)}>
                            <option value="Admin">Admin</option>
                            <option value="Executive">Executive</option>
                            <option value="Staff">Staff</option>
                        </select>
                    </div>

                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, userType) => dispatch(actions.auth(email, password, userType)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);