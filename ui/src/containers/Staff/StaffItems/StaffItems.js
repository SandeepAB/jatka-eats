import React, { Component } from 'react';
import classes from './StaffItems.module.css';
import { connect } from 'react-redux';
import StaffItem from './StaffItem/StaffItem';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class StaffItems extends Component {

    constructor( props ){
        super( props );
        this.state = {
            
        };
    }

    componentDidMount() { 
    }

    render() {

        let orders = this.props.items.map((order, i) => (
            <Grid item xs={3} key={i}>
                <Paper className={classes.paper}><StaffItem item={order} editItem={this.props.editItem} addItemToCart={this.props.addItemToCart}/></Paper>
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
export default connect(mapStateToProps, mapsDispatchToProps)((StaffItems));