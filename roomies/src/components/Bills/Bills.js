import React, { Component } from 'react';
// import GenericButton from '../../GenericButton';
import "./Bills.css";
import SideButton from '../SideBar/sidebuttons';

class Bills extends Component {
    constructor(props) {
        super(props);
        let bills = [{name: "bill1", desc: "this is bill1's desc", value: 1000},
        {name: "bill2", desc: "this is bill2's desc", value: 2000},
        {name: "bill3", desc: "this is bill3's desc", value: 3000}];
        let people = [{name: "Devin", owed: 250, paid: 200},
        {name: "Mike", owed: 250, paid: 250},
        {name: "Nicole", owed: 250, paid: 250},
        {name: "Erline", owed: 250, paid: 200}];
        this.state = {selectedBill: bills[0], bills: bills, people: people}
        this.changeBill = this.changeBill.bind(this);
        this.payBill = this.payBill.bind(this);
    }

    //populate bills information when page is loaded
    componentDidMount() {
        const populateBillsDropDown = (elementId, min, max) => {
            // Populate Dropdown with bills between
            let dropDown = document.getElementById(elementId);
        
            // Loop that counts from 1 - length of billsList			
            for (let counter = min; counter <= max; counter++) {
                // Creates the html element <option value=''>innerHTML</option>
                let tempElement = document.createElement("option");
        
                // Assigning to the element properties
                tempElement.innerHTML = this.state.bills[counter -1].name;
                tempElement.value = counter;
        
                // Append (Add) the newly created element to the dropDown element
                dropDown.appendChild(tempElement);
            }
        }
        populateBillsDropDown("billsDropDown", 1, this.state.bills.length);
    }

    //allow users to change which bill is currently selected from the dropdown
    changeBill = (e) => {
        this.setState({selectedBill: this.state.bills[document.getElementById("billsDropDown").selectedIndex]})
    }

    //allow users to update how much they've paid towards the selected bill
    payBill = (e) => {
        if(e.key === 'Enter'){
            let paid = document.getElementById("amountPaid").value;
            if(paid.length > 0 &&
                !isNaN(paid) &&
                paid > 0 &&
                paid < this.state.selectedBill.value) {
                alert(`Payment of ${paid} logged and removed from ${this.state.selectedBill.name} total`);
                //make changes to database instead of doing this whenever we have access to it
                let newValue = this.state.selectedBill.value - paid;
                let key = 3;
                this.setState(prevState => ({
                    bills: prevState.bills.map(
                        el => el.key === key? { ...el, value: newValue }: el
                    )
                  
                }))
            }
            console.log(this.state.bills);
        }
    }



    render() {
        return (
            <div className="Bills">
                <div className="Bills-topNav">
                    {/* <div className="Bills-nav">
                        <GenericButton buttonClass="button red" name="button1" />
                        <GenericButton buttonClass="button red" name="button1" />
                    </div> */}
                </div>
                
                <div>
                    <SideButton />
                </div>  
                <div className="Bills-mainContent">
                    <h1>Bills</h1>
                    <div className="Bills-columns">
                        <label htmlFor="bills">Select a bill</label>
                        <br />
                        <select id="billsDropDown" onChange = {this.changeBill}>
                        </select>
                        <p>Bill Total is: {this.state.selectedBill.value} </p>
                        <p>Your remaining total is:{this.state.people[0].owed}</p>
                        <p>{this.state.people[1].name} remaining total is:{this.state.people[1].owed}</p>
                        <p>{this.state.people[2].name} remaining total is:{this.state.people[2].owed}</p>
                        <p>{this.state.people[3].name} remaining total is:{this.state.people[3].owed}</p>
                        <p>Remaining to be paid: $ADD ALL THE REMAINNG OWED TOTALS TOGETHER</p>
                        <p>FILEUPLOAD UNSURE</p>
                    </div>
                    <div className="Bills-columns">
                        <h2>{this.state.selectedBill.name}</h2>
                        <p>chart</p>
                        <label htmlFor="billsPaid">Enter amount you paid:</label>
                        <input type="text" rows="1" cols="30" id="amountPaid" onKeyPress={this.payBill}></input>

                    </div>
                    <div className="Bills-columns">
                        <h2>Description of {this.state.selectedBill.name}</h2>
                        <p>{this.state.selectedBill.desc}</p>
                        <h2>House grand total</h2>
                        <p>Your total remaining:$money</p>
                        <p>House total remaining:$money</p>
                    </div>
                </div>    
            </div>
        );
    }
}

export default Bills;