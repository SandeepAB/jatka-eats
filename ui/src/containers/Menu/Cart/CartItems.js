import React, { Component } from 'react';
import classes from './CartItems.module.css';
import { connect } from 'react-redux';
import CartItem from './CartItem/CartItem'
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import withErrorHandler from '../../../../src/hoc/withErrorHandler/withErrorHandler';
import axios from '../../../../src/axios-orders';
import * as cartItemActions from '../../../../src/store/actions/index'

import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const DeleteColorButton = withStyles((theme) => ({
    root: {
        color: "black",
        backgroundColor: "#D0D0D0",
        '&:hover': {
            backgroundColor: "#gray",
        },
    },
}))(Button);

const CheckoutColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#1D6FE5",
        '&:hover': {
            backgroundColor: "#1D6FE5",
        },
    },
}))(Button);


class CartItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: {},
            sum: 0,
            paymentMethod : "Net banking"
        };
    }

    paymentMethodChange = (e) => {
        console.log("paymentMethodChange", e)
        this.setState({
            paymentMethod : e.target.value
        })

    }

    componentWillReceiveProps(nextProps) {
        console.log("recieving props to cart", nextProps);

        let items = { ...this.state.items };

        if (nextProps.addItem._id) {
            if (items[nextProps.addItem._id]) {
                items[nextProps.addItem._id].count = (Number(items[nextProps.addItem._id].count) + 1).toString();
                items[nextProps.addItem._id] = nextProps.addItem;
                items[nextProps.addItem._id].totalItemPrice = ((Number(items[nextProps.addItem._id].count)) * Number(items[nextProps.addItem._id].itemPrice))
            }
            else {
                nextProps.addItem.count = "1";
                items[nextProps.addItem._id] = nextProps.addItem;
                items[nextProps.addItem._id].totalItemPrice = ((Number(items[nextProps.addItem._id].count)) * Number(items[nextProps.addItem._id].itemPrice))

            }
            this.setState({
                items: items
            });
        }
        // else {
        //     Object.keys(nextProps.items).map((key, i) => {
        //         nextProps.items[key].totalItemPrice = ((Number(nextProps.items[key].count)) * Number(nextProps.items[key].itemPrice))
        //     })
        //     this.setState({
        //         items: nextProps.items
        //     });
        // }
    }

    getTotal() {
        let sum = 0;
        Object.keys(this.state.items).map((order, i) => {
            sum = sum + Number(this.state.items[order].totalItemPrice);
        });

        return sum;
    }
    componentDidMount() {
        // this.setState({
        //     initial: true
        // });
        // this.props.onInitCartItems();

        // this.setState({
        //     items: nextProps.items ? nextProps.items.docs ? nextProps.items.docs: {} : {},
        //     error: nextProps.error
        // });
    }

    addItem(id) {
        let items = { ...this.state.items }
        // items[id].count = Number(items[id].count) + 1;

        items[id].count = (Number(items[id].count) + 1).toString();
        items[id].totalItemPrice = ((Number(items[id].count)) * Number(items[id].itemPrice))


        this.setState({
            items: items
        });
    }

    removeItem(id) {
        let items = { ...this.state.items }
        if ((Number(items[id].count) - 1) <= 0) {
            delete items[id];
        }
        else {
            // items[id].count = Number(items[id].count) - 1;
            items[id].count = (Number(items[id].count) - 1).toString();
            items[id].totalItemPrice = ((Number(items[id].count)) * Number(items[id].itemPrice))

        }

        this.setState({
            items: items
        });

        this.props.show(items);
    }

    save(e){
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.print(this.state);
        // this.props.onCartItemAdded(this.state.items);
    }

    delete(){
        this.setState({
            items: {},
            sum: 0
        });
        this.props.show({});
    }

    render() {
        let orders = Object.keys(this.state.items).map((order, i) => (
            <CartItem key={i} item={this.state.items[order]} addItem={this.addItem.bind(this)} removeItem={this.removeItem.bind(this)}></CartItem>
        ));
        return (
            <div >
                <div className={classes.HalfColumn}>
                    <h3 className={classes.CartHeadName}>Cart</h3>
                    <p className={classes.CartHeadItems}>{Object.keys(this.state.items).length} items</p>
                </div>
                <div className={classes.CartHeadName}>{orders}</div>

                <div className={classes.ItemTotalPadding}>
                    <div className={[classes.FlexRow, classes.ItemTotalPadding].join(' ')}>
                        <div className={classes.HalfColumn}>
                            <h3 className={classes.CartHeadName}>Sub total</h3>
                        </div>
                        <div className={classes.HalfColumn}>
                            <h3 className={classes.CartHeadName}>Rs. {this.getTotal()}</h3>
                        </div>
                    </div>
                    <div className={[classes.FlexRow, classes.ItemTotalPadding].join(' ')}>
                        <div className={classes.HalfColumn}>
                            <h3 className={classes.CartHeadName} >Mode of payment</h3>
                        </div>
                        <div className={classes.HalfColumn}>
                            <select className={classes.Select} onChange={this.paymentMethodChange.bind(this)} value={this.state.paymentMethod}>
                                <option value="Net banking">Net banking</option>
                                <option value="UPI">UPI</option>
                                <option value="Debit card">Debit card</option>
                            </select>
                        </div>
                    </div>
                    <div className={[classes.FlexRow, classes.ItemTotalPadding].join(' ')}>
                        <div className={classes.HalfColumn}>
                            <DeleteColorButton variant="contained"
                                color="secondary"
                                size="medium"
                                className={[classes.AddItemsButton, classes.FloatRight, classes.CancelButtonBackground].join(' ')}
                                onClick={this.delete.bind(this)}

                            >Delete</DeleteColorButton>
                        </div>
                        <div className={classes.HalfColumn}>
                            <CheckoutColorButton variant="contained"
                                color="secondary"
                                size="medium"
                                className={[classes.AddItemsButton, classes.FloatRight, classes.CancelButtonBackground].join(' ')}
                                onClick={this.save.bind(this)}
                            >Proceed to checkout</CheckoutColorButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.cartItems.items,
        error: state.cartItems.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onCartItemAdded: (itemName) => dispatch(cartItemActions.addCartItem(itemName)),
        onCartItemRemoved: (itemName) => dispatch(cartItemActions.removeCartItem(itemName)),
        onInitCartItems: () => dispatch(cartItemActions.initCartItems()),
        onInitPurchase: () => dispatch(cartItemActions.purchaseInit()),
        AuthRedirectPath: (path) => dispatch(cartItemActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(CartItems, axios));
