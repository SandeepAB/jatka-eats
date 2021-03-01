import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Menu from './containers/Menu/Menu';
import Staff from './containers/Staff/Staff';
import Store from './containers/Store/Store';
import Monitor from './containers/Monitor/Monitor';

// The Routing Component providing all the routing Configuration

class Routes extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillReceiveProps(prop) {
        console.log("RoutecomponentWillReceiveProps", prop)
    }
    componentDidMount() {
        // this.props.onTryAutoSignUp();
    }

    render() {
        // console.log("this.props.isAuthenticated ", this.props)
        let routes =
            (
                <Switch>
                    <Route path="/" render={(props) => <Auth login={this.props.login} logout={this.props.logout}/>} />
                    <Redirect to="/" />
                </Switch>
            );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    {/* <Route path="/auth" component={Auth} /> */}
                    <Route path="/menu" component={Menu} />
                    <Route path="/staff" component={Staff} />
                    <Route path="/store" component={Store} />
                    <Route path="/monitor" component={Monitor} />
                    <Redirect to="/menu" />
                </Switch>
            );
        }

        return (
            <Layout isAuthenticated={this.props.isAuthenticated} login={this.props.login} logout={this.props.logout}>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        // isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
