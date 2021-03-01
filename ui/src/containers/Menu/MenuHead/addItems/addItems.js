import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxilary/Auxilary';
import classes from './addItems.module.css';

import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone'

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

    //This couold be a functional component, doesnt have to be a class

    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            imageName: "",
            imageSrc: null,
            ItemName: "",
            ItemPrice: 0,
            error: false
        };
    }


    componentWillReceiveProps(nextProps) {
        // if (this.props.users !== nextProps.users) {
        this.setState({
            _id: nextProps.editItem ? nextProps.editItem._id || "" : "",
            imageName: nextProps.editItem ? nextProps.editItem.imageName || "" : "",
            imageSrc: nextProps.editItem ? nextProps.editItem.itemImageUrl || null : null,
            ItemName: nextProps.editItem ? nextProps.editItem.itemName || "" : "",
            ItemPrice: nextProps.editItem ? nextProps.editItem.itemPrice || 0 : 0,
        });
        // }
    }






    handleItemImage(event) {
        if (event.target.files && event.target.files[0]) {

            let imageName = event.target.files[0].name
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ imageSrc: e.target.result, imageName: imageName });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    handleItemName(event) {
        this.setState({ ItemName: event.target.value });
    }

    handleItemPrice(event) {
        this.setState({ ItemPrice: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.imageSrc && this.state.ItemName && this.state.ItemPrice) {
            this.setState({ error: false });
            this.props.add({
                _id: this.state._id,
                itemImageUrl: this.state.imageSrc,
                itemName: this.state.ItemName,
                itemPrice: this.state.ItemPrice,
                itemCurrency: "Rs."
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
        document.getElementById("item-image-upload").value = "";
        this.setState({
            _id: "",
            imageName: "",
            imageSrc: null,
            ItemName: "",
            ItemPrice: 0,
            error: false
        });
        this.props.cancel();
    }

    render() {
        let image = this.state.imageName != "" ? <p className={classes.SelectedFile}>{this.state.imageName}</p> : <div></div>
        let error = this.state.error ? <p className={classes.Error}>Please fill all the required feilds</p> : <div></div>
        let deleteButton = this.state._id ? <div className={[classes.Col_6, classes.FloatRight].join(' ')}>
            <ColorButton variant="contained"
                color="secondary"
                size="small"
                className={[classes.AddItemsButton, classes.FloatRight, classes.DeleteButtonBackground].join(' ')}
                onClick={this.onDelete.bind(this)}
            >Delete</ColorButton>
        </div> : <div></div>
        return (
            <Aux>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <p>Add new item</p>
                    {error}
                    <div>
                        <div className={classes.RowPadding}>
                            <div className={classes.Row}>
                                <p>Upload Image</p>
                            </div>

                            <div className={classes.Row}>
                                <div>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload File
                                        <input
                                            id="item-image-upload"
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => this.handleItemImage(e)}
                                        />
                                    </Button>
                                    {image}
                                    {/* <Button onClick={this.handleOpen.bind(this)}>
                                    Add Image
                                    </Button>
                                    <DropzoneDialog
                                        open={this.state.open}
                                        onSave={this.handleSave.bind(this)}
                                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                        showPreviews={true}
                                        maxFileSize={5000000}
                                        onClose={this.handleClose.bind(this)}
                                        onChange={this.handleItemImage.bind(this)}
                                    /> */}
                                </div>

                            </div>
                        </div>
                        <div className={[classes.FlexRow, classes.RowPadding].join(' ')}>
                            <div className={classes.Col_6}>
                                <p className={classes.Row}>Name of the item</p>
                                <input type="text" name="ItemName" value={this.state.ItemName} className={[classes.Row, classes.Input].join(' ')} onChange={this.handleItemName.bind(this)} />
                            </div>
                            <div className={classes.Col_6}>
                                <p className={classes.Row} >Price of the item</p>
                                <input type="number" name="ItemPrice" value={this.state.ItemPrice} className={[classes.Row, classes.Input].join(' ')} onChange={this.handleItemPrice.bind(this)} />
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