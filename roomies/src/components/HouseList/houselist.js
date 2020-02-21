import React, { Component } from "react";
import SideButton from '../SideBar/sidebuttons';
import "./houselist.css"

class HouseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyItems: [],
            message: ''
        }
    }
    addItem(evt){
        evt.preventDefault();
        const {buyItems} = this.state;
        const newItem = this.newItem.value;
        const isOnTheList = buyItems.includes(newItem); 

        if(isOnTheList){
            this.setState({
                message: 'Item already on the list.'
            })
        } else {

        newItem !== '' && this.setState({  //prevention of emppty sring
            buyItems: [...this.state.buyItems, newItem], //this will be an objec that updates the current state
            message: ''
        })
        }

        this.addForm.reset()

    }

    removeItem(item) {
        const newBuyItems = this.state.buyItems.filter(buyItem => { //getting the old state, taking each item from the original state and compare the items to the ones we want to remove while keeping those still in the state
            return buyItem !== item;
        })

        this.setState({
            buyItems: [...newBuyItems]
        })
    }

    render() {
        const {buyItems, message} =this.state;
        return (
            <div className="HouseList">
                <SideButton />
                <div className="house-columns">
                <h2>House Items</h2>
                <form ref={input => this.addForm =input} className="form-inline" onSubmit={(evt) => {this.addItem(evt)}}>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="newItemInput">Add New Item</label>
                        <input ref={input => this.newItem =input} type="text" placeholder="Cleaning Spray" className="form-control" id="newItemInput" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
                <div> 
                    {
                        message !== '' && <p className="message text-danger">{message}</p>
                    }
                </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Item #</th>
                                <th scope="col">Item</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                    </table>
                    {
                        buyItems.map(item => {
                            return (
                                <tr key={item}>
                                    <th scope="row">1</th>
                                    <td>{item}</td>
                                    <td className="text-right">
                                        <button onClick={(e) => this.removeItem(item)} type="button" className="btn btn-default btn-sm">
                                        Remove
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
export default HouseList;