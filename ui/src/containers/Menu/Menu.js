import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import MenuHead from './MenuHead/MenuHead';
import MenuItems from './MenuItems/MenuItems';
import AddItem from './MenuHead/addItems/addItems'

import Cart from './Cart/CartItems';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


import * as menuItemActions from '../../store/actions/index'
import classes from './Menu.module.css';

import Logo from '../../components/Logo/Logo';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactToPrint from 'react-to-print';
import PrintReceipt from './PrintReceipt'

const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2A7953",
        '&:hover': {
            backgroundColor: "#2A7953",
        },
    },
}))(Button);

export class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addingItemm: false,
            items: props.items,
            error: props.error,
            editingItem: {},
            cartItem: {},
            showCart: false,
            printblill: false,
            printItems: {
                items : {},
                sum : 0,
                paymentMethod : ""
            }
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
        this.props.onInitMenuItems();
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
        console.log("adding to cart", item)
        this.setState({
            cartItem: item,
            showCart: true
        });
    }

    showCart = (items) => {
        if (Object.keys(items).length > 0) {
            this.setState({
                showCart: true
            })
        }
        else {
            this.setState({
                showCart: false
            })
        }

    }

    PrintBillCancelHandler = () => {
        this.setState({
            printblill: false
        })
    }

    PrintBillShowHandler = (data) => {
        menuItemActions.checkoutItems(data);
        this.setState({
            printblill: true,
            printItems : data,
            cartItem : {}
        });

        // this.props.checkoutItems(data);
    }
    
    handleSubmit = () => {
        this.PrintBillCancelHandler();
    }
    render() {
        let menu = this.state.error ? <p>Menu can't be loaded!</p> : <Spinner />;

        if (this.state.items && !this.state.error) {
            menu = (
                <Aux>
                    <MenuHead isAuth={this.props.isAuthenticated} addItem={this.AddItemlHandler} count={this.state.items.length}></MenuHead>
                    <div className={classes.FlexRow}>
                        <div className={this.state.showCart ? classes.Col_70 : classes.Row}><MenuItems items={this.state.items} editItem={this.editItem} addItemToCart={this.addItemToCart} size={this.state.showCart ? 3 : 2}></MenuItems></div>
                        <div className={this.state.showCart ? classes.Col_30 : classes.Hide} ><Cart addItem={this.state.cartItem} show={this.showCart} print={this.PrintBillShowHandler}></Cart></div>
                    </div>
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.addingItemm} modalClosed={this.AddItemCancelHandler}>
                    <AddItem show={this.state.addingItemm} cancel={this.AddItemCancelHandler} add={this.props.onMenuItemAdded} editItem={this.state.editingItem} delete={this.props.onMenuItemRemoved}></AddItem>
                </ Modal>

                <Modal show={this.state.printblill} modalClosed={this.PrintBillCancelHandler}>
                <div >
                        <CloseIcon onClick={this.PrintBillCancelHandler} className={classes.ShowCursor} />
                 </div>
                 <PrintReceipt PrintBillCancelHandler={this.PrintBillCancelHandler} printItems={this.state.printItems} ref={el => (this.componentRef = el)}/>
                <div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                        <div className={classes.Col_6}></div>
                        <div className={[classes.FlexRow, classes.Col_6].join(' ')}>
                            <div className={classes.Col_6}>
                                <ColorButton variant="contained"
                                    color="secondary"
                                    size="small"
                                    className={[classes.AddItemsButton, classes.FloatRight, classes.CancelButtonBackground].join(' ')}
                                    onClick={this.PrintBillCancelHandler}
                                >Cancel</ColorButton>
                            </div>
                            
                            <div className={classes.Col_6}>
                            <ReactToPrint
                                trigger={() => {
                                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                    // to the root node of the returned component as it will be overwritten.
                                    return <ColorButton variant="contained"
                                    type="submit"
                                    color="secondary"
                                    size="small"
                                    className={[classes.AddItemsButton, classes.FloatRight, classes.SaveButtonBackground].join(' ')}
                                >Print</ColorButton>;
                                }}
                                content={() => this.componentRef}
                            />
                            </div>
                        </div>
                    </div>
                {/* <AddItem show={this.state.addingItemm} cancel={this.AddItemCancelHandler} add={this.props.onMenuItemAdded} editItem={this.state.editingItem} delete={this.props.onMenuItemRemoved}></AddItem> */}
                </ Modal>

                { menu }
            </Aux >);
    }
}

const mapStateToProps = state => {
    return {
        items: state.menuItems.items,
        error: state.menuItems.error
    };
}

const mapDispatchToProps = dispatch => {

    return {
        onMenuItemAdded: (itemName) => dispatch(menuItemActions.addMenuItem(itemName)),
        onMenuItemRemoved: (itemName) => dispatch(menuItemActions.removeMenuItem(itemName)),
        onInitMenuItems: () => dispatch(menuItemActions.initMenuItems()),
        onInitPurchase: () => dispatch(menuItemActions.purchaseInit()),
        AuthRedirectPath: (path) => dispatch(menuItemActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Menu, axios));