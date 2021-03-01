import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxilary/Auxilary';
import classes from './addItems.module.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2A7953",
        '&:hover': {
            backgroundColor: "#2A7953",
        },
    },
}))(Button);


class AddItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            id: "JE001",
            address: "",
            noOfStaff: "0",
            noOfMenuItems: [],
            error: false,
            menuItems: [],
            checkbox: true
        };
    }

    componentWillMount() {
        axios.get('http://localhost:3005/api/items')
            .then((response) => {
                console.log(response.data)
                this.setState({ menuItems: response.data.data });
            })
            .catch((error) => {
                console.log(error)
                this.setState({ menuItems: [] });
            });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            _id: nextProps.editItem ? nextProps.editItem._id || "" : "",
            id: nextProps.editItem ? nextProps.editItem.id || "JE001" : "JE001",
            address: nextProps.editItem ? nextProps.editItem.address || "" : "",
            noOfStaff: nextProps.editItem ? nextProps.editItem.noOfStaff || "0" : "0",
            noOfMenuItems: nextProps.editItem ? nextProps.editItem.noOfMenuItems || [] : []
        });
    }

    componentDidUpdate() {
        var checkboxes = document.getElementsByName("storeMenuCheckboxes");
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = this.state.noOfMenuItems.indexOf(checkboxes[i].nextElementSibling.innerText) >= 0 ? true : false
        }
    }

    handleaddress(event) {
        this.setState({ address: event.target.value });
    }

    handlenoOfStaff(event) {
        this.setState({ noOfStaff: event.target.value });
    }

    handlenoOfMenuItems(event) {
        this.setState({ noOfMenuItems: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        function getCheckedBoxes(chkboxName) {
            var checkboxes = document.getElementsByName(chkboxName);
            var checkboxesChecked = [];
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkboxesChecked.push(checkboxes[i].nextElementSibling.innerText);
                }
            }
            return checkboxesChecked.length > 0 ? checkboxesChecked : [];
        }

        var checkedBoxes = getCheckedBoxes("storeMenuCheckboxes");

        if (this.state.address && this.state.noOfStaff && checkedBoxes.length) {
            this.setState({ error: false });
            this.props.add({
                _id: this.state._id,
                id: this.state.id,
                address: this.state.address,
                noOfStaff: this.state.noOfStaff,
                noOfMenuItems: checkedBoxes,
            });
            this.onCancel();
        }
        else {
            this.setState({ error: true });
            return false
        }
    }

    onDelete(event) {
        event.preventDefault();
        this.props.delete({
            _id: this.state._id
        });
        this.onCancel();
    }

    onCancel() {
        this.setState({
            _id: "",
            id: "JE001",
            address: "",
            noOfStaff: "0",
            noOfMenuItems: [],
            error: false
        });
        this.props.cancel();
    }

    render() {

        let error = this.state.error ? <p className={classes.Error}>Please fill all the required feilds</p> : <div></div>
        let deleteButton = this.state._id ? <div className={[classes.Col_6, classes.FloatRight].join(' ')}>
            <ColorButton variant="contained"
                color="secondary"
                size="small"
                className={[classes.AddItemsButton, classes.FloatRight, classes.DeleteButtonBackground].join(' ')}
                onClick={this.onDelete.bind(this)}
            >Delete</ColorButton>
        </div> : <div></div>

        let menuList = <div>No menu items</div>
        let list = [...this.state.menuItems];

        menuList = list.map((ele, i) => (
            <div className={classes.MenuItem}>
                <input className={classes.MenuItemCheckbox} type="checkbox" name="storeMenuCheckboxes" /> <p>{ele.itemName}</p>
            </div>))

        return (
            <Aux>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <p>Add new store</p>
                    {error}
                    <div>
                        <div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                            <div className={classes.Col_6}>
                                <p className={[classes.Row].join(" ")} >Address</p>
                                <textarea type="text" name="text" value={this.state.address} className={[classes.Row, classes.Input].join(' ')} onChange={this.handleaddress.bind(this)}></textarea>
                            </div>
                            <div className={classes.Col_6}>
                                <p className={classes.Row} >No. of staff</p>
                                <input type="number" name="noOfStaff" value={this.state.noOfStaff} className={[classes.Row, classes.Input].join(' ')} onChange={this.handlenoOfStaff.bind(this)} />
                            </div>
                        </div>
                        <div className={[classes.Row, classes.RowPadding].join(' ')}>
                            <p className={classes.Row} >No. of menu items</p>
                            <div className={classes.MenuList}>
                                {menuList}
                            </div>
                        </div>
                        <div className={[classes.Row, classes.RowPadding].join(' ')}>
                            <div className={[classes.Col_6, classes.Flex, classes.FloatRight].join(' ')}>
                                <div className={classes.Col_6}>
                                    <ColorButton variant="contained"
                                        color="secondary"
                                        size="small"
                                        className={[classes.AddItemsButton, classes.FloatRight, classes.CancelButtonBackground].join(' ')}
                                        onClick={this.onCancel.bind(this)}
                                    >Cancel</ColorButton>
                                </div>
                                <div className={classes.Col_6}>
                                    <ColorButton variant="contained"
                                        type="submit"
                                        color="secondary"
                                        size="small"
                                        className={[classes.AddItemsButton, classes.FloatRight, classes.SaveButtonBackground].join(' ')}
                                    >Save</ColorButton>
                                </div>
                            </div>
                            {deleteButton}
                        </div>
                    </div>
                </form>
            </Aux>
        )
    }
}


export default AddItems;