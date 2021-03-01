import React, { Component } from 'react';
import Aux from '../Auxilary/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component{

    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false 
        };
    }
    componentWillReceiveProps(prop) {
        console.log("LayoutcomponentWillReceiveProps", prop)
    }
    componentDidMount() {
        // this.props.onTryAutoSignUp();
    }


    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    
    render(){
        return (
            <Aux>
                { this.props.isAuthenticated ? 
                <SideDrawer isAuth={ this.props.isAuthenticated } logout={this.props.logout} open={ this.state.showSideDrawer } closed={ this.sideDrawerClosedHandler }/> : null 
                }
                <main className={ this.props.isAuthenticated ?  classes.Content : classes.ContentLogin}>
                    { this.props.children }
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        // isAuthenticated: state.auth.token !== null
    };
};

export default connect( mapStateToProps )( Layout );