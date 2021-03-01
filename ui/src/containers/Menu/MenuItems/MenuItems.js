import React, { Component } from 'react';
import classes from './MenuItems.module.css';
import { connect } from 'react-redux';
import MenuItem from './MenuItem/MenuItem';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FETCH_ORDERS_SUCCESS } from '../../../store/actions/actionTypes';

class MenuItems extends Component {

    constructor( props ){
        super( props );
        this.state = {
            
        };
    }

    componentDidMount() { 

        // http://localhost:3005/api/items

    }

    render() {

        let orders = this.props.items.map((order, i) => (
            <Grid item xs={this.props.size} key={i}>
                <Paper className={classes.paper}><MenuItem item={order} editItem={this.props.editItem} addItemToCart={this.props.addItemToCart}/></Paper>
            </Grid>
        ));

        return (
            <div >
                <Grid container spacing={5}>
                    {orders}
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapsDispatchToProps = (dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapsDispatchToProps)((MenuItems));