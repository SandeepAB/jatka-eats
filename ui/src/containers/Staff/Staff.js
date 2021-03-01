import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import StaffHead from './StaffHead/StaffHead';
import StaffItems from './StaffItems/StaffItems';
import AddItem from './StaffHead/addItems/addItems'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


import * as staffItemActions from '../../store/actions/index'
import classes from './Staff.module.css';

export class Staff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addingItemm: false,
            items: props.items,
            error: props.error,
            editingItem: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.users !== nextProps.users) {
        this.setState({
            items: nextProps.items,
            error: nextProps.error
        });
        // }
    }

    componentDidMount() {
        this.props.onInitStaffItems();
    }


    AddItemCancelHandler = () => {
        this.setState({
            addingItemm: false,
            editingItem: {}
        });
    }


    AddItemlHandler = () => {
        this.setState({
            addingItemm: true
        });
    }

    editItem = (item) => {
        this.setState({
            addingItemm: true,
            editingItem: item
        });
    }

    addItemToCart = (item) => {
        this.setState({
            cartItem: item
        });
    }

    render() {
        let staff = this.state.error ? <p>Staff can't be loaded!</p> : <Spinner />;

        if (this.state.items && !this.state.error) {
            staff = (
                <Aux>
                    <StaffHead isAuth={this.props.isAuthenticated} addItem={this.AddItemlHandler} count={this.state.items.length}></StaffHead>
                    <div><StaffItems items={this.state.items} editItem={this.editItem} addItemToCart={this.addItemToCart}></StaffItems></div>
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.addingItemm} modalClosed={this.AddItemCancelHandler}>
                    <AddItem show={this.state.addingItemm} cancel={this.AddItemCancelHandler} add={this.props.onStaffItemAdded} editItem={this.state.editingItem} delete={this.props.onStaffItemRemoved}></AddItem>
                </ Modal>
                { staff}
            </Aux>);
    }
}

const mapStateToProps = state => {
    return {
        items: state.staffItems.items,
        error: state.staffItems.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onStaffItemAdded: (itemName) => dispatch(staffItemActions.addStaffItem(itemName)),
        onStaffItemRemoved: (itemName) => dispatch(staffItemActions.removeStaffItem(itemName)),
        onInitStaffItems: () => dispatch(staffItemActions.initStaffItems()),
        onInitPurchase: () => dispatch(staffItemActions.purchaseInit()),
        AuthRedirectPath: (path) => dispatch(staffItemActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Staff, axios));