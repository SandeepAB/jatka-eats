import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import StoreHead from './StoreHead/StoreHead';
import StoreItems from './StoreItems/StoreItems';
import AddItem from './StoreHead/addItems/addItems'

import RawStore from './RawStore';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import classes from './Store.module.css';


import * as storeItemActions from '../../store/actions/index'

export class Store extends Component {

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
        this.props.onInitStoreItems();
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

    editRawStoreItem = (item) => {

    }

    render() {
        let store = this.state.error ? <p>Store can't be loaded!</p> : <Spinner />;

        if (this.state.items && !this.state.error) {
            store = (
                <div className={classes.fullHeight}>
                    <div className={classes.HalfHeight}>
                        <StoreHead isAuth={this.props.isAuthenticated} addItem={this.AddItemlHandler} count={this.state.items.length}></StoreHead>
                        <div><StoreItems items={this.state.items} editItem={this.editItem} addItemToCart={this.addItemToCart}></StoreItems></div>
                    </div>
                    <div className={classes.HalfHeight}>
                        <RawStore  items={this.state.items} editRawStoreItem={this.props.onStoreItemAdded}></RawStore>
                    </div>
                </div>

            );
        }

        return (
            <Aux>
                <Modal show={this.state.addingItemm} modalClosed={this.AddItemCancelHandler}>
                    <AddItem show={this.state.addingItemm} cancel={this.AddItemCancelHandler} add={this.props.onStoreItemAdded} editItem={this.state.editingItem} delete={this.props.onStoreItemRemoved}></AddItem>
                </ Modal>
                { store}
            </Aux>);
    }
}

const mapStateToProps = state => {
    return {
        items: state.storeItems.items,
        error: state.storeItems.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onStoreItemAdded: (itemName) => dispatch(storeItemActions.addStoreItem(itemName)),
        onStoreItemRemoved: (itemName) => dispatch(storeItemActions.removeStoreItem(itemName)),
        onInitStoreItems: () => dispatch(storeItemActions.initStoreItems()),
        onInitPurchase: () => dispatch(storeItemActions.purchaseInit()),
        AuthRedirectPath: (path) => dispatch(storeItemActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Store, axios));